import apiService from "@/services/api";
import { defineStore } from "pinia";

interface Book {
  author: string;
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

export const useCollectionStore = defineStore({
  id: "books",
  state: () => ({
    books: [] as Book[],
    authors: [] as Author[],
  }),
  actions: {
    async getBooks() {
      const response = await apiService.get("/books");
      this.books = response.data as Book[];
    },
    async getAuthors() {
      const response = await apiService.get("/authors");
      this.authors = response.data as Author[];
    },
  },
});
