import { createRouter, createWebHistory } from '@ionic/vue-router';
const routes = [
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
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
import debounce from '../utils/debounce';
function isRouteLocationNormalizedGeneric(to) {
    return typeof to === 'object' && to !== null && 'path' in to;
}
function isRouteLocationNormalizedLoadedGeneric(from) {
    return typeof from === 'object' && from !== null && 'path' in from;
}
function isNavigationGuardNext(next) {
    return typeof next === 'function';
}
const debouncedRouting = debounce(async (to, from, next) => {
    if (!isRouteLocationNormalizedGeneric(to) ||
        !isRouteLocationNormalizedLoadedGeneric(from) ||
        !isNavigationGuardNext(next) ||
        !(next instanceof Function)) {
        throw new Error('Invalid arguments passed to debouncedRouting');
    }
    try {
        const response = await fetch('http://localhost:3000/v1/auth/session', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        });
        console.log('Response:', response);
        const responseJson = await response.json();
        console.log('Response JSON:', responseJson);
        if (responseJson.authenticated) {
            if (to.path === '/login' || to.path === '/register') {
                console.log('Authenticated user trying to access login or register, redirecting to /dashboard/home');
                router.push('/dashboard/home'); // Redirect authenticated users away from login or register
            }
            else {
                console.log('Authenticated user, allowing navigation');
                next(); // Allow navigation if authenticated
            }
        }
        else {
            if (to.path !== '/login' && to.path !== '/register') {
                console.log('Unauthenticated user trying to access protected route, redirecting to /login');
                router.push('/login'); // Redirect unauthenticated users away from protected routes
            }
            else {
                console.log('Unauthenticated user accessing login or register, allowing navigation');
                next(); // Allow navigation if unauthenticated and route does not require auth
            }
        }
    }
    catch (error) {
        console.error('Authorization error:', error);
        console.log('Error occurred, redirecting to /login');
        router.push('/login'); // Redirect on error (e.g., token expired)
    }
}, 300);
router.beforeEach(debouncedRouting);
export default router;
