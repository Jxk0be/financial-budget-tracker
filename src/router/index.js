import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HistoryView from "../views/History.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import { auth } from "../firebase";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/history",
      name: "history",
      component: HistoryView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      if (to.name === "login" || to.name === "register") next("/");
      else next();
    } else {
      console.log("No Access");
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
