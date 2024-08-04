<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import formatTime from "../utils/FormatTime";

const store = useStore();
const router = useRouter();
const route = useRoute();

const articleData = ref({
  title: "",
  slug: "",
  shortDescription: "",
  image: null,
  createdAt: null,
  content: null,
});

const fetchArticle = async () => {
  try {
    const data = await store.dispatch("fetchArticleBySlug", route.params.slug);
    articleData.value = {
      title: data.title,
      slug: data.slug,
      createdAt: data.createdAt,
      shortDescription: data.shortDescription,
      image: data.images,
      content: data.content,
    };
  } catch (error) {
    console.error("Error fetching article data:", error);
  }
};

const handleUpdate = async () => {
  try {
    await store.dispatch("updateArticle", {
      id: route.params.id,
      articleData: articleData.value,
    });
    alert("Success updated data");
  } catch (error) {
    console.error("Error updating article:", error);
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<template>
  <div class="max-w-2xl px-6 py-16 mx-auto space-y-12">
    <article class="space-y-8 dark:bg-gray-100 dark:text-gray-900">
      <div class="space-y-6">
        <h1 class="text-4xl font-bold md:tracking-tight md:text-5xl">
          {{ articleData.title }}
        </h1>
        <img :src="articleData.image" alt="" class="w-full h-72" />
        <p class="italic mt-4 text-sm text-center">
          {{ articleData.shortDescription }}
        </p>
        <div
          class="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-600"
        >
          <div class="flex items-center md:space-x-2">
            <img
              :src="articleData.image"
              alt=""
              class="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-300"
            />
            <p class="text-sm">
              Admin PosCare • {{ formatTime(articleData.createdAt) }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div>{{ articleData.content.toString()}}</div> -->
      <div>
        <p>{{ articleData.content }}</p>
      </div>
      <!-- <div v-else>
        <p>No content available.</p>
      </div> -->
    </article>
  </div>
</template>
