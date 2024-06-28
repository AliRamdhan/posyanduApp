<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// Reactive form state and error message
const form = ref({
  username: "",
  email: "",
  numberHp: "",
  password: "",
  role: "User",
  mother: "667bc44f2a8d0ba6a519409b",
});

const errorMessage = ref("");

// Use Vue Router and Vuex Store
const router = useRouter();
const store = useStore();

// Define registerUser method
const registerUser = async () => {
  try {
    await store.dispatch("register", form.value);
    // alert("success")
    router.push("/signin");
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="register">
    <h2>Register</h2>
    <form
      @submit.prevent="registerUser"
      class="flex flex-col justify-center gap-4"
    >
      <div >
        <label for="username">Username:</label>
        <input class="border border-black" type="text" v-model="form.username" required />
      </div>
      <div >
        <label for="email">Email:</label>
        <input class="border border-black" type="email" v-model="form.email" required />
      </div>
      <div >
        <label for="numberHp">Phone Number:</label>
        <input class="border border-black" type="text" v-model="form.numberHp" required />
      </div>
      <div >
        <label for="password">Password:</label>
        <input class="border border-black" type="password" v-model="form.password" required />
      </div>
      <div >
        <label for="role">Role:</label>
        <select v-model="form.role">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div >
        <label for="mother">Mother ID:</label>
        <input class="border border-black" type="text" v-model="form.mother" />
      </div>
      -->
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Add any scoped styles here */
</style>
