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
};
