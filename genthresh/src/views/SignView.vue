<template>
    <TitleCard title="Sign"/>
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <mainButton title="⬆️💾 Import Keys" />
    </div>
  
    <div class="flex justify-center text-2xl pb-2">Message</div>

    <TextDisplay
      displayText=""
    />

  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  // Components
  import TitleCard from "@/components/TitleCard.vue";
  import mainButton from "@/components/mainButton.vue";
  import TextDisplay from "@/components/TextDisplay.vue";
  
  export default defineComponent({
    name: "SignView",
  
    components: {
      TitleCard,
      mainButton,
      TextDisplay,
    },
  });
  </script>