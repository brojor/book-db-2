<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";


const collectionStore = useCollectionStore();

const sortedBooks = computed(() => {
  const list = [...collectionStore.books];
  return list.sort((a, b) => a.title.localeCompare(b.title));
});
</script>

<template>
  <div grow overflow-scroll relative>
    <div v-for="book in sortedBooks" :key="book.id" ml4 mb3>
      <h3 text-sm font-bold>{{ book.title }}</h3>
      <p text-xs>{{ book.author_name }}</p>
    </div>
  </div>
</template>
