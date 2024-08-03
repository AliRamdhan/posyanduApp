<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import FormUpdate from "../../../../components/admin/growth/children/form/FormUpdate.vue";
const name = ref("");
</script>

<template>
  <section class="w-full">
    <div class="p-8 rounded border border-gray-200">
      <h1 class="font-medium text-3xl">Perbarui Data Pertumbuhan Anak</h1>
      <p class="text-gray-600 mt-6">
        Mohon perbarui informasi imunisasi yang sudah ada untuk memastikan
        catatan kesehatan yang selalu up-to-date.
      </p>
      <FormUpdate />
    </div>
  </section>
</template>

<style setup></style>
