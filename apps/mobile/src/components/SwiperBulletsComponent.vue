<template>
  <div class="p-4 flex justify-center gap-2">
    <button
      v-for="index in slides"
      :key="index"
      @click="goToSlide(index)"
      class="transition-all duration-200 w-3 h-3 rounded-full focus:outline-none"
      :class="index === currentIndex + 1 ? 'bg-primary px-4' : 'bg-gray-300 hover:bg-gray-400'"
      :aria-label="`Go to slide ${index + 1}`"
    ></button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  slides: {
    type: Number,
    required: true,
  },
  currentIndex: {
    type: Number,
    required: true,
  },
  goToSlide: {
    type: Function,
    required: true,
  },
})
</script>
