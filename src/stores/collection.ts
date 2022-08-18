import apiService from "@/services/api";
import { defineStore } from "pinia";

interface Book {
  author: string;
  id: number;
  title: string;
  created_at: string;
}

export const useCollectionStore = defineStore({
  id: "books",
  state: () => ({
    books: [] as Book[],
  }),
  actions: {
    async getBooks() {
      const response = await apiService.get("/books");
      this.books = response.data as Book[];
    },
  },
});
