<template>
  <div class="mt-[8rem] mb-[6rem]">
    <h1 class="equipmentHeading">Our Equipments</h1>
    <div class="layout">
      <div
        class="eqpCard"
        v-for="Equipment in allEquipments"
        :key="Equipment.id"
      >
        <div class="flex flex-col sm:flex-row">
          <!-- Text Column (60% width) -->
          <div class="sm:w-60 p-4 mx-auto">
            <h2 class="text-xl font-semibold mb-2">{{ Equipment.eqpName }}</h2>
            <p class="text-gray-600 mb-4">
              {{ Equipment.description }}
            </p>
          </div>

          <!-- Image Column (40% width) -->
          <div class="sm:w-40 mx-auto my-auto">
            <a href="https://imgbb.com/"
              ><img :src="Equipment.imageUrl" :alt="Equipment.eqpName"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/init";
export default {
  setup() {
    let allEquipments = ref([]);
    //getAllEquipments
    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, "equipments"));
      querySnapshot.forEach((doc) => {
        const EquipmentData = { id: doc.id, ...doc.data() };
        allEquipments.value.push(EquipmentData);
      });
    });
    return { allEquipments };
  },
};
</script>

<style>
.equipmentHeading {
  @apply text-xl text-center my-10 font-bold;
}
.layout {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-4 mx-10;
}
.eqpCard {
  @apply bg-white rounded-lg overflow-hidden shadow-md my-[2rem];
}
</style>
