import axios, { AxiosResponse } from 'axios'
import { InternalServerError, ValidationError } from '../../classes/Error'

/**
 * Response interface for SnacknTrack model API
 */
export interface SnacknTrackDetection {
  class_index: number
  class_name: string
  confidence: number
  bounding_box?: number[]
}

export interface SnacknTrackScanRequest {
  request_id: string
  image_url: string
  confidence_threshold?: number
}

export interface SnacknTrackScanResponse {
  request_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  detections: SnacknTrackDetection[]
  processing_time?: number
  image_path?: string
  error_message?: string
}

/**
 * Service for communicating with the SnacknTrack model API
 */
export class SnacknTrackModelService {
  private readonly baseUrl: string
  private readonly timeout: number

  constructor(
    baseUrl: string = 'http://localhost:8000',
    timeout: number = 30000
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
    this.timeout = timeout
  }

  /**
   * Check if the SnacknTrack model service is available
   */
  async isServiceAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        timeout: 5000
      })
      return response.status === 200 && response.data?.model_loaded === true
    } catch (error) {
      console.warn(
        '[SnacknTrackModelService] Service health check failed:',
        error instanceof Error ? error.message : 'Unknown error'
      )
      return false
    }
  }

  /**
   * Scan an image using the SnacknTrack model
   */
  async scanImage(
    imageUrl: string,
    confidenceThreshold: number = 0.7
  ): Promise<SnacknTrackScanResponse> {
    try {
      const requestId = `snack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      console.info('[SnacknTrackModelService] Initiating scan request:', {
        requestId,
        imageUrl: imageUrl.substring(0, 100) + '...',
        confidenceThreshold
      })

      // Send scan request
      const scanRequest: SnacknTrackScanRequest = {
        request_id: requestId,
        image_url: imageUrl,
        confidence_threshold: confidenceThreshold
      }

      const scanResponse: AxiosResponse<SnacknTrackScanResponse> =
        await axios.post(`${this.baseUrl}/scan`, scanRequest, {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json'
          }
        })

      if (scanResponse.status !== 200) {
        throw new InternalServerError(
          `SnacknTrack API returned status ${scanResponse.status}`
        )
      }

      const result = scanResponse.data

      // If the request is pending/processing, poll for completion
      if (result.status === 'pending' || result.status === 'processing') {
        return await this.pollForCompletion(requestId)
      }

      return result
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new InternalServerError(
            'SnacknTrack model service is not available'
          )
        }
        if (error.response?.status === 400) {
          throw new ValidationError(
            `Invalid request: ${error.response.data?.message || error.message}`
          )
        }
        throw new InternalServerError(`SnacknTrack API error: ${error.message}`)
      }
      throw new InternalServerError(
        `Failed to scan image with SnacknTrack model: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Poll for scan completion
   */
  private async pollForCompletion(
    requestId: string,
    maxAttempts: number = 30,
    pollInterval: number = 1000
  ): Promise<SnacknTrackScanResponse> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response: AxiosResponse<SnacknTrackScanResponse> =
          await axios.get(`${this.baseUrl}/status/${requestId}`, {
            timeout: 5000
          })

        const result = response.data

        if (result.status === 'completed') {
          console.info('[SnacknTrackModelService] Scan completed:', {
            requestId,
            detections: result.detections.length,
            processingTime: result.processing_time
          })
          return result
        }

        if (result.status === 'failed') {
          throw new InternalServerError(
            `SnacknTrack scan failed: ${result.error_message || 'Unknown error'}`
          )
        }

        // Still processing, wait and retry
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval))
        }
      } catch (error) {
        if (attempt === maxAttempts) {
          throw new InternalServerError(
            `Polling timeout after ${maxAttempts} attempts`
          )
        }
        // Continue polling on transient errors
        await new Promise((resolve) => setTimeout(resolve, pollInterval))
      }
    }

    throw new InternalServerError(
      'Scan polling timeout - request may still be processing'
    )
  }

  /**
   * Calculate the highest confidence from detections
   */
  getHighestConfidence(detections: SnacknTrackDetection[]): number {
    if (!detections || detections.length === 0) {
      return 0
    }
    return Math.max(...detections.map((d) => d.confidence))
  }

  /**
   * Get the most confident detection
   */
  getMostConfidentDetection(
    detections: SnacknTrackDetection[]
  ): SnacknTrackDetection | null {
    if (!detections || detections.length === 0) {
      return null
    }
    return detections.reduce((prev, current) =>
      prev.confidence > current.confidence ? prev : current
    )
  }

  /**
   * Clean up a scan request (optional)
   */
  async cleanupScan(requestId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/cleanup/${requestId}`, {
        timeout: 5000
      })
      console.info(
        '[SnacknTrackModelService] Cleanup completed for request:',
        requestId
      )
    } catch (error) {
      console.warn(
        '[SnacknTrackModelService] Cleanup failed:',
        error instanceof Error ? error.message : 'Unknown error'
      )
      // Don't throw error for cleanup failures
    }
  }
}

// Export singleton instance
export const snacknTrackModelService = new SnacknTrackModelService()

