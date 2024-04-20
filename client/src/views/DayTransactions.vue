<template>
  <div class="main-content">
    <div class="date">
      {{ formatedDate }}
    </div>
    <div class="flex-row">
      <div>
        <TransactionsDonut
          :income="income"
          :expences="expences"
          v-if="transactions.length"
        />
        <div class="flex-row">
          <TransactionsList
            :transactions="income"
            transactions-type="income"
            @edit-transaction="
              (transaction) => (editingTransaction = { ...transaction })
            "
          />
          <TransactionsList
            :transactions="expences"
            transactions-type="expences"
            @edit-transaction="
              (transaction) => (editingTransaction = { ...transaction })
            "
          />
        </div>
      </div>
      <TransactionsForm :init-transaction="editingTransaction" :date="date" />
    </div>
  </div>
</template>

<script>
import TransactionsForm from "@/components/DayTransactions/TransactionsForm.vue";
import TransactionsDonut from "@/components/Charts/TransactionsDonut.vue";
import TransactionsList from "@/components/DayTransactions/TransactionsList.vue";
import Formatter from "@/utils/Formatter";

export default {
  data() {
    return {
      editingTransaction: null,
    };
  },
  props: {
    date: Date,
  },
  components: {
    TransactionsForm,
    TransactionsDonut,
    TransactionsList,
  },
  computed: {
    transactions() {
      return this.$store.getters["transactions/transactionsForDay"](this.date);
    },
    income() {
      return this.transactions.filter((transaction) => transaction.sum > 0);
    },
    expences() {
      return this.transactions.filter((transaction) => transaction.sum < 0);
    },
    formatedDate() {
      return Formatter.dateToSentense(this.date);
    },
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  @extend %main-content;
}

.date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 20px;
}

.flex-row {
  display: flex;
}
</style>