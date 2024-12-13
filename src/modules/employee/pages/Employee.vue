<script setup>
import { ref, onMounted } from "vue";
import {
  readEmployeeList,
  insertNewEmployee,
  detailEmployee,
  removeEmployee,
  updateEmployeeData,
} from "../services/employeeServices";

// Các state
const employeeList = ref([]);
const loading = ref(true);
const errorMessage = ref(null);
const showForm = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: null,
  name: "",
  dob: "",
  gender: "",
  salary: "",
  phone: "",
});
const showDetail = ref(false);
const selectedEmployee = ref(null);

// Fetch dữ liệu nhân viên
const fetchEmployeeData = async () => {
  try {
    employeeList.value = await readEmployeeList();
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra khi tải danh sách nhân viên";
  } finally {
    loading.value = false;
  }
};

// Thêm nhân viên mới
const handleAddEmployee = async () => {
  try {
    const newEmployee = await insertNewEmployee(formData.value);
    employeeList.value.push(newEmployee);
    resetForm();
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra khi thêm nhân viên";
  }
};

// Cập nhật thông tin nhân viên
const handleUpdateEmployee = async () => {
  try {
    await updateEmployeeData(formData.value.id, formData.value);
    const index = employeeList.value.findIndex((e) => e.id === formData.value.id);
    if (index !== -1) employeeList.value[index] = { ...formData.value };
    resetForm();
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra khi cập nhật nhân viên";
  }
};

// Xem chi tiết nhân viên
const handleDetail = async (id) => {
  try {
    selectedEmployee.value = await detailEmployee(id);
    showDetail.value = true;
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra khi lấy chi tiết nhân viên";
  }
};

// Xóa nhân viên
const handleDelete = async (id) => {
  try {
    await removeEmployee(id);
    employeeList.value = employeeList.value.filter((e) => e.id !== id);
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra khi xóa nhân viên";
  }
};

const openForm = (employee ) => {
  isEditing.value = !!employee;
  formData.value = employee ? { ...employee } : {
    id: null,
    name: "",
    dob: "",
    gender: "",
    salary: "",
    phone: "",
  };
  showForm.value = true;
};

// Đặt lại form
const resetForm = () => {
  showForm.value = false;
  formData.value = {
    id: null,
    name: "",
    dob: "",
    gender: "",
    salary: "",
    phone: "",
  };
  isEditing.value = false;
};

onMounted(() => {
  fetchEmployeeData();
});
</script>

<template>
  <div>
    <h1>Employee Management</h1>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="!loading">
      <button @click="openForm">Add New Employee</button>
      <table v-if="employeeList.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Phone</th>
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
            <td>
              <button @click="handleDetail(employee.id)">Detail</button>
              <button @click="openForm(employee)">Edit</button>
              <button @click="handleDelete(employee.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="employeeList.length === 0">No employees found.</p>
    </div>

    <!-- Form for adding/editing employee -->
    <div v-if="showForm" class="form-overlay">
      <div class="form-container">
        <h2>{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <form @submit.prevent="isEditing ? handleUpdateEmployee : handleAddEmployee">
          <label>
            Name:
            <input v-model="formData.name" type="text" required />
          </label>
          <label>
            Date of Birth:
            <input v-model="formData.dob" type="date" required />
          </label>
          <label>
            Gender:
            <select v-model="formData.gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Salary:
            <input v-model="formData.salary" type="number" required />
          </label>
          <label>
            Phone:
            <input v-model="formData.phone" type="text" required />
          </label>
          <div class="form-actions">
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button type="button" @click="resetForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Employee Detail Modal -->
    <div v-if="showDetail" class="detail-overlay">
      <div class="detail-container">
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
        <p><strong>Date of Birth:</strong> {{ selectedEmployee.dob }}</p>
        <p><strong>Gender:</strong> {{ selectedEmployee.gender }}</p>
        <p><strong>Salary:</strong> {{ selectedEmployee.salary }}</p>
        <p><strong>Phone:</strong> {{ selectedEmployee.phone }}</p>
        <button @click="showDetail = false">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style for the employee management system */
.error {
  color: red;
  font-size: 1.2rem;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
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
  border: 1px solid #53de09;
  cursor: pointer;
}

button:hover {
  background-color: #53de09;
  color: white;
}

.form-overlay, .detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container, .detail-container {
  background-color: #53de09;

  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-actions button {
  padding: 8px 16px;
}

.detail-container {
  background-color: #53de09;
  max-width: 400px;
}
</style>
