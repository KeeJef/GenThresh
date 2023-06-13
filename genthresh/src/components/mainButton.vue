<template>
  <div class="flex justify-center relative">
    <div class="text-xl font-bold bg-[#f7d596] text-black p-1 text-center rounded-md absolute -top-9" v-if="this.tooltipVisibility">{{tooltipContent}}</div>
      <button :class="`transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold shadow-xl hover:bg-purple-600 min-w-[290px] sm:min-w-0 ${this.fontSize}`">{{this.title}}
      </button>
  </div>
</template>
  
<script>
export default {
  name: "mainButton",

  data: () => ({

  }),
  props:{
    title: String,
    tooltipContent: String,
    tooltipVisibility: Boolean,
    fontSize: {
      type: String,
      default: 'text-3xl', // Default font size
    }
  }
};
</script>
  