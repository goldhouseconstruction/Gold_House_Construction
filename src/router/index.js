import { createRouter, createWebHistory } from "vue-router";
import HeroSection from "../views/HeroSection.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HeroSection,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
