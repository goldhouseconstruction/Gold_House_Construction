<template>
  <div v-if="clients.length === 0" class="card">
    There are no clients we have to contact back.
  </div>
  <div class="table-container" v-if="clients.length">
    <div class="overflow-x-auto">
      <table>
        <caption>
          Clients
        </caption>
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Done?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td data-label="Email">{{ client.email }}</td>
            <td data-label="Message">{{ client.message }}</td>
            <td data-label="Done?">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                @click="removeClient(client.id)"
              >
                Done
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-red-500 text-center">{{ errmsg }}</p>
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
    let errmsg = ref("");
    onMounted(async () => {
      const collectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        const clientData = { id: doc.id, ...doc.data() };
        clients.value.push(clientData);
      });
    });

    //to remove client that we need to contact
    let removeClient = async (clientId) => {
      try {
        const clientRef = doc(db, "clients", clientId);
        await deleteDoc(clientRef);
        clients.value = clients.value.filter(
          (client) => client.id !== clientId
        );
      } catch (error) {
        errmsg.value = error;
      }
    };

    return { clients, removeClient, errmsg };
  },
};
</script>

<style scoped>
.card {
  @apply bg-white p-6 rounded shadow-md;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 100px auto;
  text-align: center;
}

/* table */
.table-container {
  @apply bg-white rounded shadow;

  margin: 80px auto;
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

.btn {
  @apply mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
</style>
