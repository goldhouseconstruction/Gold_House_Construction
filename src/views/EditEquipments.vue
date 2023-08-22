<template>
  <div class="md:flex">
    <div class="md:w-1/2 p-4">
      <div class="table-container">
        <div class="overflow-x-auto">
          <table>
            <caption>
              Current Equipments
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currentEquipment in currentEquipments"
                :key="currentEquipment.id"
              >
                <td data-label="Name">{{ currentEquipment.eqpName }}</td>
                <td data-label="Description">
                  {{ currentEquipment.description }}
                </td>
                <td data-label="ImageUrl">
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

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}

/* general styling */
body {
  line-height: 1.25;
}
</style>
