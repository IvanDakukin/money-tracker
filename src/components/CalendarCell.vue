<template>
  <div class="cell">
    <div class="cell__date">
      <div class="date-wrapper" :class="{ 'date-wrapper--today': isToday }">
        {{ date.getDate() }}
      </div>
      <div class="add-button">
        <router-link class="date-link" :to="dayUrl"> + </router-link>
      </div>
    </div>
    <div class="cell__transactions">
      <div class="income" v-if="sumIncome">Доход: {{ sumIncome }}</div>
      <div class="expences" v-if="sumExpences">Расход: {{ sumExpences }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: Date,
  },
  computed: {
    transactions() {
      return this.$store.getters.transactionsForDay(this.date);
    },
    dayUrl() {
      return `day/${+this.date}`;
    },
    isToday() {
      const dateCopy = new Date(this.date).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      return dateCopy == today;
    },
    sumIncome() {
      return this.transactions.reduce(
        (sum, transaction) =>
          transaction.sum > 0 ? sum + transaction.sum : sum,
        0
      );
    },
    sumExpences() {
      return this.transactions.reduce(
        (sum, transaction) =>
          transaction.sum < 0 ? sum + Math.abs(transaction.sum) : sum,
        0
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.cell {
  display: flex;
  flex-direction: column;

  &:hover .add-button {
    opacity: 1;
  }

  &__date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}

.date-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 26px;
  border-radius: 8px;
  &--today {
    background-color: $main-color;
    color: $light-color;
  }
}

.date-link {
  text-decoration: none;
  color: inherit;
}

.add-button {
  @extend %tonal-button;
  opacity: 0;
  width: 28px;
  height: 26px;
  font-weight: bold;
  transition: opacity 0.2s;
  margin-right: 3px;
}
.income,
.expences {
  font-size: 15px;
  padding-left: 5px;
}
.income {
  color: $green;
}
.expences {
  color: $red;
}
</style>