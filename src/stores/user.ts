import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login() {
      this.token = "123";
    },
    logout() {
      this.token = "";
      window.location.href = "/enter";
    },
  },
});
