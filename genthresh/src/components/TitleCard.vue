<template>
  <div class="flex justify-center select-none">
    <div class="flex flex-col justify-center">
      <div class="flex text-8xl font-bold">{{this.title}}</div>
      <div class="flex justify-center text-[10vw]">🧙‍♂️</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleCard",

  data: () => ({


  }),
  props:{
    title: String
  }
};
</script>
