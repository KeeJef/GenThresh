<template>
  <div class="flex justify-center">
    <div @click="$router.push('/')" class="flex flex-col justify-center cursor-pointer">
      <div class="flex justify-center text-[8vw] font-bold select-none sm:text-[4vw]">{{this.title}}</div>
      <div class="flex justify-center text-[22vw] sm:text-[8vw]">🧙‍♂️</div>
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
