import apiService from "@/services/api";
import { defineStore } from "pinia";

interface Book {
  author_name: string;
  author_id: number;
  id: number;
  title: string;
  created_at: string;
}

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  numOfBooks: number;
}

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    value: "",
  }),
  actions: {
    setValue(value: string) {
      this.value = value.toLocaleLowerCase();
    },
    clean() {
      this.value = "";
    },
  },
});
