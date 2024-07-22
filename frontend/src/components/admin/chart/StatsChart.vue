<script setup>
import { defineProps, defineEmits } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const props = defineProps({
  motherData: Array,
  badutaData: Array,
  balitaData: Array,
  labels: Array,
});

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: "Jumlah Ibu",
      backgroundColor: "#f87979",
      data: props.motherData,
    },
    {
      label: "Jumlah Baduta",
      backgroundColor: "#36a2eb",
      data: props.badutaData,
    },
    {
      label: "Jumlah Balita",
      backgroundColor: "#ffcd56",
      data: props.balitaData,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div>
    <LineChart :chart-data="chartData" :options="chartOptions" />    
  </div>
</template>
