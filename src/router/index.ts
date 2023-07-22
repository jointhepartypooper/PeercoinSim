import { createRouter, createWebHistory } from "vue-router";
import RewardsView from "../views/RewardsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: RewardsView,
    },
  ],
});

export default router;
