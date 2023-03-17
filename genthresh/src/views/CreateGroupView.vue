<template>
  <TitleCard title="Create Group" />
  <div class="flex justify-center h-10 m-5">
    <thresholdBar
      :threshold="this.threshold"
      :maxNumber="this.maxNumber"
      class="w-3/5"
    ></thresholdBar>
  </div>
  <div class="flex flex-col justify-center">
    <div class="flex justify-center text-2xl pb-2">Number of Signers</div>
    <input type="range" min="1" max="100" class="slider" v-model="maxNumber" />
  </div>

  <div class="flex flex-col justify-center">
    <div class="flex justify-center text-2xl pb-2">Threshold</div>
    <input type="range" min="1" max="100" class="slider" v-model="threshold" />
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
    threshold: 3,
    maxNumber: 10,
  }),

  components: {
    TitleCard,
    ThresholdBar,
  },
});
</script>
