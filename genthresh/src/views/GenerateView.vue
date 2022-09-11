<template>
  <TitleCard title="Generate" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton @click="generateKey" title="🔑 Generate Keypair" />
    <mainButton title="💾 Save Keypair" />
  </div>

  <div class="flex justify-center text-2xl pb-2">
    Your Keys<span class="pl-2"><button>📋</button></span>
  </div>

  <TextDisplay :displayText=this.displayText />
</template>

<script>
import { defineComponent } from "vue";
const bls = require("@noble/bls12-381");

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import TextDisplay from "@/components/TextDisplay.vue";
import helpers from '@/helperFunctions/helperFunctions.js'

export default defineComponent({
  name: "GenerateView",
  data() {
    return {
      displayText: "",
    };
  },

  methods: {
    generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privKey = crypto.getRandomValues(array);
      var pubKey = bls.getPublicKey(privKey);
      this.displayText = helpers.bufferToHex(pubKey);
    },
  },

  components: {
    TitleCard,
    mainButton,
    TextDisplay,
  },

  mounted() {},
});
</script>
