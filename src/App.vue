<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: { Navbar },
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
