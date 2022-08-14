import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const user = useUserStore();
        if (!user.isAuthenticated) {
          next({ name: "enter" });
        } else {
          next();
        }
      },
    },
    {
      path: "/enter",
      name: "enter",
      component: () => import("../views/EnterView.vue"),
    },
  ],
});

export default router;
