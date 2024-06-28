<template>
  <div>
    <h1>User Dashboard</h1>
    <!-- User specific content here -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  console.log('User Dashboard component mounted');
});
</script>
