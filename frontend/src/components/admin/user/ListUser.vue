<script setup>
import ListHeader from "./list/ListHeader.vue";
import ListPagination from "./list/ListPagination.vue";
import { FwbInput, FwbSelect } from "flowbite-vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../../utils/FormatTime";

const store = useStore();
const router = useRouter();
const users = computed(() => store.getters.users);
console.log("wqdq", users);
const fetchUser = async () => {
  try {
    await store.dispatch("fetchUsers");
  } catch (error) {
    console.error("Error fetching children in component:", error);
  }
};

const editUser = (id) => {
  router.push({ name: "user-update", params: { id } });
};

const addUser = () => {
  router.push({ name: "user-create" });
};

const deleteUser = async (id) => {
  try {
    await store.dispatch("deleteUser", id); // Removed namespacing
    console.log(`Deleted mother with id ${id}`);
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
    await deleteUser(id);
    await fetchUser();
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
  fetchUser();
};

onMounted(() => {
  fetchUser();
});
</script>
<template>
  <section class="w-96 md:w-full flex justify-end px-4 overflow-hidden">
    <div class="w-full">
      <ListHeader name="Data Anak" :numberData="users.length" />
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
                <div v-if="users.length > 0">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button>Nama</button>
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button>Email</button>
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Number HP
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
                    <tr v-for="user in users" :key="user._id">
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ user.username }}
                          </h2>
                        </div>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ user.email }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ user.numberHp }}
                        </h2>
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {{ user.mother?.name }}
                      </td>
                      <td
                        class="px-12 py-4 text-sm font-medium whitespace-nowrap flex gap-4"
                      >
                        <button
                          @click="editUser(user._id)"
                          class="inline px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          @click="removeChild(user._id)"
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
                    <p>Belum ada data user...</p>
                  </div>
                </div>
              </table>
              <!-- <div v-if="children.length > 0">
                <ListPagination
                  :pagination="pagination"
                  @page-changed="handlePageChange"
                />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
