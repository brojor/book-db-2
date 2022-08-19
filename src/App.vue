<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import AddBook from "@/components/icons/AddBook.vue";
import MainHeader from "./components/MainHeader.vue";

const user = useUserStore();

const token = localStorage.getItem("token");
if (token) {
  user.setToken(token, { rememberMe: true });
}
</script>

<template>
  <MainHeader :show="user.isAuthenticated" />
  <RouterView />
  <footer
    v-if="user.isAuthenticated"
    text-center
    bg="#2B2C2E"
    flex
    justify-around
  >
    <router-link to="/" text-white p2 no-underline>Knihy</router-link>
    <router-link to="/authors" text-white p2 no-underline>Autoři</router-link>
  </footer>
  <router-link
    v-if="user.isAuthenticated"
    to="/add-book"
    absolute
    bottom-16
    right-6
    bg-teal-700
    text-white
    rounded-full
    h-14
    w-14
    flex
    items-center
    justify-center
  >
    <AddBook text-3xl />
  </router-link>
</template>
