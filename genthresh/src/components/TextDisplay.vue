<template>
  <div class="flex justify-center">
    <div
      class="w-4/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8 xl:w-3/5"
    >
    <slot name="Preload"></slot>{{ this.displayText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TextDisplay",

  data: () => ({}),
  props: {
    displayText: String,
  },
};
</script>
