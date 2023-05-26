<template>
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <mainButton v-if="!privKey" @click="generateKey" title="🔑 Generate Keys" />
      <mainButton v-if="keysGenerated" @click="saveFile" title="💾 Save Keys" />
      <label v-if="!keysGenerated" for="files" class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl cursor-pointer hover:bg-purple-600 min-w-[290px] sm:min-w-0">⬆️💾 Import Key</label>
      <input @change="processKey" id="files" class="hidden" type="file">
    </div>

    <div v-if="this.signed" class="flex justify-center text-2xl pb-2">Signature</div>
    <TextDisplay class="mb-6" :displayText=this.pubKey>
        <template #Preload>
        <p>Public Key:</p>
      </template>
    </TextDisplay>

  </template>
  
  <script>
  import { defineComponent } from "vue";
  import helpers from '@/helperFunctions/helperFunctions.js'

  
  // Components
  import mainButton from "@/components/mainButton";
  import TextDisplay from "./TextDisplay";
  import { useToast } from "vue-toastification";
  
  export default defineComponent({
    name: "keyImportOrGenerate",
    setup() {
    const toast = useToast();
    return { toast };
  },
    data() {
    return {
      keysPresent:false,
      privKey:"",
      pubKey:"",
      keyOutput : {
        publicKey: "",
        privateKey: "",
      },
      keysGenerated : false 
    };
  },
  methods: {
    processKey(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          var rawFileData = readerEvent.target.result; // this is the content!

          try {
          this.privKey = JSON.parse(rawFileData).privateKey
          this.pubKey = JSON.parse(rawFileData).publicKey
          this.keysPresent = true

          
          this.$emit('pubKey', this.pubKey)
          this.$emit('privKey', this.privKey)

          this.keysPresent = true
          this.$emit('keysPresentStatus', this.keysPresent)

          this.toast.success("Key Imported Successfully");
          } catch (error) {
            this.toast.error("Key improperly formatted, please import a JSON encoded keyfile");
          }
          
      }
   },

   generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privateKey = crypto.getRandomValues(array);
      this.pubKey = helpers.bufferToHex(helpers.generatePubKey(privateKey));
      this.privKey = helpers.bufferToHex(privateKey);

      this.keyOutput = {
        publicKey: this.pubKey,
        privateKey: this.privKey
      };

      
      this.$emit('pubKey', this.pubKey)
      this.$emit('privKey', this.privKey)

      this.keysGenerated = true
      this.keysPresent = true
      this.$emit('keysPresentStatus', this.keysPresent)
    },

    saveFile() {
      helpers.saveFile(JSON.stringify(this.keyOutput));
      this.toast.success("Saved Keypair");
    },

  },
  
    components: {
      mainButton,
      TextDisplay
    },
  });
  </script>