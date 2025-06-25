export function extractJsonFromString(text: string): object | null {
  // Regex to match content between ```json and ```
  const jsonRegex = /```json\n([\s\S]*?)\n```/
  const match = text.match(jsonRegex)

  if (!match || !match[1]) {
    return null // No JSON found
  }

  try {
    const jsonString = match[1].trim()
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    return null
  }
}

