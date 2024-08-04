<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";
const nodeEnv = ref(import.meta.env.MODE); // Vite uses import.meta.env
const appTitle = ref(import.meta.env.VITE_APP_TITLE);
</script>

<template>
  <main class="w-full min-h-screen">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
