import { defineStore } from 'pinia';
import { ref } from 'vue';
import { markRaw } from 'vue';
export const useModalStore = defineStore('modal', () => {
    const modalStack = ref([]);
    function openModal(component, props = {}) {
        modalStack.value.push({
            component: markRaw(component),
            props,
        });
    }
    function closeModal() {
        modalStack.value.pop();
    }
    function clearModals() {
        modalStack.value = [];
    }
    return { modalStack, openModal, closeModal, clearModals };
});
