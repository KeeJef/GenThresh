<template>
  <div class="flex justify-center">
    <div @click="$router.push('/')" class="flex flex-col justify-center cursor-pointer">
      <div class="flex justify-center text-[10vw] font-bold select-none sm:text-[5vw]">{{this.title}}</div>
      <div class="flex justify-center text-[25vw] sm:text-[10vw]">🧙‍♂️</div>
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
