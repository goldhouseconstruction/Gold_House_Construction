<template>
  <Navbar />
  <Sidenav v-if="isDashboardRoute" />

  <router-view />
  <Footer></Footer>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidenav from "./components/Sidenav.vue";
export default {
  components: {
    Footer,
    Navbar,
    Sidenav,
  },
  setup() {
    let route = useRoute();
    const isDashboardRoute = computed(() =>
      route.path.startsWith("/dashboard")
    );

    return { isDashboardRoute };
  },
};
</script>
<style>
#app {
  font-family: "Kanit", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
