<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import FormCreate from "../../../../components/admin/growth/children/form/FormCreate.vue"
const name = ref("");
</script>

<template>
  <section class="w-full">
    <div class="p-8 rounded border border-gray-200">
      <h1 class="font-medium text-3xl">Tambah Data Pertumbuhan Anak Baru</h1>
      <p class="text-gray-600 mt-6">
        Silakan tambahkan informasi anak terbaru untuk mencatat
        perkembangan kesehatan yang lebih baik.
      </p>
      <FormCreate />
    </div>
  </section>
</template>

<style setup></style>
