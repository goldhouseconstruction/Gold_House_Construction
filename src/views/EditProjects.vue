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
              <div
                v-if="showConfirmDelete"
                class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div class="bg-white p-6 rounded shadow-lg">
                  <h2 class="text-xl font-semibold mb-4">
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
      <div class="max-w-md mx-auto p-4">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          @submit.prevent="addProject"
        >
          <h1 v-if="!isEditForm" class="text-center text-xl my-3 underline">
            Add New Project
          </h1>
          <h1 v-if="isEditForm" class="text-center text-xl my-3 underline">
            Edit Project
          </h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="projectName"
            >
              Project Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="projectName"
              type="text"
              v-model="projectName"
              placeholder="Project Name"
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
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="location"
            >
              Location
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              v-model="location"
              placeholder="Project Location"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="completed_date"
            >
              Completed Date
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="completed_date"
              type="date"
              v-model="completedDate"
              placeholder="Project Completed Date"
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
  getDocs,
  orderBy,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase/init";
import { computed, onMounted, ref } from "vue";
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
      const querySnapshot = await getDocs(
        collection(db, "completed_projects"),
        orderBy("completed_date", "desc")
      );
      querySnapshot.forEach((doc) => {
        const completedDateTimestamp = doc.data().completed_date;
        const completedDate = completedDateTimestamp.toDate();
        // Get year, month, and day
        const year = completedDate.getFullYear();
        const month = String(completedDate.getMonth() + 1).padStart(2, "0");
        const day = String(completedDate.getDate()).padStart(2, "0");

        // Format the date as yyyy-MM-dd
        const formattedDate = `${year}-${month}-${day}`;
        const ProjectData = {
          id: doc.id,
          ...doc.data(),
          completed_date: formattedDate,
        };
        currentProjects.value.push(ProjectData);
      });
    });
    let addProject = async () => {
      const formattedDate = new Date(completedDate.value);
      const timestamp = Timestamp.fromDate(formattedDate);
      const docRef = await addDoc(collection(db, "completed_projects"), {
        project_name: projectName.value,
        description: description.value,
        imageUrl: imageUrl.value,
        location: location.value,
        completed_date: timestamp,
        local_oversea: local_oversea.value,
      });
      // Fetch the newly added equipment from Firestore using the docRef
      const projectSnapshot = await getDoc(
        doc(db, "completed_projects", docRef.id)
      );
      const newProject = {
        id: docRef.id,
        ...projectSnapshot.data(),
      };

      // Update the local array currentProject with the new equipment
      currentProjects.value.push(newProject);

      // Clear the input values after adding
      projectName.value = "";
      description.value = "";
      imageUrl.value = "";
      location.value = "";
      completedDate.value = "";
      local_oversea.value = "";
    };

    let confirmDelete = (id) => {
      edit_delete_id.value = id;
      showConfirmDelete.value = true;
    };
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

    //pagination
    const pageSize = 4;
    const currentPage = ref(1);

    const totalPages = computed(() =>
      Math.ceil(currentProjects.value.length / pageSize)
    );

    const displayProjects = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return currentProjects.value.slice(startIndex, endIndex);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    //pagination

    //Edit Project
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
      if (index !== -1) {
        currentProjects.value[index] = {
          project_name: projectName.value,
          description: description.value,
          imageUrl: imageUrl.value,
          location: location.value,
          completed_date: timestamp,
          local_oversea: local_oversea.value,
        };
      }
    };
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
</style>
