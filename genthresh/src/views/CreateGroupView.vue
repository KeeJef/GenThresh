<template>
  <TitleCard title="Create Group" />
  <div style="width:500px" class="">
    <thresholdBar></thresholdBar>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard";
import ThresholdBar from "@/components/thresholdBar";

export default defineComponent({
  name: "CreateGroupView",

  components: {
    TitleCard,
    ThresholdBar,
  },
});
</script>
