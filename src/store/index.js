import { createStore } from "vuex";
import transactions from "./modules/transactions";

export default createStore({
  modules: {
    transactions
  }
});
