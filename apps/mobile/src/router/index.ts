import debouncedRouting from '@/utils/debouncedRouting'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/home',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '/dashboard/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/dashboard/scan',
        name: 'scan',
        component: () => import('../views/ScanView.vue'),
      },
      {
        path: '/dashboard/history',
        name: 'history',
        component: () => import('../views/HistoryView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(debouncedRouting)

export default router
