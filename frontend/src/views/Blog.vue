<script setup>
import BlogCard from "../components/card/BlogCard.vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../utils/FormatTime";

const store = useStore();
const router = useRouter();

const articles = computed(() => store.getters.articles);
const fetchArticles = async () => {
  try {
    await store.dispatch("fetchArticles");
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};
onMounted(() => {
  fetchArticles();
});
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

      <div class="w-full grid grid-cols-1 gap-10 mt-8 md:mt-16 md:grid-cols-2">
        <div v-for="(article, index) in articles" :key="index">
          <BlogCard
            :title="article?.title"
            :slug="article?.slug"
            :image="article?.images"
            :shortDescription="article?.shortDescription"
            :createdAt="article?.createdAt"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
