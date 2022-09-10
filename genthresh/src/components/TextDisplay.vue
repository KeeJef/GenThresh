<template>
  <div class="flex justify-center">
    <div
      class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 text-center"
    >
      {{ this.displayText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleCard",

  data: () => ({}),
  props: {
    displayText: String,
  },
};
</script>
