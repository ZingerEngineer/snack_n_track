// composables/useDebounce.ts
import { onUnmounted } from 'vue'

interface DebounceOptions {
  delay?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  options: DebounceOptions = {},
) {
  const { delay = 300, leading = false, trailing = true, maxWait } = options

  let timer: ReturnType<typeof setTimeout> | null = null
  let lastCallTime = 0
  let maxTimer: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Parameters<T> | null = null
  let invoked = false

  const invoke = () => {
    if (pendingArgs) {
      fn(...pendingArgs)
      pendingArgs = null
      invoked = true
    }
    clear()
  }

  const clear = () => {
    if (timer) clearTimeout(timer)
    if (maxTimer) clearTimeout(maxTimer)
    timer = null
    maxTimer = null
    invoked = false
  }

  const debounced = (...args: Parameters<T>) => {
    const now = Date.now()
    pendingArgs = args

    if (!timer && leading) {
      fn(...args)
      invoked = true
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (trailing && (!leading || invoked)) invoke()
    }, delay)

    if (maxWait && !maxTimer) {
      const timeSinceLastCall = now - lastCallTime
      const timeRemaining = maxWait - timeSinceLastCall

      maxTimer = setTimeout(
        () => {
          invoke()
        },
        timeRemaining > 0 ? timeRemaining : 0,
      )
    }

    lastCallTime = now
  }

  const cancel = () => {
    clear()
    pendingArgs = null
  }

  const flush = () => {
    if (pendingArgs) {
      fn(...pendingArgs)
      cancel()
    }
  }

  onUnmounted(cancel)

  return {
    debounced,
    cancel,
    flush,
  }
}
