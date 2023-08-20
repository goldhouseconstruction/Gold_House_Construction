<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Message</th>
          <th>Done?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>user1@example.com</td>
          <td>Hello, this is the first message.</td>
          <td>
            <button class="btn">Done</button>
          </td>
        </tr>
        <tr>
          <td>user2@example.com</td>
          <td>Here's another message for user 2.</td>
          <td>
            <button class="btn">Done</button>
          </td>
        </tr>
        <!-- Add more rows with fake data -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MessageTable",
};
</script>

<style scoped>
.table-container {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f2f2f2;
}

.btn {
  @apply mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
</style>
