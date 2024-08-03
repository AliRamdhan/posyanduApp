<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import FormCreate from "../../../components/admin/user/form/FormCreate.vue";
const name = ref("");
</script>

<template>
  <section class="w-full">
    <div class="p-8 rounded border border-gray-200">
      <h1 class="font-medium text-3xl">Tambah Data User Baru</h1>
      <p class="text-gray-600 mt-6">
        Silakan tambahkan informasi user terbaru.
      </p>
      <FormCreate />
    </div>
  </section>
</template>

<style setup></style>
