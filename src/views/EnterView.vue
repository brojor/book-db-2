<template>
  <div>
    <h1>This is enter page</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="credentials.email" placeholder="Email" />
      <input
        type="password"
        v-model="credentials.password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import apiService from "@/services/api";

interface Credentials {
  email: string;
  password: string;
}

const user = useUserStore();
const router = useRouter();

const credentials = reactive<Credentials>({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const response = await apiService.post("/register", credentials);
    const token = response.data.token;
    user.setToken(token);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>
