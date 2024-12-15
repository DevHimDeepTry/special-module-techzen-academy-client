// Apis Employee
import axios from "axios";

const apiUrl = "http://localhost:8080/api/v1/departments/";
const headers = {
  apiKey: "v1.0",
};

export const getDepartments = () => {
  return axios.get(apiUrl, { headers});
};