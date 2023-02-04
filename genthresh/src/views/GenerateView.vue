<template>
  <TitleCard title="Generate" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton @click="generateKey" title="🔑 Generate Keypair" />
    <mainButton @click="saveFile" title="💾 Save Keypair" />
  </div>

  <div class="flex justify-center text-3xl pb-2">
    Your Keys
    <span class="pl-2">
      <button class="text-3xl hover:opacity-70 active:translate-y-1" @click="this.copyKeys">📋
      </button>
    </span>
  </div>

  <div class="flex justify-center">
    <div
      class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 text-left"
    >
    <div class="mb-1"> <span class="font-bold">Public Key: </span>{{publicKeyHex}}</div>
    <div> <span class="font-bold">Private Key: </span>{{privateKeyHex}}</div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import helpers from '@/helperFunctions/helperFunctions.js'

export default defineComponent({
  name: "GenerateView",
  data() {
    return {
      publicKeyHex: "",
      privateKeyHex:"",
      keyOutput:"",
      toggleCopy: false,
    };
  },

  methods: {
    generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privKey = crypto.getRandomValues(array);
      this.publicKeyHex = helpers.bufferToHex(helpers.generatePubKey(privKey))
      this.privateKeyHex = helpers.bufferToHex(privKey)
      this.keyOutput = {
        "publicKey": this.publicKeyHex,
        "privateKey": this.privateKeyHex
      }

    },
    copyKeys(){
      navigator.clipboard.writeText(this.keyOutput)
    },
    saveFile(){
      helpers.saveFile(JSON.stringify(this.keyOutput))
    }
  },

  components: {
    TitleCard,
    mainButton,
  },

  mounted() {
    this.generateKey()
  },
});
</script>
