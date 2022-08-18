<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const handleLogout = () => {
  user.logout();
};

const token = localStorage.getItem("token");
if (token) {
  user.setToken(token, { rememberMe: true });
}
</script>

<template>
  <header v-if="user.isAuthenticated" flex>
    <h1>This is header</h1>
    <button @click="handleLogout" ml-auto>Logout</button>
  </header>
  <RouterView />
  <footer
    v-if="user.isAuthenticated"
    text-center
    bg="#2B2C2E"
    flex
    justify-around
  >
    <router-link to="/" text-white>books</router-link>
    <router-link to="/authors" text-white>authors</router-link>
  </footer>
</template>
