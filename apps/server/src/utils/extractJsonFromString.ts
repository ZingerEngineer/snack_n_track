import JSON5 from 'json5'

export function extractJson5FromText(text: string): object | null {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/g
  let match: RegExpExecArray | null

  while ((match = jsonRegex.exec(text)) !== null) {
    try {
      const jsonString = match[1].trim()
      return JSON5.parse(jsonString)
    } catch (error) {
      // Ignore malformed blocks
    }
  }

  return null // No valid JSON5 found
}

export function extractAllJson5FromText(text: string): object[] {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/g
  const results: object[] = []
  let match: RegExpExecArray | null

  while ((match = jsonRegex.exec(text)) !== null) {
    try {
      const jsonString = match[1].trim()
      results.push(JSON5.parse(jsonString))
    } catch (error) {
      // Skip malformed JSON5 blocks
    }
  }

  return results
}

