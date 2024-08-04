<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Header from "../../../components/admin/HeaderDashboard.vue";
import Sidebar from "../../../components/Sidebar.vue";
import Statistic from "../../../components/admin/StatisticNumber.vue";
import ChartAnak from "../../../components/admin/chart/Chart4.vue";
import ChartIbu from "../../../components/admin/chart/Chart3.vue";
const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.user);

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
  <div class="w-full py-8 sm:py-12">
    <Header :username="user.username" />
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div v-if="user" class="w-full">
        <Statistic />
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="w-full"><ChartAnak /></div>
          <div class="w-full"><ChartIbu /></div>
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>
