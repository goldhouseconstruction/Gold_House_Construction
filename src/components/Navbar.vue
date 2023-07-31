<template>
  <div class="navFrame">
    <!-- Left section (logo) -->
    <div>
      <img src="../../public/img/Logo.png" alt="Logo" class="logo" />
    </div>
    <!-- Left section (logo) -->

    <!-- Right section (navigation list) -->
    <nav class="hidden sm:block">
      <ul class="flex items-center space-x-10">
        <li class="navList"><router-link to="/">Home</router-link></li>
        <li class="navList">Projects</li>
        <li class="navList">Services</li>
        <li class="navList">Contact</li>
      </ul>
    </nav>
    <!-- Right section (navigation list) -->

    <!-- For small screen -->
    <button @click="toggleMenu()" class="toggleBtn py-5">
      <i class="fa-solid fa-bars text-white"></i>
    </button>
  </div>
  <div v-if="showMobileMenu" class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a class="dropdownLink">Home</a>
      <a class="dropdownLink">Projects</a>
      <a class="dropdownLink">Services</a>
      <a class="dropdownLink">Contact</a>
    </div>
  </div>
  <!-- For small screen -->
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let showMobileMenu = ref(false);
    let toggleMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };
    return {
      showMobileMenu,
      toggleMenu,
    };
  },
};
</script>

<style>
.custom-active-class {
  color: black;
  border: 1px solid black; /* Set the border width and color */

  padding: 5px;
  border-radius: 20px;
}
.navFrame {
  @apply flex justify-between items-center px-10 bg-[#ffff];
}
.navList {
  @apply text-black cursor-pointer;
}
.logo {
  width: 90px;
  height: 50px;
}
.dropdownLink {
  @apply text-gray-500 hover:text-gray-50 hover:bg-[#686D78] block px-3 py-2 rounded-md text-base font-medium;
}
.toggleBtn {
  float: right;
  @apply sm:hidden;
}
</style>
