// === Browser-Specific Type Definitions ===

export interface IBrowserFileOptions {
  acceptTypes?: string[] // e.g. ['image/jpeg', 'image/png', 'image/webp']
  multiple?: boolean
  maxSize?: number // in bytes
}

// === Browser Constants and Default Options ===

export const DEFAULT_BROWSER_OPTIONS: IBrowserFileOptions = {
  acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: false,
  maxSize: 10 * 1024 * 1024, // 10MB
}
