<script setup>
import { defineProps } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <header>
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6  lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-center sm:text-left">
          <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome Back, {{ username }}!
          </h1>

          <p class="mt-1.5 text-base lg:text-lg text-gray-500">
            Selamat datang di admin panel POSCARE
          </p>
        </div>

        <div
          class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center hidden lg:block"
        >
          <router-link to="admin/artikel-create">
            <button
              class="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Tulis Artikel
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
