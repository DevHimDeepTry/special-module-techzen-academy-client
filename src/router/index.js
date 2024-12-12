import { createRouter } from 'vue-router';
import MainLayout from '../common-layouts/MainLayout.vue';
import { createWebHistory } from 'vue-router';


const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: MainLayout,
    children: [
      { path: 'dictionary', component: "DictionaryPage" },
      { path: 'calculator', component: "CalculatorPage" },
      { path: 'employee-management', component: "EmployeeManagementPage" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
