<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import ListFilter from "./list/ListFilter.vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalDetailsArticle from "./ModalDetailsArticle.vue";

const store = useStore();
const router = useRouter();

const pagination = computed(() => store.getters.paginationArticle);
const articles = computed(() => store.getters.articles);

const searchTitle = ref("");
const searchSlug = ref("");
const sortField = ref("");
const sortOrder = ref("asc");
const currentPage = ref(1);
const limit = ref(10);

const selectLimit = [
  { value: "5", name: "5" },
  { value: "10", name: "10" },
  { value: "25", name: "25" },
  { value: "50", name: "50" },
  { value: "100", name: "100" },
];

const fetchArticles = async () => {
  try {
    const params = {
      title: searchTitle.value,
      slug: searchSlug.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    await store.dispatch("fetchArticles", params);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const deleteArticle = async (id) => {
  try {
    await store.dispatch("deleteArticle", id);
    fetchArticles(); // Refetch articles after deletion
  } catch (error) {
    console.error(`Error deleting article with id ${id}:`, error);
  }
};

const updateArticle = (id) => {
  router.push({ name: "artikel-update", params: { id } });
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchArticles();
};

const isShowModal = ref(false);
const selectedArticle = ref(null);

function closeModal() {
  isShowModal.value = false;
  selectedArticle.value = null;
}

function showModal(articleId) {
  selectedArticle.value = articleId;
  isShowModal.value = true;
}

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <section class="w-96 lg:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader nameData="Artikel" :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchArticles"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <fwb-input
            v-model="searchTitle"
            @input="fetchArticles"
            placeholder="Search by title"
          ></fwb-input>
          <fwb-input
            v-model="searchSlug"
            @input="fetchArticles"
            placeholder="Search by slug"
          ></fwb-input>
        </div>
      </div>
      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
            >
              <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
              >
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Slug
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Deskripsi Singkat
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Isi Artikel
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Dibuat
                    </th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr v-for="(article, index) in articles" :key="index">
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ article?.title }}
                        </h2>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        {{ article?.slug }}
                      </h2>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <img
                        :src="article?.images"
                        alt="Article Image"
                        class="w-32 h-20"
                      />
                    </td>
                    <td
                      class="w-20 px-4 py-4 text-sm font-medium whitespace-nowrap"
                    >
                      <h2
                        class="w-56 truncate font-medium text-gray-800 dark:text-white"
                      >
                        {{ article?.shortDescription }}
                      </h2>
                    </td>
                    <td
                      class="w-20 px-4 py-4 text-sm font-medium whitespace-nowrap"
                    >
                      <h2
                        class="w-56 truncate font-medium text-gray-800 dark:text-white"
                      >
                        {{ article?.content }}
                      </h2>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        {{
                          article?.createdAt
                            ? formatTime(article.createdAt)
                            : ""
                        }}
                      </h2>
                    </td>
                    <td
                      class="px-12 py-8 text-sm font-medium whitespace-nowrap flex gap-4"
                    >
                      <button
                        @click="showModal(article._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                      >
                        View
                      </button>
                      <button
                        @click="updateArticle(article._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteArticle(article._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr v-if="articles.length === 0">
                    <td
                      colspan="6"
                      class="px-4 py-4 text-sm font-medium text-center text-gray-800 dark:text-white"
                    >
                      Belum ada data artikel POSCARE.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ListPagination
        :pagination="pagination"
        @page-change="handlePageChange"
      />
    </div>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Article Details
        </div>
      </template>
      <template #body>
        <ModalDetailsArticle :articleId="selectedArticle" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="dark" class="px-16">
            Back
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </section>
</template>

<style></style>
