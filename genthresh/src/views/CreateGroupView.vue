<template>
  <TitleCard title="Create Group" />

  <div
    ref="setThreshold"
    class="pb-10"
    :class="{ 'opacity-10 pointer-events-none select-none': !setThreshold }"
  >
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
    <keyImportOrGenerateVue
      @privKey="this.privKey = $event"
      @pubKey="this.pubKey = $event"
      @keysImportedStatus="this.keysImported = $event"
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
    <div class="flex justify-center text-2xl pb-2">Name</div>
    <div class="flex justify-center mb-4">
      <EditableArea
        v-model="name"
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
import { emojiList } from "../composables/emojiList.js";
import { io } from "socket.io-client";
import { useSocket, useUserInfo, useGroupInfo } from "@/store/index";
import { useToast } from "vue-toastification";
import { nextTick } from "vue";

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
      keysImported: false,
      privKey: "",
      pubKey: "",
      setThreshold: true,
      importKey: false,
      enterName: false,
      name: "",
      toastError : false,
    };
  },

  components: {
    TitleCard,
    ThresholdSelector,
    mainButton,
    keyImportOrGenerateVue,
    EditableArea,
  },
  methods: {
    async scrollToImport() {
      this.setThreshold = false;
      this.importKey = true;

      await nextTick();
      this.$refs.importKey.scrollIntoView({});
    },
    async scrollToName() {
      if (!this.keysImported) {
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
      }
      this.userInfoStore.privKey = this.privKey;
      this.userInfoStore.pubKey = this.pubKey;
      this.userInfoStore.username = this.name;
      this.userInfoStore.emoji =
        emojiList[Math.floor(Math.random() * emojiList.length)];

      this.groupInfoStore.threshold = this.threshold;
      this.groupInfoStore.numberOfSigners = this.maxNumber;
      //generate random 3 number group id
      this.groupInfoStore.groupID = Math.random().toString(7).substring(2, 5);
      this.groupInfoStore.memberList = [
        {
          username: this.name,
          emoji: this.userInfoStore.emoji,
          pubKey: this.pubKey,
        },
      ];

      this.socketStore.socketObject = io.connect("http://localhost:8000");

      //connect to server

      this.socketStore.socketObject.on("connect", () => {

      this.socketStore.socketObject.emit('create',this.groupInfoStore.groupID)
      this.$router.push("lobby");

      });

      this.toastError = false;
      // catch connection error 
      this.socketStore.socketObject.on("connect_error", (err) => {
        //only show toast once per connection error
        if (!this.toastError) {
          this.toast.error("Error connecting to server:" + err.message);
          this.toastError = true;
        }
      });

    },
  },
});
</script>

<style></style>
