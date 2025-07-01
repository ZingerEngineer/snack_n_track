// src/stores/loadingStore.ts
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingCount: 0,
    customMessage: '',
    showProgress: false,
    progress: 0,
  }),
  getters: {
    isLoading: (state) => state.loadingCount > 0,
    currentMessage: (state) => state.customMessage || 'Loading...',
  },
  actions: {
    startLoading(message?: string, showProgress = false) {
      this.loadingCount++
      if (message) this.customMessage = message
      this.showProgress = showProgress
    },
    stopLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--
        // Clear custom state when no more loading
        if (this.loadingCount === 0) {
          this.customMessage = ''
          this.showProgress = false
          this.progress = 0
        }
      }
    },
    resetLoading() {
      this.loadingCount = 0
      this.customMessage = ''
      this.showProgress = false
      this.progress = 0
    },
    updateProgress(progress: number) {
      this.progress = Math.max(0, Math.min(100, progress))
    },
    updateMessage(message: string) {
      this.customMessage = message
    },
  },
})
