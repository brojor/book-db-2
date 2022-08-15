<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const token = localStorage.getItem("token");
if (token) {
  user.setToken(token, { rememberMe: true });
}
</script>

<template>
  <RouterView />
</template>
