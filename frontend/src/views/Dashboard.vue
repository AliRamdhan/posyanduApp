<script setup>
// import { computed, onMounted, ref } from "vue";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import Header from "../components/HeaderDashboard.vue";
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
  <div>
    <router-view></router-view>
  </div>
</template>
