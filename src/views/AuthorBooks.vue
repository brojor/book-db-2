<template>
  <div grow overflow-scroll>
    <ListItem
      v-for="book in filtredBooks"
      :key="book.id"
      :title="book.title"
      :subtitle="book.author.fullName"
      icon="book"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";
import ListItem from "../components/ListItem.vue";
import { useSearchStore } from "@/stores/search";

const searchbar = useSearchStore();

const collectionStore = useCollectionStore();

const route = useRoute();

const authorId = Number(route.params.id);

const books = computed(() =>
  collectionStore.books.filter((book) => book.author.id === authorId)
);

const filtredBooks = computed(() => {
  if (!searchbar.value) {
    return books.value;
  }
  return books.value.filter((book) =>
    book.title.toLocaleLowerCase().includes(searchbar.value)
  );
});
</script>

<style scoped></style>
