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
  store.dispatch("fetchChildrenBaduta");
  store.dispatch("fetchChildrenBalita");
  store.dispatch("fetchChildrenAll");
});

const badutas = computed(() => store.getters.childBaduta);
const balitas = computed(() => store.getters.childBalita);
const childs = computed(() => store.getters.childrens);

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

  // Initialize data arrays for each category
  const dataBaduta = Array(12).fill(0);
  const dataBalita = Array(12).fill(0);
  const dataChildren = Array(12).fill(0);

  // Process Baduta data
  badutas.value.forEach((baduta) => {
    const month = new Date(baduta.dob).getMonth();
    dataBaduta[month] += 1;
  });

  // Process Balita data
  balitas.value.forEach((balita) => {
    const month = new Date(balita.dob).getMonth();
    dataBalita[month] += 1;
  });

  // Process Children data
  childs.value.forEach((child) => {
    const month = new Date(child.dob).getMonth();
    dataChildren[month] += 1;
  });

  return {
    labels,
    datasets: [
      {
        label: "Baduta",
        data: dataBaduta,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
      },
      {
        label: "Balita",
        data: dataBalita,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
      },
      {
        label: "Total Anak",
        data: dataChildren,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
