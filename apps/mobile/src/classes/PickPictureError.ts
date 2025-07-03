import type { TPickPictureError } from '../types/apis/shared.apis.types'

export class PickPictureError extends Error {
  constructor(
    public type: TPickPictureError,
    message: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'PickPictureError'
  }
}
