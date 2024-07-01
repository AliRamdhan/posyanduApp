<template>
  <div class="signin">
    <h2>Sign In</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const email = ref("");
const password = ref("");
const error = ref(null);

const router = useRouter();
const store = useStore();

const user = computed(() => store.getters["user"]);
const isAuthenticated = computed(() => store.getters["isAuthenticated"]);
const login = async () => {
  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    redirectUser();
  } catch (err) {
    error.value = err.message;
  }
};

const redirectUser = () => {
  if (user.value.data.role === "Admin") {
    router.push({ name: "dashboardAdmin" });
  } else if (user.value.data.role === "User") {
    router.push({ name: "dashboardUser" });
  } else {
    alert(user.value.data.role);
    router.push("/unauthorize");
  }
};

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    redirectUser();
  }
});
</script>

<style scoped>
.signin {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
form div {
  margin-bottom: 10px;
}
</style>
