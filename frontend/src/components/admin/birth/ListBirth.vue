<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import ListFilter from "./list/ListFilter.vue";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";

const store = useStore();
const router = useRouter();

const births = computed(() => store.getters["births"]);

const fetchBirths = async () => {
  try {
    await store.dispatch("fetchBirths");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const deleteBirth = async (id) => {
  try {
    await store.dispatch("deleteBirth", id);
    console.log(`Deleted birth with id ${id}`);
  } catch (error) {
    console.error(`Error deleting birth with id ${id}:`, error);
  }
};

const editBirth = (id) => {
  router.push({ name: "birth-update", params: { id } });
};

const addBirth = () => {
  router.push({ name: "birth-create" });
};

const formatDOB = (dob) => {
  return formatTime(dob); // Assuming formatTime is correctly implemented elsewhere
};

onMounted(fetchBirths);
</script>

<template>
  <section class="container px-4">
    <ListHeader nameData="Data Kelahiran" :numberData="births.length" />
    <ListFilter />

    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        none
                      </h2>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    {{ birth.children.gender }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    {{ birth.circumHead }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    {{ birth.weightBody }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    {{ birth.heightBody }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <h2 class="font-medium text-gray-800 dark:text-white">
                      {{ formatTime(birth.dob) }}
                      <!-- Assuming formatTime function is available -->
                    </h2>
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    {{ birth.children.amountImunisation }}x
                  </td>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                      <h2 class="font-medium text-gray-800 dark:text-white">
                        {{ birth.mother.name }}
                      </h2>
                      <p
                        class="text-sm font-normal text-gray-600 dark:text-gray-400"
                      >
                        NIK : {{ birth.mother.nik }}
                      </p>
                    </div>
                  </td>
                  <td class="px-4 py-4 flex gap-4">
                    <button @click="editBirth(birth._id)">Edit</button>
                    <button @click="deleteBirth(birth._id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <ListPagination />
  </section>
</template>

<style></style>
