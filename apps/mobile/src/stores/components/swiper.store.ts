import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSwiperStore = defineStore('swiper', () => {
  const currentIndex = ref(0)
  const swiperLength = ref(0)

  const setSwiperLength = (length: number) => {
    swiperLength.value = length
  }
  const getSwiperLength = () => {
    return swiperLength.value
  }
  const setCurrentIndex = (index: number) => {
    if (index < 0 || index >= swiperLength.value) {
      return
    }
    currentIndex.value = index
  }
  const getCurrentIndex = () => {
    return currentIndex.value
  }

  const nextIndex = () => {
    if (currentIndex.value + 1 >= swiperLength.value) {
      return
    }
    currentIndex.value++
  }
  const prevIndex = () => {
    if (currentIndex.value - 1 < 0) {
      return
    }
    currentIndex.value--
  }
  const resetIndex = () => {
    currentIndex.value = 0
  }
  const goToIndex = (index: number) => {
    if (index < 0 || index >= swiperLength.value) {
      return
    }
    currentIndex.value = index
  }

  return {
    currentIndex,
    goToIndex,
    nextIndex,
    prevIndex,
    resetIndex,
    setCurrentIndex,
    getCurrentIndex,
    setSwiperLength,
    getSwiperLength,
  }
})

export default useSwiperStore
