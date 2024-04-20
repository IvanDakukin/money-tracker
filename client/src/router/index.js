import { createRouter, createWebHistory } from "vue-router";
import CalendarPage from "../views/CalendarPage.vue";
import DayTransactions from "@/views/DayTransactions.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: CalendarPage,
  },
  {
    path: "/day/:timestamp",
    name: "transactions",
    component: DayTransactions,
    props: (route) => ({ date: new Date(+route.params.timestamp) }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
