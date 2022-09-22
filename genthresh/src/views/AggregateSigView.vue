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
    <EditableArea
      @click="placeholder"
      v-model="message"
      :noHTML="false"
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"
    ></EditableArea>
  </div>

  <div v-if="signatureDisplay">
  <div class="flex justify-center text-4xl pb-2">Signature</div>

  <TextDisplay
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

export default defineComponent({
  name: "AggregateSigView",
  data() {
    return {
      show: true,
      hover: false,
      aggregatedSignature: "",
      signatureDisplay: false,
      message:
        "Enter signatures separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53",
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea,
    TextDisplay
  },
  methods: {
    placeholder() {
      if (
        this.message ==
        "Enter signatures separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53"
      ) {
        this.message = "";
      }
    },

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
        window.alert("Invalid signature entry")
        return
      }

        var signatureArray = this.message.split(',')
        var hexAggregateSignature = await helpers.aggSig(signatureArray)
        this.aggregatedSignature = await helpers.bufferToHex(hexAggregateSignature)
        this.signatureDisplay = true
    }      
          
  },
});
</script>
