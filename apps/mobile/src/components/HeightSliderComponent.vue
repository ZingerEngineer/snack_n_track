<template>
  <div class="height-selector w-full">
    <!-- Editable height input -->
    <div class="height-display w-full flex justify-center items-center">
      <div class="height-input-container w-full flex justify-center items-center">
        <input
          ref="heightInput"
          type="text"
          inputmode="decimal"
          class="height-input text-center max-w-14"
          :value="displayHeight"
          @input="onHeightInputChange"
          @blur="onHeightInputBlur"
          @keydown.enter="onHeightInputBlur"
          @keypress="checkInputCharacter"
        />
        <span class="height-unit mr-4">{{ unit }}</span>
      </div>
    </div>

    <!-- Debug info (can be removed in production) -->
    <div v-if="debug" class="debug-info">Touch active: {{ isTouching ? 'Yes' : 'No' }}</div>

    <!-- Manual controls as fallback -->
    <div class="manual-controls">
      <IonButton fill="outline" color="secondary" @click="decrementHeight"
        ><FontAwesomeIcon :icon="faMinus"></FontAwesomeIcon>
      </IonButton>
      <IonButton fill="outline" color="secondary" @click="incrementHeight"
        ><FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon
      ></IonButton>
    </div>

    <!-- Touch area with clear visual feedback - now vertical -->
    <div
      ref="touchArea"
      class="touch-area vertical max-h-40"
      :class="{
        touching: isTouching,
        'at-min-bound': isAtMinBound,
        'at-max-bound': isAtMaxBound,
      }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchEnd"
    >
      <div class="scale-container">
        <div class="scale-wrapper" :style="{ transform: `translateY(${translateY}px)` }">
          <!-- Only render visible ticks -->
          <div
            v-for="tick in visibleTicks"
            :key="tick.value"
            class="scale-tick"
            :class="{
              'scale-tick-major': tick.isMajor,
              'scale-tick-medium': tick.isMedium,
            }"
            :style="{ transform: `translateY(${tick.position}px)` }"
          >
            <div class="tick-line"></div>
            <div v-if="tick.isMajor" class="tick-label">{{ tick.label }}</div>
          </div>
        </div>

        <div class="current-indicator"></div>
      </div>
    </div>

    <div class="unit-toggle">
      <IonButton
        :fill="unit === 'cm' ? 'solid' : 'outline'"
        :class="{ active: unit === 'cm' }"
        @click="setUnit('cm')"
        >cm</IonButton
      >

      <IonButton
        :fill="unit === 'ft-in' ? 'solid' : 'outline'"
        :class="{ active: unit === 'ft-in' }"
        @click="setUnit('ft-in')"
      >
        ft-in
      </IonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IonButton } from '@ionic/vue'
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

// Type definitions
type HeightUnit = 'cm' | 'ft-in'

interface HeightTick {
  value: number
  label: number | string
  isMajor: boolean
  isMedium: boolean
  position: number
}

interface HeightChangeEvent {
  value: number
  unit: HeightUnit
}

// Props type definition
interface HeightSelectorProps {
  initialHeight?: number
  initialUnit?: HeightUnit
  minHeight?: number
  maxHeight?: number
  step?: number
  tickSpacing?: number
  visibleTicksCount?: number
  debug?: boolean
}

// Props with defaults and type checking
const props = withDefaults(defineProps<HeightSelectorProps>(), {
  initialHeight: 170,
  initialUnit: 'cm',
  minHeight: 55,
  maxHeight: 251,
  step: 0.5,
  tickSpacing: 20,
  visibleTicksCount: 30, // Number of ticks to render at once
  debug: false,
})

// Emits with type checking
const emit = defineEmits<{
  'update:height': [event: HeightChangeEvent]
  'update:unit': [unit: HeightUnit]
}>()

// Refs with type annotations
const touchArea = ref<HTMLDivElement | null>(null)
const heightInput = ref<HTMLInputElement | null>(null)
const currentHeight = ref<number>(props.initialHeight)
const unit = ref<HeightUnit>(props.initialUnit)
const translateY = ref<number>(0)
const isTouching = ref<boolean>(false)
const touchStartY = ref<number>(0)
const lastTouchY = ref<number>(0)
const startTranslateY = ref<number>(0)
const isEditing = ref<boolean>(false)

// Constants
const CM_TO_INCHES: number = 0.393701
const INCHES_TO_CM: number = 2.54
// Define default middle values for each unit
const DEFAULT_CM_VALUE = 170 // Default middle value in cm
const DEFAULT_FT_IN_VALUE = 5.7 * 12 // Default middle value in inches (5'7")

// Calculate the total number of ticks
const totalTicksCount = computed<number>(() => {
  const min: number = props.minHeight
  const max: number = props.maxHeight
  const step: number = props.step
  return Math.floor((max - min) / step) + 1
})

// Calculate the current index based on height
const currentIndex = computed<number>(() => {
  return Math.round((currentHeight.value - props.minHeight) / props.step)
})

// Check if at min/max bounds
const isAtMinBound = computed<boolean>(() => {
  return currentHeight.value <= props.minHeight
})

const isAtMaxBound = computed<boolean>(() => {
  return currentHeight.value >= props.maxHeight
})

// Format feet and inches from cm value
const formatFeetInches = (cm: number): string => {
  const totalInches = cm * CM_TO_INCHES
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)

  // Handle the case where inches is 12 (should roll over to next foot)
  if (inches === 12) {
    return `${feet + 1}' 0"`
  }

  return `${feet}' ${inches}"`
}

// Calculate visible ticks with improved precision
const visibleTicks = computed<HeightTick[]>(() => {
  const result: HeightTick[] = []

  if (unit.value === 'cm') {
    // For cm mode - generate ticks based on cm increments
    const buffer = Math.floor(props.visibleTicksCount / 2)
    const startIdx = Math.max(0, currentIndex.value - buffer)
    const endIdx = Math.min(totalTicksCount.value - 1, currentIndex.value + buffer)

    // Generate ticks for cm mode
    for (let i = startIdx; i <= endIdx; i++) {
      const value = props.minHeight + i * props.step
      const exactValue = parseFloat(value.toFixed(1))

      const isMajor = Math.abs(Math.round(exactValue) - exactValue) < 0.01
      const isMedium = Math.abs(Math.round(exactValue * 2) / 2 - exactValue) < 0.01 && !isMajor

      result.push({
        value: exactValue,
        label: isMajor ? Math.round(exactValue) : '',
        isMajor,
        isMedium,
        position: i * props.tickSpacing,
      })
    }
  } else {
    // For ft-in mode - generate ticks based on inch increments
    const currentInches = Math.round(currentHeight.value * CM_TO_INCHES)
    const range = Math.floor(props.visibleTicksCount / 2)

    // Create actual inch ticks in a range around current value
    for (let i = -range; i <= range; i++) {
      const inchValue = currentInches + i

      // Skip invalid values
      if (
        inchValue < Math.floor(props.minHeight * CM_TO_INCHES) ||
        inchValue > Math.ceil(props.maxHeight * CM_TO_INCHES)
      ) {
        continue
      }

      // Convert back to internal cm value
      const cmValue = parseFloat((inchValue * INCHES_TO_CM).toFixed(1))

      // Check if major tick (divisible by 12 - full feet)
      const isMajor = inchValue % 12 === 0
      // Medium tick for half-foot (6 inches)
      const isMedium = inchValue % 6 === 0 && !isMajor

      // Generate proper foot-inch label
      let label = ''
      if (isMajor) {
        const feet = Math.floor(inchValue / 12)
        label = `${feet}'`
      }

      result.push({
        value: inchValue,
        label,
        isMajor,
        isMedium,
        // Calculate position based on inch value rather than cm index
        position: ((cmValue - props.minHeight) / props.step) * props.tickSpacing,
      })
    }
  }

  return result
})

// Computed height display
const displayHeight = computed<string>(() => {
  if (unit.value === 'cm') {
    return currentHeight.value.toFixed(1)
  } else {
    return formatFeetInches(currentHeight.value)
  }
})

// Methods
const setUnit = (newUnit: HeightUnit): void => {
  if (unit.value === newUnit) return

  // Reset height to default middle value when changing units
  if (newUnit === 'cm') {
    currentHeight.value = DEFAULT_CM_VALUE
  } else {
    currentHeight.value = parseFloat((DEFAULT_FT_IN_VALUE * INCHES_TO_CM).toFixed(1))
  }

  unit.value = newUnit

  // Update visual position
  updateTranslateY()

  // Emit events for unit and height change
  emit('update:unit', newUnit)
  emit('update:height', {
    value: currentHeight.value,
    unit: unit.value,
  })
}

// Function to update the translate position with better precision
const updateTranslateY = (): void => {
  if (touchArea.value) {
    const containerHeight: number = touchArea.value.offsetHeight
    const centerPos: number = containerHeight / 2

    // Calculate precise index position
    const preciseIndex = (currentHeight.value - props.minHeight) / props.step

    // Calculate the exact position with precise alignment
    // For vertical slider, higher values should be at the bottom
    translateY.value = centerPos - preciseIndex * props.tickSpacing
  }
}

// Function to update height from translate position
const updateHeightFromTranslate = (): void => {
  if (!touchArea.value) return

  const containerHeight: number = touchArea.value.offsetHeight
  const centerPos: number = containerHeight / 2
  const offset: number = translateY.value - centerPos

  // Calculate precise index and height
  const preciseIndex = -offset / props.tickSpacing
  const roundedIndex = Math.round(preciseIndex)
  let newHeight = props.minHeight + roundedIndex * props.step

  // Ensure precision with fixed decimal places
  newHeight = parseFloat(newHeight.toFixed(1))

  // For ft-in mode, ensure we snap to exact inch values
  if (unit.value === 'ft-in') {
    const inchValue = Math.round(newHeight * CM_TO_INCHES)
    newHeight = parseFloat((inchValue * INCHES_TO_CM).toFixed(1))
  }

  // Constrain to valid range
  const constrainedHeight = Math.max(props.minHeight, Math.min(props.maxHeight, newHeight))

  if (constrainedHeight !== currentHeight.value) {
    currentHeight.value = constrainedHeight

    // Emit with proper unit conversion
    emit('update:height', {
      value: constrainedHeight,
      unit: unit.value,
    })
  }
}

const incrementHeight = (): void => {
  let newHeight: number

  if (unit.value === 'cm') {
    // For cm, increment by the standard step (0.5 cm)
    newHeight = parseFloat((currentHeight.value + props.step).toFixed(1))
  } else {
    // For ft-in, increment by 1 inch then convert back to cm
    const heightInInches = Math.round(currentHeight.value * CM_TO_INCHES)
    newHeight = parseFloat(((heightInInches + 1) * INCHES_TO_CM).toFixed(1))
  }

  // Constrain to max height
  newHeight = Math.min(props.maxHeight, newHeight)

  if (newHeight !== currentHeight.value) {
    currentHeight.value = newHeight
    updateTranslateY()
    emit('update:height', {
      value: newHeight,
      unit: unit.value,
    })
  }
}

const decrementHeight = (): void => {
  let newHeight: number

  if (unit.value === 'cm') {
    // For cm, decrement by the standard step (0.5 cm)
    newHeight = parseFloat((currentHeight.value - props.step).toFixed(1))
  } else {
    // For ft-in, decrement by 1 inch then convert back to cm
    const heightInInches = Math.round(currentHeight.value * CM_TO_INCHES)
    newHeight = parseFloat(((heightInInches - 1) * INCHES_TO_CM).toFixed(1))
  }

  // Constrain to min height
  newHeight = Math.max(props.minHeight, newHeight)

  if (newHeight !== currentHeight.value) {
    currentHeight.value = newHeight
    updateTranslateY()
    emit('update:height', {
      value: newHeight,
      unit: unit.value,
    })
  }
}

// Input validation function that properly handles backspace
const checkInputCharacter = (event: KeyboardEvent): void => {
  const input = event.target as HTMLInputElement
  const char = event.key

  // Allow navigation and editing keys without further validation
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
    return // Always allow these keys - don't prevent default
  }

  // Handle Enter key
  if (char === 'Enter') {
    onHeightInputBlur(event)
    return
  }

  if (unit.value === 'ft-in') {
    // Allow ft-in special characters
    if (["'", '"', ' '].includes(char)) {
      return // Allow apostrophe, quote, and space for ft-in format
    }
  }

  // Only allow digits and one decimal point for cm
  const isNumber = /^[0-9]$/.test(char)
  const isDecimal = char === '.' || char === ','

  if (!isNumber && !isDecimal) {
    event.preventDefault()
    return
  }

  // For cm: Get current selection to handle cursor position properly
  if (unit.value === 'cm') {
    const selectionStart = input.selectionStart || 0
    const selectionEnd = input.selectionEnd || 0
    const currentValue = input.value

    // Calculate what the new value would be
    const newValue =
      currentValue.substring(0, selectionStart) +
      (isDecimal ? '.' : char) +
      currentValue.substring(selectionEnd)

    // Prevent multiple decimal points
    if (isDecimal && currentValue.includes('.')) {
      event.preventDefault()
      return
    }

    // Validate number format (allow up to 3 digits before decimal and 1 after)
    const parts = newValue.split('.')
    if (parts[0].length > 3 || (parts.length > 1 && parts[1].length > 1)) {
      return // Don't block the user from entering a number after backspace
    }

    // Check if the number would be in valid range (only if it would be a complete number)
    if (newValue !== '' && !isNaN(parseFloat(newValue))) {
      const numValue = parseFloat(newValue)
      if (numValue < props.minHeight || numValue > props.maxHeight) {
        return // Don't block the user from entering a number after backspace
      }
    }
  }
}

// Input handlers for editable height
const onHeightInputChange = (event: Event): void => {
  isEditing.value = true
  const input = event.target as HTMLInputElement
  const value = input.value.replace(',', '.') // Handle comma as decimal separator

  if (unit.value === 'cm') {
    // For cm: Parse and validate the input
    const newHeight = parseFloat(parseFloat(value).toFixed(1))

    // Validate the input
    if (!isNaN(newHeight)) {
      // Constrain to valid range with proper rounding
      const minHeight = parseFloat(props.minHeight.toFixed(1))
      const maxHeight = parseFloat(props.maxHeight.toFixed(1))
      currentHeight.value = Math.max(minHeight, Math.min(maxHeight, newHeight))
    }
  } else {
    // For ft-in: Parse feet and inches format
    // Accept formats like: 5'7", 5'7, 5ft7in, 5 7, etc.
    const feetInchRegex = /(\d+)'?\s*(\d*)/
    const match = value.match(feetInchRegex)

    if (match) {
      const feet = parseInt(match[1], 10)
      const inches = match[2] ? parseInt(match[2], 10) : 0

      // Convert to cm
      const totalInches = feet * 12 + inches
      const heightInCm = parseFloat((totalInches * INCHES_TO_CM).toFixed(1))

      // Validate and constrain
      if (!isNaN(heightInCm)) {
        const minHeight = parseFloat(props.minHeight.toFixed(1))
        const maxHeight = parseFloat(props.maxHeight.toFixed(1))
        currentHeight.value = Math.max(minHeight, Math.min(maxHeight, heightInCm))
      }
    }
  }
}

// Height input blur handler
const onHeightInputBlur = (event: Event): void => {
  if (!isEditing.value) return

  if (unit.value === 'cm') {
    const input = event.target as HTMLInputElement
    const value = input.value.replace(',', '.') // Handle comma as decimal separator

    // Parse and validate the input
    let newHeight = parseFloat(parseFloat(value).toFixed(1))

    // Validate the input
    if (isNaN(newHeight)) {
      // Reset to current value if invalid
      input.value = displayHeight.value
    } else {
      // Constrain to valid range with proper rounding
      const minHeight = parseFloat(props.minHeight.toFixed(1))
      const maxHeight = parseFloat(props.maxHeight.toFixed(1))
      newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))

      // Update height and position
      currentHeight.value = newHeight
      updateTranslateY()

      // Emit the update
      emit('update:height', {
        value: newHeight,
        unit: unit.value,
      })
    }
  } else {
    // Process ft-in input
    const input = event.target as HTMLInputElement
    const value = input.value

    // Parse feet and inches format
    const feetInchRegex = /(\d+)'?\s*(\d*)/
    const match = value.match(feetInchRegex)

    if (match) {
      const feet = parseInt(match[1], 10)
      const inches = match[2] ? parseInt(match[2], 10) : 0

      // Convert to cm
      const totalInches = feet * 12 + inches
      let heightInCm = parseFloat((totalInches * INCHES_TO_CM).toFixed(1))

      // Validate and constrain
      if (!isNaN(heightInCm)) {
        heightInCm = Math.max(props.minHeight, Math.min(props.maxHeight, heightInCm))

        // Update height and position
        currentHeight.value = heightInCm
        updateTranslateY()

        // Emit the update
        emit('update:height', {
          value: heightInCm,
          unit: unit.value,
        })
      } else {
        // Reset to current value if invalid
        input.value = displayHeight.value
      }
    } else {
      // Reset to current value if invalid format
      input.value = displayHeight.value
    }
  }

  isEditing.value = false
}

// Touch handlers with improved reliability and bounds checking
const handleTouchStart = (event: TouchEvent): void => {
  event.preventDefault() // Prevent default behavior

  isTouching.value = true
  touchStartY.value = event.touches[0].clientY
  lastTouchY.value = touchStartY.value
  startTranslateY.value = translateY.value

  // Add global touch event listeners for better tracking
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
  document.addEventListener('touchcancel', handleTouchEnd)
}

const handleTouchMove = (event: TouchEvent): void => {
  if (!isTouching.value) return

  event.preventDefault() // Prevent scrolling

  const touchY: number = event.touches[0].clientY
  const deltaY: number = touchY - lastTouchY.value
  lastTouchY.value = touchY

  // Calculate the new translate position
  const newTranslateY = translateY.value + deltaY

  // Check if we're trying to scroll beyond bounds
  const containerHeight: number = touchArea.value?.offsetHeight || 0
  const centerPos: number = containerHeight / 2

  const minTranslateY = centerPos - (totalTicksCount.value - 1) * props.tickSpacing
  const maxTranslateY = centerPos

  // Apply resistance when trying to scroll beyond bounds
  if (newTranslateY > maxTranslateY) {
    // Trying to scroll before the minimum height
    translateY.value = maxTranslateY + (newTranslateY - maxTranslateY) * 0.2
  } else if (newTranslateY < minTranslateY) {
    // Trying to scroll beyond the maximum height
    translateY.value = minTranslateY + (newTranslateY - minTranslateY) * 0.2
  } else {
    // Normal scrolling within bounds
    translateY.value = newTranslateY
  }

  // Update height based on position
  updateHeightFromTranslate()
}

const handleTouchEnd = (event?: TouchEvent): void => {
  if (event) event.preventDefault()

  isTouching.value = false

  // Remove global event listeners
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchcancel', handleTouchEnd)

  // Ensure we're within bounds and snap to nearest tick
  const containerHeight: number = touchArea.value?.offsetHeight || 0
  const centerPos: number = containerHeight / 2

  const minTranslateY = centerPos - (totalTicksCount.value - 1) * props.tickSpacing
  const maxTranslateY = centerPos

  // Constrain to valid range
  if (translateY.value > maxTranslateY) {
    translateY.value = maxTranslateY
    currentHeight.value = props.minHeight
  } else if (translateY.value < minTranslateY) {
    translateY.value = minTranslateY
    currentHeight.value = props.maxHeight
  } else {
    // Snap to nearest tick
    updateTranslateY()
  }

  // Emit the final height
  emit('update:height', {
    value: currentHeight.value,
    unit: unit.value,
  })
}

// Window resize handler
const handleResize = (): void => {
  updateTranslateY()
}

// Initialize component
onMounted(() => {
  // Set initial position with a slight delay to ensure DOM is ready
  setTimeout(() => {
    updateTranslateY()

    // Emit initial values
    emit('update:height', {
      value: currentHeight.value,
      unit: unit.value,
    })
    emit('update:unit', unit.value)
  }, 100) // Slightly longer timeout to ensure DOM rendering

  // Add window resize handler to maintain alignment
  window.addEventListener('resize', handleResize)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Watch for prop changes
watch(
  () => props.initialHeight,
  (newValue: number) => {
    currentHeight.value = newValue
    updateTranslateY()
  },
)

watch(
  () => props.initialUnit,
  (newValue: HeightUnit) => {
    unit.value = newValue
  },
)

// Watch for height changes to update position
watch(
  () => currentHeight.value,
  () => {
    if (!isTouching.value && !isEditing.value) {
      updateTranslateY()
    }
  },
)
</script>

<style scoped>
.height-selector {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  user-select: none;
}

.height-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
}

.height-display {
  text-align: center;
  margin-bottom: 20px;
}

.height-input-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.height-input {
  font-size: 2.5rem;
  font-weight: 700;
  width: auto;
  min-width: 100px;
  text-align: right;
  border: none;
  background: transparent;
  color: inherit;
  padding: 0;
  margin: 0;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.height-input:focus {
  border-bottom: 2px solid #007aff;
}

.height-unit {
  font-size: 2.5rem;
  margin-left: 8px;
}

.debug-info {
  text-align: center;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.8rem;
}

.manual-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.control-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.touch-area {
  position: relative;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  /* Critical for touch events */
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  transition: background-color 0.3s;
}

/* Vertical slider styling */
.touch-area.vertical {
  height: 400px; /* Make it taller for vertical */
  width: 80px; /* Make it narrower for vertical */
}

.touch-area.touching {
  background-color: #f0f0f0;
}

/* Visual feedback for bounds */
.touch-area.at-min-bound::before,
.touch-area.at-max-bound::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 59, 48, 0.5); /* Red with transparency */
  z-index: 2;
}

.touch-area.at-min-bound::before {
  bottom: 0;
}

.touch-area.at-max-bound::after {
  top: 0;
}

.scale-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.scale-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.scale-tick {
  position: absolute;
  display: flex;
  flex-direction: row; /* Changed for vertical orientation */
  align-items: center;
  height: 20px; /* Same as tickSpacing for vertical */
  width: 100%;
  left: 0;
}

.tick-line {
  height: 1px;
  width: 16px;
  background-color: #ccc;
  margin-left: 10px;
}

.scale-tick-medium .tick-line {
  width: 24px;
  height: 1px;
  background-color: #999;
}

.scale-tick-major .tick-line {
  width: 32px;
  height: 2px;
  background-color: #666;
}

.tick-label {
  margin-left: 5px;
  font-size: 0.9rem;
  color: #666;
}

.current-indicator {
  position: absolute;
  left: 0;
  top: 55.8%; /* Center it vertically */
  height: 2px;
  width: 50px;
  background-color: #ff3b30;
  transform: translateY(-50%);
  z-index: 10; /* Ensure it's on top */
  box-shadow: 0 0 4px rgba(255, 59, 48, 0.5); /* Add slight glow for visibility */
}

/* Add triangle pointer at the right */
.current-indicator::after {
  content: '';
  position: absolute;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #ff3b30;
}

.unit-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.unit-button {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.unit-button.active {
  background-color: #007aff;
  color: white;
  border-color: #007aff;
}

@media (max-width: 480px) {
  .height-selector {
    padding: 15px;
  }

  .height-input,
  .height-unit {
    font-size: 2rem;
  }
}
</style>
