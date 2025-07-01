import { modalService } from './modal.service'
import type { ModalOptions } from './modal.service'

// Import modal components
import ErrorModal from '../components/modals/ErrorModal.vue'
import SuccessModal from '../components/modals/SuccessModal.vue'
import ProcessingModal from '../components/modals/ProcessingModal.vue'

/**
 * Convenient modal utilities that include the component imports
 * Use these instead of the modal service directly for type safety
 */
export class ModalUtils {
  /**
   * Show an error modal with proper component import
   */
  static showError(
    title: string,
    message: string,
    options: {
      showRetry?: boolean
      showReset?: boolean
      onRetry?: () => void | Promise<void>
      onReset?: () => void | Promise<void>
      modalOptions?: ModalOptions
    } = {},
  ): string {
    return modalService.showError(ErrorModal, title, message, options)
  }

  /**
   * Show a success modal with proper component import
   */
  static showSuccess(
    title: string,
    message: string,
    options: {
      autoClose?: boolean
      autoCloseDelay?: number
      modalOptions?: ModalOptions
    } = {},
  ): string {
    return modalService.showSuccess(SuccessModal, title, message, options)
  }

  /**
   * Show a processing modal with proper component import
   */
  static showProcessing(
    title: string,
    message: string,
    options: {
      progress?: number
      showProgress?: boolean
      allowClose?: boolean
      modalOptions?: ModalOptions
    } = {},
  ): string {
    return modalService.showProcessing(ProcessingModal, title, message, options)
  }

  /**
   * Update processing modal progress
   */
  static updateProcessingProgress(modalId: string, progress: number, message?: string): void {
    return modalService.updateProcessingProgress(modalId, progress, message)
  }

  /**
   * Close a specific modal
   */
  static closeModal(modalId?: string): boolean {
    return modalService.closeModal(modalId)
  }

  /**
   * Close all modals
   */
  static closeAllModals(): number {
    return modalService.closeAllModals()
  }

  /**
   * Check if any modal is open
   */
  static get isModalOpen(): boolean {
    return modalService.isModalOpen
  }

  /**
   * Get current modal count
   */
  static get modalCount(): number {
    return modalService.modalCount
  }
}

// Export for convenience
export { modalService, ErrorModal, SuccessModal, ProcessingModal }

// Export individual utilities for specific use cases
export const showErrorModal = ModalUtils.showError
export const showSuccessModal = ModalUtils.showSuccess
export const showProcessingModal = ModalUtils.showProcessing
export const updateProcessingProgress = ModalUtils.updateProcessingProgress
export const closeModal = ModalUtils.closeModal
export const closeAllModals = ModalUtils.closeAllModals
