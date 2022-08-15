<template>
  <div bg="$color-background-soft" w-full h-screen p-6 flex="~ col">
    <h1 font="bold" text-2xl text-center>Vítejte v databázi knih</h1>
    <p text-center m="y-3 x-auto" w="5/6">
      Na místě, kde máte o své sbírce knih dokonalý přehled.
    </p>
    <form @submit.prevent="handleSubmit">
      <div flex="~ col" mb3>
        <label for="email-input" font-bold>Email</label>

        <input
          id="email-input"
          type="text"
          v-model="credentials.email"
          p3
          rounded
          my1
          border="1px solid $color-border"
        />
        <small
          text="red center"
          m="t--1"
          v-if="showValidationErrors && !emailIsValid"
        >
          Zadejte prosím platný email
        </small>
      </div>
      <div flex="~ col" mb3>
        <label for="password-input" font-bold>Heslo</label>
        <input
          id="password-input"
          type="password"
          v-model="credentials.password"
          p3
          rounded
          my1
          border="1px solid $color-border"
        />
        <small
          text="red center"
          m="t--1"
          v-if="showValidationErrors && !passwordIsValid"
        >
          Heslo musí mít alespoň 8 znaků
        </small>
      </div>
      <div flex py2 my2>
        <input
          type="checkbox"
          id="remember-me"
          v-model="rememberMe"
          :disabled="credentials.email === ''"
        />
        <label for="remember-me" ml2>Remember me</label>
      </div>
      <button
        type="submit"
        w-full
        rounded
        bg-sky-700
        text="white md"
        font-bold
        border-none
        p4
      >
        Odeslat
      </button>
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
