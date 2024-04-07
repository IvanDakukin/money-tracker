<template>
  <div class="transactions">
    <div v-for="transaction in transactions" :key="transaction.id">
      {{ transaction.title }}
      {{ transaction.sum }}
    </div>
    <TransactionsForm :date="date" />
  </div>
</template>

<script>
import TransactionsForm from "@/components/TransactionsForm.vue";
import { mapState } from "vuex";

export default {
  props: {
    date: Date,
  },
  components: {
    TransactionsForm,
  },
  computed: {
    ...mapState({
      transactions(_, getters)  {
        return getters.transactionsForDay(this.date);
      },
    }),
  },
};
</script>

