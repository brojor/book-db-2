<template>
  <div grow overflow-scroll>
    <div v-for="book in books" :key="book.id" ml4 mb3>
      <h3 text-sm font-bold>{{ book.title }}</h3>
      <p text-xs>{{ book.author_name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";

const collectionStore = useCollectionStore();

const route = useRoute();

const authorId = Number(route.params.id);

const books = computed(() =>
  collectionStore.books.filter((book) => book.author_id === authorId)
);
</script>

<style scoped></style>
