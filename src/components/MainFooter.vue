<template>
  <footer
    text-center
    bg="$color-background-mute"
    border-t="2px solid $color-background-soft"
    flex
    justify-around
  >
    <router-link
      to="/"
      class="text-$color-text"
      :class="{ active: route.name === 'home' }"
      bg="$color-background-mute"
      m2
      py1
      px4
      no-underline
      font-medium
      text-sm
      flex
      items-center
    >
      <BookIcon mr2 text-xl />
      <span>Knihy ({{ collection.books.length }})</span></router-link
    >
    <router-link
      to="/authors"
      class="text-$color-text"
      :class="{ active: route.name === 'authors' }"
      bg="$color-background-mute"
      m2
      py1
      px3
      no-underline
      font-medium
      text-sm
      flex
      items-center
    >
      <PersonIcon mr2 text-xl />
      <span>Autoři ({{ collection.authors.length }})</span></router-link
    >
  </footer>
</template>

<script setup lang="ts">
import BookIcon from "@/components/icons/BookIcon.vue";
import PersonIcon from "@/components/icons/PersonIcon.vue";
import { useCollectionStore } from "@/stores/collection";

import { useRoute } from "vue-router";

const route = useRoute();

const collection = useCollectionStore();
</script>

<style scoped>
.active {
  color: var(--color-accent);
}
</style>
