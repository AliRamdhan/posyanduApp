<script setup>
import CountUp from "vue-countup-v3";

import { defineProps } from "vue";

const props = defineProps({
  statsName: {
    type: String,
    // required: true,
  },
  statsNumber: {
    type: Number,
  },
  statsDescription: {
    type: String,
  },
  statsIcon: {
    type: String,
  },
});
</script>

<template>
  <div
    class="text-center border shadow-xl w-72 h-72 flex flex-col justify-center items-center rounded-full p-4"
  >
    <div
      class="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12"
    >
      <font-awesome-icon
        :icon="statsIcon"
        class="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
      />
    </div>
    <h6 class="text-4xl font-bold text-black">
      <count-up :end-val="statsNumber"></count-up>
    </h6>
    <p class="mb-2 font-bold text-md text-black">{{ statsName }}</p>
    <p class="text-gray-800">
      {{ statsDescription }}
    </p>
  </div>
</template>
