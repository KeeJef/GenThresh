<template>
  <TitleCard title="Aggregate" />
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton title="⬆️💾 Import Keys" />
    <mainButton title="💫 Aggregate Keys" />
  </div>

  <div class="flex justify-center text-2xl pb-2">Keys</div>

  <div class="flex justify-center mb-4">
      <EditableArea @click="placeholder" v-model="message" :noHTML="false"  class="w-3/5 break-words border-2 rounded-xl border-yellow-800 text-2xl p-8"></EditableArea>
  </div>

</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import EditableArea from "@/components/EditableArea.vue";

export default defineComponent({
  name: "AggregateView",
  data() {
  return {
      show: true,
      message: "Enter Keys separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53"
  };
},

  components: {
    TitleCard,
    mainButton,
    EditableArea
  },
  methods:{

      placeholder(){
          if (this.message == "Enter Keys separated by commas like: 89c969...e9bbbc,b5f8be...0ebb53") {
              this.message = ""
          }
          
      }
      
  },
});
</script>