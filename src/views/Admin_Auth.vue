<template>
  <div class="mt-[8rem]">
    <div class="card">
      <form @submit.prevent="login">
        <label for="email" class="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="formInput"
        />
        <label for="email" class="block mb-2">Password </label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="formInput"
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let email = ref("");
    let password = ref("");
    let error = ref("");

    //create account
    let signup = async () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };

    let login = async () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            router.push("dashboard/clients");
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };

    return { email, password, error, login, signup };
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
.formInput {
  @apply w-full px-3 py-2 border rounded;
}
</style>
