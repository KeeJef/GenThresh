<template>
    <TitleCard title="Aggregate" />
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <mainButton @click="$router.push('aggregate-sigs')" title="✍ Aggregate Signatures" />
      <mainButton @click="$router.push('aggregate-keys')"  title="🔑 Aggregate Keys" />
    </div>

  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  // Components
  import TitleCard from "@/components/TitleCard.vue";
  import mainButton from "@/components/mainButton.vue";
  
  export default defineComponent({
    name: "AggregateView",
  
    components: {
      TitleCard,
      mainButton,
    },
  });
  </script>