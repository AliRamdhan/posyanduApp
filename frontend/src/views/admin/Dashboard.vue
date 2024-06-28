<template>
  <div>
    <h1>Admin Dashboard</h1>
    <!-- Admin specific content here -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  console.log('Admin Dashboard component mounted');
});
</script>
