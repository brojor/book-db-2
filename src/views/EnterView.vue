<template>
  <div>
    <h1>This is enter page</h1>
    <button @click="handleLogin">login</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

const handleLogin = () => {
  user.login().then(() => {
    router.push("/");
  });
};
</script>
