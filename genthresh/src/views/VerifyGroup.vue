<template>
  <TitleCard title="Verify Group" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <label
      for="groupFiles"
      class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl text-center hover:bg-purple-600"
      >⬆️👨‍👩‍👧‍👦 Import Group</label
    >
    <input
      @change="this.processGroup"
      id="groupFiles"
      class="hidden"
      type="file"
    />

    <label
      for="signatureFiles"
      class="select-none transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl text-center hover:bg-purple-600"
      >⬆️✍️ Import Signatures</label
    >
    <input
      @change="this.processSignature"
      id="signatureFiles"
      class="hidden"
      type="file"
    />
  </div>

  <div class="flex justify-center text-4xl pb-2">Group Info</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      placeholderValue="Import or enter group info..."
      v-model="groupInfo"
      :noHTML="false"
      class="overflow-auto w-4/5 h-32 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div class="flex justify-center text-4xl pb-2">Group Signature</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      placeholderValue="Import or enter a group signature..."
      v-model="signatureInfo"
      :noHTML="false"
      class="overflow-auto w-4/5 h-32 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div v-if="signatureChecked">
    <div v-if="isValid" class="flex justify-center text-4xl pb-2 text-center">
      {{ signatureStatus }}
    </div>
    <div v-if="!isValid" class="flex justify-center text-4xl pb-2 text-center">
      Invalid Signature ❌ {{ signatureStatus }}
    </div>
  </div>

  <div class="my-3">
    <mainButton @click="validate" title="👀 Verify" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import EditableArea from "@/components/EditableArea.vue";
import helpers from "@/helperFunctions/helperFunctions.js";
import { useToast } from "vue-toastification";

//import TextDisplay from "@/components/TextDisplay.vue";

export default defineComponent({
  name: "VerifyGroupView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      signatureChecked: false,
      isValid: false,
      message: "",
      signatureInfo: "",
      groupInfo: "",
      signatureStatus: "",
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea,
    //TextDisplay,
  },
  methods: {
    processGroup(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result; // this is the content!

        try {
          this.groupInfo = rawFileData;
        } catch (error) {
          this.toast.error("Group info import failed");
        }
      };
    },
    processSignature(event) {
      var rawFileData = event.target.files[0];

      var reader = new FileReader();
      reader.readAsText(rawFileData, "UTF-8");

      reader.onload = (readerEvent) => {
        var rawFileData = readerEvent.target.result;

        try {
          this.signatureInfo = rawFileData;
        } catch (error) {
          this.toast.error("Signature import failed");
        }
      };
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

    async validate() {
      if (this.signatureInfo && this.groupInfo) {
        var loadedKeyArray = [];

        try {
          var parsedGroupInfo = JSON.parse(this.groupInfo);
          var parsedSignatureInfo = JSON.parse(this.signatureInfo);
        } catch (error) {
          this.toast.error("Error parsing JSON: " + error.message);
          return;
        }

        try {
          if (
          parsedSignatureInfo.signersByMemberIndex.length >=
          parsedGroupInfo.groupThreshold
        ) {
          for (
            let index = 0;
            index < parsedSignatureInfo.signersByMemberIndex.length;
            index++
          ) {
            const element = parsedSignatureInfo.signersByMemberIndex[index];
            loadedKeyArray.push(parsedGroupInfo.keyArray[element].publicKey);
          }
          this.aggregatedKey = await this.aggregateKeys(loadedKeyArray);

          if (this.aggregatedKey == parsedSignatureInfo.aggregateKey) {
            try {
              this.isValid = await helpers.checkSig(
                parsedSignatureInfo.aggregateSignature,
                this.aggregatedKey,
                parsedSignatureInfo.message
              );
              this.signatureStatus =
                "Valid signature " +
                parsedSignatureInfo.signersByMemberIndex.length +
                "/" +
                parsedGroupInfo.groupThreshold +
                " signatures ✔️";
            } catch (error) {
              this.isValid = false;
            }
            this.toast.success("Signature Validated");
            this.signatureChecked = true;
          } else {
            this.toast.error("Aggregated Key Mismatch");
            return;
          }
        } else {
          this.toast.error("Not enough signatures to meet threshold");
          this.isValid = false;
          return;
        }
        } catch (error) {
          this.toast.error("Incorrect JSON data loaded: " + error.message);
          return
        }
      } else {
        this.toast.error("Missing Signature or Group Info");
      }
    },
  },
});
</script>
