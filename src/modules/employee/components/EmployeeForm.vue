<!-- EmployeeForm.vue -->

<template>
  <div v-if="showForm" class="form-overlay">
    <div class="form-container">
      <h2>{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h2>
      <form @submit.prevent="handleSubmit">
        <label>Name:
          <input v-model="formData.name" type="text" required />
        </label>
        <label>Date of Birth:
          <input v-model="formData.dob" type="date" required />
        </label>
        <label>Gender:
          <select v-model="formData.gender" required>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>
        <label>Salary:
          <input v-model="formData.salary" type="number" required />
        </label>
        <label>Phone:
          <input v-model="formData.phone" type="text" required />
        </label>
        <label>Department:
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
</template>

<script>
export default {
  props: {
    showForm: Boolean,
    isEditing: Boolean,
    formData: Object,
    departments: Array
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.formData);
    },
    resetForm() {
      this.$emit("cancel");
    }
  }
};
</script>
<style scoped>

.form-overlay {
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

.form-container {
  background-color: #54de09b0;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.form-container input,
.form-container select {
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
</style>