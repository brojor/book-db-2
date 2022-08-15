<template>
  <div bg="$color-background-soft" w-full h-screen p-6 flex="~ col">
    <h1 font="bold" text-2xl text-center>Vítejte v databázi knih</h1>
    <p text-center m="y-3 x-auto" w="5/6">
      Na místě, kde máte dokonalý přehled o své sbírce knih.
    </p>
    <form mt16 @submit.prevent="handleSubmit">
      <h2 text-base font-bold text-center mb4>
        {{
          formType === "signUp"
            ? "Pro registraci zadejte svůj email a zvolte heslo:"
            : "Pro přihlášení zadejte své přihlašovací údaje"
        }}
      </h2>
      <div flex="~ col" mb3 relative>
        <label for="email-input" font-bold>Email</label>
        <input
          id="email-input"
          type="email"
          v-model="credentials.email"
          p3
          rounded
          my1
          border="1px solid $color-border"
        />
        <small
          text="red center"
          m="t--1"
          v-if="showValidationErrors && !emailIsValid && formType === 'signUp'"
        >
          Zadejte prosím platný email
        </small>
      </div>
      <div flex="~ col" mb3>
        <label for="password-input" font-bold>Heslo</label>
        <div flex relative>
          <input
            id="password-input"
            :type="showPassword ? 'text' : 'password'"
            v-model="credentials.password"
            font-mono
            tracking-wider
            p3
            rounded
            my1
            w-full
            border="1px solid $color-border"
          />
          <div absolute right-0 top-1 p3 flex text-gray-700 text-lg>
            <EyeOutline v-if="!showPassword" @click="showPassword = true" />
            <EyeOffOutline v-else @click="showPassword = false" />
          </div>
        </div>
        <small
          text="red center"
          m="t--1"
          v-if="
            showValidationErrors && !passwordIsValid && formType === 'signUp'
          "
        >
          Heslo musí mít alespoň 8 znaků
        </small>
      </div>
      <div flex py2 mb3 items-center>
        <input
          type="checkbox"
          id="remember-me"
          v-model="rememberMe"
          :disabled="credentials.email === ''"
          accent-teal-600
          h15px
          w15px
        />
        <label for="remember-me" ml2>Pamatuj si mě</label>
      </div>
      <button
        type="submit"
        w-full
        rounded
        bg-teal-700
        text="white md"
        font-bold
        border-none
        p4
      >
        {{ formType === "signUp" ? "Vytvořit účet" : "Přihlásit se" }}
      </button>
    </form>
    <p mt8>
      {{ formType === "signUp" ? "Máte již účet?" : "Nemáte účet? " }}
      <a text-teal-500 tabIndex="0" @click="changeFormType">{{
        formType === "signUp" ? "Přihlašte se" : "Zaregistrujte se"
      }}</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiService from "@/services/api";
import EyeOutline from "@/components/icons/EyeOutline.vue";
import EyeOffOutline from "@/components/icons/EyeOffOutline.vue";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

interface Credentials {
  email: string;
  password: string;
}
type FormType = "signUp" | "login";

const user = useUserStore();
const router = useRouter();

const credentials = reactive<Credentials>({
  email: "",
  password: "",
});
const rememberMe = ref<boolean>(false);
const showValidationErrors = ref<boolean>(false);
const formType = ref<FormType>("signUp");
const showPassword = ref<boolean>(false);

const emailIsValid = computed(() => {
  return credentials.email.length > 0 && emailRegex.test(credentials.email);
});
const passwordIsValid = computed(() => {
  return credentials.password.length > 8;
});

const changeFormType = () => {
  formType.value = formType.value === "signUp" ? "login" : "signUp";
};

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
