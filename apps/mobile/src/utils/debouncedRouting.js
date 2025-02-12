import debounce from './debounce';
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
        });
        const responseJson = await response.json();
        if (responseJson.authenticated) {
            if (to.path === '/login' || to.path === '/register') {
                next('/dashboard/home'); // Redirect authenticated users away from login or register
            }
            else {
                next(); // Allow navigation if authenticated
            }
        }
        else {
            if (to.path !== '/login' && to.path !== '/register') {
                next('/login'); // Redirect unauthenticated users away from protected routes
            }
            else {
                next(); // Allow navigation if unauthenticated and route does not require auth
            }
        }
    }
    catch (error) {
        console.error('Authorization error:', error);
        next('/login'); // Redirect on error (e.g., token expired)
    }
}, 300);
export default debouncedRouting;
