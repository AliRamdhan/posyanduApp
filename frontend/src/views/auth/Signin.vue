<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
const name = ref("");
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Masuk ke Akun Posyandu</h1>

      <p class="mt-4 text-gray-500">
        Silakan masukkan email dan password Anda untuk mengakses akun Posyandu.
      </p>
    </div>

    <form action="#" class="mx-auto mb-0 mt-8 max-w-lg space-y-4">
      <div>
        <fwb-input
          v-model="name"
          label="Email Anda"
          placeholder="Masukkan email Anda"
        >
          <template #prefix>
            <font-awesome-icon
              icon="fa-solid fa-at"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
            />
          </template>
        </fwb-input>
      </div>

      <div>
        <fwb-input
          v-model="name"
          label="Password"
          placeholder="Masukkan password Anda"
        >
          <template #helper> Masukkan password yang benar. </template>
        </fwb-input>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Belum punya akun?
          <router-link class="underline" to="signup"
            >Hubungi admin</router-link
          >
        </p>

        <fwb-button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Masuk
        </fwb-button>
      </div>
    </form>
  </div>
</template>
