import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/compass',
    name: 'Compass',
    component: () => import('../views/CompassView.vue')
  },
  {
    path: '/fengshui-calculator',
    name: 'FengShuiCalculator',
    component: () => import('../views/FengShuiCalculatorView.vue')
  },
  {
    path: '/fortune',
    name: 'Fortune',
    component: () => import('../views/FortuneView.vue')
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('../views/KnowledgeView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;