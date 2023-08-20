import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import ContactUs from "../views/ContactUs.vue";
import Equipments from "../views/Equipments.vue";
import Admin_Auth from "../views/Admin_Auth.vue";
import Clients from "../views/Clients.vue";
import EditEquipments from "../views/EditEquipments.vue";
import EditProjects from "../views/EditProjects.vue";

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
  {
    path: "/admin_auth",
    name: "admin_auth",
    component: Admin_Auth,
  },
  {
    path: "/dashboard/clients",
    name: "clients",
    component: Clients,
  },
  {
    path: "/dashboard/equipments",
    name: "editequipments",
    component: EditEquipments,
  },
  {
    path: "/dashboard/projects",
    name: "editprojects",
    component: EditProjects,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "custom-active-class",
  linkExactActiveClass: "custom-exact-active-class",
});

export default router;
