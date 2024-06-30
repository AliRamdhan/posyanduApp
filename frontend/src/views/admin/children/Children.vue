<script setup>
import ListMother from "../../../components/admin/mother/ListMothers.vue";
import ListChildren from "../../../components/admin/children/ListChildren.vue";
</script>

<template>
  <div class="w-full min-h-screen flex flex-col items-center py-8">
    <div class="mb-4 text-center">
      <h1 class="text-5xl font-bold text-gray-800">Statistik</h1>
      <p class="text-xl font-medium text-gray-500">
        Data Statistik Data Bayi dan Balita
      </p>
    </div>
    <div class="w-11/12">
      <ListChildren />
    </div>
  </div>
</template>

<style></style>
