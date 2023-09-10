<template>
  <div class="md:flex">
    <!-- table -->
    <div class="md:w-1/2 p-4">
      <div class="table-container">
        <div class="overflow-x-auto">
          <table>
            <caption>
              Current Projects
            </caption>
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currentProject in displayProjects"
                :key="currentProject.id"
              >
                <td data-label="Name">{{ currentProject.project_name }}</td>
                <td data-label="Description">
                  {{ currentProject.description }}
                </td>
                <td data-label="ImageUrl">
                  <img
                    :src="currentProject.imageUrl"
                    :alt="currentProject.projectName"
                  />
                </td>
                <td data-label="Edit">
                  <button
                    @click="confirmDelete(currentProject.id)"
                    class="md:mt-8 px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Delete
                  </button>
                  <button
                    @click="showEditForm(currentProject.id)"
                    class="md:mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                    @click="deleteProject()"
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
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              v-if="currentPage < totalPages"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <form class="form" @submit.prevent="addProject">
          <h1 v-if="!isEditForm" class="formHeading">Add New Project</h1>
          <h1 v-if="isEditForm" class="formHeading">Edit Project</h1>
          <div class="mb-4">
            <label class="formLabel" for="projectName"> Project Name </label>
            <input
              class="formInput"
              id="projectName"
              type="text"
              v-model="projectName"
              placeholder="Project Name"
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
          <div class="mb-4">
            <label class="formLabel" for="location"> Location </label>
            <input
              class="formInput"
              id="location"
              type="text"
              v-model="location"
              placeholder="Project Location"
              required
            />
          </div>
          <div class="mb-4">
            <label class="formLabel" for="completed_date">
              Completed Date
            </label>
            <input
              class="formInput"
              id="completed_date"
              type="date"
              v-model="completedDate"
              placeholder="Project Completed Date"
              required
            />
          </div>
          <div class="mb-4">
            <label for="location">Select Location:</label>
            <select id="location" v-model="local_oversea" name="location">
              <option value="local">Local</option>
              <option value="oversea">Oversea</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              v-if="!isEditForm"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Project
            </button>
          </div>
        </form>
        <button
          v-if="isEditForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="editProject(edit_delete_id)"
        >
          Edit Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase/init";
import fetchAllProjects from "../composables/fetchAllProjects";
import addNewProject from "@/composables/addNewProject";
import pagination from "@/composables/pagination";
import { computed, onMounted, ref } from "vue";
import timeStamptoSting from "@/composables/timeStamptoString";
export default {
  setup() {
    let currentProjects = ref([]);
    let projectName = ref("");
    let description = ref("");
    let imageUrl = ref("");
    let location = ref("");
    let local_oversea = ref("oversea");
    let completedDate = ref("");
    let showConfirmDelete = ref(false);
    let isEditForm = ref(false);
    let edit_delete_id = ref("");

    //getAllEquipments
    onMounted(async () => {
      let allDatas = await fetchAllProjects("completed_projects"); //fetch all projects with composable function
      currentProjects.value = allDatas; //add to local array
    });
    //add new equipments
    let addProject = async () => {
      const formattedDate = new Date(completedDate.value);
      const timestamp = Timestamp.fromDate(formattedDate);
      let newProjectData = {
        project_name: projectName.value,
        description: description.value,
        imageUrl: imageUrl.value,
        location: location.value,
        completed_date: timestamp,
        local_oversea: local_oversea.value,
      };
      let newProject = await addNewProject(newProjectData); //add new project with composable function
      currentProjects.value.unshift(newProject); //add new project to local array

      // Clear the input values after adding
      projectName.value = "";
      description.value = "";
      imageUrl.value = "";
      location.value = "";
      completedDate.value = "";
      local_oversea.value = "";
    };
    //show confirm delete popup
    let confirmDelete = (id) => {
      edit_delete_id.value = id;
      showConfirmDelete.value = true;
    };
    //delete function
    let deleteProject = async () => {
      try {
        const projectRef = doc(db, "completed_projects", edit_delete_id.value);
        await deleteDoc(projectRef);
        currentProjects.value = currentProjects.value.filter(
          (currentProject) => currentProject.id !== edit_delete_id.value
        );
        showConfirmDelete.value = false;
      } catch (error) {
        console.error("Error removing client:", error);
      }
    };

    //show edit project form
    let showEditForm = (id) => {
      let editProject = currentProjects.value.filter((project) => {
        return project.id === id;
      });

      projectName.value = editProject[0].project_name;
      description.value = editProject[0].description;
      imageUrl.value = editProject[0].imageUrl;
      location.value = editProject[0].location;
      completedDate.value = editProject[0].completed_date;
      local_oversea.value = editProject[0].local_oversea;
      edit_delete_id.value = editProject[0].id;

      //form edit button change
      isEditForm.value = true;
    };
    //Edit Project
    let editProject = async (id) => {
      const editRef = doc(db, "completed_projects", id);
      const formattedDate = new Date(completedDate.value);
      const timestamp = Timestamp.fromDate(formattedDate);
      await updateDoc(editRef, {
        project_name: projectName.value,
        description: description.value,
        imageUrl: imageUrl.value,
        location: location.value,
        completed_date: timestamp,
        local_oversea: local_oversea.value,
      });
      const index = currentProjects.value.findIndex(
        (currentProject) => currentProject.id === id
      );
      let DataSting = timeStamptoSting(formattedDate);
      if (index !== -1) {
        currentProjects.value[index] = {
          project_name: projectName.value,
          description: description.value,
          imageUrl: imageUrl.value,
          location: location.value,
          completed_date: DataSting,
          local_oversea: local_oversea.value,
          id: id, //this is add id manually to local array because, only onmounted  will add id with object destruction
        };
      }

      //clear form input after edit
      projectName.value = "";
      description.value = "";
      imageUrl.value = "";
      location.value = "";
      completedDate.value = "";
      isEditForm.value = false;
    };

    //Pagination
    const {
      pageSize,
      currentPage,
      totalPages,
      displayDatas: displayProjects,
      nextPage,
      previousPage,
    } = pagination(currentProjects);
    //pagination

    return {
      currentProjects,
      projectName,
      description,
      imageUrl,
      completedDate,
      local_oversea,
      addProject,
      deleteProject,
      displayProjects,
      currentPage,
      nextPage,
      previousPage,
      totalPages,
      showConfirmDelete,
      confirmDelete,
      showEditForm,
      isEditForm,
      editProject,
      location,
      edit_delete_id,
    };
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

/* general styling */
body {
  line-height: 1.25;
}

/* Confirm Delete Popup */
.confirmDeletePopup {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
}
.confirmDeleteCard {
  @apply bg-white p-6 rounded shadow-lg;
}
.confirmDeleteHeading {
  @apply text-xl font-semibold mb-4;
}

/* Form */
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
</style>
