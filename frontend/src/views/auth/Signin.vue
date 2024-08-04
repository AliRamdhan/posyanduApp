<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbButton, FwbInput, FwbAlert } from "flowbite-vue";

const email = ref("");
const password = ref("");
const error = ref(null);
const success = ref(null);

const router = useRouter();
const store = useStore();

const user = computed(() => store.getters["user"]);
const isAuthenticated = computed(() => store.getters["isAuthenticated"]);

const login = async () => {
  try {
    const response = await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    if (response) {
      success.value = "Success Login!";
      setTimeout(() => {
        redirectUser();
      }, 500); // 500 milliseconds delay
    }
  } catch (err) {
    error.value = err.message;
  }
};

const redirectUser = () => {
  if (user.value.role === "Admin") {
    router.push({ name: "dashboardAdmin" });
  } else if (user.value.role === "User") {
    router.push({ name: "dashboardUser" });
  } else {
    alert(user.value.role);
    router.push("/unauthorize");
  }
};

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    redirectUser();
  }
});
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Masuk ke PosCare</h1>

      <p class="mt-4 text-gray-500">
        Silakan masukkan email dan password Anda untuk mengakses akun Posyandu.
      </p>
    </div>

    <form class="mx-auto mb-0 mt-8 max-w-lg space-y-4" @submit.prevent="login">
      <div>
        <fwb-input
          v-model="email"
          required
          label="Email Anda"
          placeholder="Masukkan email Anda"
        >
          <template #prefix>
            <font-awesome-icon
              icon="fa-solid fa-at"
              class="w-3 h-3 text-gray-500 dark:text-gray-400"
            />
          </template>
        </fwb-input>
      </div>

      <div>
        <fwb-input
          v-model="password"
          required
          type="password"
          label="Password"
          placeholder="Masukkan password Anda"
        >
          <template #helper> Masukkan password yang benar. </template>
        </fwb-input>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Belum punya akun?
          <router-link class="underline" to="#">Hubungi admin</router-link>
        </p>

        <fwb-button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Masuk
        </fwb-button>
      </div>
      <div v-if="success" class="w-full">
        <div class="absolute top-24 right-8">
          <fwb-alert icon type="success">
            <span class="font-medium">{{ success }}</span>
          </fwb-alert>
        </div>
      </div>

      <div v-if="error" class="w-full">
        <div class="absolute top-24 right-8">
          <fwb-alert icon type="danger">
            <span className="font-medium">Info alert!</span> {{ error }}
          </fwb-alert>
        </div>
      </div>
    </form>
  </div>
</template>
