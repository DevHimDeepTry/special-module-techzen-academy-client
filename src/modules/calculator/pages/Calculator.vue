<template>
    <div>
      <h1>Calculator</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="firstNumber">First Number</label>
          <input type="text" v-model="firstNumber" id="firstNumber" />
        </div>
        <div>
          <label for="secondNumber">Second Number</label>
          <input type="text" v-model="secondNumber" id="secondNumber" />
        </div>
        <div>
          <label for="operator">Operator</label>
          <select v-model="operator" id="operator">
            <option value="+">Add (+)</option>
            <option value="-">Subtract (-)</option>
            <option value="*">Multiply (*)</option>
            <option value="/">Divide (/)</option>
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>
  
      <div v-if="result !== null">
        <h3>Result: {{ result }}</h3>
      </div>
      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { performCalculation } from '../services/calculatorServices';
  
  const firstNumber = ref('');
  const secondNumber = ref('');
  const operator = ref('+');
  const result = ref(null);
  const errorMessage = ref(null);
  
  const onSubmit = async () => {
    errorMessage.value = null;
    result.value = null;
  
    try {
      result.value = await performCalculation(firstNumber.value, secondNumber.value, operator.value);
    } catch (error) {
      errorMessage.value = error.message || 'Có lỗi xảy ra';
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>  