<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// Local state for the form data and error message
const form = ref({
  email: "",
  password: "",
});
const errorMessage = ref("");

// Access the Vue Router instance
const router = useRouter();

// Access the Vuex store instance
const store = useStore();

// Define the loginUser method
const loginUser = async () => {
  try {
    // Call the Vuex login action
    await store.dispatch("login", {
      email: form.value.email,
      password: form.value.password,
    });
    // Redirect to the profile page upon successful login
    alert("success login")
    router.push("/profile");
  } catch (error) {
    // Set the error message if login fails
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<style setup></style>
