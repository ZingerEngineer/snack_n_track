<!-- components/BaseModal.vue -->
<template>
  <Teleport to="#modals">
    <!-- Only render if there is at least one modal in the stack -->
    <div v-if="currentModal" class="modal-backdrop" @click.self="handleClose">
      <div class="modal-content" @click.stop>
        <!-- Dynamically render the current modal -->
        <component :is="currentModal.component" v-bind="currentModal.props" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '../stores/components/modal.store'

const modalStore = useModalStore()
// Compute the top modal (if any)
const currentModal = computed(() => {
  const stack = modalStore.modalStack
  return stack.length ? stack[stack.length - 1] : null
})

// Clicking on the backdrop closes the top modal
function handleClose() {
  modalStore.closeModal()
}
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
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  position: relative;
}
</style>
