<template>
    <div class="relative">
        <div style="width:100%" class="absolute bg-yellow-400 h-9"></div>
        <div :style="{width:this.maxNumber+'%'}" class="absolute bg-purple-400 h-9"></div>
        <div :style="{width:this.threshold+'%'}" class="absolute bg-purple-600 h-9"></div>
    </div>
</template>
  
  <script>
  export default {
    name: "ThresholdBar",
   
    data: () => ({
    }),
    props: {
      maxNumber: String,
      threshold: String,
    },
  };
  </script>
  