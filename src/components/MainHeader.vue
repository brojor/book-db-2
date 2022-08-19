<template>
  <header v-if="show" flex relative>
    <input
      type="text"
      :placeholder="placeholder"
      pt-18px
      pb-18px
      pl13
      w-full
      rounded-full
      mx3
      my3
      bg-zinc-800
      un-placeholder="$color-text"
      text-white
      border-none
      :value="searchbar.value"
      @input="handleInput"
    />
    <SearchIcon absolute top-26px left-7 text-2xl text-zinc-300 rounded-full />
    <DotsVertical
      absolute
      top-26px
      right-7
      text-2xl
      text-zinc-300
      @click="handleLogout"
    />
  </header>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import DotsVertical from "@/components/icons/DotsVertical.vue";
import { useUserStore } from "@/stores/user";
import { useSearchStore } from "@/stores/search";
import { computed } from "vue";
import { useRoute } from "vue-router";

const user = useUserStore();
const searchbar = useSearchStore();
const route = useRoute();

const placeholder = computed(() => {
  if (route.name === "authors") {
    return "Hledat v autorech";
  } else {
    return "Hledat v knihách";
  }
});

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  searchbar.setValue(input.value);
};

const handleLogout = () => {
  user.logout();
};

defineProps<{ show: boolean }>();
</script>

<style scoped></style>
