import { createStore } from "vuex";

export default createStore({
  state: {
    transactions: [
      {
        id: 1,
        date: new Date(),
        sum: 40000,
        title: "Зарплата",
      },
    ],
  },
  getters: {
    nextId(state) {
      return state.transactions.length + 1;
    },
    transactionsForDay: (state) => (date) =>
      state.transactions.filter(
        (transaction) =>
          transaction.date.getFullYear() === date.getFullYear() &&
          transaction.date.getMonth() === date.getMonth() &&
          transaction.date.getDate() == date.getDate()
      ),
  },
  mutations: {
    addTransaction(state, transaction) {
      state.transactions.push(transaction);
    },
  },
  actions: {
    addTransaction(context, transaction) {
      context.commit("addTransaction", transaction);
    },
  },
});
