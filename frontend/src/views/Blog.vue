<script setup>
import BlogCard from "../components/card/BlogCard.vue";
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
      <div class="text-center">
        <h1
          class="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white"
        >
          Pengetahuan Kesehatan Posyandu
        </h1>

        <p class="max-w-lg mx-auto mt-4 text-gray-500">
          Pelajari informasi terbaru dan penting mengenai kesehatan keluarga di
          Posyandu.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  </section>
</template>

<style></style>
