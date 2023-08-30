<template>
  <HeroforProjects />

  <!-- Project Section -->
  <div class="w-[80%] mx-auto mt-10">
    <h1 class="text-center text-2xl text-[#D98106]">Latest Projects</h1>
    <FilterNav></FilterNav>

    <div class="projectsSec">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Column 1 -->
        <div class="p-4">
          <div
            class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              class="w-full h-48 object-cover"
              src="../../public/img/excavator.png"
              alt="Project Image"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">Project Title</h2>
              <p class="text-gray-600 mb-3">Location: City, State</p>
              <p class="text-gray-800 mb-4">
                A brief and engaging project description that highlights key
                features and accomplishments.
              </p>
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Completion Date: Month Year</p>
                <a href="#" class="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="p-4">
          <div
            class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              class="w-full h-48 object-cover"
              src="../../public/img/excavator.png"
              alt="Project Image"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">Project Title</h2>
              <p class="text-gray-600 mb-3">Location: City, State</p>
              <p class="text-gray-800 mb-4">
                A brief and engaging project description that highlights key
                features and accomplishments.
              </p>
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Completion Date: Month Year</p>
                <a href="#" class="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div class="p-4">
          <div
            class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              class="w-full h-48 object-cover"
              src="../../public/img/excavator.png"
              alt="Project Image"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">Project Title</h2>
              <p class="text-gray-600 mb-3">Location: City, State</p>
              <p class="text-gray-800 mb-4">
                A brief and engaging project description that highlights key
                features and accomplishments.
              </p>
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Completion Date: Month Year</p>
                <a href="#" class="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterNav from "../components/filterNav";
import HeroforProjects from "../components/HeroforProjects";
export default {
  components: {
    FilterNav,
    HeroforProjects,
  },
};
</script>

<style>
.projectsSec {
}
</style>
