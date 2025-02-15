<template>
  <!-- We use Vue’s Suspense to show fallback content while the async component loads -->
  <Suspense>
    <!-- The default slot renders the wrapped component -->
    <template #default>
      <!-- Render the passed component with its props -->
      <component :is="is" v-bind="componentProps" />
    </template>
    <!-- The fallback slot renders a skeleton loader -->
    <template #fallback>
      <!-- Allow a custom skeleton via slot; otherwise, use a default -->
      <slot name="skeleton">
        <div class="skeleton-loader">
          <!-- Simple default skeleton (you can improve this with animations or CSS) -->
          Loading...
        </div>
      </slot>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  // The component to be rendered.
  is: {
    type: [Object, Function, String],
    required: true,
  },
  // Optional props to pass on to the wrapped component.
  componentProps: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style scoped>
.skeleton-loader {
  background-color: #eee;
  border-radius: 4px;
  height: 100px; /* Customize as needed */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  /* Optionally add a CSS animation for a pulsing effect */
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
