import { defineStore } from 'pinia'
import { ref } from 'vue'
import { markRaw, type Component } from 'vue'

interface Modal {
  component: Component
  props: Record<string, any>
}

export const useModalStore = defineStore('modal', () => {
  const modalStack = ref<Modal[]>([])

  function openModal(component: Component, props: Record<string, any> = {}) {
    modalStack.value.push({
      component: markRaw(component),
      props,
    })
  }

  function closeModal() {
    modalStack.value.pop()
  }

  function clearModals() {
    modalStack.value = []
  }

  return { modalStack, openModal, closeModal, clearModals }
})
