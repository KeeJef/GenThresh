<template>
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <label for="files" class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl cursor-pointer hover:bg-purple-600 min-w-[290px] sm:min-w-0">⬆️💾 Import Key</label>
      <input @change="processKey" id="files" class="hidden" type="file">
      <mainButton v-if="!privKey" @click="$router.push('generate')" title="🔑 Generate Keys" />
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
      keysImported:false,
      privKey:"",
      pubKey:""
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
          this.keysImported = true

          this.$emit('keysImportedStatus', this.keysImported)
          this.$emit('pubKey', this.pubKey)
          this.$emit('privKey', this.privKey)

          this.toast.success("Key Imported Successfully");
          } catch (error) {
            this.toast.error("Key improperly formatted, please import a JSON encoded keyfile");
          }
          
      }
   },

  },
  
    components: {
      mainButton,
      TextDisplay
    },
  });
  </script>