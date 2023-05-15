<template>
    <div v-if="this.showModal" class="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.5)]">
        <div @click="closeModal()" class="w-full h-full flex justify-center items-center">
          <div v-on:click.stop class="px-8 py-6 rounded-lg bg-[#f9daa1] border-2 border-[#8d6d32] max-w-xs sm:max-w-xl">
          <slot></slot>
          </div>
        </div>
    </div>
</template>
    
    <script>
    export default {
      name: "modalPopup",
      data () {
        return {
          showModal: true,
        }
      },
      methods : {
        closeModal(){
          this.$emit('modalClose');
        }
      }
    };
    </script>
    