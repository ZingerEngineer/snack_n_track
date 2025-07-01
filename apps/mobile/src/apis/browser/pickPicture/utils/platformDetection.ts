import { isPlatform } from '@ionic/vue'

/**
 * Utility function to detect if we're running in a browser environment
 * @returns true if running in browser, false if native app
 */
export function isBrowser(): boolean {
  return !isPlatform('capacitor') && !isPlatform('hybrid')
}
