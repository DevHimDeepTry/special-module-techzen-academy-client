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
import SearchForm from "../components/SearchForm.vue";
import EmployeeTable from "../components/EmployeeTable.vue";
import EmployeeForm from "../components/EmployeeForm.vue";

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

  <SearchForm :filters="filters" :departments="departments" @search="fetchEmployeeData" @clear="clearSearch" />
  <EmployeeTable :employeeList="employeeList" :getDepartmentName="getDepartmentName" @view-detail="handleDetail" @edit="openFormUpdate" @delete="handleDelete" @add="openFormAdd" />
  <EmployeeForm :showForm="showForm" :isEditing="isEditing" :formData="formData" :departments="departments" @submit="handleSubmit" @cancel="resetForm" />
</div>
</template>

<style scoped>

.error {
  color: red;
  font-size: 1.2rem;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
}
</style>