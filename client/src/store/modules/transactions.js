import Transaction from "@/model/Transaction";
import api from "@/api/api";

export default {
  state: {
    transactions: [],
  },

  getters: {
    transactionsForDay: (state) => (date) =>
      state.transactions.filter(
        (transaction) =>
          transaction.date.getFullYear() === date.getFullYear() &&
          transaction.date.getMonth() === date.getMonth() &&
          transaction.date.getDate() == date.getDate()
      ),
  },

  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions.map(
        (transaction) =>
          new Transaction(
            transaction.id,
            new Date(transaction.date),
            +transaction.sum,
            transaction.title
          )
      );
    },

    addTransaction(state, transaction) {
      state.transactions.push(
        new Transaction(
          transaction.id,
          new Date(transaction.date),
          +transaction.sum,
          transaction.title
        )
      );
    },
    deleteTransaction(state, id) {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === id
      );
      state.transactions.splice(index, 1);
    },
    setTransaction(state, transaction) {
      const index = state.transactions.findIndex(
        (tr) => tr.id === transaction.id
      );
      state.transactions[index] = new Transaction(
        transaction.id,
        transaction.date,
        transaction.sum,
        transaction.title
      );
    },
  },

  actions: {
    async fetchTransactions({ commit }) {
      try {
        commit("setTransactions", await api.transactions());
      } catch (e) {
        console.error(e);
      }
    },
    async postTransaction({ commit }, transaction) {
      try {
        const postedTransaction = await api.postTransaction(transaction);
        commit("addTransaction",  postedTransaction);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteTransaction({ commit }, id) {
      await api.deleteTransaction(id);
      commit("deleteTransaction", id);
    },
    async editTransaction({ commit }, transaction) {
      await api.putTransaction(transaction.id, transaction);
      commit("setTransaction", transaction);
    },
  },
};
