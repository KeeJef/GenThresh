<template>
  <TitleCard title="Sign" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton @click="generateKey" v-if="!privKey" title="🔑 Generate Keys" />
    <mainButton @click="saveFile" v-if="keysGenerated" title="💾 Save Keys" />
    <label
      v-if="!keysGenerated"
      for="files"
      class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl cursor-pointer hover:bg-purple-600 min-w-[290px] sm:min-w-0"
      >⬆️💾 Import Key</label
    >
    <input @change="processKey" id="files" class="hidden" type="file" />
    <mainButton
      v-if="keysImported || privKey"
      @click="signMessage"
      title="✍️ Sign"
    />
  </div>

  <div class="flex justify-center text-2xl pb-2">Private Key</div>
  <div v-if="keysGenerated || keysImported" class="flex justify-center pb-10">
    <div
      class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 text-left xl:w-3/5"
    >
      <div class="mb-1">
        <span class="font-bold">Public Key: </span>{{ this.keyOutput.publicKey }}
      </div>
      <div><span class="font-bold">Private Key: </span>{{ this.keyOutput.privateKey }}</div>
    </div>
  </div>
  <div v-if="!keysGenerated && !keysImported" class="flex justify-center mb-4">
    <EditableArea
      v-model="privKey"
      placeholderValue="Import or enter private key..."
      class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-2xl pb-2">Message</div>
  <div class="flex justify-center mb-4">
    <EditableArea
      v-model="message"
      placeholderValue="Add a message to sign..."
      class="h-52 w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 overflow-auto xl:w-3/5"
    ></EditableArea>
  </div>

  <div v-if="this.signed" class="flex justify-center text-2xl pb-2">
    Signature
  </div>

  <TextDisplay class="mb-6" v-if="this.signed" :displayText="this.signature" />
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import TextDisplay from "@/components/TextDisplay.vue";
import EditableArea from "@/components/EditableArea.vue";
import helpers from "@/helperFunctions/helperFunctions.js";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "SignView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      keysImported: false,
      signed: false,
      message: "",
      signature: "",
      privKey: "",
      keysGenerated: false,
      keyOutput: {
        publicKey: "",
        privateKey: "",
      },
    };
  },
  methods: {
    processKey(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result; // this is the content!

        try {
          this.privKey = JSON.parse(rawFileData).privateKey;

          this.keyOutput.privateKey = JSON.parse(rawFileData).privateKey
          this.keyOutput.publicKey = JSON.parse(rawFileData).publicKey

          this.keysImported = true;
          this.toast.success("Key Imported Successfully");

        } catch (error) {
          this.toast.error(
            "Key improperly formatted, please import a JSON encoded keyfile"
          );
        }
      };
    },
    async signMessage() {
      if (!this.message) {
        this.toast.error("Enter a message to sign");
        return;
      }
      try {
        var bufferSignature = await helpers.signMessage(
          this.privKey,
          this.message
        );
      } catch (error) {
        this.toast.error("Error signing message: " + error.message);
        return;
      }
      this.signature = helpers.bufferToHex(bufferSignature);
      this.signed = true;
      this.toast.success("Message signed successfully");

      await this.$nextTick();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
    generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privateKey = crypto.getRandomValues(array);
      var publicKeyHex = helpers.bufferToHex(
        helpers.generatePubKey(privateKey)
      );
      var privateKeyHex = helpers.bufferToHex(privateKey);
      this.keyOutput = {
        publicKey: publicKeyHex,
        privateKey: privateKeyHex,
      };
      this.privKey = privateKeyHex;
      this.keysGenerated = true;
    },

    saveFile() {
      helpers.saveFile(JSON.stringify(this.keyOutput), "BLSKey", ".json");
      this.toast.success("Saved Keypair");
    },
  },

  components: {
    TitleCard,
    mainButton,
    TextDisplay,
    EditableArea,
  },
});
</script>
