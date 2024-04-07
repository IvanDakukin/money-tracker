<template>
  <form class="form">
    <div class="form__element">
      <label for="sum">Сумма</label>
      <input type="text" id="sum" class="form__field" v-model="sum" />
    </div>
    <div class="form__element">
      <label for="title">Заголовок</label>
      <input type="text" id="title" class="form__field" v-model="title" />
    </div>
    <div class="form__element">
      <label for="transaction-type">Тип транзакции</label>
      <select id="transaction-type" v-model="type">
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
    </div>
    <div class="form__element">
      <input type="submit" value="Добавить" @click.prevent="addTransaction" />
    </div>
  </form>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      sum: 0,
      title: "",
      type: "",
    };
  },
  props: {
    date: Date,
  },
  methods: {
    addTransaction() {
      const sum = this.type === "income" ? this.sum : -this.sum;
      const transaction = {
        id: store.getters.nextId,
        date: this.date,
        sum,
        title: this.title,
      };
      store.dispatch("addTransaction", transaction);
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  padding: 15px;

  &__element {
    margin-bottom: 30px;
  }

  &__field {
    padding: 3px;
  }

  label {
    margin-right: 10px;
  }
}
</style>