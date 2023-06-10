<template>
    <div class="flex relative h-10">
        <div id="Maximum" class="w-[100%]  bg-yellow-400 absolute h-full rounded-lg"></div>
        <div id="Threshold" :style="{width: thresholdWidth}" class="bg-purple-400 absolute h-full rounded-lg"></div>
        <div id="Already Signed" :style="{width: actualSignersWidth}" class="bg-purple-600 absolute h-full rounded-lg"></div>
    </div>
    <div class="flex pt-2 text-sm font-medium md:text-xl">
        <div class="w-1/3 flex justify-center items-center">Signed <span class="mx-1 w-8 h-8 bg-purple-600 rounded-md"></span></div>
        <div class="w-1/3 flex justify-center items-center">Threshold <span class="mx-1 w-8 h-8 bg-purple-400 rounded-md"></span></div>
        <div class="w-1/3 flex justify-center items-center">Maximum <span class="mx-1 w-8 h-8 bg-yellow-400 rounded-md"></span></div>
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
