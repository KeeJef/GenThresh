<template>
    <div class="flex justify-center">
      <div class="break-words border-2 border-amber-900 text-2xl p-5">
        {{this.displayText}}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TitleCard",
  
    data: () => ({
  
  
    }),
    props:{
      displayText: String
    }
  };
  </script>
  