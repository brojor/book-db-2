<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const handleLogout = () => {
  user.logout();
};
</script>

<template>
  <main>
    <h1>This is home page</h1>
    <button @click="handleLogout">Logout</button>
  </main>
</template>
