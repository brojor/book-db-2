import apiService from '@/services/api';
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
    setToken(token: string) {
      this.token = token;
      apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout() {
      this.token = "";
      window.location.href = "/enter";
    },
  },
});
