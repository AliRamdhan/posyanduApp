<script setup>
import { defineProps, defineEmits } from "vue";
import formatTime from "../../utils/FormatTime";

const props = defineProps({
  title: {
    type: String,
  },
  slug: {
    type: Number,
  },
  image: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
</script>
<template>
  <div class="lg:flex">
    <img
      class="object-cover w-full h-56 rounded-lg lg:w-64"
      :src="image"
      alt=""
    />

    <div class="flex flex-col justify-between py-6 lg:mx-6">
      <a
        :href="`/artikel/${slug}`"
        class="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
      >
        {{ title }}
      </a>
      <p class="line-clamp-3">{{ shortDescription }}</p>
      <span class="text-sm text-gray-500 dark:text-gray-300"
        >Dibuat pada: {{ formatTime(createdAt) }}</span
      >
    </div>
  </div>
</template>
