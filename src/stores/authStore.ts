import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { getAccountData } from "../firebaseHelpers/accountHandler";
export const useAuthStore = defineStore("signupStep", {
  state: () => {
    return {
      userData: useStorage("userData", {}),
    };
  },
  getters: {
    getData(): object {
      return this.userData;
    },
  },
  actions: {
    clear() {
      this.userData = {};
    },
    async update(uid: string) {
      const data = await getAccountData(uid);
      this.userData = { ...data, uid };
    },
  },
});
