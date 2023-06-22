<template>
  <TitleCard title="Create Group" />
  <div
    ref="setThreshold"
    class="pb-10"
    :class="{ 'opacity-10 pointer-events-none select-none': !setThreshold }"
  >
    <div class="flex justify-center py-8 text-3xl font-bold">
      Select Threshold
    </div>
    <thresholdSelector
      @maxNumberChange="this.maxNumber = $event"
      @thresholdChange="this.threshold = $event"
    ></thresholdSelector>
    <div class="flex justify-center pt-10">
      <mainButton @click="scrollToImport" title="⏭️ Next" />
    </div>
  </div>

  <div
    ref="importKey"
    class="opacity-10 pointer-events-none select-none pb-10"
    :class="{ '!opacity-100 pointer-events-auto select-auto': importKey }"
  >
    <div class="flex justify-center py-8 text-3xl font-bold">Select Keys</div>
    <keyImportOrGenerateVue
      @privKey="this.privKey = $event"
      @pubKey="this.pubKey = $event"
      @keysPresentStatus="this.keysPresent = $event"
    ></keyImportOrGenerateVue>
    <div class="flex justify-center pt-10">
      <mainButton @click="scrollToName" title="⏭️ Next" />
    </div>
  </div>

  <div
    ref="enterName"
    class="opacity-10 pointer-events-none select-none pb-32"
    :class="{ '!opacity-100 pointer-events-auto select-auto': enterName }"
  >
  <div class="flex justify-center py-8 text-3xl font-bold">Select Name</div>
    <div class="flex justify-center mb-4">
      <EditableArea
        placeholderValue="Enter name..."
        v-model="name"
        @enterPressed="startGroup"
        @keydown.enter.prevent
        class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
      ></EditableArea>
    </div>

    <div class="flex justify-center pt-10">
      <mainButton @click="startGroup" title="⏭️ Next" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard";
import ThresholdSelector from "@/components/ThresholdSelector";
import mainButton from "@/components/mainButton";
import keyImportOrGenerateVue from "@/components/keyImportOrGenerate";
import EditableArea from "@/components/EditableArea";
import { io } from "socket.io-client";
import { useSocket, useUserInfo, useGroupInfo } from "@/store/index";
import { useToast } from "vue-toastification";
import { nextTick } from "vue";
import { getActivePinia } from "pinia"

export default defineComponent({
  name: "CreateGroupView",
  setup() {
    const socketStore = useSocket();
    const userInfoStore = useUserInfo();
    const groupInfoStore = useGroupInfo();
    const toast = useToast();
    return { toast, socketStore, userInfoStore, groupInfoStore };
  },
  data() {
    return {
      threshold: 10,
      maxNumber: 30,
      keysPresent: false,
      privKey: "",
      pubKey: "",
      setThreshold: true,
      importKey: false,
      enterName: false,
      name: "",
      connected: false,
    };
  },

  components: {
    TitleCard,
    ThresholdSelector,
    mainButton,
    keyImportOrGenerateVue,
    EditableArea,
  },
  mounted() {
    //clear all state data from this store index
    getActivePinia()._s.forEach(store => store.$reset());

    this.socketStore.socketObject = io.connect(
        this.socketStore.baseURL + ":" + this.socketStore.ioPort
      );

    this.socketStore.socketObject.on("connect", () => {
      this.connected = true;
    }),

    this.socketStore.socketObject.on("connect_error", (err) => {
      console.log(err);
      });

  },
  methods: {
    async scrollToImport() {
      this.setThreshold = false;
      this.importKey = true;

      await nextTick();
      this.$refs.importKey.scrollIntoView({});
    },
    async scrollToName() {
      if (!this.keysPresent) {
        this.toast.error("Please import keys");
        return;
      }

      this.importKey = false;
      this.enterName = true;

      await nextTick();
      this.$refs.enterName.scrollIntoView({});
      window.scrollBy(0, -15);
    },
    startGroup() {
      if (!this.name) {
        this.toast.error("Please enter a name");
        return;
      } else if (this.name.length > 10) {
        this.toast.error("Name must be less than 10 characters");
        return;
      }else if (!this.connected) {
        this.toast.error("Not connected to server, please check console for error");
        return;
      }
      
      this.userInfoStore.privKey = this.privKey;
      this.userInfoStore.pubKey = this.pubKey;
      this.userInfoStore.username = this.name;
      this.userInfoStore.emoji = "👑";
      this.userInfoStore.admin = true;
      this.groupInfoStore.threshold = this.threshold;
      this.groupInfoStore.numberOfSigners = this.maxNumber;
      //generate random 3 number group id
      this.groupInfoStore.groupID = Math.random().toString(7).substring(2, 5);
      this.groupInfoStore.memberList = [
        {
          username: this.name,
          pubKey: this.pubKey,
          emoji: this.userInfoStore.emoji,
        },
      ];

      //connect to server
        this.$router.push("lobby");
        this.socketStore.socketObject.emit("create", {
          groupID: this.groupInfoStore.groupID,
          username: this.userInfoStore.username,
          pubKey: this.userInfoStore.pubKey,
          emoji: this.userInfoStore.emoji,
          threshold: this.groupInfoStore.threshold,
          numberOfSigners: this.groupInfoStore.numberOfSigners,
        });
    },
  },
});
</script>

<style></style>
