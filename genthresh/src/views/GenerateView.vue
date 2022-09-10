<template>
    <TitleCard title="Generate" />
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <mainButton title="🔑 Generate Keypair" />
      <mainButton title="💾 Save Keypair" />
    </div>

    <div class="flex justify-center text-2xl pb-2">Your Keys<span class="pl-2"><button>📋</button></span></div>

    <TextDisplay
      displayText=""
    />

  </template>
  
  <script>
  import { defineComponent } from "vue";
  const bls = require('@noble/bls12-381');
  
  // Components
  import TitleCard from "@/components/TitleCard.vue";
  import mainButton from "@/components/mainButton.vue";
  import TextDisplay from "@/components/TextDisplay.vue";
  
  export default defineComponent({
    name: "GenerateView",
    data(){
      return{
      msg:"Test"
      }
    },
  
    components: {
      TitleCard,
      mainButton,
      TextDisplay,
    },

    mounted(){
    console.log("test")
    var array = new Uint8Array(64);
    var privKey = crypto.getRandomValues(array) // This needs to be review for security
    var pubKey = bls.getPublicKey(privKey);
    console.log(pubKey)

    }

  });
  </script>
  