// Apis Employee
import axios from "axios";

const apiUrl = "http://localhost:8080/api/v1/employees";
const headers = {
  apiKey: "v1.0",
};

export const getAll = async(filters, pagination = {}) => {
  
  const params = {};

  if (filters.name) params.name = filters.name;
  if (filters.dobFrom) params.dobFrom = filters.dobFrom;
  if (filters.dobTo) params.dobTo = filters.dobTo;
  if (filters.gender) params.gender = filters.gender;
  if (filters.salaryRange) params.salaryRange = filters.salaryRange;
  if (filters.phone) params.phone = filters.phone;
  if (filters.departmentId) params.departmentId = filters.departmentId;
  if (pagination.page) params.page = pagination.page;
  if (pagination.perPage) params.size = pagination.size;

  return await axios.get(apiUrl, { headers, params });
};

export const addEmployee = async (employee) => {
  const response = await axios.post(apiUrl, employee, { headers });
  return response;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${apiUrl}/${id}`, employee, { headers });
  return response;
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`, { headers });
  return response;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${apiUrl}/${id}`, { headers });
};
