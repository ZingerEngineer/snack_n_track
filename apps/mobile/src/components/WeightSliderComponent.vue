<template>
  <div class="weight-selector w-full">
    <!-- Editable weight input -->
    <div class="weight-display w-full flex justify-center items-center">
      <div class="weight-input-container w-full flex justify-center items-center">
        <input
          ref="weightInput"
          type="text"
          inputmode="decimal"
          class="weight-input text-center max-w-14"
          :value="displayWeight"
          @input="onWeightInputChange"
          @blur="onWeightInputBlur"
          @keydown.enter="onWeightInputBlur"
          @keypress="checkInputCharacter"
        />
        <span class="weight-unit mr-4">{{ unit }}</span>
      </div>
    </div>

    <!-- Manual controls as fallback -->
    <div class="manual-controls">
      <IonButton fill="outline" color="secondary" @click="decrementWeight"
        ><FontAwesomeIcon :icon="faMinus"></FontAwesomeIcon>
      </IonButton>
      <IonButton fill="outline" color="secondary" @click="incrementWeight"
        ><FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon
      ></IonButton>
    </div>

    <!-- Touch area with clear visual feedback -->
    <div
      ref="touchArea"
      class="touch-area"
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
        <div class="scale-wrapper" :style="{ transform: `translateX(${translateX}px)` }">
          <!-- Only render visible ticks -->
          <div
            v-for="tick in visibleTicks"
            :key="tick.value"
            class="scale-tick"
            :class="{
              'scale-tick-major': tick.isMajor,
              'scale-tick-medium': tick.isMedium,
            }"
            :style="{ transform: `translateX(${tick.position}px)` }"
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
        :fill="unit === 'kg' ? 'solid' : 'outline'"
        :class="{ active: unit === 'kg' }"
        @click="setUnit('kg')"
        >kg</IonButton
      >

      <IonButton
        :fill="unit === 'lbs' ? 'solid' : 'outline'"
        :class="{ active: unit === 'lbs' }"
        @click="setUnit('lbs')"
      >
        lbs
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
type WeightUnit = 'kg' | 'lbs'

interface WeightTick {
  value: number
  label: number | string
  isMajor: boolean
  isMedium: boolean
  position: number
}

export interface WeightChangeEvent {
  value: number
  unit: WeightUnit
}

// Props type definition
interface WeightSelectorProps {
  initialWeight?: number
  initialUnit?: WeightUnit
  minWeight?: number
  maxWeight?: number
  step?: number
  tickSpacing?: number
  visibleTicksCount?: number
}

// Props with defaults and type checking
const props = withDefaults(defineProps<WeightSelectorProps>(), {
  initialWeight: 70,
  initialUnit: 'kg',
  minWeight: 40,
  maxWeight: 400,
  step: 0.1,
  tickSpacing: 20,
  visibleTicksCount: 30, // Number of ticks to render at once
})

// Emits with type checking
const emit = defineEmits<{
  'update:weight': [event: WeightChangeEvent]
  'update:unit': [unit: WeightUnit]
}>()

// Refs with type annotations
const touchArea = ref<HTMLDivElement | null>(null)
const weightInput = ref<HTMLInputElement | null>(null)
const currentWeight = ref<number>(props.initialWeight)
const unit = ref<WeightUnit>(props.initialUnit)
const translateX = ref<number>(0)
const isTouching = ref<boolean>(false)
const touchStartX = ref<number>(0)
const lastTouchX = ref<number>(0)
const startTranslateX = ref<number>(0)
const isEditing = ref<boolean>(false)

// Constants
const KG_TO_LBS: number = 2.20462
const LBS_TO_KG: number = 0.453592
// Define default middle values for each unit
const DEFAULT_KG_VALUE = 70 // Default middle value in kg
const DEFAULT_LBS_VALUE = 150 // Default middle value in lbs

// Calculate the total number of ticks
const totalTicksCount = computed<number>(() => {
  const min: number = props.minWeight
  const max: number = props.maxWeight
  const step: number = props.step
  return Math.floor((max - min) / step) + 1
})

// Calculate the current index based on weight
const currentIndex = computed<number>(() => {
  return Math.round((currentWeight.value - props.minWeight) / props.step)
})

// Check if at min/max bounds
const isAtMinBound = computed<boolean>(() => {
  return currentWeight.value <= props.minWeight
})

const isAtMaxBound = computed<boolean>(() => {
  return currentWeight.value >= props.maxWeight
})

// Calculate visible ticks (virtual rendering) with improved precision
// First, modify the tick generation to account for pound increments
const visibleTicks = computed<WeightTick[]>(() => {
  const result: WeightTick[] = []

  if (unit.value === 'kg') {
    // For kg mode - generate ticks based on kg increments
    const buffer = Math.floor(props.visibleTicksCount / 2)
    const startIdx = Math.max(0, currentIndex.value - buffer)
    const endIdx = Math.min(totalTicksCount.value - 1, currentIndex.value + buffer)

    // Generate ticks for kg mode
    for (let i = startIdx; i <= endIdx; i++) {
      const value = props.minWeight + i * props.step
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
    // For lbs mode - generate ticks based on pound increments
    const currentLbs = Math.round(currentWeight.value * KG_TO_LBS)
    const range = Math.floor(props.visibleTicksCount / 2)

    // Create actual pound ticks in a range around current value
    for (let i = -range; i <= range; i++) {
      const lbsValue = currentLbs + i

      // Skip invalid values
      if (
        lbsValue < Math.floor(props.minWeight * KG_TO_LBS) ||
        lbsValue > Math.ceil(props.maxWeight * KG_TO_LBS)
      ) {
        continue
      }

      // Convert back to internal kg value
      const kgValue = parseFloat((lbsValue * LBS_TO_KG).toFixed(1))

      // Check if major tick (divisible by 5)
      const isMajor = lbsValue % 5 === 0
      const isMedium = !isMajor

      result.push({
        value: lbsValue,
        label: isMajor ? lbsValue : '',
        isMajor,
        isMedium,
        // Calculate position based on pound value rather than kg index
        position: ((kgValue - props.minWeight) / props.step) * props.tickSpacing,
      })
    }
  }

  return result
})
// Computed weight display
const displayWeight = computed<string>(() => {
  if (unit.value === 'kg') {
    return currentWeight.value.toFixed(1)
  } else {
    return Math.round(currentWeight.value * KG_TO_LBS).toString()
  }
})

// Methods
const setUnit = (newUnit: WeightUnit): void => {
  if (unit.value === newUnit) return

  // Reset weight to default middle value when changing units
  if (newUnit === 'kg') {
    currentWeight.value = DEFAULT_KG_VALUE
  } else {
    currentWeight.value = parseFloat((DEFAULT_LBS_VALUE * LBS_TO_KG).toFixed(1))
  }

  unit.value = newUnit

  // Update visual position
  updateTranslateX()

  // Emit events for unit and weight change
  emit('update:unit', newUnit)
  emit('update:weight', {
    value: currentWeight.value,
    unit: unit.value,
  })
}

// Improved function to update the translate position with better precision
const updateTranslateX = (): void => {
  if (touchArea.value) {
    const containerWidth: number = touchArea.value.offsetWidth
    const centerPos: number = containerWidth / 2

    // Calculate precise index position
    const preciseIndex = (currentWeight.value - props.minWeight) / props.step

    // Calculate the exact position with precise alignment
    translateX.value = centerPos - preciseIndex * props.tickSpacing
  }
}

// Improved function to update weight from translate position
const updateWeightFromTranslate = (): void => {
  if (!touchArea.value) return

  const containerWidth: number = touchArea.value.offsetWidth
  const centerPos: number = containerWidth / 2
  const offset: number = translateX.value - centerPos

  // Calculate precise index and weight
  const preciseIndex = -offset / props.tickSpacing
  const roundedIndex = Math.round(preciseIndex)
  let newWeight = props.minWeight + roundedIndex * props.step

  // Ensure precision with fixed decimal places
  newWeight = parseFloat(newWeight.toFixed(1))

  // For pounds mode, ensure we snap to exact pound values
  if (unit.value === 'lbs') {
    const lbsValue = Math.round(newWeight * KG_TO_LBS)
    newWeight = parseFloat((lbsValue * LBS_TO_KG).toFixed(1))
  }

  // Constrain to valid range
  const constrainedWeight = Math.max(props.minWeight, Math.min(props.maxWeight, newWeight))

  if (constrainedWeight !== currentWeight.value) {
    currentWeight.value = constrainedWeight

    // Emit with proper unit conversion
    emit('update:weight', {
      value: constrainedWeight,
      unit: unit.value,
    })
  }
}

const incrementWeight = (): void => {
  let newWeight: number

  if (unit.value === 'kg') {
    // For kg, increment by the standard step (0.1 kg)
    newWeight = parseFloat((currentWeight.value + props.step).toFixed(1))
  } else {
    // For lbs, increment by 1 lb then convert back to kg
    const weightInLbs = Math.round(currentWeight.value * KG_TO_LBS)
    newWeight = parseFloat(((weightInLbs + 1) * LBS_TO_KG).toFixed(1))
  }

  // Constrain to max weight
  newWeight = Math.min(props.maxWeight, newWeight)

  if (newWeight !== currentWeight.value) {
    currentWeight.value = newWeight
    updateTranslateX()
    emit('update:weight', {
      value: newWeight,
      unit: unit.value,
    })
  }
}

// Similarly modify the decrementWeight function
const decrementWeight = (): void => {
  let newWeight: number

  if (unit.value === 'kg') {
    // For kg, decrement by the standard step (0.1 kg)
    newWeight = parseFloat((currentWeight.value - props.step).toFixed(1))
  } else {
    // For lbs, decrement by 1 lb then convert back to kg
    const weightInLbs = Math.round(currentWeight.value * KG_TO_LBS)
    newWeight = parseFloat(((weightInLbs - 1) * LBS_TO_KG).toFixed(1))
  }

  // Constrain to min weight
  newWeight = Math.max(props.minWeight, newWeight)

  if (newWeight !== currentWeight.value) {
    currentWeight.value = newWeight
    updateTranslateX()
    emit('update:weight', {
      value: newWeight,
      unit: unit.value,
    })
  }
}

// Improved input validation
// Improved input validation function that properly handles backspace
const checkInputCharacter = (event: KeyboardEvent): void => {
  const input = event.target as HTMLInputElement
  const char = event.key

  // Allow navigation and editing keys without further validation
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
    return // Always allow these keys - don't prevent default
  }

  // Handle Enter key
  if (char === 'Enter') {
    onWeightInputBlur(event)
    return
  }

  // Only allow digits and one decimal point
  const isNumber = /^[0-9]$/.test(char)
  const isDecimal = char === '.' || char === ','

  if (!isNumber && !isDecimal) {
    event.preventDefault()
    return
  }

  // Get current selection to handle cursor position properly
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
    const minLimit = unit.value === 'kg' ? props.minWeight : Math.floor(props.minWeight * KG_TO_LBS)
    const maxLimit = unit.value === 'kg' ? props.maxWeight : Math.ceil(props.maxWeight * KG_TO_LBS)

    if (numValue < minLimit || numValue > maxLimit) {
      return // Don't block the user from entering a number after backspace
    }
  }
}

// Input handlers for editable weight
const onWeightInputChange = (event: Event): void => {
  isEditing.value = true
  const input = event.target as HTMLInputElement
  const value = input.value.replace(',', '.') // Handle comma as decimal separator

  // Parse and validate the input
  let newWeight: number

  if (unit.value === 'kg') {
    newWeight = parseFloat(parseFloat(value).toFixed(1))
  } else {
    // Convert from lbs to kg for internal storage
    newWeight = parseFloat((parseFloat(value) * LBS_TO_KG).toFixed(1))
  }

  // Validate the input
  if (!isNaN(newWeight)) {
    // Constrain to valid range with proper rounding
    const minWeight = parseFloat(props.minWeight.toFixed(1))
    const maxWeight = parseFloat(props.maxWeight.toFixed(1))
    newWeight = Math.max(minWeight, Math.min(maxWeight, newWeight))

    // Update weight
    currentWeight.value = newWeight
  }
}

// Improved weight input blur handler
const onWeightInputBlur = (event: Event): void => {
  if (!isEditing.value) return

  const input = event.target as HTMLInputElement
  const value = input.value.replace(',', '.') // Handle comma as decimal separator

  // Parse and validate the input
  let newWeight: number

  if (unit.value === 'kg') {
    newWeight = parseFloat(parseFloat(value).toFixed(1))
  } else {
    // Convert from lbs to kg for internal storage
    newWeight = parseFloat((parseFloat(value) * LBS_TO_KG).toFixed(1))
  }

  // Validate the input
  if (isNaN(newWeight)) {
    // Reset to current value if invalid
    input.value = displayWeight.value
  } else {
    // Constrain to valid range with proper rounding
    const minWeight = parseFloat(props.minWeight.toFixed(1))
    const maxWeight = parseFloat(props.maxWeight.toFixed(1))
    newWeight = Math.max(minWeight, Math.min(maxWeight, newWeight))

    // Update weight and position
    currentWeight.value = newWeight
    updateTranslateX()

    // Emit the update with proper conversion
    emit('update:weight', {
      value: newWeight,
      unit: unit.value,
    })
  }

  isEditing.value = false
}

// Touch handlers with improved reliability and bounds checking
const handleTouchStart = (event: TouchEvent): void => {
  event.preventDefault() // Prevent default behavior

  isTouching.value = true
  touchStartX.value = event.touches[0].clientX
  lastTouchX.value = touchStartX.value
  startTranslateX.value = translateX.value

  // Add global touch event listeners for better tracking
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
  document.addEventListener('touchcancel', handleTouchEnd)
}

const handleTouchMove = (event: TouchEvent): void => {
  if (!isTouching.value) return

  event.preventDefault() // Prevent scrolling

  const touchX: number = event.touches[0].clientX
  const deltaX: number = touchX - lastTouchX.value
  lastTouchX.value = touchX

  // Calculate the new translate position
  const newTranslateX = translateX.value + deltaX

  // Check if we're trying to scroll beyond bounds
  const containerWidth: number = touchArea.value?.offsetWidth || 0
  const centerPos: number = containerWidth / 2

  const minTranslateX = centerPos - (totalTicksCount.value - 1) * props.tickSpacing
  const maxTranslateX = centerPos

  // Apply resistance when trying to scroll beyond bounds
  if (newTranslateX > maxTranslateX) {
    // Trying to scroll before the minimum weight
    translateX.value = maxTranslateX + (newTranslateX - maxTranslateX) * 0.2
  } else if (newTranslateX < minTranslateX) {
    // Trying to scroll beyond the maximum weight
    translateX.value = minTranslateX + (newTranslateX - minTranslateX) * 0.2
  } else {
    // Normal scrolling within bounds
    translateX.value = newTranslateX
  }

  // Update weight based on position
  updateWeightFromTranslate()
}

const handleTouchEnd = (event?: TouchEvent): void => {
  if (event) event.preventDefault()

  isTouching.value = false

  // Remove global event listeners
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchcancel', handleTouchEnd)

  // Ensure we're within bounds and snap to nearest tick
  const containerWidth: number = touchArea.value?.offsetWidth || 0
  const centerPos: number = containerWidth / 2

  const minTranslateX = centerPos - (totalTicksCount.value - 1) * props.tickSpacing
  const maxTranslateX = centerPos

  // Constrain to valid range
  if (translateX.value > maxTranslateX) {
    translateX.value = maxTranslateX
    currentWeight.value = props.minWeight
  } else if (translateX.value < minTranslateX) {
    translateX.value = minTranslateX
    currentWeight.value = props.maxWeight
  } else {
    // Snap to nearest tick
    updateTranslateX()
  }

  // Emit the final weight
  emit('update:weight', {
    value: currentWeight.value,
    unit: unit.value,
  })
}

// Window resize handler
const handleResize = (): void => {
  updateTranslateX()
}

// Initialize component
onMounted(() => {
  // Set initial position with a slight delay to ensure DOM is ready
  setTimeout(() => {
    updateTranslateX()

    // Emit initial values
    emit('update:weight', {
      value: currentWeight.value,
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
  () => props.initialWeight,
  (newValue: number) => {
    currentWeight.value = newValue
    updateTranslateX()
  },
)

watch(
  () => props.initialUnit,
  (newValue: WeightUnit) => {
    unit.value = newValue
  },
)

// Watch for weight changes to update position
watch(
  () => currentWeight.value,
  () => {
    if (!isTouching.value && !isEditing.value) {
      updateTranslateX()
    }
  },
)
</script>

<style scoped>
.weight-selector {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  user-select: none;
}

.weight-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
}

.weight-display {
  text-align: center;
  margin-bottom: 20px;
}

.weight-input-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.weight-input {
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

.weight-input:focus {
  border-bottom: 2px solid #007aff;
}

.weight-unit {
  font-size: 2.5rem;
  margin-left: 8px;
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
  height: 80px;
  margin: 20px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  /* Critical for touch events */
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  transition: background-color 0.3s;
}

.touch-area.touching {
  background-color: #f0f0f0;
}

/* Visual feedback for bounds */
.touch-area.at-min-bound::before,
.touch-area.at-max-bound::after {
  content: '';
  position: absolute;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: rgba(255, 59, 48, 0.5); /* Red with transparency */
  z-index: 2;
}

.touch-area.at-min-bound::before {
  left: 0;
}

.touch-area.at-max-bound::after {
  right: 0;
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
  flex-direction: column;
  align-items: center;
  width: 20px; /* Same as tickSpacing */
  /* Remove any transform that might be causing issues */
}

.tick-line {
  width: 1px;
  height: 16px;
  background-color: #ccc;
  margin-top: 10px;
}

.scale-tick-medium .tick-line {
  height: 24px;
  width: 1px;
  background-color: #999;
}

.scale-tick-major .tick-line {
  height: 32px;
  width: 2px;
  background-color: #666;
}

.tick-label {
  margin-top: 5px;
  font-size: 0.9rem;
  color: #666;
}

.current-indicator {
  position: absolute;
  top: 0;
  left: 54.55%;
  width: 2px;
  height: 50px;
  background-color: #ff3b30;
  transform: translateX(-50%);
  z-index: 10; /* Ensure it's on top */
  box-shadow: 0 0 4px rgba(255, 59, 48, 0.5); /* Add slight glow for visibility */
}

/* Add triangle pointer at the bottom */
.current-indicator::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ff3b30;
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
  .weight-selector {
    padding: 15px;
  }

  .weight-input,
  .weight-unit {
    font-size: 2rem;
  }
}
</style>
