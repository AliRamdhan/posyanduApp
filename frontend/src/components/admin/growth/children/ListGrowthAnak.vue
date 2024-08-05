<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import { FwbInput, FwbSelect, FwbCheckbox } from "flowbite-vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../../utils/FormatTime";
import {
  calculateAge,
  averageAge,
  averageHeigtBody,
  averageWeightBody,
} from "../../../../utils/CalcurateAvg";
const store = useStore();
const router = useRouter();

const childrens = computed(() => store.getters.childrensGrowth);

const pagination = computed(() => store.getters.paginationChildrensGrowth);
const searchCheck = ref("");
const searchGroupFase = ref("");
const searchChildrensName = ref("");
const searchWeight = ref("");
const searchHeight = ref("");
const sortField = ref("");
const sortOrder = ref("asc");
const currentPage = ref(1);
const limit = ref(10);

const fetchChildrens = async () => {
  try {
    const params = {
      checkDate: searchCheck.value,
      groupFase: searchGroupFase.value,
      heightBody: searchHeight.value,
      weightBody: searchWeight.value,
      childrensName: searchChildrensName.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: limit.value,
    };
    await store.dispatch("fetchChildrenBadutas", params);
  } catch (error) {
    console.error(error);
  }
};

const selectLimit = [
  { value: "5", name: "5" },
  { value: "10", name: "10" },
  { value: "25", name: "25" },
  { value: "50", name: "50" },
  { value: "100", name: "100" },
];

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchChildrens();
};

const editGrowth = (id) => {
  router.push({ name: "perkembangan-anak-update", params: { id } });
};

const deleteGrowth = async (id) => {
  try {
    await store.dispatch("deleteChildBaduta", id); // Removed namespacing
  } catch (error) {
    console.error(`Error deleting mother with id ${id} in component:`, error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const removeGrowth = async (id) => {
  try {
    await deleteGrowth(id);
    await fetchChildrens();
  } catch (error) {
    console.error(`Error removing child with id ${id}:`, error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

onMounted(() => {
  fetchChildrens();
});
</script>

<template>
  <section class="w-96 md:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader nameData="Perkembangan Anak" :numberData="pagination.total" />
      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="flex gap-2 items-center text-sm">
            <p>Show</p>
            <fwb-select
              v-model="limit"
              @change="fetchChildrens"
              :options="selectLimit"
              class="w-20"
            />
            Entries
          </div>
          <div class="flex gap-2 items-center text-sm">
            <p>Tanggal Periksa</p>
            <fwb-input
              v-model="searchCheck"
              @input="fetchChildrens"
              type="date"
              placeholder="Search by Tanggal Periksa"
            />
          </div>
          <fwb-input
            v-model="searchChildrensName"
            @input="fetchChildrens"
            placeholder="Search by Nama"
          />
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
                <div v-if="childrens.length > 0">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          class="flex items-center gap-x-3 focus:outline-none"
                        >
                          <span>Nama</span>

                          <svg
                            class="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.3"
                            />
                          </svg>
                        </button>
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
                        Kelompok Umur
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
                        Imunisasi Terakhir
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
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ child.childrens?.name }}
                          </h2>
                          <p
                            class="text-sm font-normal text-gray-600 dark:text-gray-400"
                          >
                            NIK : {{ child.childrens?.nik }}
                          </p>
                        </div>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ child.heightBody }} cm / {{ child.weightBody }} kg
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ child.groupFase }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ child.childrens?.gender }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          <!-- {{
                            child.childrens?.dob
                              ? formatTime(child.childrens.dob)
                              : null
                          }} -->

                          {{
                            child.childrens?.dob
                              ? `${formatTime(child.childrens.dob)} - (${
                                  calculateAge(child.childrens.dob).years
                                }) tahun (${
                                  calculateAge(child.childrens.dob).months
                                }) bulan`
                              : null
                          }}
                        </h2>
                      </td>

                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <!-- {{ child.childrens?.amountImunisation }} x / -->
                        {{
                          child.imunisations
                            ? child.imunisations?.name
                            : "Tidak Imunisasi"
                        }}
                      </td>

                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{
                              child.checkDate
                                ? formatTime(child.checkDate)
                                : null
                            }}
                          </h2>
                        </div>
                      </td>
                      <td class="px-4 py-4 flex gap-4">
                        <button
                          @click="editGrowth(child._id)"
                          class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          @click="removeGrowth(child._id)"
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
                    <p>Belum ada data perkembangan...</p>
                  </div>
                </div>
              </table>
              <div v-if="childrens.length > 0">
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
