<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";
import ListItem from "../components/ListItem.vue";

const collectionStore = useCollectionStore();

const sortedBooks = computed(() => {
  const list = [...collectionStore.books];
  return list.sort((a, b) => a.title.localeCompare(b.title));
});
</script>

<template>
  <div grow overflow-scroll relative>
    <ListItem
      v-for="book in sortedBooks"
      :key="book.id"
      :title="book.title"
      :subtitle="book.author_name"
      icon="book"
    />
  </div>
</template>
