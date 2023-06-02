<template>
  <TitleCard title="Verify" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <label for="files" class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600 min-w-[290px] sm:min-w-0">⬆️💾 Import Key</label>
      <input @change="processKey" id="files" class="hidden" type="file">
    <mainButton @click="validate" title="👀 Verify" />
    <mainButton @click="$router.push('verify-group')" title=" 👨‍👩‍👧‍👦 Verify Group" />
  </div>

  <div class="flex justify-center text-4xl pb-2">Public Key</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      placeholderValue="Import or enter public key..."
      v-model="pubKey"
      :noHTML="false"
      class="overflow-auto w-4/5 h-32 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-4xl pb-2">Signature</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      placeholderValue="Enter signature..."
      v-model="signature"
      :noHTML="false"
      class="overflow-auto w-4/5 h-32 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-4xl pb-2">Message</div>

  <div class="flex justify-center mb-4">
    <EditableArea
    placeholderValue="Enter message..."
      v-model="message"
      :noHTML="false"
      class="overflow-auto w-4/5 h-32 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>
 <div v-if="signatureChecked">
  <div v-if="isValid" class="flex justify-center text-4xl pb-2">Valid Signature✔️</div>
  <div v-if="!isValid" class="flex justify-center text-4xl my-4">Invalid Signature/Data ❌</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import EditableArea from "@/components/EditableArea.vue";
import helpers from '@/helperFunctions/helperFunctions.js'
import { useToast } from "vue-toastification";
//import TextDisplay from "@/components/TextDisplay.vue";

export default defineComponent({
  name: "VerifyView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      signatureChecked:false,
      isValid: false,
      message:"",
      signature:"",
      pubKey:""
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea
    //TextDisplay,
  },
  methods:{
    processKey(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          var rawFileData = readerEvent.target.result; // this is the content!

          try {
          this.pubKey = JSON.parse(rawFileData).publicKey
          } catch (error) {
            this.toast.error("Key improperly formatted, please import a JSON encoded keyfile");
          }
          
      }
   },
    async validate(){
      if (this.message && this.signature && this.pubKey) {
        try {
          this.isValid = await helpers.checkSig(this.signature,this.pubKey,this.message)
        } catch (error) {
          this.isValid = false
        }
        this.signatureChecked = true
      }
      else{
        this.toast.error("Missing signature, public key or message");
      }
    }
  }
});
</script>
