<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  statsName: {
    type: String,
    // required: true,
  },
  statsNumberUsia: {
    type: Number,
  },
  statsNumberTotal: {
    type: Number,
  },
});
</script>

<template>
  <div class="flow-root">
    <dl class="-my-3 divide-y divide-gray-100 text-sm">
      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">Rata-rata Usia {{ statsName }} :</dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberUsia }} Tahun</dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Jumlah {{ statsName }} Total :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberTotal }} Orang</dd>
      </div>
    </dl>
  </div>
</template>
