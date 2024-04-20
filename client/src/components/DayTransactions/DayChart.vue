<template>
  <DonutChart :chartData="chartData" class="day-chart"/>
</template>
  
<script>
import DonutChart from '../Charts/DonutChart.vue';

export default {
  props: {
    date: Date,
  },
  components: {
    DonutChart,
  },
  computed: {
    transactions() {
      return this.$store.getters.transactionsForDay(this.date);
    },
    chartData() {
      const sumIncome = this.transactions.reduce(
        (sum, transaction) => sum + Math.max(0, transaction.sum),
        0
      );
      const sumExpences = this.transactions.reduce(
        (sum, transaction) => sum + Math.abs(Math.min(0, transaction.sum)),
        0
      );
      return {
        labels: ["Доход", "Расход"],
        datasets: [
          {
            data: [sumIncome, sumExpences],
            backgroundColor: ["#4caf50", "#E53935"],
          },
        ],
      };
    }
  }

};
</script>

<style lang="scss" scoped>
.day-chart {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}
</style>