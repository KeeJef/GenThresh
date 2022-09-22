<template>
    <div class="flex justify-center relative">
      <div class="text-xl font-bold bg-[#f7d596] text-black p-1 text-center rounded-md absolute -top-9" v-if="this.tooltipVisibility">{{tooltipContent}}</div>
        <button class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600">{{this.title}}
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
      tooltipVisibility: Boolean
    }
  };
  </script>
  