import { createRouter, createWebHistory } from "vue-router";
// Public
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Activity from "../views/Activity.vue";
import Service from "../views/Service.vue";
import Statistic from "../views/Statistic.vue";
// Auth
import Signin from "../views/auth/Signin.vue";
import Signup from "../views/auth/Signup.vue";
import Profile from "../views/user/Profile.vue"

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Home,
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
