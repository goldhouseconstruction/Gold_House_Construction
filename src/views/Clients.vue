<template>
  <div v-if="clients.length === 0" class="card bg-white p-6 rounded shadow-md">
    There are no clients we have to contact back.
  </div>
  <div class="table-container" v-if="clients.length">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
            >
              Email
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
            >
              Message
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-700"
            >
              Done?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td class="px-6 py-4">{{ client.email }}</td>
            <td class="px-6 py-4">{{ client.message }}</td>
            <td class="px-6 py-4">
              <button class="btn" @click="removeClient(client.id)">Done</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import db from "../firebase/init";
export default {
  name: "MessageTable",
  setup() {
    let clients = ref([]);
    onMounted(async () => {
      const collectionRef = collection(db, "client's_msg");
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        const clientData = { id: doc.id, ...doc.data() };
        clients.value.push(clientData);
      });
    });

    //to remove client that we need to contact
    let removeClient = async (clientId) => {
      try {
        const clientRef = doc(db, "client's_msg", clientId);
        await deleteDoc(clientRef);
        clients.value = clients.value.filter(
          (client) => client.id !== clientId
        );
      } catch (error) {
        console.error("Error removing client:", error);
      }
    };

    return { clients, removeClient };
  },
};
</script>

<style scoped>
.table-container {
  @apply bg-white rounded shadow overflow-hidden;
  max-width: 80%;
  margin: 0 auto;
}
.card {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 100px auto;
  text-align: center;
}

.btn {
  @apply mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
</style>
