<script setup>
import { FwbInput, FwbSelect, FwbCheckbox } from "flowbite-vue";
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import formatTime from "../../../utils/FormatTime";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const mothers = computed(() => store.getters.mothers);
const pagination = computed(() => store.getters.pagination);
const searchName = ref("");
const searchHusband = ref("");
const searchTime = ref("");
const selectedKS = ref("");
const bpjs = ref(null);
const sortField = ref("");
const sortOrder = ref("asc");
const currentPage = ref(1);
const limit = ref(10);

const fetchMothers = async () => {
  try {
    const params = {
      name: searchName.value,
      husband: searchHusband.value,
      dob: searchTime.value, // adjust field name according to your API
      KS: selectedKS.value,
      bpjs: bpjs.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    await store.dispatch("fetchMothers", params);
  } catch (error) {
    console.error(error);
  }
};

const ks = [
  { value: "KS1", name: "KS1" },
  { value: "KS2", name: "KS2" },
  { value: "K3", name: "KS3" },
];

const selectLimit = [
  { value: "5", name: "5" },
  { value: "10", name: "10" },
  { value: "25", name: "25" },
  { value: "50", name: "50" },
  { value: "100", name: "100" },
];

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchMothers();
};

onMounted(() => {
  fetchMothers();
});
</script>

<template>
  <section class="w-full flex justify-end px-4 overflow-hidden">
    <div class="w-5/6">
      <ListHeader :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="inline-flex gap-4">
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchMothers"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <fwb-input
            v-model="searchName"
            @input="fetchMothers"
            placeholder="Search by name"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>

          <fwb-input
            v-model="searchHusband"
            @input="fetchMothers"
            placeholder="Search by husband"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>

          <fwb-input
            v-model="searchTime"
            @input="fetchMothers"
            type="date"
            placeholder="Search by time"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-calendar" />
            </template>
          </fwb-input>

          <!-- Dropdown for KS -->
          <!-- <select v-model="selectedKS">
          <option value="">Select KS</option>
          <option value="KS1">KS1</option>
          <option value="KS2">KS2</option>
          <option value="KS3">KS3</option>
        </select> -->
          <div class="flex gap-2 items-center">
            <p>KS</p>
            <fwb-select
              v-model="selectedKS"
              @change="fetchMothers"
              :options="ks"
            />
          </div>
          <!-- Checkbox for BPJS -->
          <!-- <label>
            <input type="checkbox"   />
            BPJS
          </label> -->
          <fwb-checkbox v-model="bpjs" @change="fetchMothers" label="BPJS" />
        </div>
      </div>
      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="border border-gray-200 dark:border-gray-700 md:rounded-lg"
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
                      No
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button
                        @click="
                          sortField = 'name';
                          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                          fetchMothers();
                        "
                      >
                        Name
                      </button>
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Suami
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      NO KK
                    </th>
                    <th
                      scope="col"
                      class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button
                        @click="
                          sortField = 'amountChild';
                          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                          fetchMothers();
                        "
                      >
                        Child Count
                      </button>
                    </th>
                    <th
                      scope="col"
                      class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button
                        @click="
                          sortField = 'dob';
                          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                          fetchMothers();
                        "
                      >
                        TTL
                      </button>
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      BPJS/KS
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      RT/RW
                    </th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr v-for="(mother, idx) in mothers" :key="mother._id">
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      {{ idx + 1 }}
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ mother.name }}
                        </h2>
                        <p
                          class="text-sm font-normal text-gray-600 dark:text-gray-400"
                        >
                          NIK : {{ mother.nik }}
                        </p>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ mother.husband }}
                        </h2>
                        <p
                          class="text-sm font-normal text-gray-600 dark:text-gray-400"
                        >
                          NIK : {{ mother.nik }}
                        </p>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ mother.kk }}
                        </h2>
                      </div>
                    </td>
                    <td
                      class="px-12 py-4 text-sm font-medium whitespace-nowrap"
                    >
                      <div
                        class="inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                      >
                        {{ mother.amountChild }}
                      </div>
                    </td>
                    <td
                      class="px-12 py-4 text-sm whitespace-nowrap dark:text-gray-300"
                    >
                      {{ formatTime(mother.dob) }}
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{
                            mother.bpjs ? "Punya BPJS" : "Tidak Punya BPJS"
                          }}
                          / {{ mother.ks }}
                        </h2>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          0{{ mother.rt }} / 0{{ mother.rw }}
                        </h2>
                      </div>
                    </td>
                    <td
                      class="px-12 py-4 text-sm font-medium whitespace-nowrap"
                    >
                      <button
                        @click="editMother(mother._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteMother(mother._id)"
                        class="inline px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ListPagination
                :pagination="pagination"
                @page-change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
