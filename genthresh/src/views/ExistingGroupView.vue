<template>
    <TitleCard title="Existing Group" />

  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  // Components
  import TitleCard from "@/components/TitleCard.vue";

  
  export default defineComponent({
    name: "ExistingGroupView",
  
    components: {
      TitleCard,

    },
  });
  </script>