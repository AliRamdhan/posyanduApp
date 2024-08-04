import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

// Public
import Public from "../views/Public.vue";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Articles from "../views/Articles.vue";
import ArticleDetails from "../views/ArticleDetails.vue";
// import Service from "../views/Service.vue";
// import Chart from "../views/Chart.vue";
import Statistic from "../views/Statistic.vue";

// Auth
import Signin from "../views/auth/Signin.vue";
import Signup from "../views/auth/Signup.vue";

// Multi Roles
import Profile from "../views/user/Profile.vue";

// User
import DashboardUser from "../views/user/Dashboard.vue";
import DashboardUserTemplate from "../views/Dashboard.vue";

// Admin
import DashboardAdminTemplate from "../views/admin/AuthRoute.vue";
import DashboardAdmin from "../views/admin/dashboard/Dashboard.vue";
// Mother
import Mother from "../views/admin/mother/Mother.vue";
import MotherCreate from "../views/admin/mother/MotherCreate.vue";
import MotherUpdate from "../views/admin/mother/MotherUpdate.vue";
// Children
import Children from "../views/admin/children/Children.vue";
import ChildrenCreate from "../views/admin/children/ChildrenCreate.vue";
import ChildrenUpdate from "../views/admin/children/ChildrenUpdate.vue";
// Birth
import Birth from "../views/admin/birth/Birth.vue";
import BirthCreate from "../views/admin/birth/BirthCreate.vue";
import BirthUpdate from "../views/admin/birth/BirthUpdate.vue";
// Imunisasi
import Imunisation from "../views/admin/imunisation/Imunisation.vue";
import ImunisationCreate from "../views/admin/imunisation/ImunisationCreate.vue";
import ImunisationUpdate from "../views/admin/imunisation/ImunisationUpdate.vue";
// Growth
import GrowthIbuAdmin from "../views/admin/growth/mother/GrowthMother.vue";
import GrowthAnakAdmin from "../views/admin/growth/children/GrowthAnak.vue";
// // Anak
import GrowthAnakCreate from "../views/admin/growth/children/GrowthAnakCreate.vue";
import GrowthAnakUpdate from "../views/admin/growth/children/GrowthAnakUpdate.vue";
// // Ibu
import GrowthIbuCreate from "../views/admin/growth/mother/GrowthMotherCreate.vue";
import GrowthIbuUpdate from "../views/admin/growth/mother/GrowthMotherUpdate.vue";
import Forbidden from "../views/Forbidden.vue";
// // USER
import User from "../views/admin/user/User.vue";
import UserCreate from "../views/admin/user/UserCreate.vue";
import UserUpdate from "../views/admin/user/UserUpdate.vue";
// // Artikel
import Article from "../views/admin/artikel/Article.vue";
import ArticleCreate from "../views/admin/artikel/ArticleCreate.vue";
import ArticleUpdate from "../views/admin/artikel/ArticleUpdate.vue";

// Data Publik
import GrowthIbu from "../views/DataPublik/GrowthIbu.vue";
import GrowthAnak from "../views/DataPublik/GrowthAnak.vue";
// import Baduta from "../views/DataPublik/Baduta.vue";
// import Pregnant from "../views/DataPublik/Pregnant.vue";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Public,
    children: [
      // DATA PUBLIK
      {
        path: "",
        name: "welcome",
        component: Home,
      },
      {
        path: "/contact",
        name: "contact",
        component: Contact,
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
        path: "/perkembangan-ibu",
        name: "perkembangan-ibu",
        component: GrowthIbu,
      },
      {
        path: "/perkembangan-anak",
        name: "perkembanganAnaka",
        component: GrowthAnak,
      },
      {
        path: "/artikel",
        name: "artikel",
        component: Articles,
      },
      {
        path: "/artikel/:slug",
        name: "artikel-slug",
        component: ArticleDetails,
      },
    ],
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: Forbidden,
  },
  // {
  //   path: "/chart",
  //   name: "chart",
  //   component: Chart,
  // },
  // AUTHENTICATION
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/user",
    // name: "dashboardu",
    component: DashboardUserTemplate,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboardUser",
        component: DashboardUser,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    // name: "dashboard",
    component: DashboardAdminTemplate,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboardAdmin",
        component: DashboardAdmin,
        meta: { requiresAuth: true },
      },
      //artikel
      {
        path: "artikel",
        name: "dashboardAdminArtikel",
        component: Article,
        meta: { requiresAuth: true },
      },
      {
        path: "artikel-create",
        name: "artikel-create",
        component: ArticleCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "artikel-update/:id",
        name: "artikel-update",
        component: ArticleUpdate,
        meta: { requiresAuth: true },
      },
      //IBU
      {
        path: "ibu",
        name: "dashboardAdminIbu",
        component: Mother,
        meta: { requiresAuth: true },
      },
      {
        path: "ibu-create",
        name: "ibu-create",
        component: MotherCreate,
      },
      {
        path: "ibu-update/:id",
        name: "ibu-update",
        component: MotherUpdate,
        meta: { requiresAuth: true },
      },
      // ANAK
      {
        path: "anak",
        name: "dashboardAdminAnak",
        component: Children,
        meta: { requiresAuth: true },
      },
      {
        path: "anak-create",
        name: "anak-create",
        component: ChildrenCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "anak-update/:id",
        name: "anak-update",
        component: ChildrenUpdate,
        meta: { requiresAuth: true },
      },
      //Imunisasi
      {
        path: "imunisasi",
        name: "dashboardAdminImunisasi",
        component: Imunisation,
        meta: { requiresAuth: true },
      },
      {
        path: "imunisasi-create",
        name: "imunisasi-create",
        component: ImunisationCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "imunisasi-update/:id",
        name: "imunisasi-update",
        component: ImunisationUpdate,
        meta: { requiresAuth: true },
      },
      // Kelahiran
      {
        path: "kelahiran",
        name: "dashboardAdminKelahiran",
        component: Birth,
        meta: { requiresAuth: true },
      },
      {
        path: "kelahiran-create",
        name: "kelahiran-create",
        component: BirthCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "kelahiran-update/:id",
        name: "kelahiran-update",
        component: BirthUpdate,
        meta: { requiresAuth: true },
      },
      // Perkembangan Anak
      {
        path: "perkembangan-anak",
        name: "dashboardAdminPerkembanganAnak",
        component: GrowthAnakAdmin,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-anak-create",
        name: "perkembangan-anak-create",
        component: GrowthAnakCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-anak-update/:id",
        name: "perkembangan-anak-update",
        component: GrowthAnakUpdate,
        meta: { requiresAuth: true },
      },
      // Perkembangan Ibu
      {
        path: "perkembangan-ibu",
        name: "dashboardAdminPerkembanganIbu",
        component: GrowthIbuAdmin,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-ibu-create",
        name: "perkembangan-ibu-create",
        component: GrowthIbuCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-ibu-update/:id",
        name: "perkembangan-ibu-update",
        component: GrowthIbuUpdate,
        meta: { requiresAuth: true },
      },
      //user
      {
        path: "user",
        name: "dashboardAdminUser",
        component: User,
        meta: { requiresAuth: true },
      },
      {
        path: "user-create",
        name: "user-create",
        component: UserCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "user-update/:id",
        name: "user-update",
        component: UserUpdate,
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
    if (to.name === "dashboardAdmin" && user.role !== "Admin") {
      next({ name: "forbidden" });
    } else if (to.name === "dashboardUser" && user.role !== "User") {
      next({ name: "forbidden" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
