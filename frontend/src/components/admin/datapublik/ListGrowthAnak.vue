<script setup>
import ListHeader from "./ListHeader.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";
const store = useStore();
const router = useRouter();

const childrens = computed(() => store.getters.children);

const fetchChildrens = async () => {
  try {
    await store.dispatch("fetchChildren");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchChildrens();
});
</script>

<template>
  <div class="flex flex-col">
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
                  class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <button class="flex items-center gap-x-3 focus:outline-none">
                    <span>Nama</span>
                  </button>
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Orang Tua
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  TB / BB
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Group Fase
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  TTL
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Tanggal Periksa
                </th>
                <th scope="col" class="relative py-3.5 px-4">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
            >
              <tr v-for="child in childrens" :key="child._id">
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  <div>
                    <h2 class="font-medium text-gray-800 dark:text-white">
                      Nama Anak
                    </h2>
                  </div>
                </td>
                <td class="px-4 py-4 text-base font-medium whitespace-nowrap">
                  <div>
                    <h2 class="font-medium text-gray-800 dark:text-white">
                      <span class="font-semibold text-sm">Ibu : </span> NAMA IBU
                    </h2>
                    <h2 class="font-medium text-gray-800 dark:text-white">
                      <span class="font-semibold text-sm">Bapak : </span> NAMA IBU
                    </h2>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  TB / BB
                </td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  Baduta / Balita
                </td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  Laki laki / PR
                </td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  <h2 class="font-medium text-gray-800 dark:text-white">
                    DATE
                  </h2>
                </td>

                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  DATE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
