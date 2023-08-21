import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import ContactUs from "../views/ContactUs.vue";
import Equipments from "../views/Equipments.vue";
import Admin_Auth from "../views/Admin_Auth.vue";
import Clients from "../views/Clients.vue";
import EditEquipments from "../views/EditEquipments.vue";
import EditProjects from "../views/EditProjects.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/equipments",
    name: "editequipments",
    component: EditEquipments,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/projects",
    name: "editprojects",
    component: EditProjects,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "custom-active-class",
  linkExactActiveClass: "custom-exact-active-class",
});

//admin route guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  let user = await auth.currentUser;

  if (user === null) {
    // If user is initially null, wait for auth state change
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (updatedUser) => {
        user = updatedUser;
        unsubscribe(); // Unsubscribe once the user state is resolved
        resolve(); // Resolve the promise
      });
    });
  }

  if (requiresAuth) {
    if (user) {
      next();
    } else {
      next("/");
    }
  } else {
    // Route doesn't require authentication, proceed to the route
    next();
  }
});
export default router;
