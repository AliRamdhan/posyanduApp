<template>
  <div style="height: 400px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Line } from "vue-chartjs";
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
import formatTime from "../../../utils/FormatTime";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  motherId: {
    type: String,
    required: true,
  },
});

const store = useStore();
const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const label = tooltipItem.dataset.label;
          const value = tooltipItem.raw;
          const unit = label === "Height" ? "cm" : "kg";
          return `${label}: ${value} ${unit}`;
        },
      },
    },
  },
};

const fetchGrowthData = async (motherId) => {
  try {
    const data = await store.dispatch("fetchMotherGrowthbyMom", motherId);
    const labels = data.map((record) => formatTime(record.checkDate));
    const heights = data.map((record) => record.height);
    const weights = data.map((record) => record.weight);

    chartData.value = {
      labels,
      datasets: [
        {
          label: "Tinggi Badan",
          data: heights,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "Berat Badan",
          data: weights,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching growth data:", error);
  }
};

watch(
  () => props.motherId,
  async (newmotherId) => {
    if (newmotherId) {
      await fetchGrowthData(newmotherId);
    }
  }
);

onMounted(async () => {
  await fetchGrowthData(props.motherId);
});
</script>

<style scoped>
/* Add styles if needed */
</style>
