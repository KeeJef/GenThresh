<template>
  <TitleCard title="Create Group" />
  <div class="flex justify-center h-10 my-5">
    <thresholdBar
      :threshold="this.threshold"
      :maxNumber="this.maxNumber"
      class="w-3/5"
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
        class="slider w-3/5"
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
        class="slider w-3/5"
        style="--thumb-color: #9333ea"
        v-model="threshold"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard";
import ThresholdBar from "@/components/thresholdBar";

export default defineComponent({
  name: "CreateGroupView",
  data: () => ({
    threshold: 10,
    maxNumber: 30,
  }),

  components: {
    TitleCard,
    ThresholdBar,
  },
});
</script>

<style>
.slider {
  -webkit-appearance: none;
  height: 15px;
  
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
