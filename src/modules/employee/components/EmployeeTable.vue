<!-- EmployeeTable.vue -->
<template>
  <div>
    <button @click="openFormAdd">Add New Employee</button>
    <table v-if="employeeList.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Salary</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeeList" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.dob }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.salary }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ getDepartmentName(employee.department.id) }}</td>
          <td>
            <button @click="handleDetail(employee.id)">Detail</button>
            <button @click="openFormUpdate(employee)">Edit</button>
            <button @click="handleDelete(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No employees found.</p>

    <!-- Phân trang -->
    <div class="pagination-controls">
      <button :disabled="pagination.page === 0" @click="changePage(pagination.page - 1)">Previous</button>
      <span>
        Page {{ pagination.page + 1 }} of {{ totalPages }}
      </span>
      <button :disabled="pagination.page >= totalPages - 1" @click="changePage(pagination.page + 1)">Next</button>

      <!-- Chọn số phần tử trên mỗi trang -->
      <select v-model="pagination.size" @change="onSizeChange">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employeeList: Array,
    getDepartmentName: Function,
    pagination: Object,
    totalPages: Number,
  },
  methods: {
    handleDetail(id) {
      this.$emit("view-detail", id);
    },
    openFormUpdate(employee) {
      this.$emit("edit", employee);
    },
    handleDelete(id) {
      this.$emit("delete", id);
    },
    openFormAdd() {
      this.$emit("add");
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    onSizeChange() {
      this.$emit("changePageSize", this.pagination.size);
    },
  },
};
</script>

<style scoped>
.pagination-controls {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #53de09;
  text-align: left;
}

th {
  color: #53de09;
}

tbody tr:nth-child(even) {
  background-color: #3d3c3c;
}

button {
  border: 1px solid #54de09aa;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #53de09;
  color: white;
}

</style>
