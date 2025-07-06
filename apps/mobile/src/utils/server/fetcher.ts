// Determine the API base URL based on the environment using Vite's MODE
const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_URL_BACKEND
    : import.meta.env.VITE_DEV_URL_BACKEND

// Ensure the base URL is defined
if (!API_BASE_URL) {
  console.error('[fetcher] API base URL is not defined. Please check your environment variables.')
  throw new Error('API base URL is not defined. Please check your environment variables.')
}

/**
 * Type alias for a JSON object.
 */
type JSONRequestBody = { [key: string]: unknown }

/**
 * Allowed request body types: either a BodyInit (which covers string, FormData, Blob, etc.)
 * or a plain JSON object that will be stringified.
 */
type RequestBody = BodyInit | JSONRequestBody

interface FetcherOptions extends Omit<RequestInit, 'body'> {
  body?: RequestBody
  contentType?: string
}

/**
 * Optimized fetcher function for handling API requests in a Vue Vite TypeScript environment.
 *
 * @param endpoint - The API endpoint (e.g., '/users')
 * @param options - Additional fetch options such as method, headers, and body.
 * @returns A promise that resolves to the parsed JSON response.
 */
async function fetcher<T>(endpoint: string, options: FetcherOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}/v1/${endpoint}`

  // Explicitly declare headers as a Record<string, string>
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  }

  // Process the body and set appropriate Content-Type
  let processedBody: BodyInit | null = null

  if (options.body) {
    if (options.body instanceof FormData) {
      // FormData: Don't stringify, don't set Content-Type (browser sets it with boundary)
      processedBody = options.body
    } else if (
      options.body instanceof Blob ||
      options.body instanceof ArrayBuffer ||
      options.body instanceof URLSearchParams ||
      typeof options.body === 'string'
    ) {
      // Already valid BodyInit types: use as-is
      processedBody = options.body as BodyInit
    } else if (typeof options.body === 'object') {
      // Plain JSON object: stringify and set Content-Type
      processedBody = JSON.stringify(options.body as JSONRequestBody)
      if (!options.contentType && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
      }
    }
  }

  // Apply custom Content-Type if specified
  if (options.contentType) {
    headers['Content-Type'] = options.contentType
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    credentials: 'include', // Include credentials by default
    body: processedBody,
    // Spread other options but exclude body since we processed it above
    ...Object.fromEntries(
      Object.entries(options).filter(([key]) => key !== 'body' && key !== 'contentType'),
    ),
  }

  try {
    console.log('[fetcher] Request:', {
      url,
      method: config.method,
      headers: config.headers,
      bodyType: processedBody ? typeof processedBody : 'null',
      bodyContent: processedBody instanceof FormData ? '[FormData]' : processedBody,
    })

    const response = await fetch(url, config)

    if (!response.ok) {
      let errorData: string
      try {
        const errorJson = await response.json()
        errorData = JSON.stringify(errorJson)
      } catch {
        errorData = await response.text()
      }

      console.error('[fetcher] HTTP Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
      })

      throw new Error(`HTTP error ${response.status}: ${response.statusText}\n${errorData}`)
    }

    const data = await response.json()
    console.log('[fetcher] Success response:', data)
    return data as T
  } catch (error) {
    console.error('[fetcher] Request failed:', {
      url,
      error: error instanceof Error ? error.message : String(error),
    })
    return Promise.reject(error)
  }
}

export default fetcher
