<template>
  <div class="wrapper">
    <div class="tabs">
      <div
        class="tabs__element"
        :class="{ 'tabs__element--active': operationType === 'add' }"
        @click="resetOperation"
      >
        Добавить
      </div>
      <div
        class="tabs__element"
        :class="{
          'tabs__element--active': operationType === 'edit',
          'tabs__element--disabled': operationType !== 'edit',
        }"
      >
        Изменить
      </div>
    </div>
    <form class="form">
      <div class="form__element">
        <input
          type="text"
          id="sum"
          class="form__field"
          v-model="transaction.sum"
          placeholder="Cумма"
        />
      </div>
      <div class="form__element">
        <input
          type="text"
          id="title"
          class="form__field"
          v-model="transaction.title"
          placeholder="Заголовок"
        />
      </div>
      <div class="form__element">
        <select
          id="transaction-type"
          v-model="transaction.type"
          class="form__select"
        >
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      <div class="form__element">
        <input
          type="submit"
          value="Сохранить"
          class="form__submit"
          @click.prevent="handleSubmit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Transaction from "@/model/Transaction";

export default {
  data() {
    return {
      transaction: {
        sum: "",
        title: "",
        date: this.date,
        type: "income",
      },
      operationType: "add",
    };
  },
  props: {
    initTransaction: Transaction,
    date: Date,
  },
  
  methods: {
    handleSubmit() {
      // TODO: валидация формы
      const transaction = {
        ...this.transaction,
        sum:
          this.transaction.type === "income"
            ? +(+this.transaction.sum).toFixed(2)
            : -+(+this.transaction.sum).toFixed(2),
      };

      if (this.operationType == "add") {
        this.$store.dispatch("transactions/postTransaction", transaction);
      } else if (this.operationType == "edit") {
        this.$store.dispatch("transactions/editTransaction", transaction);
      }
      this.resetOperation();
    },

    resetOperation() {
      this.transaction = {
        sum: "",
        title: "",
        date: this.date,
        type: "income",
      };
      this.operationType = "add";
    },
  },
  watch: {
    initTransaction(newTransaction) {
      this.transaction = { ...newTransaction };
      this.transaction.type = newTransaction.sum > 0 ? "income" : "expense";
      this.transaction.sum = Math.abs(newTransaction.sum);
      this.operationType = "edit";
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin-left: auto;
  margin-right: 40px;
}
.tabs {
  display: flex;
  background-color: $main-color;

  .tabs__element {
    color: $light-color;
    padding: 7px 10px;
    user-select: none;
    cursor: pointer;
    &--active {
      border-bottom: 2px solid $light-color;
      background-color: lighten($main-color, 7);
    }
    &--disabled {
      opacity: 0.3;
    }
  }
}

.form {
  padding: 15px 15px 1px 15px;
  width: 300px;
  border: $thin-border;
  &__element {
    margin-bottom: 20px;
  }

  &__field {
    padding: 10px 7px;
    border-bottom: 1px solid lighten($main-color, 30);
    transition: border 0.1s;
    border: $thin-border;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;

    &:hover {
      border-bottom: 1px solid lighten($main-color, 20);
    }
    &:focus {
      border-bottom: 2px solid $main-color;
    }
  }

  &__select {
    border-bottom: 1px solid lighten($main-color, 30);
    padding: 1px;
    padding: 5px;
    border-bottom: $thin-border;
    cursor: pointer;
    width: 50%;
    &:hover {
      border-bottom: 1px solid lighten($main-color, 20);
    }
  }

  &__submit {
    @extend %flat-button;
    padding: 6px 7px;
  }
}
</style>