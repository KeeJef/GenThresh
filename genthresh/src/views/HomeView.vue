<template>
  <TitleCard title="GenThresh" />
  <div class="flex flex-row justify-center gap-1 pb-5">
    <mainButton title="🔑 Generate" />
    <mainButton title="✍️ Sign" />
    <mainButton title="👨‍👩‍👧‍👦 Group Sign" />
    <mainButton title="💫 Aggregate" />
    <mainButton title="👀 Verify" />
  </div>
  <TextDisplay displayText="GenThresh uses BLS12-381 to allow you to generate, sign, aggregate and verify BLS signatures. You may also create rooms using group sign, where you can automatically share and aggregate signatures."/>
  <div>
    
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

  components: {
    TitleCard,
    mainButton,
    TextDisplay
  },
});
</script>
