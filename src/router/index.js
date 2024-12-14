import { createRouter } from 'vue-router';
import MainLayout from '../common-layouts/MainLayout.vue';
import { createWebHistory } from 'vue-router';
import Dictionary from '../modules/dictionary/pages/Dictionary.vue';
import Calculator from '../modules/calculator/pages/Calculator.vue';
import Employee from '../modules/employee/pages/Employee.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dictionary', component: Dictionary},
      { path: 'calculator', component: Calculator},
      { path: 'employee-management', component: Employee},

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
