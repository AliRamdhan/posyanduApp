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
const pagination = computed(() => store.getters.paginationBirth);
const births = computed(() => store.getters.births);

const searchHeight = ref("");
const searchWeight = ref("");
const searchCircumHead = ref("");
const searchDob = ref("");
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

const fetchBirths = async () => {
  try {
    const params = {
      circumHead: searchCircumHead.value,
      dob: searchDob.value,
      heightBody: searchHeight.value,
      weightBody: searchWeight.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    const data = await store.dispatch("fetchBirths", params);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const deleteBirth = async (id) => {
  try {
    await store.dispatch("deleteBirth", id);
  } catch (error) {
    console.error(`Error deleting birth with id ${id}:`, error);
  }
};

const editBirth = (id) => {
  router.push({ name: "kelahiran-update", params: { id } });
};

const addBirth = () => {
  router.push({ name: "kelahiran-create" });
};

const formatDOB = (dob) => {
  return formatTime(dob);
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchBirths();
};

onMounted(() => {
  fetchBirths();
});
</script>

<template>
  <section class="w-96 md:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader nameData="Kelahiran" :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div
          class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchBirths"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <fwb-input
            v-model="searchWeight"
            @input="fetchBirths"
            placeholder="Search by berat badan"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <fwb-input
            v-model="searchHeight"
            @input="fetchBirths"
            placeholder="Search by tinggi badan"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <fwb-input
            v-model="searchCircumHead"
            @input="fetchBirths"
            placeholder="Search by Lingkar Kepala"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <fwb-input
            v-model="searchDob"
            @input="fetchBirths"
            type="date"
            placeholder="Search by TTL"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-calendar" />
            </template>
          </fwb-input>
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
                <div v-if="births.length > 0">
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
                        Gender
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        Lingkar Kepala
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        Berat Badan
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        Tinggi Badan
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        TTL
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        Imunisasi
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                      >
                        Ibu
                      </th>
                      <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                  >
                    <tr v-for="birth in births" :key="birth._id">
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ birth.children?.name }}
                          </h2>
                        </div>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ birth.children?.gender }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ birth.circumHead }} cm
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ birth.weightBody }} kg
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ birth.heightBody }} cm
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          <!-- {{ formatTime(birth.dob) }} -->
                          {{ birth.dob ? formatTime(birth.dob) : birth.dob }}
                          <!-- Assuming formatTime function is available -->
                        </h2>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ birth.children?.amountImunisation }}x
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ birth.children?.mother?.name }}
                          </h2>
                          <p
                            class="text-sm font-normal text-gray-600 dark:text-gray-400"
                          >
                            NIK : {{ birth.children?.mother?.nik }}
                          </p>
                        </div>
                      </td>
                      <td class="px-4 py-4 flex gap-4">
                        <button
                          @click="editBirth(birth._id)"
                          class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          @click="deleteBirth(birth._id)"
                          class="inline px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </div>
                <div v-else>
                  <div class="px-4 py-8 flex justify-center items-center">
                    <p>Belum ada data kelahiran...</p>
                  </div>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="births.length > 0">
        <ListPagination
          :pagination="pagination"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </section>
</template>

<style></style>
