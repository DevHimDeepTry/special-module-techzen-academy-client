  <script setup>
  import { ref, onMounted } from "vue";
  import {
    readEmployeeList,
    insertNewEmployee,
    detailEmployee,
    removeEmployee,
    updateEmployeeData,
    fetchDepartments,
  } from "../services/employeeServices";

  // Các state
  const departments = ref([]); 
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

  const filters = ref({
    name: "",
    dobFrom: "",
    dobTo: "",
    gender: "",
    salaryRange: "",
    phone: "",
    departmentId: ""
  });
  const clearSearch = () => {
    filters.value = {
      name: "",
      dobFrom: "",
      dobTo: "",
      gender: "",
      salaryRange: "",
      phone: "",
      departmentId: ""
    };
    fetchEmployeeData();
  };

  // Fetch dữ liệu nhân viên
  const fetchEmployeeData = async () => {
    try {
      loading.value = true;
      console.log(filters.value);
      const response = await readEmployeeList(filters.value);
      employeeList.value = response;
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
    console.log("Updating..");
    
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

  const openFormAdd = () => {
    showForm.value = true
  }

  const openFormUpdate = (employee ) => {
    isEditing.value = true;
    formData.value = {...employee };
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
  const handleSubmit = async () => {
    if (isEditing.value) {
      await handleUpdateEmployee();
    } else {
      await handleAddEmployee();
    }
  };

  onMounted(() => {
    fetchEmployeeData();
    fetchDepartmentsData();
  });

  const fetchDepartmentsData = async () => {
    try {
      departments.value = await fetchDepartments(); // Lấy dữ liệu phòng ban
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng ban:", error);
    }
  };
  const getDepartmentName = (departmentId) => {
  const department = departments.value.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
  };
  </script>

  <template>
    <div>
      <h1>Employee Management</h1>
      
      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-if="loading" class="loading">Loading...</div>


      <div v-if="!loading">
        <div class="search-form">
          <label for="name">Search by Name:
            <input id="name" v-model="filters.name" type="text" placeholder="Name" />
          </label>
          <label for="dobFrom">Date of Birth (From):
            <input id="dobFrom" v-model="filters.dobFrom" type="date" />
          </label>
          <label for="dobTo">Date of Birth (To):
            <input id="dobTo" v-model="filters.dobTo" type="date" />
          </label>
          <label for="gender">Gender:
            <select id="gender" v-model="filters.gender">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </label>
          <label for="salaryRange">Salary Range:
            <select id="salaryRange" v-model="filters.salaryRange">
              <option value="">All</option>
              <option value="5lt">Less than 5M</option>
              <option value="5-10">5M - 10M</option>
              <option value="10-20">10M - 20M</option>
              <option value="gt20">Greater than 20M</option>
            </select>
          </label>

          <label for="phone">Phone:
            <input id="phone" v-model="filters.phone" type="text" placeholder="Phone" />
          </label>
          <label for="departmentId">Department:
            <select id="departmentId" v-model="filters.departmentId">
            <option value="">Select Department</option>
            <option v-for="department in departments" :key="department.id" :value="department.id">
              {{ department.name }}
            </option>
          </select>
          </label>
          <div class="form-actions">
            <button id="searchButton" @click="fetchEmployeeData">Search</button>
            <button id="clearButton" @click="clearSearch">Clear Search</button>
          </div>
        </div>

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
              <td>{{ getDepartmentName(employee.departmentId) }}</td>
              <td>
                <button @click="handleDetail(employee.id)">Detail</button>
                <button @click="openFormUpdate(employee)">Edit</button>
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
      <form @submit.prevent="handleSubmit">
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
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
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
        <label>
          Department:
          <select id="departmentId" v-model="formData.departmentId" required>
            <option value="">Select Department</option>
            <option v-for="department in departments" :key="department.id" :value="department.id">
              {{ department.name }}
            </option>
          </select>
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
          <p><strong>Department: </strong>{{ getDepartmentName(selectedEmployee.departmentId) }}</p>
          <button @click="showDetail = false">Close</button>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
  }

  .search-form label {
    font-size: 1rem;
    color: #54de09;
    display: flex;
    flex-direction: column;
    width: 220px;
  }

  .search-form input,
  .search-form select {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #54de09;
    border-radius: 5px;
    margin-top: 8px;
  }

  .search-form input[type="date"] {
    cursor: pointer;
  }

  .search-form .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .search-form button {
    padding: 10px 16px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4CAF50;
    transition: background-color 0.3s ease;
  }

  .search-form button:hover {
    background-color: #45a049;
  }

  .search-form button#clearButton {
    background-color: #f44336;
  }

  .search-form button#clearButton:hover {
    background-color: #e53935;
  }

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
    border: 1px solid #54de09aa;
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
    background-color: #54de09b0;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
  }
  .form-container input, .detail-container input,
  .form-container select, .detail-container select {
    width: 95%;
    height: 40px;
    padding: 5px;
    border: 1px solid #54de09; 
    border-radius: 5px;
    transition: all 0.3s ease;
    color: #53de09;
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
    background-color: #54de09b0;
    max-width: 400px;
  }

  </style>
