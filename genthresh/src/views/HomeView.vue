<template>
  <TitleCard title="GenThresh" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton  title="🔑 Generate" @click="$router.push('generate')"/>
    <mainButton title="✍️ Sign" @click="$router.push('sign')"/>
    <mainButton title="👨‍👩‍👧‍👦 Group Sign" @click="$router.push('group-sign')"/>
    <mainButton title="💫 Aggregate" @click="$router.push('aggregate')"/>
    <mainButton title="👀 Verify" @click="$router.push('verify')"/>
  </div>

  <TextDisplay
    displayText="GenThresh uses BLS12-381 to allow you to generate, sign, aggregate and verify BLS signatures. You may also create rooms using group sign, where you can automatically share and aggregate signatures."
  />

  <div class="absolute inset-x-0 bottom-2">
    <div class="flex justify-center">
      <a
        class="text-xl text-gray-500"
        href="https://github.com/KeeJef/GenThresh"
        >Github</a
      >
    </div>
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
