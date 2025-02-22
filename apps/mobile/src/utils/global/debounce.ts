const debounce = (func: (...args: unknown[]) => unknown, milliseconds: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, milliseconds)
  }
}

export default debounce
