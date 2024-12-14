<script setup>
import { ref, reactive } from 'vue';

const employeeData = reactive({
  id: '',
  name: '',
  dob: '',
  gender: '',
  salary: '',
  phone: ''
});

const handleSubmit = () => {
  emit('submit', { ...employeeData });
};

const resetForm = () => {
  Object.keys(employeeData).forEach(key => (employeeData[key] = ''));
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">Name:</label>
    <input v-model="employeeData.name" type="text" id="name" required />

    <label for="dob">Date of Birth:</label>
    <input v-model="employeeData.dob" type="date" id="dob" required />

    <label for="gender">Gender:</label>
    <select v-model="employeeData.gender">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>

    <label for="salary">Salary:</label>
    <input v-model="employeeData.salary" type="number" id="salary" required />

    <label for="phone">Phone:</label>
    <input v-model="employeeData.phone" type="text" id="phone" required />

    <button type="submit">Submit</button>
  </form>
</template>