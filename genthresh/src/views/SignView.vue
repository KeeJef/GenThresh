<template>
    <TitleCard title="Sign"/>
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <label for="files" class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl cursor-pointer hover:bg-purple-600">⬆️💾 Import Key</label>
      <input @change="processKey" id="files" class="hidden" type="file">
      <mainButton v-if="!privKey" @click="$router.push('generate')" title="🔑 Generate Keypair" />
      <mainButton v-if="keysImported || privKey" @click="signMessage" title="✍️ Sign" />
    </div>

    <div class="flex justify-center text-2xl pb-2">Private Key</div>
    <div class="flex justify-center mb-4">
      <EditableArea v-model="privKey" class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"></EditableArea>
    </div>
  
    <div class="flex justify-center text-2xl pb-2">Message</div>
    <div class="flex justify-center mb-4">
      <EditableArea v-model="message" class="h-52 w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"></EditableArea>
    </div>

    <div v-if="this.signed" class="flex justify-center text-2xl pb-2">Signature</div>

    <TextDisplay class="mb-6" v-if="this.signed"
      :displayText=this.signature
    />

    <modal/>

  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  // Components
  import TitleCard from "@/components/TitleCard.vue";
  import mainButton from "@/components/mainButton.vue";
  import TextDisplay from "@/components/TextDisplay.vue";
  import EditableArea from "@/components/EditableArea.vue";
  import helpers from '@/helperFunctions/helperFunctions.js'
  import { useToast } from "vue-toastification";
  
  export default defineComponent({
    name: "SignView",
    setup() {
    const toast = useToast();
    return { toast };
  },
    data() {
    return {
      keysImported:false,
      signed:false,
      message:"",
      signature:"",
      privKey:""
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
          this.keysImported = true
          } catch (error) {
            this.toast.error("Key improperly formatted, please import a JSON encoded keyfile");
          }
          
      }
   },
   async signMessage(){
      if (!this.message) {
        this.toast.error("Enter a message to sign");
        return
      }
      try {
        var bufferSignature = await helpers.signMessage(this.privKey, this.message)
      } catch (error) {
        this.toast.error("Error signing message: " + error.message);
        return
      }
      this.signature = helpers.bufferToHex(bufferSignature)
      this.signed = true
      this.toast.success("Message signed successfully");

      await this.$nextTick()
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
   }

  },
  
    components: {
      TitleCard,
      mainButton,
      TextDisplay,
      EditableArea,
    },
  });
  </script>