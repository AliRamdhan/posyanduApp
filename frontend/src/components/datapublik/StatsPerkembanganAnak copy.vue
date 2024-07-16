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
    <p>
      ANAK <br />
      BADUTA LK/PR <br />
      BALITA LK/PR <br />
      RATA-RATA USIA ANAK BADUTA - ANAK KE BERAPA <br />
      RATA-RATA USIA ANAK BALITA - ANAK KE BERAPA <br />
      PERKEMBANGAN ANAK <br />
      RATA-RATA TINGGI <br />
      RATA RATA BB <br />
      RATA RATA GROUP FASE <br />
    </p>
  </div>
</template>
