<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { FwbInput, FwbSelect, FwbCheckbox } from "flowbite-vue";
import { ref } from "vue";
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
const selectedMonth = ref(`${currentYear}-${currentMonth}`);
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();
const props = defineProps({
  numberData: {
    type: Number,
    required: true,
  },
});

const addMother = () => {
  router.push({ name: "mother-create" });
};
const exportData = () => {
  store.dispatch("exportData", selectedMonth.value);
};
</script>

<template>
  <div class="sm:flex sm:items-center sm:justify-between">
    <div>
      <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">
          Data Ibu
        </h2>

        <span
          class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
          >{{ numberData }}</span
        >
      </div>

      <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
        These companies have purchased in the last 12 months.
      </p>
    </div>

    <div class="flex items-center mt-4 gap-x-3">
      <fwb-input
        v-model="selectedMonth"
        @input="updateMonth"
        type="month"
        placeholder="Search by time"
      />

      <button
        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        @click="exportData"
      >
        <font-awesome-icon icon="fa-solid fa-cloud-arrow-down" />
        <span>Export</span>
      </button>
      <button
        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
      >
        <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
        <span>Import</span>
      </button>

      <button
        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
        @click="addMother"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>Tambah Data Ibu</span>
      </button>
    </div>
  </div>
</template>

<style></style>
