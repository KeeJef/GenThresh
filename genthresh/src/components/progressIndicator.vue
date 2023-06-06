<template>
    <div class="flex relative h-10">
        <div id="Maximum" class="w-[100%]  bg-yellow-400 absolute h-full"></div>
        <div id="Threshold" :style="{width: thresholdWidth}" class="bg-purple-400 absolute h-full"></div>
        <div id="Already Signed" :style="{width: actualSignersWidth}" class="bg-purple-600 absolute h-full"></div>
    </div>
</template>

<script>
export default {
  name: "progressIndicator",

  data: () => ({}),
  props: {
    threshold: Number,
    numberOfSigners: Number,
    actualSigners: Number,
  },
  computed: {
    thresholdWidth() {
      const width = (this.threshold / this.numberOfSigners) * 100;
      return width + '%';
    },
    actualSignersWidth() {
      const width = (this.actualSigners / this.numberOfSigners) * 100;
      return width + '%';
    },
  },
};
</script>
