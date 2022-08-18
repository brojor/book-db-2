<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import AddBook from "../components/icons/AddBook.vue";

const collectionStore = useCollectionStore();

const sortedBooks = computed(() => {
  const list = [...collectionStore.books];
  return list.sort((a, b) => a.title.localeCompare(b.title));
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
      <p text-xs>{{ book.author }} ({{ book.created_at }})</p>
    </div>
  </div>
  <router-link
    to="/add-book"
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
  </router-link>
  <footer text-center bg="#2B2C2E">this is footer</footer>
</template>
