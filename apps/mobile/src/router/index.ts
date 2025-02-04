import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'
import HomeViewEnhanced from '@/views/HomeViewEnhanced.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },

  {
    path: '/homeE',
    name: 'homE',
    component: HomeViewEnhanced,
    children: [
      {
        path: 'scan',
        name: 'scan',
        component: () => import('../views/ScanView.vue'),
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  try {
    console.log('Checking session...')
    const response = await fetch('http://localhost:3000/v1/auth/session', {
      method: 'GET',
      credentials: 'include',
    })

    const responseJson = await response.json()
    console.log(responseJson)

    if (responseJson.authenticated) {
      if (to.path === '/login' || to.path === '/register') {
        next('/home') // Redirect authenticated users away from login or register
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
})

export default router
