<template>
  <TitleCard title="Lobby" />
  <div>
    <div>Signers: {{this.groupInfoStore.numberOfSigners}} Threshold: {{this.groupInfoStore.threshold}}</div>
  </div>
  <div>
    <div></div>
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
