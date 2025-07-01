/**
 * Concurrency control utility for managing simultaneous operations
 */
export class ConcurrencyManager {
  private static instance: ConcurrencyManager
  private operationCounts: Map<string, number> = new Map()
  private readonly maxConcurrentOperations: number = 10

  private constructor() {}

  public static getInstance(): ConcurrencyManager {
    if (!ConcurrencyManager.instance) {
      ConcurrencyManager.instance = new ConcurrencyManager()
    }
    return ConcurrencyManager.instance
  }

  /**
   * Acquires a slot for the operation or throws error if max concurrent operations reached
   * @param operationType Type of operation (e.g., 'scan', 'upload')
   * @param userId User ID for user-specific limits
   * @returns Operation ID for releasing the slot
   */
  public async acquireSlot(
    operationType: string,
    userId?: string
  ): Promise<string> {
    const key = userId ? `${operationType}:${userId}` : operationType
    const globalKey = 'global'

    const currentCount = this.operationCounts.get(key) || 0
    const globalCount = this.operationCounts.get(globalKey) || 0

    // Check user-specific limit (max 3 per user)
    if (userId && currentCount >= 3) {
      throw new Error(
        'Too many concurrent operations for this user. Please wait.'
      )
    }

    // Check global limit
    if (globalCount >= this.maxConcurrentOperations) {
      throw new Error('Server is busy. Please try again later.')
    }

    // Increment counters
    this.operationCounts.set(key, currentCount + 1)
    this.operationCounts.set(globalKey, globalCount + 1)

    const operationId = `${key}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`

    console.log(
      `[ConcurrencyManager] Acquired slot for ${key}. Current: ${currentCount + 1}, Global: ${globalCount + 1}`
    )

    return operationId
  }

  /**
   * Releases the operation slot
   * @param operationId Operation ID returned by acquireSlot
   */
  public releaseSlot(operationId: string): void {
    const [operationType, userId] = operationId.split(':')
    const key =
      userId !== 'undefined' ? `${operationType}:${userId}` : operationType
    const globalKey = 'global'

    const currentCount = this.operationCounts.get(key) || 0
    const globalCount = this.operationCounts.get(globalKey) || 0

    if (currentCount > 0) {
      this.operationCounts.set(key, currentCount - 1)
    }

    if (globalCount > 0) {
      this.operationCounts.set(globalKey, globalCount - 1)
    }

    console.log(
      `[ConcurrencyManager] Released slot for ${key}. Current: ${Math.max(0, currentCount - 1)}, Global: ${Math.max(0, globalCount - 1)}`
    )
  }

  /**
   * Gets current operation counts
   */
  public getStats(): {
    userOperations: Record<string, number>
    globalOperations: number
  } {
    const stats: Record<string, number> = {}
    let globalOps = 0

    for (const [key, count] of this.operationCounts.entries()) {
      if (key === 'global') {
        globalOps = count
      } else {
        stats[key] = count
      }
    }

    return {
      userOperations: stats,
      globalOperations: globalOps
    }
  }
}

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private static instance: RateLimiter
  private requests: Map<string, { count: number; resetTime: number }> =
    new Map()
  private readonly windowMs: number = 60 * 1000 // 1 minute
  private readonly maxRequests: number = 30 // 30 requests per minute per user

  private constructor() {}

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter()
    }
    return RateLimiter.instance
  }

  /**
   * Checks if request is allowed for the user
   * @param userId User ID
   * @returns boolean indicating if request is allowed
   */
  public isAllowed(userId: string): boolean {
    const now = Date.now()
    const userKey = `user:${userId}`
    const userData = this.requests.get(userKey)

    if (!userData || now > userData.resetTime) {
      // Reset or initialize window
      this.requests.set(userKey, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return true
    }

    if (userData.count >= this.maxRequests) {
      return false
    }

    userData.count++
    return true
  }

  /**
   * Gets remaining requests for user
   * @param userId User ID
   * @returns Object with remaining requests and reset time
   */
  public getRemainingRequests(userId: string): {
    remaining: number
    resetTime: number
  } {
    const userKey = `user:${userId}`
    const userData = this.requests.get(userKey)
    const now = Date.now()

    if (!userData || now > userData.resetTime) {
      return {
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs
      }
    }

    return {
      remaining: Math.max(0, this.maxRequests - userData.count),
      resetTime: userData.resetTime
    }
  }
}

