<template>
  <div class="transactions-list">
    <div class="transactions-list__header">
      <label :for="this.transactionsType + '-opener'">{{
        transactionListTitle
      }}</label>
      <button
        :id="this.transactionsType + '-opener'"
        class="unwrap-btn"
        @click="toggleList"
        :class="{ 'unwrap-btn--closed': !listIsOpen }"
      >
        <span class="material-symbols-outlined"> arrow_drop_down </span>
      </button>
    </div>

    <div
      class="transactions-list__body"
      :class="{ 'transactions-list__body--open': listIsOpen }"
    >
      <div v-if="transactions.length">
        <div
          class="transaction"
          v-for="transaction in transactions"
          :key="transaction.id"
        >
          <div class="transaction__data">
            <div>{{ transaction.title }}</div>
            <span
              :class="{
                'price--green': this.transactionsType == 'income',
                'price--red': this.transactionsType === 'expences',
              }"
            >
              {{ Math.abs(transaction.sum) }}</span
            >
          </div>
          <div class="transaction__manage">
            <span class="material-symbols-outlined edit-btn"
            @click="$emit('editTransaction', transaction)"> edit </span>
            <span
              class="material-symbols-outlined delete-btn"
              @click="deleteTransaction(transaction.id)"
            >
              delete
            </span>
          </div>
        </div>
      </div>
      <div v-else>Нет данных</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIsOpen: true,
      transactionListTitle:
        this.transactionsType === "income" ? "Доходы" : "Расходы",
    };
  },
  props: {
    transactions: Array,
    transactionsType: String,
  },
  methods: {
    toggleList() {
      this.listIsOpen = !this.listIsOpen;
    },
    deleteTransaction(id) {
      this.$store.dispatch("transactions/deleteTransaction", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.transactions-list {
  width: 420px;
  margin-right: 30px;

  &__header {
    font-weight: bold;
    display: flex;
    font-size: 18px;
    margin-bottom: 10px;

    .unwrap-btn {
      @extend %button;
      @extend %vert-center;
      transform: scale(1.1) rotate(270deg);
      transition: transform 0.2s ease-out;
      &--closed {
        transform: scale(1.1);
      }
    }
  }

  &__body {
    display: none;
    &--open {
      display: block;
    }
  }
}

.transaction {
  display: flex;
  margin-bottom: 20px;

  &__data {
    display: flex;
    justify-content: space-between;
    border-bottom: $thin-border;
    flex: 1;
    padding: 8px 4px;

    .price {
      &--green {
        color: $green;
      }
      &--red {
        color: $red;
      }
    }
  }

  &__manage {
    @extend %vert-center;
    margin-left: 25px;
    .edit-btn {
      @extend %button;
      color: $main-color;
      margin-right: 10px;
    }

    .delete-btn {
      @extend %button;
      color: $red;
    }
  }
}
</style>