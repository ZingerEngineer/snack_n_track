// fetcher.ts

// Determine the API base URL based on the environment using Vite's MODE
const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_URL_BACKEND
    : import.meta.env.VITE_DEV_URL_BACKEND

// Ensure the base URL is defined
if (!API_BASE_URL) {
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
  console.log('url:', url)
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // Include credentials by default
    ...options,
    body:
      options.body && typeof options.body === 'object' && !(options.body instanceof FormData)
        ? JSON.stringify(options.body as JSONRequestBody)
        : (options.body as BodyInit | null),
  }
  // If the body exists, check if it is a plain JSON object and not one of the other allowed types.
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    // Only stringify if it's not one of the other BodyInit types that shouldn't be stringified.
    if (
      !(options.body instanceof Blob) &&
      !(options.body instanceof ArrayBuffer) &&
      !(options.body instanceof URLSearchParams)
    ) {
      config.body = JSON.stringify(options.body as JSONRequestBody)
    }
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`HTTP error ${response.status}: ${response.statusText}\n${errorData}`)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default fetcher
