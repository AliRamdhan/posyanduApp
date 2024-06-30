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
// Mother
import Mother from "../views/admin/mother/Mother.vue";
import MotherCreate from "../views/admin/mother/MotherCreate.vue";
import MotherUpdate from "../views/admin/mother/MotherUpdate.vue";
// Children
import Children from "../views/admin/children/Children.vue";
// import Child from "../views/admin/children/Child.vue";
import ChildrenCreate from "../views/admin/children/ChildrenCreate.vue";
import ChildrenUpdate from "../views/admin/children/ChildrenUpdate.vue";

// Birth
import Birth from "../views/admin/birth/Birth.vue";
import BirthCreate from "../views/admin/birth/BirthCreate.vue";
import BirthUpdate from "../views/admin/birth/BirthUpdate.vue";
// Imunisasi
import Imunisation from "../views/admin/imunisation/Imunisation.vue"
import ImunisationCreate from "../views/admin/imunisation/ImunisationCreate.vue"
import ImunisationUpdate from "../views/admin/imunisation/ImunisationUpdate.vue"

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
    path: "/mother",
    name: "mother",
    component: Mother,
  },
  {
    path: "/mother-create",
    name: "mother-create",
    component: MotherCreate,
  },
  {
    path: "/mother-update/:id",
    name: "mother-update",
    component: MotherUpdate,
  },
  {
    path: "/imunisasi",
    name: "imunisasi",
    component: Imunisation,
  },
  {
    path: "/imunisasi-create",
    name: "imunisasi-create",
    component: ImunisationCreate,
  },
  {
    path: "/imunisasi-update/:id",
    name: "imunisasi-update",
    component: ImunisationUpdate,
  },
  {
    path: "/birth",
    name: "birth",
    component: Birth,
  },
  {
    path: "/birth-create",
    name: "birth-create",
    component: BirthCreate,
  },
  {
    path: "/birth-update",
    name: "birth-update",
    component: BirthUpdate,
  },
  // {
  //   path: "/children-try",
  //   name: "children-try",
  //   component: Child,
  // },
  {
    path: "/children",
    name: "children",
    component: Children,
  },
  {
    path: "/children-create",
    name: "children-create",
    component: ChildrenCreate,
  },
  // {
  //   path: "/children-creates",
  //   name: "children-creates",
  //   component: ChildrenCreates,
  // },
  {
    path: "/children-update/:id",
    name: "children-update",
    component: ChildrenUpdate,
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
