<template>
  <TitleCard title="Lobby" />
  <div class="flex justify-center text-3xl pb-4">
    <div>
      Signers: {{ this.groupInfoStore.numberOfSigners }} Threshold:
      {{ this.groupInfoStore.threshold }}
    </div>
  </div>
  <div class="flex flex-row justify-center text-4xl pb-10 text-slate-500">
    <div>genthresh.com/join?{{ this.groupInfoStore.groupID }}</div>
    <div @click="copyLink">📋</div>
  </div>
  <div class="w-[90%] mx-auto xl:w-[70%] pt-10">
    <div class="flex flex-col justify-center gap-y-10 gap-2 xl:flex-row">
      <div class="w-full h-56 border-2 rounded-xl border-yellow-700 xl:w-4/5">
        <div class="flex justify-center relative text-2xl -top-10">Message</div>
      </div>
      <div
        class="w-full h-12 border-2 rounded-xl border-yellow-700 xl:w-1/5 xl:h-56"
      >
        <div class="flex justify-center relative text-2xl -top-10">Members</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useSocket, useUserInfo, useGroupInfo } from "@/store/index";
import { useToast } from "vue-toastification";

// Components
import TitleCard from "@/components/TitleCard.vue";

export default defineComponent({
  name: "LobbyView",
  setup() {
    const socketStore = useSocket();
    const userInfoStore = useUserInfo();
    const groupInfoStore = useGroupInfo();
    const toast = useToast();
    return { toast, socketStore, userInfoStore, groupInfoStore };
  },
  components: {
    TitleCard,
  },
});
</script>
