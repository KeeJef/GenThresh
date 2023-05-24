<template>
    <contenteditable :placeholder=this.placeholderValue tag="div" :contenteditable="isEditable" v-model="message" :noNL="true" :noHTML="true" @keydown.enter="enterPressed" />
</template>
   
  <script>
  import contenteditable from 'vue-contenteditable'; // Not needed it registered globally
  export default {
    components : {
      contenteditable
    }, // Not needed it registered globally
    props: {
      placeholderValue: String
    },
    data() {
      return {
        isEditable: true,
        message: ""
      }
    },
    methods : {
      enterPressed(){
        //pass event up 
        this.$emit('enterPressed');
      }
    }
  }
  </script>

<style>

[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color: grey;
  pointer-events: none;
  display: block; /* For Firefox */
}

</style>