<template>
  <div class="relative">
    <div style="width: 100%" class="absolute bg-yellow-400 h-9 rounded-lg"></div>

    <div class="relative">
      <div
        :style="{ width: this.maxNumber + '%' }"
        class="absolute bg-purple-400 h-9 rounded-lg"
      >
        <div class="relative shrink-0 flex justify-end bottom-12 left-5">
          <div
            class="flex justify-center items-center relative rounded-md py-1.5 px-3 bg-purple-400 z-10"
          >
            {{ maxNumber }}
            <div
              class="absolute w-3 h-3 bg-purple-400 transform rotate-45 -bottom-1 right-1/2 translate-x-1/2"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div
        :style="{ width: this.threshold + '%' }"
        class="absolute bg-purple-600 h-9 rounded-lg"
      >
        <div class="relative flex justify-end bottom-12 left-5">
          <div class="flex relative rounded-md py-1.5 px-3 bg-purple-600 z-0">
            {{ threshold }}
            <div
              class="absolute w-3 h-3 bg-purple-600 transform rotate-45 -bottom-1 right-1/2 translate-x-1/2"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ThresholdBar",

  data: () => ({}),
  props: {
    maxNumber: Number,
    threshold: Number,
  },
};
</script>
