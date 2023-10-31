import { defineStore } from "pinia";
export const useSignupStep = defineStore("signupStep", {
  state: () => {
    return {
      step: 0,
    };
  },
  actions: {
    next() {
      if (this.step <= 4) {
        this.step++;
      }
    },
    goto(step: number) {
      this.step = step;
    },
  },
});
