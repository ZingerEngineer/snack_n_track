export interface TPickPictureOptions {
  allowGallery?: boolean
  allowCamera?: boolean
  quality?: number
  allowEditing?: boolean
  maxWidth?: number
  maxHeight?: number
  correctOrientation?: boolean
  // Browser-specific options
  acceptTypes?: string[]
  multiple?: boolean
}
