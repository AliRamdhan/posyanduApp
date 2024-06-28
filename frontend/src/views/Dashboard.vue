<template>
  <div>
    <h1>Dashboard</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  console.log("Dashboard component mounted");
});
</script>
