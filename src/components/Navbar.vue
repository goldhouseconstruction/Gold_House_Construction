<template>
  <div class="navFrame">
    <!-- Left section (logo) -->
    <div class="text-black font-bold text-xl">My Logo</div>

    <!-- Right section (navigation list) -->
    <nav class="hidden sm:block">
      <ul class="flex items-center space-x-4">
        <li class="navListColor">Home</li>
        <li class="navListColor">About</li>
        <li class="navListColor">Services</li>
        <li class="navListColor">Contact</li>
      </ul>
    </nav>

    <button @click="toggleMenu" class="sm:hidden toggleBtn block">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {},
};
</script>

<style>
.navFrame {
  @apply flex justify-between items-center px-5 pt-2;
}
.navListColor {
  @apply text-[#C9C9CC];
}
.toggleBtn {
  float: right;
}
</style>
