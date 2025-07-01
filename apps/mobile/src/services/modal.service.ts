import { useModalStore } from '../stores/components/modal.store'
import type { Component } from 'vue'

export interface ModalOptions {
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  backdropClass?: string
  contentClass?: string
  zIndex?: number
  persistent?: boolean
  onOpen?: () => void
  onClose?: () => void
  maxWidth?: string
  animationDuration?: number
}

/**
 * Modal service for easy programmatic modal management
 */
export class ModalService {
  private modalStore = useModalStore()

  /**
   * Open a generic modal
   */
  openModal(
    component: Component,
    props: Record<string, unknown> = {},
    options: ModalOptions = {},
  ): string {
    return this.modalStore.openModal(component, props, options)
  }

  /**
   * Show an error modal
   * Note: Import ErrorModal before calling this method
   */
  showError(
    errorModalComponent: Component,
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
    return this.modalStore.openModal(
      errorModalComponent,
      {
        title,
        message,
        showRetry: options.showRetry || false,
        showReset: options.showReset || false,
        onRetry: options.onRetry,
        onReset: options.onReset,
      },
      options.modalOptions || {},
    )
  }

  /**
   * Show a success modal
   * Note: Import SuccessModal before calling this method
   */
  showSuccess(
    successModalComponent: Component,
    title: string,
    message: string,
    options: {
      autoClose?: boolean
      autoCloseDelay?: number
      modalOptions?: ModalOptions
    } = {},
  ): string {
    return this.modalStore.openModal(
      successModalComponent,
      {
        title,
        message,
        autoClose: options.autoClose || false,
        autoCloseDelay: options.autoCloseDelay || 3000,
      },
      options.modalOptions || {},
    )
  }

  /**
   * Show a processing modal
   * Note: Import ProcessingModal before calling this method
   */
  showProcessing(
    processingModalComponent: Component,
    title: string,
    message: string,
    options: {
      progress?: number
      showProgress?: boolean
      allowClose?: boolean
      modalOptions?: ModalOptions
    } = {},
  ): string {
    const modalOptions: ModalOptions = {
      persistent: !options.allowClose, // Make it persistent if close is not allowed
      closeOnBackdrop: options.allowClose || false,
      closeOnEscape: options.allowClose || false,
      ...options.modalOptions,
    }

    return this.modalStore.openModal(
      processingModalComponent,
      {
        title,
        message,
        progress: options.progress || 0,
        showProgress: options.showProgress || false,
        allowClose: options.allowClose || false,
      },
      modalOptions,
    )
  }

  /**
   * Update processing modal progress
   */
  updateProcessingProgress(modalId: string, progress: number, message?: string): void {
    const newProps: Record<string, unknown> = { progress }
    if (message) {
      newProps.message = message
    }
    this.modalStore.updateModalProps(modalId, newProps)
  }

  /**
   * Close a specific modal
   */
  closeModal(modalId?: string): boolean {
    if (modalId) {
      return this.modalStore.closeModalById(modalId)
    }
    return this.modalStore.closeModal()
  }

  /**
   * Close all modals
   */
  closeAllModals(): number {
    return this.modalStore.clearModals()
  }

  /**
   * Check if any modal is open
   */
  get isModalOpen(): boolean {
    return this.modalStore.isOpen
  }

  /**
   * Get current modal count
   */
  get modalCount(): number {
    return this.modalStore.modalCount
  }
}

// Export a singleton instance
export const modalService = new ModalService()
