<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";
import {
  calculateAge,
  averageAge,
  averageHeigtBody,
  averageWeightBody,
} from "../../../utils/CalcurateAvg";
const store = useStore();
const router = useRouter();
const pagination = computed(() => store.getters.paginationChild);
const children = computed(() => store.getters.children);
const age = computed(() => store.getters.children);

const searchName = ref("");
const searchNIK = ref("");
const searchDob = ref("");
const searchGender = ref("");
const selectedAmountImunisation = ref("");
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

const genderOptions = [
  { value: "", name: "Semua" },
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const fetchChildren = async () => {
  try {
    const params = {
      name: searchName.value,
      nik: searchNIK.value,
      gender: searchGender.value,
      dob: searchDob.value,
      amountImunisation: selectedAmountImunisation.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    await store.dispatch("fetchChildren", params);
  } catch (error) {
    console.error("Error fetching children in component:", error);
  }
};

const editChild = (id) => {
  router.push({ name: "anak-update", params: { id } });
};

const addChild = () => {
  router.push({ name: "anak-create" });
};

const deleteChild = async (id) => {
  try {
    await store.dispatch("deleteChild", id); // Removed namespacing
  } catch (error) {
    console.error(`Error deleting mother with id ${id} in component:`, error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
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

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchChildren();
};

onMounted(() => {
  fetchChildren();
});
</script>
<template>
  <section class="w-96 md:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader name="Anak" :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div
          class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchChildren"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <fwb-input
            v-model="searchName"
            @input="fetchChildren"
            placeholder="Search by Nama"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <fwb-input
            v-model="searchNIK"
            @input="fetchChildren"
            placeholder="Search by Nomor NIK"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </template>
          </fwb-input>
          <fwb-input
            v-model="searchDob"
            @input="fetchChildren"
            type="date"
            placeholder="Search by DOB"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-calendar" />
            </template>
          </fwb-input>
          <div class="flex gap-2 items-center">
            <p>Gender</p>
            <fwb-select
              v-model="searchGender"
              @change="fetchChildren"
              :options="genderOptions"
            />
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
                <div v-if="children.length > 0">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          @click="
                            sortField = 'name';
                            sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                            fetchChildren();
                          "
                        >
                          Name
                        </button>
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          @click="
                            sortField = 'gender';
                            sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                            fetchChildren();
                          "
                        >
                          Gender
                        </button>
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Tempat, Tanggal, Lahir
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Imunisasi
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
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
                    <tr v-for="child in children" :key="child._id">
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ child.name }}
                          </h2>
                          <p
                            class="text-sm font-normal text-gray-600 dark:text-gray-400"
                          >
                            NIK : {{ child.nik }}
                          </p>
                        </div>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{
                          child.gender === "Male" ? "Laki-laki" : "Perempuan"
                        }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{
                            child.dob
                              ? `${formatTime(child.dob)} - (${
                                  calculateAge(child.dob).years
                                }) tahun (${
                                  calculateAge(child.dob).months
                                }) bulan`
                              : null
                          }}
                        </h2>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{
                          child.isBaduta
                            ? "Baduta"
                            : child.isBalita
                            ? "Balita"
                            : ""
                        }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ child.amountImunisation }} x
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ child.mother?.name }}
                          </h2>
                        </div>
                      </td>
                      <td
                        class="px-12 py-4 text-sm font-medium whitespace-nowrap flex gap-4"
                      >
                        <button
                          @click="editChild(child._id)"
                          class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          @click="removeChild(child._id)"
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
                    <p>Belum ada data anak...</p>
                  </div>
                </div>
              </table>
              <div v-if="children.length > 0">
                <ListPagination
                  :pagination="pagination"
                  @page-changed="handlePageChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
