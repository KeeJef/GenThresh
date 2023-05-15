<template>
  <TitleCard title="Lobby" />
  <div class="pb-5">
    <mainButton @click="modalToggle=!modalToggle" title="💌 Invite users" />
    <modalPopup
      v-if="modalToggle"
      @modalClose="this.modalToggle = false"
    >
  <div class="text-center pb-2 text-xl">Copy this link to invite users</div> 
  <div class="text-2xl rounded-lg bg-white px-3 py-2 mb-3 sm:text-3xl">genthresh.com/j?{{this.groupInfoStore.groupID}}</div>
  <div class="flex justify-center"><button @click="copyLink" class="transition-colors duration-500 ease-in-out bg-green-400 rounded-md px-8 py-2 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-green-600 w-4/5">Copy</button></div>

  <div></div>
  </modalPopup>
  </div>
  <div class="flex justify-center text-3xl pb-4">
    <div>
      Signers: {{ this.groupInfoStore.numberOfSigners }} Threshold:
      {{ this.groupInfoStore.threshold }}
    </div>
  </div>
  <div class="w-[90%] mx-auto xl:w-[70%] pt-10">
    <div
      class="flex flex-col-reverse justify-center gap-y-10 gap-2 xl:flex-row"
    >
      <div class="w-full h-56 border-2 rounded-xl border-yellow-700 xl:w-4/5">
        <div class="flex justify-center relative text-2xl -top-10">Message</div>
      </div>
      <div
        class="w-full h-16 border-2 rounded-xl border-yellow-700 xl:w-1/5 xl:h-56"
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
import modalPopup from "@/components/modalPopup.vue";
import mainButton from "@/components/mainButton.vue";

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
  data() {
    return {
      modalToggle: false,
    };
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(
        "genthresh.com/j?" + this.groupInfoStore.groupID
      );
      this.toast.success("Copied to clipboard");
    },
  },
  components: {
    TitleCard,
    mainButton,
    modalPopup
  },
});
</script>
