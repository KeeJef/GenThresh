<template>
  <TitleCard title="Lobby" />
  <div class="pb-5 flex justify-center">
    <mainButton
      id="main button"
      @click="modalToggle = !modalToggle"
      title="💌 Invite users"
    />
    <modalPopup v-if="modalToggle" @modalClose="this.modalToggle = false">
      <div class="text-center pb-2 text-xl">Copy this link to invite users</div>
      <div class="text-2xl rounded-lg bg-white px-3 py-2 mb-3 sm:text-3xl">
        {{ this.socketStore.baseURL }}/j?{{ this.groupInfoStore.groupID }}
      </div>
      <div class="flex justify-center">
        <button
          @click="copyLink"
          class="transition-colors duration-500 ease-in-out bg-green-400 rounded-md px-8 py-2 text-white font-sans font-semibold text-3xl shadow-xl hover:bg-green-600 w-4/5"
        >
          Copy
        </button>
      </div>

      <div></div>
    </modalPopup>
  </div>
  <div class="flex justify-center text-3xl pb-4">
    <div>
      Signers: {{ this.groupInfoStore.numberOfSigners }} Threshold:
      {{ this.groupInfoStore.threshold }}
    </div>
  </div>
  <div class="w-[90%] mx-auto md:w-[70%] pt-5">
    <div
      class="flex flex-col-reverse justify-center gap-y-10 gap-2 md:flex-row"
    >
      <div class="w-full md:w-3/4">
        <div class="flex justify-center relative text-2xl pb-3">Message</div>
        <div
          id="Members Display"
          class="w-full h-56 border-2 rounded-xl border-yellow-700"
        ></div>
      </div>
      <div class="w-full md:w-1/4">
        <div class="flex justify-center relative text-2xl pb-3">Members</div>
        <div
          class="flex place-content-start overflow-y-auto overflow-x-auto flex-nowrap w-full h-fit border-2 p-2 rounded-xl border-yellow-700 md:h-56 md:justify-center md:overflow-x-auto md:flex-wrap"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            class="flex whitespace-nowrap justify-center items-center m-0.5 py-3.5 px-4 h-fit bg-[#16C60C] rounded-lg text-white font-bold text-2xl"
            v-for="member in this.groupInfoStore.memberList"
            :key="member"
          >
            {{ member.emoji + member.username }}
          </div>
        </div>
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
        this.socketStore.baseURL +
          ":" +
          this.socketStore.httpPort +
          "/j?" +
          this.groupInfoStore.groupID
      );
      this.toast.success("Copied to clipboard");
    },
  },

  async mounted() {
    await this.socketStore.socketObject.on("roomInfo", (roomData) => {
      this.groupInfoStore.numberOfSigners = roomData.numberOfSigners;
      this.groupInfoStore.threshold = roomData.threshold;
      this.groupInfoStore.memberList = roomData.members;
    });
  },
  components: {
    TitleCard,
    mainButton,
    modalPopup,
  },
});
</script>
<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .flex::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE and Edge */
    .flex {
        -ms-overflow-style: none;
    }
</style>
