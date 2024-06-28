import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

// Public
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Activity from "../views/Activity.vue";
import Service from "../views/Service.vue";
import Statistic from "../views/Statistic.vue";

// Auth
import Signin from "../views/auth/Signin.vue";
import Signup from "../views/auth/Signup.vue";

// Multi Roles
import Profile from "../views/user/Profile.vue";

// User
import DashboardUser from "../views/user/Dashboard.vue";

// Admin
import DashboardAdmin from "../views/admin/Dashboard.vue";

import Dashboard from "../views/Dashboard.vue";
import Forbidden from "../views/Forbidden.vue";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Home,
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: Forbidden,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/service",
    name: "service",
    component: Service,
  },
  {
    path: "/activity",
    name: "activity",
    component: Activity,
  },
  {
    path: "/statistic",
    name: "statistic",
    component: Statistic,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "admin",
        name: "dashboardAdmin",
        component: DashboardAdmin,
        meta: { requiresAuth: true },
      },
      {
        path: "user",
        name: "dashboardUser",
        component: DashboardUser,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = store.getters.user;
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "signin" });
  } else if (requiresAuth) {
    if (to.name === "dashboardAdmin" && user.data.role !== "Admin") {
      next({ name: "forbidden" });
    } else if (to.name === "dashboardUser" && user.data.role !== "User") {
      next({ name: "forbidden" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
