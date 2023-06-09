<template>

<div class="flex justify-center h-10 my-5">
    <thresholdBar
      :threshold="Number(this.threshold)"
      :maxNumber="Number(this.maxNumber)"
      class="w-4/5 xl:w-3/5"
    ></thresholdBar>
  </div>
  <div class="flex flex-col justify-center pb-6">
    <div class="flex justify-center text-2xl pb-3 select-none">
      Number of Signers : {{ maxNumber }}
    </div>
    <div class="flex justify-center">
      <input
        type="range"
        min="1"
        max="100"
        class="slider w-4/5 xl:w-3/5"
        style="--thumb-color: #c084fc"
        v-model="maxNumber"
      />
    </div>
  </div>

  <div class="flex flex-col justify-center">
    <div class="flex justify-center text-2xl pb-3 select-none">
      Threshold : {{ threshold }}
    </div>
    <div class="flex justify-center">
      <input
        type="range"
        min="1"
        max="100"
        class="slider w-4/5 xl:w-3/5"
        style="--thumb-color: #9333ea"
        v-model="threshold"
      />
    </div>
  </div>
    
</template>
  
  <script>
  import ThresholdBar from "@/components/thresholdBar";
  export default {
    name: "ThresholdSelector",
    data: () => ({
        threshold: 10,   
        maxNumber:30
    }),
    props: {
    },
    components: {
      ThresholdBar,
    },
    watch: {
      threshold: function (val) {
        this.threshold = Math.min(val, this.maxNumber);
        this.$emit("thresholdChange", this.threshold);
      },
      maxNumber: function (val) {
        this.maxNumber = Math.max(val, this.threshold);
        this.$emit("maxNumberChange", this.maxNumber);
      },
    },
  
  }
  </script>

<style>

.slider {
  -webkit-appearance: none;
  height: 15px;
  border-radius: 0.3rem;
  background: #e4e3e3;
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--thumb-color, #9333ea);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--thumb-color, #9333ea);
  cursor: pointer;
}

</style>
  