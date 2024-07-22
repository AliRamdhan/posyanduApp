<script setup>
import BarChart from "../components/admin/chart/Chart1.vue";
import Chart2 from "../components/admin/chart/Chart2.vue";
import Chart3 from "../components/admin/chart/Chart3.vue";
import Chart4 from "../components/admin/chart/Chart4.vue";
import Chart5 from "../components/admin/chart/List.vue";
import Chart6 from "../components/admin/chart/ListIbu.vue";
// import DoughnutChart from "./components/DoughnutChart.vue";
</script>

<template>
  <div class="container">
    <div>
      <BarChart />
    </div>
    <div><Chart2 /></div>
    <div><Chart3 /></div>
    <div><Chart4 /></div>
    <div>
      <div>Anak</div>
      <Chart5 />
    </div>
    <div>
      <div>IBU</div>
      <Chart6 />
    </div>
    <!-- <div>
      <DoughnutChart />
    </div> -->
  </div>
</template>
