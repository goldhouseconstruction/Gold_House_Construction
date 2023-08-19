<template>
  <div class="footer">
    <div class="container w-[80%] mx-auto px-4 mt-10 py-10">
      <div class="footerResponsive">
        <div>
          <p class="text-[#69727A]">&copy; Gold House International CO.,LTD</p>
        </div>
        <div>
          <p class="footerHeading">Address:</p>
          <p class="footerText">
            <a href="https://goo.gl/maps/a9wotcA555WbCvJb8">
              No(3), Thumingalar Road, Thumingalar Housing, Thingangyun T/S,
              Yangon, Myanmar</a
            >
          </p>

          <p class="footerHeading">Phone:</p>
          <p class="footerText">
            <a href="tel:+95 9759528528">+95 9759528528</a>
          </p>

          <p class="footerHeading">Email:</p>
          <p class="footerText">
            <a href="mailto:kyawkhinethein@gmail.com"
              >kyawkhinethein@gmail.com</a
            >
          </p>
        </div>
        <div>
          <p class="footerHeading">Quick Links</p>
          <p class="footerLink">Home</p>
          <p class="footerLink">Projects</p>
          <p class="footerLink">Services</p>
          <p class="footerLink">Contact</p>
        </div>
        <div>
          <p class="footerHeading">Socials</p>
          <p class="footerSocial">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  @apply bg-[#343A3F] h-auto;
}
.footerResponsive {
  @apply grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4;
}
.footerText {
  @apply text-[#ffff] hover:text-blue-500 cursor-pointer;
}
.footerHeading {
  @apply text-[#7D868E] mb-2;
}
.footerLink {
  @apply text-[#0177FA] mb-2 cursor-pointer;
}
.footerSocial {
  @apply text-[#ffff];
}
.footerSocial i {
  @apply px-1;
}
</style>
