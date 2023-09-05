<template>
  <h2 class="servicesHeading" id="services">Our Services</h2>
  <div class="flex justify-center">
    <div class="yellowLine"></div>
  </div>
  <!-- First Row -->
  <div class="firstRow">
    <div class="firstrowResponsive">
      <div class="p-4 flex" data-aos="fade-right" data-aos-duration="1000">
        <div class="w-30">
          <img
            src="../../public/img/highway.png"
            alt=""
            width="100px"
            height="100px"
          />
        </div>

        <div class="w-70 px-4">
          <h1 class="serviceHeading">Highway Engineering</h1>
          <p class="text-sm">
            We do highway projects with expertise in engineering design and
            testing, delivering safe, innovative, and precise solutions
            professionally. We do Highway Maintenance Engineering as well.
          </p>
        </div>
      </div>
      <div class="p-4 flex" data-aos="fade-right" data-aos-duration="1000">
        <div class="w-30">
          <img
            src="../../public/img/municipal.png"
            alt=""
            width="60px"
            height="100px"
          />
        </div>

        <div class="w-70 px-4">
          <h1 class="serviceHeading">Municipal Engineering</h1>
          <p class="text-sm">
            We offer comprehensive Municipal Engineering services, encompassing
            planning, design, and implementation, to build sustainable and
            thriving communities efficiently.
          </p>
        </div>
      </div>
      <div class="p-4 flex" data-aos="fade-right" data-aos-duration="1000">
        <div class="w-30">
          <img
            src="../../public/img/housing.png"
            alt=""
            width="100px"
            height="100px"
          />
        </div>

        <div class="w-70 px-4">
          <h1 class="serviceHeading">Housing Construction</h1>
          <p class="text-sm">
            We specialize in Housing Construction, creating exceptional homes
            with quality craftsmanship and attention to detail, tailored to your
            dreams.
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Second Row -->
  <div class="secondRow">
    <div class="secondrowResponsive">
      <div class="p-4 flex" data-aos="fade-left" data-aos-duration="1000">
        <div class="w-30">
          <img
            src="../../public/img/bridge.png"
            alt=""
            width="100px"
            height="200px"
          />
        </div>

        <div class="w-70 px-4">
          <h1 class="serviceHeading">Bridge Engineering</h1>
          <p class="text-sm">
            We excel in designing, constructing, and inspecting bridges,
            ensuring durability, safety, and seamless integration into
            transportation networks.
          </p>
        </div>
      </div>
      <div class="p-4 flex" data-aos="fade-left" data-aos-duration="1000">
        <div class="w-30">
          <img
            src="../../public/img/metrology.png"
            alt=""
            width="100px"
            height="100px"
          />
        </div>

        <div class="w-70 px-4">
          <h1 class="serviceHeading">Engineering Metrology</h1>
          <p class="text-sm">
            We provide Quality Management Certificates, ensuring top-notch
            precision and excellence in all measurements.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.servicesHeading {
  @apply text-center my-10 font-bold;
}

.yellowLine {
  @apply w-[150px] h-1 bg-yellow-400;
}

/* firstrow */
.firstrowResponsive {
  @apply grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3;
}
.firstRow {
  @apply container mx-auto px-4 my-10;
}

/* secondrow */
.secondrowResponsive {
  @apply grid gap-4 grid-cols-1 sm:grid-cols-2;
}
.secondRow {
  @apply container sm:w-[60%] px-4 mx-auto mb-[65px];
}

.serviceHeading {
  @apply text-xl mb-2 font-bold;
}
</style>
