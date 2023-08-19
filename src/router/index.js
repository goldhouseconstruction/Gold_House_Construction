import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import ContactUs from "../views/ContactUs.vue";
import Equipments from "../views/Equipments.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactUs,
  },
  {
    path: "/equipments",
    name: "equipments",
    component: Equipments,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "custom-active-class",
  linkExactActiveClass: "custom-exact-active-class",
});

export default router;
