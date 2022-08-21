<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import AddBook from "@/components/icons/AddBook.vue";
import MainHeader from "./components/MainHeader.vue";
import { computed } from "vue";
import MainFooter from "./components/MainFooter.vue";

const user = useUserStore();
const route = useRoute();

const isFullscreen = computed(
  () => route.name == "addBook" || !user.isAuthenticated
);

const token = localStorage.getItem("token");
if (token) {
  user.setToken(token, { rememberMe: true });
}
</script>

<template>
  <MainHeader :show="!isFullscreen" />
  <RouterView />
  <MainFooter v-if="!isFullscreen" />
  <router-link
    v-if="!isFullscreen"
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
