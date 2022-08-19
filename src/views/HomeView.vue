<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";
import ListItem from "../components/ListItem.vue";
import { useSearchStore } from "@/stores/search";

const searchbar = useSearchStore();
const collectionStore = useCollectionStore();

const filtredBooks = computed(() => {
  if (!searchbar.value) {
    return collectionStore.books;
  }
  return collectionStore.books.filter((book) =>
    book.title.toLocaleLowerCase().includes(searchbar.value)
  );
});
</script>

<template>
  <div grow overflow-scroll relative>
    <ListItem
      v-for="book in filtredBooks"
      :key="book.id"
      :title="book.title"
      :subtitle="book.author_name"
      icon="book"
    />
  </div>
</template>
