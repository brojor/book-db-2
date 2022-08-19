<template>
  <div grow overflow-scroll>
    <ListItem
      v-for="author in filtredBooks"
      :key="author.id"
      @click="$router.push(`/author/${author.id}`)"
      :title="`${author.firstName} ${author.lastName}`"
      :subtitle="`Počet knih: ${author.numOfBooks}`"
      icon="author"
    />
  </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";
import { computed } from "vue";
import ListItem from "../components/ListItem.vue";
import { useSearchStore } from "@/stores/search";

const searchbar = useSearchStore();

const collectionStore = useCollectionStore();

const filtredBooks = computed(() => {
  if (!searchbar.value) {
    return collectionStore.authors;
  }
  return collectionStore.authors.filter(
    (author) =>
      author.firstName.toLocaleLowerCase().includes(searchbar.value) ||
      author.lastName.toLocaleLowerCase().includes(searchbar.value)
  );
});
</script>

<style scoped></style>
