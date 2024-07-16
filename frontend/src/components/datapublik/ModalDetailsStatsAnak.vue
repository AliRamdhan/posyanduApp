<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  statsName: {
    type: String,
    // required: true,
  },
  statsNumberLK: {
    type: Number,
  },
  statsNumberPR: {
    type: Number,
  },
  statsNumberUsia: {
    type: Number,
  },
  statsNumberTB: {
    type: Number,
  },
  statsNumberBB: {
    type: Number,
  },
  statsNumberUrutan: {
    type: Number,
  },
  statsNumberGroup: {
    type: Number,
  },
});
</script>

<template>
  <div class="flow-root">
    <dl class="-my-3 divide-y divide-gray-100 text-sm">
      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Jumlah {{ statsName }} Laki-laki :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberLK }} Anak</dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Jumlah {{ statsName }} Perempuan :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberPR }} Anak</dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Rata-rata Usia Anak {{ statsName }} :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberUsia }} Tahun</dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Rata-rata Tinggi Badan {{ statsName }} :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberTB }} Cm</dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">
          Rata-rata Berat Badan {{ statsName }} :
        </dt>
        <dd class="text-gray-700 sm:col-span-2">{{ statsNumberBB }} Kg</dd>
      </div>
    </dl>
  </div>
</template>
