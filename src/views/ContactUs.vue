<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[8rem]">
    <!-- Column 1 -->
    <div class="p-4 w-[70%] mx-auto">
      <h2 class="text-center text-xl my-5">Contact Us</h2>
      <a href="https://goo.gl/maps/a9wotcA555WbCvJb8">
        <p>
          Our Address is <br />
          <span class="hover:text-blue-500">
            No(3), Thumingalar Road, Thumingalar Housing, Thingangyun T/S,
            Yangon, Myanmar
          </span>
        </p>
      </a>
      <p class="my-4">
        Phone :
        <a href="tel:+95 9759528528" class="hover:text-blue-500"
          >+95 9759528528</a
        >
      </p>
      <div class="pb-5">
        <p class="socials">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-linkedin"></i>
        </p>
      </div>
    </div>

    <!-- Column 2 -->
    <div class="p-4 w-[70%] mx-auto">
      <form @submit.prevent="saveClientEmail">
        <p class="text-xl my-5">
          Please Fill your contact info. We will contact you back ASAP.
        </p>
        <label for="email" class="block mb-2">Your Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          class="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  </div>

  <div class="w-[80%] mx-auto my-10">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0115677829485!2d96.18556697533677!3d16.82578221874057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193721adb815f%3A0x4553ec00e9a37552!2sThumingalar%20Housing!5e0!3m2!1sth!2sth!4v1692451701623!5m2!1sth!2sth"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script>
import { ref } from "vue";
import db from "../firebase/init";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    let email = ref("");

    let saveClientEmail = async () => {
      try {
        const docRef = await addDoc(collection(db, "client's_emails"), {
          email: email.value,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    return { email, saveClientEmail };
  },
};
</script>

<style>
.socials i {
  @apply px-1;
}
</style>
