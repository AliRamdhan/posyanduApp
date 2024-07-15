<script setup>
import StatsCard from "./StatsCard.vue";
</script>

<template>
  <div class="py-8">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        statsName="PPP"
        statsNumber="10"
        statsDescription="lorem"
        statsIcon="fa-solid fa-person-pregnant"
      />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </div>
  </div>
</template>
