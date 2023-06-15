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
      <div class="text-lg rounded-lg bg-white px-3 py-2 mb-2 sm:text-3xl">
        {{ this.socketStore.baseURL }}/j?{{ this.groupInfoStore.groupID }}
      </div>
      <div class="flex justify-center mb-2">
        <qrcode-vue
        class="p-2 bg-white rounded-lg"
          :value="this.socketStore.baseURL + '/j?' + this.groupInfoStore.groupID"
          :size="200"
          level="H"
        />
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
    <div
      v-if="
        this.groupInfoStore.numberOfSigners && this.groupInfoStore.threshold
      "
    >
      Signers: {{ this.groupInfoStore.numberOfSigners }} Threshold:
      {{ this.groupInfoStore.threshold }}
    </div>
  </div>
  <div class="w-[90%] mx-auto md:w-[70%] pt-5">
    <div
      class="flex flex-col-reverse justify-center gap-y-4 gap-x-2 md:flex-row"
    >
      <div class="w-full md:w-3/4">
        <div class="flex justify-center text-2xl pb-3">Message</div>

        <EditableArea
          :isEditable="isEditAllowed"
          v-model="this.groupInfoStore.message"
          :placeholderValue="placeholderText"
          @keydown.enter.prevent="sendMessage()"
          class="overflow-auto h-56 w-full break-words border-2 rounded-xl border-yellow-700 text-2xl p-8 mb-5"
        >
        </EditableArea>
        <mainButton
          @click="sendMessage()"
          class="my-5"
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

  <div
    v-if="this.groupInfoStore.signingStarted"
    class="flex justify-center text-3xl pt-5"
  >
    Signing Information
  </div>
  <div
    v-if="this.groupInfoStore.signingStarted"
    class="border-2 rounded-xl border-yellow-700 mt-5 overflow-auto w-[90%] mx-auto md:w-[70%]"
  >
    <div class="flex justify-center mx-3 my-6">
      <div class="w-full">
        <progressIndicator
          :threshold="this.groupInfoStore.threshold"
          :numberOfSigners="this.groupInfoStore.numberOfSigners"
          :actualSigners="this.groupInfoStore.signatureArray.length"
        ></progressIndicator>
      </div>
    </div>

    <div
      v-if="
        this.groupInfoStore.message &&
        !this.userInfoStore.admin &&
        !this.rejected
      "
      class="flex justify-center gap-1 pb-3"
    >
      <button
        @click="sendMessage"
        class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600 min-w-[150px] sm:min-w-0"
      >
        Sign ✔️
      </button>
      <button
        @click="this.rejected = true"
        class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600 min-w-[150px] sm:min-w-0"
      >
        Reject❌
      </button>
    </div>
  </div>

  <div
    v-if="this.groupInfoStore.signingStarted"
    class="w-[90%] mx-auto md:w-[70%] py-5"
  >
    <div class="flex justify-center text-3xl pb-5">Threshold Signature</div>
    <div
      class="overflow-auto min-h-36 w-full break-words border-2 rounded-xl border-yellow-700 text-2xl p-8"
    >
      {{ this.thresholdJSON }}
    </div>
  </div>
  <div
    v-if="this.groupInfoStore.signingStarted"
    class="flex justify-center gap-1 pb-10 px-5"
  >
    <button
      @click="saveSignatureInfo()"
      class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600 min-w-[150px] sm:min-w-0"
    >💾✍️ Save Signature</button>
    <button
      @click="saveGroupInfo()"
      class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600 min-w-[150px] sm:min-w-0"
    >💾👨‍👩‍👧‍👦 Save Group Info</button>
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
import QrcodeVue from "qrcode.vue";

// Components
import TitleCard from "@/components/TitleCard.vue";

export default defineComponent({
  name: "LobbyView",
  components: {
    TitleCard,
    mainButton,
    modalPopup,
    EditableArea,
    progressIndicator,
    QrcodeVue,
  },
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
      rejected: false,
      thresholdJSON: {},
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
    signaturesCount() {
      return this.groupInfoStore.signatureArray.length;
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
      return this.userInfoStore.admin && !this.groupInfoStore.signingStarted
        ? this.isGroupFull
        : false;
    },
  },
  watch: {
    signaturesCount(newVal) {
      if (newVal === this.groupInfoStore.threshold) {
        this.toast.success("Threshold of signatures reached!");
      }
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
      var keyArray = this.groupInfoStore.memberList.map((item) => {
        return {
          publicKey: item.pubKey,
          username: item.username,
          memberIndex: item.memberIndex,
        };
      });

      helpers.saveFile(JSON.stringify({numberOfSigners:this.groupInfoStore.numberOfSigners, groupThreshold: this.groupInfoStore.threshold, keyArray:keyArray}), "GroupInfo", ".json");
      this.toast.success("Saved Keypair");
    },

    saveSignatureInfo() {
      helpers.saveFile(
        JSON.stringify(this.thresholdJSON),
        "SignatureInfo",
        ".json"
      );
      this.toast.success("Saved Keypair");
    },

    async sendMessage() {
      if (this.groupInfoStore.message == "") {
        this.toast.error("Please enter a message");
        return;
      }
      this.rejected = true;
      var signedMessage = await this.signMessage(this.groupInfoStore.message);

      this.socketStore.socketObject.emit("sendMessage", {
        signature: signedMessage,
        adminStatus: this.userInfoStore.admin,
        pubKey: this.userInfoStore.pubKey,
        message: this.groupInfoStore.message,
        groupID: this.groupInfoStore.groupID,
      });
    },

    async aggregateData() {
      var signatureArray = this.groupInfoStore.signatureArray.map((item) => {
        return item.signature;
      });
      var keyArray = this.groupInfoStore.signatureArray.map((item) => {
        return item.publicKey;
      });
      var signerArray = this.groupInfoStore.signatureArray.map((item) => {
        return item.signerIndex;
      });

      var aggregatedKey = await this.aggregateKeys(keyArray);
      var aggregatedSignature = await this.aggregateSignatures(signatureArray);

      this.thresholdJSON = {
        aggregateKey: aggregatedKey,
        aggregateSignature: aggregatedSignature,
        message: this.groupInfoStore.message,
        signersByMemberIndex: signerArray,
      };
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
    if (this.socketStore.socketObject == null) {
      //handle case where user refreshes page or gets to this screen without going through the join process
      this.$router.push("/");
    }

    this.groupInfoStore.message = "";

    //all data comes through room info
    await this.socketStore.socketObject.on("roomInfo", (roomData) => {
      this.groupInfoStore.numberOfSigners = roomData.numberOfSigners;
      this.groupInfoStore.threshold = roomData.threshold;
      this.groupInfoStore.memberList = roomData.members;
      this.groupInfoStore.message = roomData.message;
      this.groupInfoStore.signatureArray = roomData.signatureArray;
      this.groupInfoStore.signingStarted = roomData.signingStarted;

      //if signing has started, try to aggregate data every time a new room update is received
      if (this.groupInfoStore.signingStarted) {
        this.aggregateData();
      }
    });
  },

  beforeUnmount() {
    this.socketStore.socketObject.disconnect();
  }
  
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
