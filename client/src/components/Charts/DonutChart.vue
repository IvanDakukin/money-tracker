<template>
  <DoughnutChart :chartData="chartData" />
</template>
	
<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  components: { DoughnutChart },
  props: {
    chartData: Object,
  },
};
</script>