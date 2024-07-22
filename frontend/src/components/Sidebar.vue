<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const sidebarOpen = ref(false);
const submenuOpen = ref(false);
const route = useRouter();

const openSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const dropdown = () => {
  submenuOpen.value = !submenuOpen.value;
};

const store = useStore();

const handleLogout = () => {
  store.dispatch("logout");
  alert("Successfully logged out");
  route.push({ name: "signin" });
};
</script>

<template>
  <div class="w-full">
    <button @click="openSidebar" class="p-4 lg:hidden">
      <font-awesome-icon icon="fa-solid fa-bars" />
    </button>

    <div
      :class="[
        'sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-900 lg:block z-50',
        { hidden: !sidebarOpen && 'lg:block' },
      ]"
    >
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          <button
            @click="openSidebar"
            class="text-white px-2 py-1 rounded-md lg:hidden"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <h1 class="font-bold text-gray-200 text-3xl ml-3">
            PosCare Admin Panel
          </h1>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <router-link to="/dashboard/admin">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-house-door-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </div>
      </router-link>
      <router-link to="/dashboard/admin/ibu">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Data Ibu</span>
        </div>
      </router-link>
      <router-link to="/dashboard/admin/anak">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Data Anak</span
          >
        </div>
      </router-link>
      <router-link to="/dashboard/admin/imunisasi">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Imunisasi</span
          >
        </div>
      </router-link>
      <router-link to="/dashboard/admin/kelahiran">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Kelahiran</span
          >
        </div>
      </router-link>
      <div class="my-4 bg-gray-600 h-[1px]"></div>
      <div
        class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        @click="dropdown"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Perkembangan</span
          >
          <span class="text-sm" :class="{ 'rotate-180': submenuOpen }">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        :class="{ hidden: !submenuOpen }"
      >
        <router-link to="/dashboard/admin/perkembangan-anak">
          <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
            Anak
          </h1>
        </router-link>
        <router-link to="/dashboard/admin/perkembangan-ibu">
          <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
            Ibu
          </h1>
        </router-link>
      </div>
      <router-link to="/dashboard/admin/artikel">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Artikel</span>
        </div>
      </router-link>
      <!-- <router-link to="/dashboard/admin/report">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Report</span>
        </div>
      </router-link> -->
      <router-link to="/dashboard/admin/user">
        <div
          class="p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">User</span>
        </div>
      </router-link>
      <button
        class="w-full p-2.5 mt-4 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        @click="handleLogout"
      >
        <i class="bi bi-box-arrow-in-right"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </button>
      <div>
        <!-- {{ user.username }} -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
/* .hidden {
  display: none;
} */
</style>
