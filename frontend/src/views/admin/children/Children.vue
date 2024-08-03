<script setup>
import ListChildren from "../../../components/admin/children/ListChildren.vue";
import ListKelahiran from "../../../components/admin/birth/ListBirth.vue";
</script>

<template>
  <!-- <div class="w-full min-h-screen flex flex-col items-center py-8 border border-black"> -->
  <div class="w-full py-8">
    <div class="mb-4 text-center">
      <h1 class="text-5xl font-bold text-gray-800">Statistik</h1>
      <p class="text-xl font-medium text-gray-500">
        Data Statistik Data Bayi dan Balita
      </p>
    </div>
    <div class="w-full">
      <ListChildren />
    </div>
  </div>
</template>

<style></style>
