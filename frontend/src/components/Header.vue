<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue";
import { useRouter } from "vue-router";

const store = useStore();
const route = useRouter();
const isOpen = ref(false);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.user);

const openNav = () => {
  isOpen.value = !isOpen.value;
};

const handleLogout = () => {
  store.dispatch("logout");
  route.push({ name: "signin" });
};

const fetchProfile = async () => {
  try {
    await store.dispatch("fetchProfile");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <section>
    <nav class="relative bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-4 mx-auto">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="flex items-center justify-between">
            <router-link to="/">
              <div class="flex justify-center items-center gap-4">
                <img class="w-auto h-8 sm:h-12" src="/assets/icon.png" alt="" />
                <h2 class="text-3xl font-black text-gray-800">PosCare</h2>
              </div>
            </router-link>

            <!-- Mobile menu button -->
            <div @click="openNav" class="flex lg:hidden">
              <button
                type="button"
                class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  v-if="!isOpen"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  v-if="isOpen"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
          <div
            :class="[
              isOpen
                ? 'translate-x-0 opacity-100 '
                : 'opacity-0 -translate-x-full',
            ]"
            class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center"
          >
            <div
              class="flex flex-col justify-center lg:items-center -mx-6 lg:flex-row lg:mx-8"
            >
              <div :class="isAuthenticated ? 'block' : 'hidden'">
                <router-link
                  v-if="isAuthenticated && user && user.role"
                  :to="
                    user.role === 'Admin'
                      ? '/dashboard/admin'
                      : '/dashboard/user'
                  "
                >
                  <p
                    class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </p>
                </router-link>
              </div>
              <fwb-dropdown align-to-end class="hidden lg:block w-28">
                <template #trigger>
                  <span class="cursor-pointer"
                    >Data Publik
                    <font-awesome-icon icon="fa-solid fa-angle-down"
                  /></span>
                </template>
                <fwb-list-group>
                  <fwb-list-group-item>
                    <router-link to="/perkembangan-ibu">
                      Perkembangan Ibu
                    </router-link>
                  </fwb-list-group-item>
                  <fwb-list-group-item>
                    <router-link to="/perkembangan-anak"
                      >Perkembangan Anak</router-link
                    >
                  </fwb-list-group-item>
                </fwb-list-group>
              </fwb-dropdown>
              <router-link to="/perkembangan-ibu" class="lg:hidden block">
                <p
                  class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Perkembangan Ibu
                </p>
              </router-link>
              <router-link to="/perkembangan-anak" class="lg:hidden block">
                <p
                  class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Perkembangan Anak
                </p>
              </router-link>
              <router-link to="/artikel">
                <p
                  class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Artikel
                </p>
              </router-link>
              <router-link to="/contact">
                <p
                  class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Contact
                </p>
              </router-link>
            </div>

            <div class="flex w-full items-center mt-4 lg:mt-0">
              <div v-if="isAuthenticated" class="flex items-center w-full">
                <fwb-dropdown
                  :text="user.username"
                  align-to-end
                  class="hidden lg:block w-28"
                >
                  <fwb-list-group>
                    <fwb-list-group-item>
                      {{ user.username }}
                    </fwb-list-group-item>
                    <fwb-list-group-item>
                      <button @click="handleLogout">Logout</button>
                    </fwb-list-group-item>
                  </fwb-list-group>
                </fwb-dropdown>
                <div class="w-full">
                  <button
                    @click="handleLogout"
                    class="flex lg:hidden w-full px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <router-link v-else to="/signin" class="w-full">
                <button
                  class="w-full px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<style scoped>
/* Component Styles */
</style>
