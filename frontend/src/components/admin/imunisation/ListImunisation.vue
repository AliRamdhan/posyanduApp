<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import ListFilter from "./list/ListFilter.vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";

const store = useStore();
const router = useRouter();

const pagination = computed(() => store.getters.paginationImmunisation);
const immunisations = computed(() => store.getters.immunisations);

const searchName = ref("");
const searchGroupAge = ref("");
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

const selectGroupAge = [
  { value: "0-1", name: "0-1" },
  { value: "1-10", name: "1-10" },
  { value: "10-15", name: "10-15" },
  { value: "15-20", name: "15-20" },
  { value: "20-25", name: "20-25" },
];

const fetchImmunisations = async () => {
  try {
    const params = {
      name: searchName.value,
      groupAge: searchGroupAge.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    await store.dispatch("fetchImmunisations", params);
  } catch (error) {
    console.error("Error fetching immunisations:", error);
  }
};

const deleteImmunisation = async (id) => {
  try {
    await store.dispatch("deleteImmunisation", id);
  } catch (error) {
    console.error(`Error deleting immunisation with id ${id}:`, error);
  }
};

const editImmunisation = (id) => {
  router.push({ name: "imunisasi-update", params: { id } });
};

const formatDOB = (dob) => {
  return formatTime(dob); // Assuming formatTime is correctly implemented elsewhere
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchImmunisations();
};

onMounted(() => {
  fetchImmunisations();
});
</script>

<template>
  <section class="w-96 lg:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader nameData="Imunisasi" :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchImmunisations"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <fwb-input
            v-model="searchName"
            @input="fetchImmunisations"
            placeholder="Search by Nama"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <div class="flex gap-2 items-center text-sm">
            <p>Kelompok</p>
            <fwb-select
              v-model="searchGroupAge"
              @change="fetchImmunisations"
              :options="selectGroupAge"
            />
            <p>Umur</p>
          </div>
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
                      Nama
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Kelompok Umur
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Dibuat pada tanggal
                    </th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr
                    v-for="immunisation in immunisations"
                    :key="immunisation._id"
                  >
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ immunisation.name }}
                        </h2>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        {{ immunisation.groupAge }}
                      </h2>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        {{ formatTime(immunisation.createdAt) }}
                      </h2>
                    </td>
                    <td
                      class="px-12 py-4 text-sm font-medium whitespace-nowrap flex gap-4"
                    >
                      <button
                        @click="editImmunisation(immunisation._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteImmunisation(immunisation._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                    <!-- <td class="px-4 py-4 flex gap-4">
                      <button @click="editImmunisation(immunisation._id)">
                        Edit
                      </button>
                      <button @click="deleteImmunisation(immunisation._id)">
                        Delete
                      </button>
                    </td> -->
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
  </section>
</template>

<style></style>
