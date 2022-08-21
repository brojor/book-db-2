<template>
  <div p4 grow bg="$color-background-soft">
    <h1 text-2xl m10 text-center>Přidání nové knihy</h1>
    <form @submit.prevent="onSubmit">
      <div flex="~ col">
        <label mb1 for="book-title">Titul:</label>
        <input
          class="input-base"
          type="text"
          id="book-title"
          p3
          rounded
          v-model="bookToAdd.title"
          placeholder="Název knihy"
        />
      </div>
      <div flex="~ col" mt4>
        <label mb1 for="book-author">Autor:</label>
        <div flex gap-1>
          <input
            class="input-base"
            type="text"
            id="book-author-first-name"
            p3
            rounded
            grow
            v-model="bookToAdd.author.firstName"
            placeholder="Jméno"
          />
          <input
            class="input-base"
            type="text"
            id="book-author-last-name"
            p3
            rounded
            grow
            v-model="bookToAdd.author.lastName"
            placeholder="Příjmení"
          />
        </div>
      </div>
      <div mt8 flex gap2>
        <router-link
          to="/"
          text-center
          no-underline
          p2
          w="1/3"
          text-base
          font-bold
          bg-transparent
          border="1px solid teal700"
          text-teal-700
          rounded
          >Zrušit</router-link
        >
        <button
          type="submit"
          p2
          bg-teal700
          border-none
          rounded
          text-white
          text-base
          font-bold
          grow
        >
          Přidat
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import apiService from "@/services/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCollectionStore } from "@/stores/collection";

const collection = useCollectionStore();

const router = useRouter();

interface Book {
  author: {
    firstName: string;
    lastName: string;
  };
  title: string;
}
const bookToAdd = ref<Book>({
  title: "",
  author: {
    firstName: "",
    lastName: "",
  },
});

const onSubmit = async () => {
  console.log("add book", bookToAdd.value);
  await collection.addBook(bookToAdd.value);
  router.push("/");
};
</script>

<style scoped></style>
