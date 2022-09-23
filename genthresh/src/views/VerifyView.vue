<template>
  <TitleCard title="Verify" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <label for="files" class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600">⬆️💾 Import Key</label>
      <input @change="processKey" id="files" class="hidden" type="file">
    <mainButton title=" 👨‍👩‍👧‍👦 Verify Group" />
    <mainButton title="👀 Verify" />
  </div>

  <div class="flex justify-center text-4xl pb-2">Public Key</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      v-model="importedKey"
      :noHTML="false"
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-4xl pb-2">Signature</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      v-model="signature"
      :noHTML="false"
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-4xl pb-2">Message</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      v-model="message"
      :noHTML="false"
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"
    ></EditableArea>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import EditableArea from "@/components/EditableArea.vue";
//import TextDisplay from "@/components/TextDisplay.vue";

export default defineComponent({
  name: "VerifyView",
  data() {
    return {
      keysImported:false,
      signed:false,
      message:"",
      importedKey:"",
      signature:"",
      privKey:""
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
      reader.readAsText(rawFileData, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result; // this is the content!
        this.importedKey = rawFileData

        //split off public key for verification
      };
    },
  }
});
</script>
