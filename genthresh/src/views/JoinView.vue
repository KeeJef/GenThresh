<template>
  <TitleCard title="Join Group" />

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
        @enterPressed="startGroup"
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
import TitleCard from "@/components/TitleCard";
import mainButton from "@/components/mainButton";
import keyImportOrGenerateVue from "@/components/keyImportOrGenerate";
import EditableArea from "@/components/EditableArea";
import { emojiList } from "../composables/emojiList.js";
import { io } from "socket.io-client";
import { useSocket, useUserInfo, useGroupInfo } from "@/store/index";
import { useToast } from "vue-toastification";
import { nextTick } from "vue";

export default defineComponent({
  name: "JoinView",
  setup() {
    const socketStore = useSocket();
    const userInfoStore = useUserInfo();
    const groupInfoStore = useGroupInfo();
    const toast = useToast();
    return { toast, socketStore, userInfoStore, groupInfoStore };
  },

  data() {
    return {
      keysImported: false,
      privKey: "",
      pubKey: "",
      importKey: true,
      enterName: false,
      name: "",
      toastError : false,
    };
  },

  components: {
    TitleCard,
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
    async startGroup() {
      if (!this.name) {
        this.toast.error("Please enter a name");
        return;
      }
      this.userInfoStore.privKey = this.privKey;
      this.userInfoStore.pubKey = this.pubKey;
      this.userInfoStore.username = this.name;
      this.userInfoStore.emoji =
        emojiList[Math.floor(Math.random() * emojiList.length)];

      //this.socketStore.socketObject = io.connect("http://localhost:8000");
      this.socketStore.socketObject = io.connect(this.socketStore.baseURL+":"+this.socketStore.ioPort)

      //connect to server

      this.socketStore.socketObject.on("connect", () => {
      //use join function to join group send groupID, username, pubKey, emoji
        this.$router.push("lobby");
        this.socketStore.socketObject.emit("join", {
          groupID: this.groupInfoStore.groupID,
          username: this.userInfoStore.username,
          pubKey: this.userInfoStore.pubKey,
          emoji: this.userInfoStore.emoji,
        });

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
  mounted(){
    //read groupID from url after ? and set it in groupInfoStore
    this.groupInfoStore.groupID = this.$route.href.split("?")[1];
  }
});
</script>
