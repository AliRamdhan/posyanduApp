<script setup>
import Sidebar from "../../components/Sidebar.vue";
// import { computed, onMounted, ref } from "vue";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import Header from "../../components/admin/HeaderDashboard.vue";
// import Sidebar from "../../components/Sidebar.vue";
// import Statistic from "../../components/admin/StatisticNumber.vue";
// const store = useStore();
// const router = useRouter();
// const user = computed(() => store.getters.user);

// const fetchProfile = async () => {
//   try {
//     await store.dispatch("fetchProfile");
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMounted(() => {
//   fetchProfile();
//   console.log("Dashboard component mounted");
// });
</script>

<template>
  <div class="w-full">
    <div>
      <Sidebar />
    </div>
    <div class="w-full flex justify-end">
      <router-view></router-view>
    </div>
  </div>
</template>
// CRUD IBU // Data Ibu Hamil di RW // Data Ibu Menyusui di RW // CRUD Bad //
Data Baduta di RW // Data Balita di RW
