<template>
  <header v-if="show" flex relative>
    <input
      type="text"
      placeholder="Hledat knihy"
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
    />
    <SearchIcon absolute top-26px left-7 text-2xl text-zinc-300 rounded-full />
    <DotsVertical absolute top-26px right-7 text-2xl text-zinc-300 />
  </header>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import DotsVertical from "@/components/icons/DotsVertical.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const handleLogout = () => {
  user.logout();
};

defineProps<{ show: boolean }>();
</script>

<style scoped></style>
