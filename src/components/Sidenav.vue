<template>
  <div class="bg-[#f2f2f2] text-black mt-[4rem] mb-10">
    <div class="p-4 text-center">
      <h2 class="text-xl font-semibold mb-4">Admin Dashboard</h2>

      <p>
        <router-link to="/dashboard/clients" class="block py-2"
          >Clients</router-link
        >
      </p>

      <p>
        <router-link to="/dashboard/equipments" class="block py-2"
          >Equipments</router-link
        >
      </p>
      <p>
        <router-link to="/dashboard/projects" class="block py-2"
          >Projects</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
<style></style>
