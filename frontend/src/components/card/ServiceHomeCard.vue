<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name1: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div>
      <p class="mb-4 text-3xl font-bold">{{ name1 }}</p>
      <p class="text-gray-700">
        {{ description1 }}
      </p>
    </div>
    <div>
      <p class="mb-4 mt-4 text-3xl font-bold">{{ name2 }}</p>
      <p class="text-gray-700">
        {{ description2 }}
      </p>
    </div>
  </div>
</template>

<style></style>
