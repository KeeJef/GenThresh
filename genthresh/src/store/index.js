import { defineStore } from 'pinia'

export const useUserInfo = defineStore({
  id: "userInfo",
  state: () => {
    return {username: String, pubKey: String, privKey: String, emoji : String};
  },
  getters: {},
  actions: {},
});

export const useGroupInfo = defineStore({
  id: "groupInfo",
  state: () => {
    return { threshold: Number, numberOfSigners: Number, groupID: String, memberList: Array};
  },
  getters: {},
  actions: {},
});


export const useSocket = defineStore({
  id: "socketObject",
  state: () => {
    return {socketObject: null};
  },
  getters: {},
  actions: {},
});

