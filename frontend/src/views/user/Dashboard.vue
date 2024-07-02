<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Header from "../../components/HeaderDashboard.vue";
// import ProfileBox from "../../components/user/ProfileBox.vue";
import Statistic from "../../components/user/StatistikUser.vue";
import ListChild from "../../components/user/ListChild.vue";
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
  console.log("Dashboard component mounted");
});
</script>

<template>
  <div>
    <Header :username="user.username" />
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <!-- <h1>Dashboard</h1>
      <router-view></router-view> -->
      <div v-if="user" class="w-full">
        <Statistic />
        <div class="mt-8">
          <h2 class="text-2xl font-bold text-gray-700">Profile Data</h2>
          <!-- <ProfileBox /> -->
        </div>
        <h2 class="text-2xl font-bold text-gray-700">Table Data Anak</h2>
        <ListChild />
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>
