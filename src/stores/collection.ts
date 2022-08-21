import apiService from "@/services/api";
import { defineStore } from "pinia";

interface Book {
  id: number;
  title: string;
  author: {
    id: number;
    fullName: string;
  };
}

interface AuthorWithCount {
  id: number;
  firstName: string;
  lastName: string;
  numOfBooks: number;
}

interface BookToAdd {
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

export const useCollectionStore = defineStore({
  id: "collection",
  state: () => ({
    books: [] as Book[],
    authors: [] as AuthorWithCount[],
  }),
  actions: {
    async getBooks() {
      const response = await apiService.get("/books");
      this.books = response.data as Book[];
    },
    async getAuthors() {
      const response = await apiService.get("/authors");
      this.authors = response.data as AuthorWithCount[];
    },
    async addBook(bookToAdd: BookToAdd) {
      const response = await apiService.post("/books", bookToAdd);
      this.books = response.data.books as Book[];
      this.authors = response.data.authors as AuthorWithCount[];
    },
  },
});
