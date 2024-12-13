// Services Calculator

import { calculate } from "../apis/calculatorApis";


export const performCalculation = async (firstNumber, secondNumber, operator) => {
  try {
    const response = await calculate(firstNumber, secondNumber, operator);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Lỗi khi tính toán');
  }
};