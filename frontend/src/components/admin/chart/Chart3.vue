<template>
  <div style="height: 400px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const store = useStore();

onMounted(() => {
  store.dispatch("fetchMothersAll"); // Fetch all mothers data
});

const mothers = computed(() => store.getters.mothersAll);

const chartData = computed(() => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dataIbuHamil = Array(12).fill(0);
  const dataIbu = Array(12).fill(0);

  mothers.value.forEach((mother) => {
    if (mother.isPregnant) {
      const month = new Date(mother.createdAt).getMonth(); // Get month (0-11)
      dataIbuHamil[month] += 1;
    }
  });

  mothers.value.forEach((mother) => {
    const month = new Date(mother.createdAt).getMonth(); // Get month (0-11)
    dataIbu[month] += 1;
  });

  return {
    labels,
    datasets: [
      {
        label: "Ibu Hamil",
        data: dataIbuHamil,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
      },
      {
        label: "Ibu",
        data: dataIbu,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
      },
    ],
  };
});

const chartOptions = {
  maintainAspectRatio: false,
};
</script>
