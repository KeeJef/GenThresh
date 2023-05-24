<template>
  <TitleCard title="Aggregate" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <div class="flex justify-center relative">
      <div class="text-xl font-bold bg-[#f7d596] text-black p-1 text-center rounded-md absolute -top-9" v-if="hover">Accepts a .csv of raw signatures</div>
      <label
        @mouseover="hover = true"
        @mouseleave="hover = false"
        for="files"
        class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600"
        >⬆️💾 Import Signatures</label
      >
      <input
        @change="processSignatures"
        id="files"
        class="hidden"
        type="file"
      />
    </div>
    <mainButton @click="aggregateSignatures" title="💫 Aggregate Signatures" />
  </div>

  <div class="flex justify-center text-4xl pb-2">Signatures</div>

  <div class="flex justify-center mb-4">
      <EditableArea placeholderValue="Enter signatures separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53" v-model="message" class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"></EditableArea>
    </div>

  <div v-if="signatureDisplay">
  <div class="flex justify-center text-4xl pb-2">Signature</div>

  <TextDisplay class="mb-6"
      :displayText=this.aggregatedSignature
    />

</div>

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
  name: "AggregateSigView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      show: true,
      hover: false,
      aggregatedSignature: "",
      signatureDisplay: false,
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea,
    TextDisplay
  },
  methods: {

    processSignatures(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result; // this is the content!
        this.message = rawFileData
      };
    },

    async aggregateSignatures(){

      if (this.message == "" || this.message == "Enter signatures separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53") {
        this.toast.error("Invalid Signatures: Please enter signatures to aggregate");
        return
      }
      var signatureArray = this.message.split(',')
      try {

        var hexAggregateSignature = await helpers.aggSig(signatureArray)
        this.aggregatedSignature = await helpers.bufferToHex(hexAggregateSignature)
        
      } catch (error) {
        
        this.toast.error("Error aggregating signatures: " + error.message);
        return
      }

        this.toast.success("Signatures aggregated successfully");
        this.signatureDisplay = true

        //await for the DOM to update
        await this.$nextTick()
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

    }      
          
  },
});
</script>
