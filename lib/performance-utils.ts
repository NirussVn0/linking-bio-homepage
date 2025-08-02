/**
 * Performance utilities for optimizing mouse events and animations
 */

/**
 * Throttle function to limit the frequency of function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Debounce function to delay function execution until after a specified delay
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Optimized mouse position tracker with throttling and RAF
 */
export function createOptimizedMouseTracker(
  callback: (position: { x: number; y: number }) => void,
  throttleMs: number = 16 // ~60fps
) {
  let rafId: number | null = null
  let lastPosition = { x: 0, y: 0 }

  const throttledCallback = throttle((position: { x: number; y: number }) => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    
    rafId = requestAnimationFrame(() => {
      callback(position)
      rafId = null
    })
  }, throttleMs)

  const handleMouseMove = (e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY }
    
    // Only update if position changed significantly (reduce unnecessary updates)
    if (
      Math.abs(newPosition.x - lastPosition.x) > 1 ||
      Math.abs(newPosition.y - lastPosition.y) > 1
    ) {
      lastPosition = newPosition
      throttledCallback(newPosition)
    }
  }

  return {
    handleMouseMove,
    cleanup: () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }
}

/**
 * Optimized relative mouse position calculator for elements
 */
export function calculateRelativePosition(
  e: React.MouseEvent<HTMLElement>,
  intensity: number = 1
): { x: number; y: number } {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  
  return { x: x * intensity, y: y * intensity }
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is mobile/touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
