<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import formatTime from "../../../utils/FormatTime";
const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
});

const store = useStore();

const article = computed(() => store.getters.article);
console.log("Art", article);
const fetchArticle = async (id) => {
  try {
    await store.dispatch("fetchArticleById", id);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchArticle(props.articleId);
});
</script>
<template>
  <div>
    <div v-if="article" class="h-[60vh] overflow-y-auto modalScroll">
      <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div
            class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-gray-800"
          >
            <dt class="font-medium text-gray-100 text-2xl">
              <p>{{ article.title }}</p>
              <p class="text-sm">
                {{ article?.createdAt ? formatTime(article.createdAt) : null }}
              </p>
            </dt>
          </div>    
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 text-base">
            <dt class="font-medium text-gray-900 text-lg">Deskripsi Singkat</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ article?.shortDescription }}
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 text-base">
            <dt class="font-medium text-gray-900 text-lg">Isi Artikel</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ article?.content }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div v-else>
      <p>Loading....</p>
    </div>
    <!-- Display other child details here -->
  </div>
</template>
