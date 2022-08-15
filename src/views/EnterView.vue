<template>
  <div>
    <h1>This is enter page</h1>
    <p v-if="showValidationErrors && !emailIsValid">
      Zadejte prosím platný email
    </p>
    <p v-if="showValidationErrors && !passwordIsValid">
      Heslo musí mít alespoň 8 znaků
    </p>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="credentials.email" placeholder="Email" />
      <input
        type="password"
        v-model="credentials.password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      <label for="remember-me">Remember me</label>
      <input
        type="checkbox"
        id="remember-me"
        v-model="rememberMe"
        :disabled="credentials.email === ''"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiService from "@/services/api";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
const rememberMe = ref<boolean>(false);
const showValidationErrors = ref<boolean>(false);

const emailIsValid = computed(() => {
  return credentials.email.length > 0 && emailRegex.test(credentials.email);
});
const passwordIsValid = computed(() => {
  return credentials.password.length > 8;
});

const handleSubmit = async () => {
  if (emailIsValid.value && passwordIsValid.value) {
    login();
  } else {
    showValidationErrors.value = true;
  }
};
const login = async () => {
  try {
    const response = await apiService.post("/register", credentials);
    const token = response.data.token;
    user.setToken(token, { rememberMe: rememberMe.value });
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>
