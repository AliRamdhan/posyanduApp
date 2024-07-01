<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
const name = ref("");
</script>
<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Daftar di Posyandu</h1>

      <p class="mt-4 text-gray-500">
        Isi formulir di bawah untuk membuat akun baru di Posyandu.
      </p>
    </div>

    <form action="#" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <fwb-input
          v-model="name"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap Anda"
        >
          <template #prefix>
            <font-awesome-icon
              icon="fa-solid fa-user"
              class="w-3 h-3 text-gray-500 dark:text-gray-400"
            />
          </template>
        </fwb-input>
      </div>

      <div>
        <fwb-input
          v-model="email"
          label="Email"
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
          type="password"
          label="Password"
          placeholder="Masukkan password Anda"
        >
          <template #helper> Masukkan password minimal 8 karakter. </template>
        </fwb-input>
      </div>

      <div>
        <fwb-input
          v-model="confirmPassword"
          type="password"
          label="Konfirmasi Password"
          placeholder="Masukkan kembali password Anda"
        >
          <template #helper>
            Konfirmasi password yang sama dengan di atas.
          </template>
        </fwb-input>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Sudah punya akun?
          <router-link class="underline" to="login">Masuk di sini</router-link>
        </p>

        <fwb-button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Daftar
        </fwb-button>
      </div>
    </form>
  </div>
</template>

<style></style>
