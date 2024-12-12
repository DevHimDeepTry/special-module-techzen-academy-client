import { createRouter } from 'vue-router';
import MainLayout from '../common-layouts/MainLayout.vue';
import { createWebHistory } from 'vue-router';
import Dictionary from '../modules/dictionary/pages/Dictionary.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dictionary', component: Dictionary},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
