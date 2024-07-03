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

const children = computed(() => store.getters.children); // Directly access the getter
const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren"); // Removed namespacing
  } catch (error) {
    console.error("Error fetching children in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const deleteChild = async (id) => {
  try {
    await store.dispatch("deleteChild", id); // Removed namespacing
    console.log(`Deleted child with id ${id}`);
  } catch (error) {
    console.error(`Error deleting child with id ${id} in component:`, error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const editChild = (id) => {
  router.push({ name: "children-update", params: { id } });
};

const addChild = () => {
  router.push({ name: "children-create" });
};

const removeChild = async (id) => {
  try {
    await deleteChild(id);
    await fetchChildren();
  } catch (error) {
    console.error(`Error removing child with id ${id}:`, error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

onMounted(fetchChildren);
</script>

<template>
  <section class="w-full flex justify-end px-4 overflow-hidden">
    <div class="w-5/6">
      <ListHeader :numberData="children.length" />
      <!-- <ListFilter /> -->
      <!-- // name" // nik" // gender" // amountImunisation" // mother" -->
      <div class="flex flex-col mt-6 border border-black">
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
                          {{ birth.mother?.name }}
                        </h2>
                        <p
                          class="text-sm font-normal text-gray-600 dark:text-gray-400"
                        >
                          NIK : {{ birth.mother?.nik }}
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
              <ListPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
