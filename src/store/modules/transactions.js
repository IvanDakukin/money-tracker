import Transaction from "@/model/Transaction";

export default {
  state: {
    transactions: [
      {
        id: 1,
        date: new Date(),
        sum: 40000,
        title: "Зарплата",
      },
      {
        id: 2,
        date: new Date(),
        sum: -20000,
        title: "Покупка телефона",
      },
      {
        id: 3,
        date: new Date(),
        sum: -500.25,
        title: "Продукты",
      },
      {
        id: 3,
        date: new Date("05-01-2024"),
        sum: -500.25,
        title: "Продукты",
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
      state.transactions.push(
        new Transaction(
          transaction.id,
          transaction.date,
          transaction.sum,
          transaction.title
        )
      );
    },
    deleteTransaction(state, id) {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === id
      );
      if(index !== -1) {
        state.transactions.splice(index, 1);
      }
    },
  },

  actions: {
    addTransaction({ commit }, transaction) {
      commit("addTransaction", transaction);
    },
    deleteTransaction({ commit }, id) {
      commit("deleteTransaction", id);
    },
  },
};
