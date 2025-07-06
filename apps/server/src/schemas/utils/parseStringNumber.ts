/** 
@param value - The value to parse, which can be a string or a number.
@returns - The parsed number, or 0 if the input is not a valid number. 
@description - This function attempts to parse a string or number into a valid number. If the input is not a valid number, it defaults to 0.
*/
export const parseStringNumber = (value: unknown): number => {
  // Handle null/undefined
  if (value == null) {
    return 0
  }

  // If it's already a number, validate it
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value
  }

  // If it's a string, try to parse it
  if (typeof value === 'string') {
    const trimmed = value.trim()

    // Handle empty strings
    if (trimmed === '') {
      return 0
    }

    const parsedValue = Number(trimmed)
    return isNaN(parsedValue) ? 0 : parsedValue
  }

  // For any other type, try to convert and validate
  const parsedValue = Number(value)
  return isNaN(parsedValue) ? 0 : parsedValue
}

