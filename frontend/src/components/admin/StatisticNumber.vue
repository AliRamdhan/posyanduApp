<script setup>
import CountUp from "vue-countup-v3";
import StatsPerkembanganIbu from "../../components/datapublik/StatsPerkembanganIbu.vue";
import StatsPerkembanganAnak from "../../components/datapublik/StatsPerkembanganAnak.vue";
</script>
<template>
  <div class="w-full min-h-screen flex flex-col items-center py-8">
    <div class="mb-4 text-center">
      <h1 class="text-3xl lg:text-5xl font-bold text-gray-800">Statistik</h1>
      <p class="text-lg lg:text-2xl font-medium text-gray-500">
        Data Statistik Data Anak and Ibu
      </p>
    </div>
    <StatsPerkembanganAnak />
    <StatsPerkembanganIbu />
  </div>
</template>

<style></style>
