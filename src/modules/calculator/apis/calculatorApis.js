// Apis Calculator

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/calculators/';

export const calculate = (firstNumber, secondNumber, operator) => {
  return axios.get(API_URL, {
    params: {
      firstNumber,
      secondNumber,
      operator
    },
    headers: {
        apiKey: 'v1.0' 
      }
  });
};