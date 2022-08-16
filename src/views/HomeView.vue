<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { computed, ref } from "vue";
import AddBook from "../components/icons/AddBook.vue";

interface Book {
  author: string;
  id: number;
  readed: boolean;
  title: string;
}

const books = ref<Book[]>([]);
// sort books by title without side effects
const sortedBooks = computed(() => {
  const list = [...books.value];
  return list.sort((a, b) => a.title.localeCompare(b.title));
});

axios.get("http://brojor.pythonanywhere.com/books").then((response) => {
  books.value = response.data;
});

const user = useUserStore();

const handleLogout = () => {
  user.logout();
};
</script>

<template>
  <header flex>
    <h1>This is home page</h1>
    <button @click="handleLogout" ml-auto>Logout</button>
  </header>
  <div border="1px solid yellow" grow overflow-scroll relative>
    <div v-for="book in sortedBooks" :key="book.id" ml4 mb3>
      <h3 text-sm font-bold>{{ book.title }}</h3>
      <p text-xs>{{ book.author }}</p>
    </div>
  </div>
  <div
    absolute
    bottom-12
    right-6
    bg-teal-700
    text-white
    rounded-full
    h-14
    w-14
    flex
    items-center
    justify-center
  >
    <AddBook text-3xl />
  </div>
  <footer text-center bg="#2B2C2E">this is footer</footer>
</template>
