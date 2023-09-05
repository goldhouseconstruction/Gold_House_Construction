<template>
  <div class="NavContainer">
    <div class="heading">
      <h2 class="text-xl font-semibold mb-4">Admin Dashboard</h2>

      <p>
        <router-link to="/dashboard/clients" class="routerlink"
          >Clients</router-link
        >
      </p>

      <p>
        <router-link to="/dashboard/equipments" class="routerlink"
          >Edit Equipments</router-link
        >
      </p>
      <p>
        <router-link to="/dashboard/projects" class="routerlink"
          >Edit Projects</router-link
        >
      </p>
      <p>
        <button @click="logout()">Logout</button>
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
export default {
  name: "Sidebar",
  setup() {
    let router = useRouter();
    let logout = async () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          // An error happened.
        });
    };
    return { logout };
  },
};
</script>
<style>
.NavContainer {
  @apply bg-[#f2f2f2] text-black mt-[4rem] mb-10;
}
.heading {
  @apply p-4 text-center;
}
.routerlink {
  @apply block py-2;
}
</style>
