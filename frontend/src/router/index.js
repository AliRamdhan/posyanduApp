import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

// Public
import Public from "../views/Public.vue";
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
import DashboardUserTemplate from "../views/user/Dashboard.vue";
import DashboardUser from "../views/Dashboard.vue";

// Admin
import DashboardAdminTemplate from "../views/admin/AuthRoute.vue";
import DashboardAdmin from "../views/admin/dashboard/Dashboard.vue";
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
import Imunisation from "../views/admin/imunisation/Imunisation.vue";
import ImunisationCreate from "../views/admin/imunisation/ImunisationCreate.vue";
import ImunisationUpdate from "../views/admin/imunisation/ImunisationUpdate.vue";
// Growth
import GrowthIbuAdmin from "../views/admin/growth/mother/GrowthMother.vue";
import GrowthAnakAdmin from "../views/admin/growth/children/GrowthAnak.vue";
// // Anak
import GrowthAnakCreate from "../views/admin/growth/children/GrowthAnakCreate.vue"
import GrowthAnakUpdate from "../views/admin/growth/children/GrowthAnakUpdate.vue"
// // Ibu
import GrowthIbuCreate from "../views/admin/growth/mother/GrowthMotherCreate.vue"
import GrowthIbuUpdate from "../views/admin/growth/mother/GrowthMotherUpdate.vue"
import Forbidden from "../views/Forbidden.vue";

// Data Publik
import GrowthIbu from "../views/DataPublik/GrowthIbu.vue";
import GrowthAnak from "../views/DataPublik/GrowthAnak.vue";
import Baduta from "../views/DataPublik/Baduta.vue";
import Pregnant from "../views/DataPublik/Pregnant.vue";

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
        path: "/ibu-hamil",
        name: "ibuHamil",
        component: Pregnant,
      },
      {
        path: "/baduta",
        name: "baduta",
        component: Baduta,
      },
    ],
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: Forbidden,
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
  // {
  //   path: "/dashboard/admin/mother",
  //   name: "mother",
  //   component: Mother,
  // },
  // {
  //   path: "/dashboard/admin/imunisasi",
  //   name: "imunisasi",
  //   component: Imunisation,
  // },
  // {
  //   path: "/dashboard/admin/birth",
  //   name: "birth",
  //   component: Birth,
  // },
  // {
  //   path: "/children-try",
  //   name: "children-try",
  //   component: Child,
  // },
  // {
  //   path: "/dashboard/admin/children",
  //   name: "children",
  //   component: Children,
  // },
  // {
  //   path: "/children-creates",
  //   name: "children-creates",
  //   component: ChildrenCreates,
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
    name: "dashboard",
    component: DashboardUserTemplate,
    meta: { requiresAuth: true },
    children: [
      // {
      //   path: "admin",
      //   name: "dashboardAdmin",
      //   component: DashboardAdmin,
      //   meta: { requiresAuth: true },
      // },
      {
        path: "",
        name: "dashboardUser",
        component: DashboardUser,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/dashboard/admin",
    name: "dashboard",
    component: DashboardAdminTemplate,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboardAdmin",
        component: DashboardAdmin,
        meta: { requiresAuth: true },
      },
      {
        path: "ibu",
        name: "dashboardAdminIbu",
        component: Mother,
        meta: { requiresAuth: true },
      },
      {
        path: "imunisasi",
        name: "dashboardAdminImunisasi",
        component: Imunisation,
        meta: { requiresAuth: true },
      },
      {
        path: "anak",
        name: "dashboardAdminAnak",
        component: Children,
        meta: { requiresAuth: true },
      },
      {
        path: "kelahiran",
        name: "dashboardAdminKelahiran",
        component: Birth,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-anak",
        name: "dashboardAdminPerkembanganAnak",
        component: GrowthAnakAdmin,
        meta: { requiresAuth: true },
      },
      {
        path: "perkembangan-ibu",
        name: "dashboardAdminPerkembanganIbu",
        component: GrowthIbuAdmin,
        meta: { requiresAuth: true },
      },
      //IBU
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
    console.log(user.role);
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
