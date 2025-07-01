import { isPlatform } from '@ionic/vue'

/**
 * Utility function to detect if we're on mobile
 * @returns true if on mobile platform
 */
export function isMobile(): boolean {
  return isPlatform('capacitor') || isPlatform('hybrid') || isPlatform('mobile')
}
