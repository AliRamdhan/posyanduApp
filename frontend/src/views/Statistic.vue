<template>
  <div>
    <input type="month" v-model="selectedMonth" @change="updateMonth" />
    <button @click="exportData">Export Data</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
const selectedMonth = ref(`${currentYear}-${currentMonth}`);
import { useStore } from "vuex";
const store = useStore();

const updateMonth = () => {
  // Handle the selected month change if needed
  // For example, you might want to format or process the selectedMonth value here
};
const exportData = () => {
  store.dispatch("exportData", selectedMonth.value);
};
</script>
