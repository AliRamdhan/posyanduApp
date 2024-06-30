<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Setup the store and router
const store = useStore();
const router = useRouter();

// Map getters and actions using the Composition API
const user = computed(() => store.getters["user"]);
const isAuthenticated = computed(() => store.getters["isAuthenticated"]);

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      await store.dispatch("profile");
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  } else {
    router.push("/signin");
  }
});

// Method to handle user logout
const logoutUser = () => {
  store.dispatch("logout");
  router.push("/signin");
};
</script>

<template>
  <div class="profile">
    <h2>Profile</h2>
    <p v-if="user">Welcome, {{ user.message }}!</p>
    <p v-if="user">Welcome, {{ user.data.role }}!</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<style scoped></style>
