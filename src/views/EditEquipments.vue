<template>
  <div class="md:flex">
    <div class="md:w-1/2 p-4">
      <div class="table-container">
        <div class="overflow-x-auto">
          <h1 class="text-xl text-center my-5 underline">Current Equipments</h1>
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
                >
                  Equipment Name
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
                >
                  Description
                </th>
                <th
                  class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
                >
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currentEquipment in currentEquipments"
                :key="currentEquipment.id"
              >
                <td class="px-6 py-4">{{ currentEquipment.eqpName }}</td>
                <td
                  class="px-6 py-4 test max-w-xs"
                  style="white-space: normal; word-wrap: break-word"
                >
                  {{ currentEquipment.description }}
                </td>
                <td class="px-6 py-4">
                  <img
                    :src="currentEquipment.imageUrl"
                    :alt="currentEquipment.eqpName"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 p-4">
      <div class="max-w-md mx-auto p-4">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          @submit.prevent="addEquipment"
        >
          <h1 class="text-center text-xl my-3 underline">Add New Equipment</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="equipmentName"
            >
              Equipment Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="equipmentName"
              type="text"
              v-model="eqpName"
              placeholder="Equipment Name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="description"
            >
              Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows="4"
              v-model="description"
              placeholder="Description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="imageUrl"
            >
              Image URL
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageUrl"
              type="text"
              v-model="imageUrl"
              placeholder="Image URL"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebase/init";
import { onMounted, ref } from "vue";
export default {
  setup() {
    let currentEquipments = ref([]);
    let eqpName = ref("");
    let description = ref("");
    let imageUrl = ref("");

    //getEquipments
    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, "equipments"));
      querySnapshot.forEach((doc) => {
        currentEquipments.value.push(doc.data());
      });
      console.log(currentEquipments.value);
    });
    let addEquipment = async () => {
      const docRef = await addDoc(collection(db, "equipments"), {
        eqpName: eqpName.value,
        description: description.value,
        imageUrl: imageUrl.value,
      });
      console.log(docRef);
    };
    return { currentEquipments, eqpName, description, imageUrl, addEquipment };
  },
};
</script>

<style>
.table-container {
  @apply w-[90%] mx-auto;
}
</style>
