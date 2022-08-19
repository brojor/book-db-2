<template>
  <div grow overflow-scroll>
    <ListItem
      v-for="author in collectionStore.authors"
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
import ListItem from "../components/ListItem.vue";

const collectionStore = useCollectionStore();
</script>

<style scoped></style>
