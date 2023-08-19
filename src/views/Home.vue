<template>
  <HeroforHome />
  <Services />
  <Footer></Footer>
</template>

<script>
import Footer from "../components/Footer";
import Services from "../components/Services";
import HeroforHome from "../components/HeroforHome.vue";
export default {
  components: {
    Footer,
    Services,
    HeroforHome,
  },
};
</script>

<style scoped></style>
