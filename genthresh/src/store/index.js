import { defineStore } from 'pinia'

export const useUserInfo = defineStore({
  id: "userInfo",
  state: () => {
    return {username: String, pubKey: String, privKey: String, emoji : String, admin: Boolean};
  },
  getters: {},
  actions: {},
});

export const useGroupInfo = defineStore({
  id: "groupInfo",
  state: () => {
    return { threshold: Number, numberOfSigners: Number, groupID: String, memberList: Array, message : String, signatureArray: Array, signingStarted:false};
  },
  getters: {},
  actions: {},
});


export const useSocket = defineStore({
  id: "socketObject",
  state: () => {
  //return {socketObject: null, baseURL: "http://localhost", httpPort: "8080", ioPort: "8000" };
  return { socketObject: null, baseURL: "https://genthresh.com", httpPort: "", ioPort: ""}
  },
  getters: {},
  actions: {},
});

