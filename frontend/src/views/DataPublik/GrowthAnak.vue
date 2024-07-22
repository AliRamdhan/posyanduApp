<script setup>
import ChartAnak from "../../components/admin/chart/Chart4.vue";
import StatsPerkembanganAnak from "../../components/datapublik/StatsPerkembanganAnak.vue";
</script>
<template>
  <div class="w-full min-h-screen flex flex-col items-center py-8">
    <div class="mb-4 text-center">
      <h1 class="text-5xl font-bold text-gray-800">Statistik</h1>
      <p class="text-xl font-medium text-gray-500">
        Data Statistik Data Perkembagan Anak
      </p>
    </div>
    <div class="w-11/12">
      <StatsPerkembanganAnak />
    </div>
    <div class="w-11/12 mt-4">
      <ChartAnak />
    </div>
  </div>
</template>

<style></style>
