<template>
  <TitleCard title="Aggregate" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <div class="flex justify-center relative">
      <div
        class="text-xl font-bold bg-[#f7d596] text-black p-1 text-center rounded-md absolute -top-9"
        v-if="hover"
      >
        Accepts a .csv of raw keys
      </div>
      <label
        @mouseover="hover = true"
        @mouseleave="hover = false"
        for="files"
        class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600"
        >⬆️💾 Import Keys</label
      >
      <input @change="processKeys" id="files" class="hidden" type="file" />
    </div>
    <mainButton @click="aggregateKeys" title="💫 Aggregate Keys" />
  </div>

  <div class="flex justify-center text-4xl pb-2">Keys</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      @click="placeholder"
      v-model="message"
      :noHTML="false"
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"
    ></EditableArea>
  </div>

  <div class="mb-5" v-if="keyDisplay">
    <div class="flex justify-center text-4xl pb-2">Aggregated Key</div>
    <TextDisplay :displayText="this.aggregatedKey" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import TextDisplay from "@/components/TextDisplay.vue";
import EditableArea from "@/components/EditableArea.vue";
import helpers from "@/helperFunctions/helperFunctions.js";

export default defineComponent({
  name: "AggregateView",
  data() {
    return {
      show: true,
      hover: false,
      aggregatedKey: "",
      keyDisplay: false,
      message:
        "Enter keys separated by commas like: addf63...b5dcac,b91413...664e9a",
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea,
    TextDisplay,
  },
  methods: {
    placeholder() {
      if (
        this.message ==
        "Enter keys separated by commas like: addf63...b5dcac,b91413...664e9a"
      ) {
        this.message = "";
      }
    },

    processKeys(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result; // this is the content!
        this.message = rawFileData;
      };
    },

    async aggregateKeys() {
      if (
        this.message == "" ||
        this.message ==
          "Enter keys separated by commas like: addf63...b5dcac,b91413...664e9a"
      ) {
        window.alert("Invalid key entry");
        return;
      }

      var keyArray = this.message.split(",");
      var hexAggregateKey = await helpers.aggKey(keyArray);
      this.aggregatedKey = await helpers.bufferToHex(hexAggregateKey);
      this.keyDisplay = true;
    },
  },
});
</script>
