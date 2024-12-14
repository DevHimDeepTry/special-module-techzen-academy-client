import { getAll, addEmployee, updateEmployee, getEmployeeById, deleteEmployee } from "../apis/employeeApis";

export const readEmployeeList = async () => {
  const res = await getAll();
  return res.data.data;
};

export const insertNewEmployee = async (data) => {
  const res = await addEmployee(data);
  return res.data.data;
};

export const detailEmployee = async (id) => {
  const res = await getEmployeeById(id);
  return res.data.data;
};

export const removeEmployee = async (id) => {
  await deleteEmployee(id);
};

export const updateEmployeeData = async (id, newData) => {
    const response = await updateEmployee(id, newData);
    return response.data.data;
};