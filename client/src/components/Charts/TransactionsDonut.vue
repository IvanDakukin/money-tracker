<template>
  <DoughnutChart :chartData="chartData" class="donut"/>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  components: { DoughnutChart },
  props: {
    income: Array,
    expences: Array,
  },
  computed: {
    chartData() {
      const sumIncome = this.income.reduce((sum, inc) => sum + inc.sum, 0);
      const sumExpences = this.expences.reduce(
        (sum, exp) => sum + Math.abs(exp.sum),
        0
      );
      return {
        labels: ["Расход", "Доход"],
        datasets: [
          {
            data: [sumExpences, sumIncome],
            backgroundColor: ["#E53935", "#4caf50"],
          },
        ],
      };
    },
  },
};
</script>


<style lang="scss" scoped>
.donut {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}
</style>