<template>
  <div class="main-content">
    <div class="date">
      {{ formatedDate }}
    </div>
    <div class="flex-row">
      <div class="transactions-wrapper">
        <TransactionsChart :date="date" v-if="transactions.length"/>
        <div class="flex-row">
          <div class="transactions">
            <div class="transactions__opener">
              <label for="income-open">Доходы</label>
              <button
                id="income-open"
                class="open"
                @click="toggleIncome"
                :class="{ 'open--rotated': incomeIsOpen }"
              >
                <span class="material-symbols-outlined"> arrow_drop_down </span>
              </button>
            </div>
            <div
              class="transactions__list"
              :class="{ 'transactions__list--open': incomeIsOpen }"
            >
              <div v-if="income.length">
                <div
                  class="transactions__row"
                  v-for="inc in income"
                  :key="inc.id"
                >
                  <div class="data">
                    <div class="data__title">{{ inc.title }}</div>
                    <span class="data__sum data__sum--income">
                      {{ inc.sum }}</span
                    >
                  </div>
                  <div class="manage">
                    <span class="material-symbols-outlined manage__edit">
                      edit
                    </span>
                    <span
                      class="material-symbols-outlined manage__delete"
                      @click="deleteTransaction(inc.id)"
                    >
                      delete
                    </span>
                  </div>
                </div>
              </div>
              <div v-else>Нет данных о доходах</div>
            </div>
          </div>

          <div class="transactions">
            <div class="transactions__opener">
              <label for="expence-open">Расходы</label>
              <button
                id="expence-open"
                class="open"
                @click="toggleExpences"
                :class="{ 'open--rotated': expencesIsOpen }"
              >
                <span class="material-symbols-outlined"> arrow_drop_down </span>
              </button>
            </div>
            <div
              class="transactions__list"
              :class="{ 'transactions__list--open': expencesIsOpen }"
            >
              <div v-if="expences.length">
                <div
                  class="transactions__row"
                  v-for="expence in expences"
                  :key="expence.id"
                >
                  <div class="data">
                    <span class="data__title"> {{ expence.title }}</span>
                    <span class="data__sum data__sum--expence">
                      {{ expence.sum }}</span
                    >
                  </div>

                  <div class="manage">
                    <span class="material-symbols-outlined manage__edit">
                      edit
                    </span>
                    <span
                      class="material-symbols-outlined manage__delete"
                      @click="deleteTransaction(expence.id)"
                    >
                      delete
                    </span>
                  </div>
                </div>
              </div>
              <div v-else>Нет данных о расходах</div>
            </div>
          </div>
        </div>
      </div>

      <TransactionsForm :date="date" />
    </div>
  </div>
</template>

<script>
import TransactionsForm from "@/components/DayTransactions/TransactionsForm.vue";
import Formatter from "@/utils/Formatter";
import TransactionsChart from "@/components/DayTransactions/DayChart.vue";

export default {
  data() {
    return {
      incomeIsOpen: true,
      expencesIsOpen: true,
    };
  },
  props: {
    date: Date,
  },
  components: {
    TransactionsForm,
    TransactionsChart,
  },
  computed: {
    transactions() {
      return this.$store.getters.transactionsForDay(this.date);
    },
    income() {
      return this.transactions.filter((transaction) => transaction.sum > 0);
    },
    expences() {
      return this.transactions
        .filter((transaction) => transaction.sum < 0)
        .map((transaction) => ({
          ...transaction,
          sum: Math.abs(transaction.sum),
        }));
    },
    formatedDate() {
      return Formatter.dateToSentense(this.date);
    },
  },
  methods: {
    toggleIncome() {
      this.incomeIsOpen = !this.incomeIsOpen;
    },
    toggleExpences() {
      this.expencesIsOpen = !this.expencesIsOpen;
    },
    deleteTransaction(id) {
      this.$store.dispatch("deleteTransaction", id);
    },
  },
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

.transactions {
  width: 400px;
  margin-right: 30px;

  &__opener {
    font-weight: bold;
    display: flex;
    font-size: 18px;
    margin-bottom: 10px;

    .open {
      @extend %button;
      @extend %vert-center;
      transform: scale(1.1);
      transition: transform 0.2s ease-out;
      &--rotated {
        transform: scale(1.1) rotate(270deg);
      }
    }
  }

  &__list {
    display: none;
    &--open {
      display: block;
    }
  }

  &__row {
    display: flex;
    margin-bottom: 20px;
  }
}

.data {
  display: flex;
  justify-content: space-between;
  border-bottom: $thin-border;
  flex: 1;
  padding: 8px 4px;

  &__sum--income {
    color: $green;
  }
  &__sum--expence {
    color: $red;
  }
}

.manage {
  @extend %vert-center;
  margin-left: 25px;
  &__edit {
    @extend %button;
    color: $main-color;
    margin-right: 10px;
  }

  &__delete {
    @extend %button;
    color: $red;
  }
}
</style>