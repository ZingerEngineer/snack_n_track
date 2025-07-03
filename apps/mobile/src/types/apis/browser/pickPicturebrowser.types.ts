export type TBrowserFileOptions = {
  acceptTypes?: string[]
  multiple?: boolean
  maxSize?: number
}

export const defaultBrowserOptions: TBrowserFileOptions = {
  acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: false,
  maxSize: 10 * 1024 * 1024, // 10MB
}
