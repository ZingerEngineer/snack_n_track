import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { markRaw, type Component } from 'vue'

interface ModalOptions {
  /** Whether clicking the backdrop should close the modal */
  closeOnBackdrop?: boolean
  /** Whether pressing Escape should close the modal */
  closeOnEscape?: boolean
  /** Custom CSS class for the modal backdrop */
  backdropClass?: string
  /** Custom CSS class for the modal content */
  contentClass?: string
  /** Custom z-index for the modal */
  zIndex?: number
  /** Whether the modal should be persistent (not closeable by normal means) */
  persistent?: boolean
  /** Callback when modal is opened */
  onOpen?: () => void
  /** Callback when modal is closed */
  onClose?: () => void
  /** Maximum width for the modal */
  maxWidth?: string
  /** Animation duration in milliseconds */
  animationDuration?: number
}

interface Modal {
  id: string
  component: Component
  props: Record<string, unknown>
  options: ModalOptions
  createdAt: number
}

export const useModalStore = defineStore('modal', () => {
  const modalStack = ref<Modal[]>([])
  let modalIdCounter = 0

  // Computed properties
  const currentModal = computed(() => {
    return modalStack.value.length > 0 ? modalStack.value[modalStack.value.length - 1] : null
  })

  const isOpen = computed(() => modalStack.value.length > 0)

  const modalCount = computed(() => modalStack.value.length)

  // Generate unique modal ID
  function generateModalId(): string {
    return `modal-${++modalIdCounter}-${Date.now()}`
  }

  // Open modal with enhanced options
  function openModal(
    component: Component,
    props: Record<string, unknown> = {},
    options: ModalOptions = {},
  ): string {
    const modalId = generateModalId()

    const defaultOptions: ModalOptions = {
      closeOnBackdrop: true,
      closeOnEscape: true,
      persistent: false,
      animationDuration: 300,
      ...options,
    }

    const modal: Modal = {
      id: modalId,
      component: markRaw(component),
      props,
      options: defaultOptions,
      createdAt: Date.now(),
    }

    modalStack.value.push(modal)

    // Call onOpen callback if provided
    if (defaultOptions.onOpen) {
      defaultOptions.onOpen()
    }

    return modalId
  }

  // Close the top modal
  function closeModal(): boolean {
    if (modalStack.value.length === 0) {
      return false
    }

    const modal = modalStack.value[modalStack.value.length - 1]

    // Check if modal is persistent
    if (modal.options.persistent) {
      return false
    }

    // Call onClose callback if provided
    if (modal.options.onClose) {
      modal.options.onClose()
    }

    modalStack.value.pop()
    return true
  }

  // Close specific modal by ID
  function closeModalById(id: string): boolean {
    const index = modalStack.value.findIndex((modal) => modal.id === id)
    if (index === -1) {
      return false
    }

    const modal = modalStack.value[index]

    // Check if modal is persistent
    if (modal.options.persistent) {
      return false
    }

    // Call onClose callback if provided
    if (modal.options.onClose) {
      modal.options.onClose()
    }

    modalStack.value.splice(index, 1)
    return true
  }

  // Close all modals
  function clearModals(): number {
    const closedCount = modalStack.value.length

    // Call onClose callbacks for all modals
    modalStack.value.forEach((modal) => {
      if (modal.options.onClose) {
        modal.options.onClose()
      }
    })

    modalStack.value = []
    return closedCount
  }

  // Close all non-persistent modals
  function closeAllNonPersistent(): number {
    const initialCount = modalStack.value.length

    modalStack.value = modalStack.value.filter((modal) => {
      if (!modal.options.persistent) {
        // Call onClose callback
        if (modal.options.onClose) {
          modal.options.onClose()
        }
        return false
      }
      return true
    })

    return initialCount - modalStack.value.length
  }

  // Handle backdrop click
  function handleBackdropClick(): boolean {
    if (!currentModal.value) {
      return false
    }

    if (currentModal.value.options.closeOnBackdrop && !currentModal.value.options.persistent) {
      return closeModal()
    }

    return false
  }

  // Handle escape key
  function handleEscapeKey(): boolean {
    if (!currentModal.value) {
      return false
    }

    if (currentModal.value.options.closeOnEscape && !currentModal.value.options.persistent) {
      return closeModal()
    }

    return false
  }

  // Check if specific modal exists
  function hasModal(id: string): boolean {
    return modalStack.value.some((modal) => modal.id === id)
  }

  // Get modal by ID
  function getModal(id: string): Modal | undefined {
    return modalStack.value.find((modal) => modal.id === id)
  }

  // Get modals by component type
  function getModalsByComponent(component: Component): Modal[] {
    return modalStack.value.filter((modal) => modal.component === markRaw(component))
  }

  // Update modal props
  function updateModalProps(id: string, newProps: Record<string, unknown>): boolean {
    const modal = modalStack.value.find((m) => m.id === id)
    if (modal) {
      modal.props = { ...modal.props, ...newProps }
      return true
    }
    return false
  }

  // Set modal as persistent or non-persistent
  function setModalPersistent(id: string, persistent: boolean): boolean {
    const modal = modalStack.value.find((m) => m.id === id)
    if (modal) {
      modal.options.persistent = persistent
      return true
    }
    return false
  }

  return {
    // State
    modalStack: modalStack.value,

    // Computed
    currentModal,
    isOpen,
    modalCount,

    // Actions
    openModal,
    closeModal,
    closeModalById,
    clearModals,
    closeAllNonPersistent,
    handleBackdropClick,
    handleEscapeKey,
    hasModal,
    getModal,
    getModalsByComponent,
    updateModalProps,
    setModalPersistent,
  }
})
