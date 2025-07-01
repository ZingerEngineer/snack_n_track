<!-- Enhanced Modal Component -->
<template>
  <Teleport to="#modals">
    <!-- Render all modals in the stack with proper z-indexing -->
    <div
      v-for="(modal, index) in modalStack"
      :key="modal.id"
      class="modal-backdrop"
      :class="[
        modal.options.backdropClass,
        { 'modal-backdrop--animated': modal.options.animationDuration },
      ]"
      :style="{
        zIndex: baseZIndex + index,
        animationDuration: `${modal.options.animationDuration}ms`,
      }"
      @click.self="() => handleBackdropClick(modal)"
      @keydown.esc="() => handleEscapeKey(modal)"
      tabindex="-1"
    >
      <div
        class="modal-content"
        :class="modal.options.contentClass"
        :style="{
          maxWidth: modal.options.maxWidth,
          animationDuration: `${modal.options.animationDuration}ms`,
        }"
        @click.stop
      >
        <!-- Dynamically render the modal component -->
        <component
          :is="modal.component"
          v-bind="modal.props"
          :modal-id="modal.id"
          @close="() => closeModal(modal.id)"
          @update-props="(newProps: Record<string, unknown>) => updateProps(modal.id, newProps)"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '../stores/components/modal.store'

// Define modal type locally since it's not exported from the store
interface Modal {
  id: string
  component: Component
  props: Record<string, unknown>
  options: {
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    backdropClass?: string
    contentClass?: string
    zIndex?: number
    persistent?: boolean
    maxWidth?: string
    animationDuration?: number
  }
  createdAt: number
}

const modalStore = useModalStore()
const { modalStack } = storeToRefs(modalStore)

// Base z-index for modals
const baseZIndex = 9999

// Get the current (top) modal
const currentModal = computed(() => modalStore.currentModal)

// Handle backdrop click with enhanced logic
function handleBackdropClick(modal: Modal) {
  // Only handle backdrop click for the top modal
  if (modal === currentModal.value) {
    modalStore.handleBackdropClick()
  }
}

// Handle escape key with enhanced logic
function handleEscapeKey(modal: Modal) {
  // Only handle escape for the top modal
  if (modal === currentModal.value) {
    modalStore.handleEscapeKey()
  }
}

// Close specific modal
function closeModal(modalId: string) {
  modalStore.closeModalById(modalId)
}

// Update modal props
function updateProps(modalId: string, newProps: Record<string, unknown>) {
  modalStore.updateModalProps(modalId, newProps)
}

// Global keyboard event handler
function handleGlobalKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    modalStore.handleEscapeKey()
  }
}

// Setup global event listeners
onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-backdrop--animated {
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: scale(1);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.8) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.modal-content {
  animation: modalSlideIn 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
    padding: 1rem;
    border-radius: 6px;
  }
}

/* Focus trap for accessibility */
.modal-backdrop:focus {
  outline: none;
}
</style>
