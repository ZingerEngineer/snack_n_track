import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from 'vue-router'
import debounce from './debounce'

function isRouteLocationNormalizedGeneric(to: unknown): to is RouteLocationNormalizedGeneric {
  return typeof to === 'object' && to !== null && 'path' in to
}

function isRouteLocationNormalizedLoadedGeneric(
  from: unknown,
): from is RouteLocationNormalizedLoadedGeneric {
  return typeof from === 'object' && from !== null && 'path' in from
}

function isNavigationGuardNext(next: unknown): next is NavigationGuardNext {
  return typeof next === 'function'
}

const debouncedRouting = debounce(async (to: unknown, from: unknown, next: unknown) => {
  if (
    !isRouteLocationNormalizedGeneric(to) ||
    !isRouteLocationNormalizedLoadedGeneric(from) ||
    !isNavigationGuardNext(next) ||
    !(next instanceof Function)
  ) {
    throw new Error('Invalid arguments passed to debouncedRouting')
  }
  try {
    const response = await fetch('http://localhost:3000/v1/auth/session', {
      method: 'GET',
      credentials: 'include',
    })
    console.log(response)
    const responseJson = await response.json()
    console.log(responseJson)
    if (responseJson.authenticated) {
      if (to.path === '/login' || to.path === '/register') {
        console.log(
          'Authenticated user trying to access login or register, redirecting to /dashboard/home',
        )
        next('/dashboard/home') // Redirect authenticated users away from login or register
      } else {
        console.log('Authenticated user, allowing navigation')
        next() // Allow navigation if authenticated
      }
    } else {
      if (to.path !== '/login' && to.path !== '/register') {
        console.log('Unauthenticated user trying to access protected route, redirecting to /login')
        next('/login') // Redirect unauthenticated users away from protected routes
      } else {
        console.log('Unauthenticated user accessing login or register, allowing navigation')
        next() // Allow navigation if unauthenticated and route does not require auth
      }
    }
  } catch (error) {
    console.error('Authentication error:', error)
    console.log('Error occurred, redirecting to /login')
    next('/login') // Redirect on error (e.g., token expired)
  }
}, 300)

export default debouncedRouting
