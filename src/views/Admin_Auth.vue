<template>
  <div class="mt-[8rem]">
    <div class="card">
      <form @submit.prevent="login">
        <label for="email" class="block mb-2">Password Login</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="w-full px-3 py-2 border rounded"
        />
        <p v-if="error" class="err">{{ error }}</p>
        <button
          type="submit"
          class="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let password = ref("");
    let error = ref("");

    let login = async () => {
      try {
        const docRef = doc(db, "admin's_info", "admin");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const passwordfromDb = data.password;

          if (passwordfromDb === password.value) {
            router.push("/dashboard/clients");
          } else {
            error.value = "password is wrong!!";
            password.value = "";
          }
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    return { password, error, login };
  },
};
</script>

<style>
.err {
  @apply text-red-600 mt-5;
}
.card {
  @apply bg-white rounded-lg overflow-hidden shadow-md w-[50%] mx-auto p-5;
}
</style>
