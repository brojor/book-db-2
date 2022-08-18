<template>
  <div grow border="1px solid pink">
    <div v-for="author in collectionStore.authors" :key="author.id" ml4 mb3>
      <h2 text-sm font-bold>{{ author.firstName }} {{ author.lastName }}</h2>
      <p text-xs>Počet knih: {{ author.numOfBooks }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from "@/stores/collection";

const collectionStore = useCollectionStore();
</script>

<style scoped></style>
