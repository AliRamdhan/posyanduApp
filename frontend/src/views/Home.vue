<script setup>
import Faq from "../components/welcome/Faq.vue";
import Welcome from "../components/welcome/Welcome.vue";
import Profile from "../components/welcome/Profile.vue";
import Service from "../components/welcome/Service.vue";
import StatsNumber from "../components/welcome/StatsNumber.vue";
</script>
<template>
  <main class="flex flex-col justify-center items-center">
    <Welcome />
    <StatsNumber />
    <Profile />
    <Service />
    <Faq />
    <!-- <div>JADWAL PELAYANAN</div>
    <div>Statistic</div>
    <div>FAQ</div> -->
  </main>
</template>

<style scoped>
/* Component Styles */
</style>
