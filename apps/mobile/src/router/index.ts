import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
import fetcher from '../utils/server/fetcher'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'
import PreferencesService from '../apis/mobile/usePreferences'

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
        name: 'dashboard-scan',
        component: () => import('../views/ScanTab/ScanStartView.vue'),
      },
      {
        path: '/dashboard/history',
        name: 'history',
        component: () => import('../views/HistoryView.vue'),
      },
    ],
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/ScanTab/ScanView.vue'),
    children: [
      {
        path: '/scan/upload',
        name: 'upload',
        component: () => import('../views/ScanTab/UploadPhotoView.vue'),
      },
      {
        path: '/scan/upload-results',
        name: 'upload-results',
        component: () => import('../views/ScanTab/UploadResultsView.vue'),
      },
    ],
  },
  {
    path: '/user/settings',
    redirect: '/user/settings/profile',
    name: 'user-settings-menu',
    component: () => import('../views/user/SettingsMenu.vue'),
    children: [
      {
        path: '/user/settings/profile',
        name: 'user-settings-profile',
        component: () => import('../views/user/ProfileSettingsView.vue'),
      },
    ],
  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import('../views/IntroViews/IntroView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AuthViews/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/AuthViews/RegisterView.vue'),
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

// const getSession = async (): Promise<{ authorized: boolean }> => {
//   try {
//     const response = await fetcher<{ authorized: boolean }>('auth/session', {
//       method: 'GET',
//       contentType: 'application/json',
//       credentials: 'include',
//       headers: {
//         Authorization: `Bearer ${(await PreferencesService.getItem('accessToken')).value}`,
//         Refresh: `Refresher ${(await PreferencesService.getItem('refreshToken')).value}`,
//       },
//     })

//     return response
//   } catch (error) {
//     console.error('Session error:', error)
//     throw new Error(`Failed to fetch session`)
//   }
// }

// The route guard using async/await. This guard assumes that routes
// such as '/login' and '/register' are publicly accessible.
// const authGuard = async (
//   to: RouteLocationNormalized,
//   _: RouteLocationNormalizedLoaded,
//   next: NavigationGuardNext,
// ) => {
//   try {
//     const session = await getSession()
//     const isAuthorized = session.authorized
//     // If the user is authorized and trying to access login or register,
//     // redirect them to the dashboard.
//     if (isAuthorized && ['/login', '/register'].includes(to.path)) {
//       return next('/dashboard/home')
//     }

//     // If the user is not authorized and is trying to access a protected route,
//     // redirect them to login.
//     if (!isAuthorized && !['/login', '/register'].includes(to.path)) {
//       return next('/login')
//     }

//     // If the user is already on the login page and not authorized, allow the navigation.
//     if (!isAuthorized && to.path === '/login') {
//       return next()
//     }

//     // Otherwise, allow the navigation.
//     return next()
//   } catch (error) {
//     console.error('Authorization error:', error)
//     // On error (such as network issues or token expiration), redirect to login.
//     return next('/login')
//   }
// }

// Register the guard with Vue Router.
// router.beforeEach(authGuard)

export default router
