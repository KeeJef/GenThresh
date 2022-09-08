<template>
    <div class="flex justify-center">
        <button class="transition-colors duration-500 ease-in-out bg-purple-400 rounded-md p-3 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-purple-600">{{this.title}}</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "mainButton",
  
    data: () => ({
  
  
    }),
    props:{
      title: String
    }
  };
  </script>
  