<!-- SearchForm.vue -->
<template>
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
        <button id="searchButton" @click="onSearch">Search</button>
        <button id="clearButton" @click="onClear">Clear Search</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      filters: Object,
      departments: Array
    },
    methods: {
      onSearch() {
        this.$emit("search");
      },
      onClear() {
        this.$emit("clear");
      }
    }
  };
  </script>
  
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
  </style>