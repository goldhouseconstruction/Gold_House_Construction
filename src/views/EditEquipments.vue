<template>
  <div class="md:flex">
    <!-- table -->
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
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <!--  for error message -->
              <p class="text-red-500 text-center">{{ errmsg }}</p>
              <!--  for error message -->
              <tr
                v-for="currentEquipment in displayEquipments"
                :key="currentEquipment.id"
              >
                <td data-label="Name">
                  {{ currentEquipment.eqpName }}
                </td>
                <td data-label="Description">
                  {{ currentEquipment.description }}
                </td>
                <td data-label="ImageUrl">
                  <img
                    :src="currentEquipment.imageUrl"
                    :alt="currentEquipment.eqpName"
                  />
                </td>
                <td data-label="Edit">
                  <button
                    @click="confirmDelete(currentEquipment.id)"
                    class="editBtn"
                  >
                    Delete
                  </button>
                  <button
                    @click="showEditForm(currentEquipment.id)"
                    class="editBtn"
                  >
                    Edit
                  </button>
                </td>
              </tr>

              <!-- Pop up -->
              <div v-if="showConfirmDelete" class="confirmDeletePopup">
                <div class="confirmDeleteCard">
                  <h2 class="confirmDeleteHeading">
                    <button @click="showConfirmDelete = false" class="">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </h2>
                  <p class="mb-4">Are you sure you want to delete?</p>

                  <button
                    @click="deleteEqp()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </tbody>
          </table>
          <div class="flex justify-center mt-5">
            <button
              @click="previousPage"
              v-if="currentPage > 1"
              class="bg-blue-500 hover:bg-blue-700 text-white formBtn"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              v-if="currentPage < totalPages"
              class="bg-blue-500 hover:bg-blue-700 text-white formBtn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add, Edit Form -->
    <div class="md:w-1/2 p-4 my-auto">
      <div class="formCard">
        <form class="form" @submit.prevent="addEquipment">
          <h1 v-if="!isEditForm" class="formHeading">Add New Equipment</h1>
          <h1 v-if="isEditForm" class="formHeading">Edit Equipment</h1>
          <div class="mb-4">
            <label class="formLabel" for="equipmentName">
              Equipment Name
            </label>
            <input
              class="formInput"
              id="equipmentName"
              type="text"
              v-model="eqpName"
              placeholder="Equipment Name"
              required
            />
          </div>
          <div class="mb-4">
            <label class="formLabel" for="description"> Description </label>
            <textarea
              class="formInput"
              id="description"
              rows="4"
              v-model="description"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="formLabel" for="imageUrl"> Image URL </label>
            <input
              class="formInput"
              id="imageUrl"
              type="text"
              v-model="imageUrl"
              placeholder="Image URL"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white formBtn"
              type="submit"
              v-if="!isEditForm"
            >
              <p>Add Equipment</p>
            </button>
          </div>
        </form>
        <button
          v-if="isEditForm"
          class="bg-blue-500 hover:bg-blue-700 text-white formBtn"
          @click="editEquipment(edit_delete_id)"
        >
          Edit Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase/init";
import fetchAllEquipments from "@/composables/fetchAllEquipments";
import addNewEqp from "@/composables/addNewEqp";
import pagination from "@/composables/pagination";
import { onMounted, ref } from "vue";
export default {
  setup() {
    let currentEquipments = ref([]);
    let eqpName = ref("");
    let description = ref("");
    let imageUrl = ref("");
    let showConfirmDelete = ref(false);
    let isEditForm = ref(false);
    let edit_delete_id = ref("");
    let errmsg = ref("asdff");

    //getAllEquipments
    onMounted(async () => {
      let allDatas = await fetchAllEquipments("equipments"); //fetch all equipments with composable function
      currentEquipments.value = allDatas; //add to local array
    });
    //Add New Equipment
    let addEquipment = async () => {
      let newEqpData = {
        eqpName: eqpName.value,
        description: description.value,
        imageUrl: imageUrl.value,
      };
      let newEquipment = await addNewEqp(newEqpData); // add new equipment with composable function
      currentEquipments.value.push(newEquipment); // add new equipment to local array

      // Clear the input values after adding
      eqpName.value = "";
      description.value = "";
      imageUrl.value = "";
    };

    //show confirm delete popup
    let confirmDelete = (id) => {
      edit_delete_id.value = id;
      showConfirmDelete.value = true;
    };
    //delete function
    let deleteEqp = async () => {
      try {
        const eqpRef = doc(db, "equipments", edit_delete_id.value);
        await deleteDoc(eqpRef);
        currentEquipments.value = currentEquipments.value.filter(
          (currentEquipment) => currentEquipment.id !== edit_delete_id.value
        );
        showConfirmDelete.value = false;
      } catch (error) {
        errmsg.value = error;
      }
    };

    //show edit equipment form
    let showEditForm = (id) => {
      let editEquipment = currentEquipments.value.filter((equipment) => {
        return equipment.id === id;
      });

      eqpName.value = editEquipment[0].eqpName;
      description.value = editEquipment[0].description;
      imageUrl.value = editEquipment[0].imageUrl;
      edit_delete_id.value = editEquipment[0].id;

      //form edit button change
      isEditForm.value = true;
    };

    //Edit Equipments
    let editEquipment = async (id) => {
      const editRef = doc(db, "equipments", id);
      await updateDoc(editRef, {
        eqpName: eqpName.value,
        description: description.value,
        imageUrl: imageUrl.value,
      });
      const index = currentEquipments.value.findIndex(
        (currentEquipment) => currentEquipment.id === id
      );

      if (index !== -1) {
        currentEquipments.value[index] = {
          eqpName: eqpName.value,
          description: description.value,
          imageUrl: imageUrl.value,
          id: id, //this is add id manually to local array because, only onmounted  will add id with object destruction
        };

        //clear form after edit
        eqpName.value = "";
        description.value = "";
        imageUrl.value = "";
        edit_delete_id.value = "";
      }
      isEditForm.value = false;
    };

    //Pagination
    const {
      pageSize,
      currentPage,
      totalPages,
      displayDatas: displayEquipments,
      nextPage,
      previousPage,
    } = pagination(currentEquipments);
    //pagination

    return {
      currentEquipments,
      eqpName,
      description,
      imageUrl,
      addEquipment,
      deleteEqp,
      displayEquipments,
      currentPage,
      nextPage,
      previousPage,
      totalPages,
      confirmDelete,
      showEditForm,
      isEditForm,
      showConfirmDelete,
      confirmDelete,
      editEquipment,
      edit_delete_id,
      errmsg,
    };
  },
};
</script>

<style>
body {
  line-height: 1.25;
}
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
  table th {
    margin: 0;
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
.editBtn {
  @apply md:mt-8 px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

/* confirmDeletePopup */
.confirmDeletePopup {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
}
.confirmDeleteCard {
  @apply bg-white p-6 rounded shadow-lg;
}
.confirmDeleteHeading {
  @apply text-xl font-semibold mb-4;
}

/* Add Edit Form */
.formCard {
  @apply max-w-md mx-auto p-4;
}
.form {
  @apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4;
}
.formHeading {
  @apply text-center text-xl my-3 underline;
}
.formLabel {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.formInput {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
.formBtn {
  @apply font-bold py-2 px-4 rounded focus:outline-none;
}
</style>
