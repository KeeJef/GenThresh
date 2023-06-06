<template>
  <TitleCard title="Lobby" />
  <div class="pb-5 flex justify-center">
    <mainButton
      @click="modalToggle = !modalToggle"
      title="💌 Invite users"
      class="mr-1"
    />
    <mainButton
      v-if="false"
      @click="saveGroupInfo()"
      title="💾 Save Group Info"
    />
    <modalPopup v-if="modalToggle" @modalClose="this.modalToggle = false">
      <div class="text-center pb-2 text-xl">Copy this link to invite users</div>
      <div class="text-2xl rounded-lg bg-white px-3 py-2 mb-3 sm:text-3xl">
        {{ this.socketStore.baseURL }}/j?{{ this.groupInfoStore.groupID }}
      </div>
      <div class="flex justify-center">
        <button
          @click="copyLink"
          class="transition-colors duration-500 ease-in-out bg-green-400 rounded-md px-8 py-2 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-green-600 w-4/5"
        >
          Copy
        </button>
      </div>

      <div></div>
    </modalPopup>
  </div>
  <div class="flex justify-center text-3xl pb-4">
    <div>
      Signers: {{ this.groupInfoStore.numberOfSigners }} Threshold:
      {{ this.groupInfoStore.threshold }}
    </div>
  </div>
  <div class="w-[90%] mx-auto md:w-[70%] pt-5">
    <div
      class="flex flex-col-reverse justify-center gap-y-10 gap-2 md:flex-row"
    >
      <div class="w-full md:w-3/4">
        <div class="flex justify-center text-2xl pb-3">Message</div>

        <EditableArea
          :isEditable="isEditAllowed"
          v-model="this.groupInfoStore.message"
          :placeholderValue="placeholderText"
          class="overflow-auto h-56 w-full break-words border-2 rounded-xl border-yellow-700 text-2xl p-8"
        >
        </EditableArea>
        <mainButton
          @click="sendMessage()"
          class="mt-5"
          v-if="isEditAllowed"
          title="📨 Send"
        ></mainButton>
      </div>
      <div class="w-full md:w-1/4">
        <div class="flex justify-center text-2xl pb-3">Members</div>
        <div
          class="flex place-content-start overflow-y-auto overflow-x-auto flex-nowrap w-full h-fit border-2 p-2 rounded-xl border-yellow-700 md:h-56 md:justify-center md:overflow-x-auto md:flex-wrap"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div
            class="flex whitespace-nowrap justify-center items-center m-0.5 py-3.5 px-4 h-fit bg-[#16C60C] rounded-lg text-white font-bold text-2xl"
            v-for="member in this.groupInfoStore.memberList"
            :key="member"
          >
            {{ member.emoji + member.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.groupInfoStore.message && !this.userInfoStore.admin" class="flex justify-center pt-3">
    <mainButton @click="sendMessage" class="mr-1" title="Sign ✔️"></mainButton>
    <mainButton title="Reject❌"></mainButton>
  </div>
  <div v-if="this.groupInfoStore.message"  class="flex justify-center p-5">
    <div class="w-3/4">
      <progressIndicator :threshold=this.groupInfoStore.threshold :numberOfSigners="this.groupInfoStore.numberOfSigners" :actualSigners="this.groupInfoStore.signatureArray.length" ></progressIndicator>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useSocket, useUserInfo, useGroupInfo } from "@/store/index";
import { useToast } from "vue-toastification";
import EditableArea from "@/components/EditableArea.vue";
import progressIndicator from "@/components/progressIndicator.vue";
import modalPopup from "@/components/modalPopup.vue";
import mainButton from "@/components/mainButton.vue";
import helpers from "@/helperFunctions/helperFunctions.js";

// Components
import TitleCard from "@/components/TitleCard.vue";

export default defineComponent({
  name: "LobbyView",
  setup() {
    const socketStore = useSocket();
    const userInfoStore = useUserInfo();
    const groupInfoStore = useGroupInfo();
    const toast = useToast();
    return { toast, socketStore, userInfoStore, groupInfoStore };
  },
  data() {
    return {
      modalToggle: false,
      messageSent: false,
    };
  },
  computed: {
    isGroupFull() {
      return (
        this.groupInfoStore.memberList.length ==
        this.groupInfoStore.numberOfSigners
      );
    },
    remainingSigners() {
      return (
        this.groupInfoStore.numberOfSigners -
        this.groupInfoStore.memberList.length
      );
    },
    placeholderText() {
      if (this.userInfoStore.admin) {
        return this.isGroupFull
          ? "Enter message to sign..."
          : `Waiting for ${this.remainingSigners} more signers to join...`;
      }
      return this.isGroupFull
        ? "Waiting for admin to send message..."
        : `Waiting for ${this.remainingSigners} more signers to join...`;
    },
    isEditAllowed() {
      return this.userInfoStore.admin && !this.messageSent
        ? this.isGroupFull
        : false;
    },
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(
        this.socketStore.baseURL +
          ":" +
          this.socketStore.httpPort +
          "/j?" +
          this.groupInfoStore.groupID
      );
      this.toast.success("Copied to clipboard");
    },
    saveGroupInfo() {
      //
    },

    async sendMessage() {
      if (this.groupInfoStore.message == "") {
        this.toast.error("Please enter a message");
        return;
      }

      var signedMessage = await this.signMessage(this.groupInfoStore.message);

      this.socketStore.socketObject.emit("sendMessage", {
        signature: signedMessage,
        adminStatus: this.userInfoStore.admin,
        pubKey: this.userInfoStore.pubKey,
        message: this.groupInfoStore.message,
        groupID: this.groupInfoStore.groupID,
      });

      this.messageSent = true;
    },

    async signMessage(message) {
      try {
        var bufferSignature = await helpers.signMessage(
          this.userInfoStore.privKey,
          message
        );
      } catch (error) {
        this.toast.error("Error signing message: " + error.message);
        return;
      }
      var signature = helpers.bufferToHex(bufferSignature);
      return signature;
    },

    async aggregateKeys(keyArray) {
      try {
        var hexAggregateKey = await helpers.aggKey(keyArray);
        var aggregatedKey = await helpers.bufferToHex(hexAggregateKey);
        return aggregatedKey;
      } catch (error) {
        this.toast.error("Error aggregating keys: " + error.message);
        return;
      }
    },

    async aggregateSignatures(signatureArray) {
      try {
        var hexAggregateSignature = await helpers.aggSig(signatureArray);
        var aggregatedSignature = await helpers.bufferToHex(
          hexAggregateSignature
        );
        return aggregatedSignature;
      } catch (error) {
        this.toast.error("Error aggregating signatures: " + error.message);
        return;
      }
    },
  },

  async mounted() {
    this.groupInfoStore.message = "";
    await this.socketStore.socketObject.on("roomInfo", (roomData) => {
      this.groupInfoStore.numberOfSigners = roomData.numberOfSigners;
      this.groupInfoStore.threshold = roomData.threshold;
      this.groupInfoStore.memberList = roomData.members;
      this.groupInfoStore.message = roomData.message;
      this.groupInfoStore.signatureArray = roomData.signatureArray;

    });
  },
  components: {
    TitleCard,
    mainButton,
    modalPopup,
    EditableArea,
    progressIndicator,
  },
});
</script>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.flex::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.flex {
  -ms-overflow-style: none;
}
</style>
