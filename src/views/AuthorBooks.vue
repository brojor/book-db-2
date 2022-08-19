<template>
  <div grow overflow-scroll>
    <ListItem
      v-for="book in books"
      :key="book.id"
      :title="book.title"
      :subtitle="book.author_name"
      icon="book"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";
import ListItem from "../components/ListItem.vue";

const collectionStore = useCollectionStore();

const route = useRoute();

const authorId = Number(route.params.id);

const books = computed(() =>
  collectionStore.books.filter((book) => book.author_id === authorId)
);
</script>

<style scoped></style>
