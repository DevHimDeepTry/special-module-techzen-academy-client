// Apis Employee
import axios from "axios";

const apiUrl = "http://localhost:8080/api/v1/employees/";
const headers = {
  apiKey: "v1.0",
};

// export const getAll = () => axios.get(apiUrl, { headers });
export const getAll = (filters = {}) => {
  const params = {
    name: filters.name || '',
    dobFrom: filters.dobFrom || '',
    dobTo: filters.dobTo || '',
    gender: filters.gender || '',
    salaryRange: filters.salaryRange || '',
    phone: filters.phone || '',
    departmentId: filters.departmentId || '',
  };
  
  return axios.get(apiUrl, { headers, params });
};

export const addEmployee = async (employee) => {
  const response = await axios.post(apiUrl, employee, { headers });
  return response;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${apiUrl}${id}`, employee, { headers });
  return response;
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${apiUrl}${id}`, { headers });
  return response;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${apiUrl}${id}`, { headers });
};
