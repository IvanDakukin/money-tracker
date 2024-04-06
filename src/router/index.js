import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import TransactionsView from "@/views/TransactionsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/day/:timestamp",
    name: "transactions",
    component: TransactionsView,
    props: (route) => ({ date: new Date(+route.params.timestamp) }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
