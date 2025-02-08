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
    name: '/register',
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

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedBeforeEach = debounce(async (to, from, next) => {
  try {
    const response = await fetch('http://localhost:3000/v1/auth/session', {
      method: 'GET',
      credentials: 'include',
    })

    const responseJson = await response.json()

    if (responseJson.authenticated) {
      if (to.path === '/login' || to.path === '/register') {
        next('/dashboard/home') // Redirect authenticated users away from login or register
      } else if (to.meta.requiresAuth) {
        next() // Allow navigation if authenticated and route requires auth
      } else {
        next() // Allow navigation if authenticated and route does not require auth
      }
    } else {
      if (to.meta.requiresAuth) {
        next('/login') // Redirect to login if not authenticated and route requires auth
      } else {
        next() // Allow navigation if not authenticated and route does not require auth
      }
    }
  } catch (error) {
    console.error('Authorization error:', error)
    next('/login') // Redirect on error (e.g., token expired)
  }
}, 300)

router.beforeEach(debouncedBeforeEach)

export default router
