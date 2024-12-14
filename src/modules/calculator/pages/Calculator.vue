<template>
  <div>
    <h1>Calculator</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="firstNumber">First Number <span class="required">*</span></label>
        <input type="text" v-model="firstNumber" id="firstNumber" />
      </div>
      <div>
        <label for="secondNumber">Second Number <span class="required">*</span></label>
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
div {
  font-family: Arial, sans-serif;
  background-color: #f4f7fb;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(5, 221, 16, 0.914);
  max-width: 500px;
  margin: 20px auto;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  color: #444;
}

.required {
  color: red;
  font-size: 1.2rem;
  margin-left: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #00FF00;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #00FF00;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #008000;
}

h3 {
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.error {
  color: #FF5300;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
}
</style>
