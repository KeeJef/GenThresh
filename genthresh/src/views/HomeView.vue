<template>


  <TitleCard title="GenThresh" />
  <div class="flex flex-wrap justify-center gap-1 pb-5 mx-auto xl:w-3/5">
    <mainButton title="🔑 Generate" @click="$router.push('generate')"/>
    <mainButton title="✍️ Sign" @click="$router.push('sign')"/>
    <mainButton title="👨‍👩‍👧‍👦 Group Sign" @click="$router.push('create-group')"/>
    <mainButton title="👀 Verify" @click="$router.push('verify')"/>
    <mainButton title="👨‍👩‍👧‍👦 Verify Group" @click="$router.push('verify-group')"/>
    <mainButton title="🌌 Aggregate Sigs" @click="$router.push('aggregate-sigs')"  />
    <mainButton title="🔐 Aggregate Keys" @click="$router.push('aggregate-keys')"/>
  </div>

  <TextDisplay class="text-center pb-5"
    displayText="GenThresh uses BLS12-381 to allow you to generate, sign, aggregate and verify BLS signatures. You may also create rooms using group sign, where you can automatically share and aggregate signatures."
  />

  <div class="flex justify-center pb-5">
    <div class="flex justify-center">
      <a
        class="text-xl text-gray-500"
        href="https://github.com/KeeJef/GenThresh"
        >Github</a
      >
    </div>
    <connectionManager />
  </div>

</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import TextDisplay from "@/components/TextDisplay.vue";

export default defineComponent({
  name: "HomeView",
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
});
</script>
