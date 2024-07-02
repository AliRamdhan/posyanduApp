<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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

onMounted(() => {
  console.log("Dashboard component mounted");
});
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <router-view></router-view>
    <p v-if="user && user.data">Welcome, {{ user.data.username }}</p>
    <p v-else>Loading...</p> -->
  </div>
</template>
