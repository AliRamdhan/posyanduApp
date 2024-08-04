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
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-center sm:text-left">
          <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome Back, {{ username }}!
          </h1>

          <p class="mt-1.5 text-lg lg:text-xl text-gray-500">Welcome PosCare RW 10</p>
        </div>
      </div>
    </div>
  </header>
</template>
