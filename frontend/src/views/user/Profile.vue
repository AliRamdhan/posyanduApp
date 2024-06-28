<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Setup the store and router
const store = useStore();
const router = useRouter();

// Map getters and actions using the Composition API
const user = computed(() => store.getters["user"]);
console.log(user)
const logout = () => {
  store.dispatch("logout");
  router.push("/signin");
};

// Method to handle user logout
const logoutUser = () => {
  logout();
};
</script>

<template>
  <div class="profile">
    <h2>Profile</h2>
    <p v-if="user">Welcome, {{ user.message }}!</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<style scoped>
/* Add any styles specific to the profile component here */
</style>
