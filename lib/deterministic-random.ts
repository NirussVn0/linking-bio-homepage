/**
 * Deterministic random number generator using a simple LCG (Linear Congruential Generator)
 * This ensures consistent values between server and client rendering
 */
export class DeterministicRandom {
  private seed: number

  constructor(seed: number = 12345) {
    this.seed = seed
  }

  /**
   * Generate a pseudo-random number between 0 and 1
   */
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296
    return this.seed / 4294967296
  }

  /**
   * Generate a pseudo-random number between min and max
   */
  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  /**
   * Reset the seed to start over
   */
  reset(seed?: number): void {
    this.seed = seed ?? 12345
  }
}

/**
 * Create deterministic positioning values for particles/elements
 * Uses index-based seeding to ensure consistent positioning
 */
export function createDeterministicPositions(count: number, baseSeed: number = 12345) {
  return Array.from({ length: count }, (_, i) => {
    const rng = new DeterministicRandom(baseSeed + i)
    return {
      x: rng.range(0, 100),
      y: rng.range(0, 100),
      animationX: rng.range(-20, 20),
      animationY: rng.range(-20, 20),
      delay: rng.range(0, 2),
      scale: rng.range(0.8, 1.2),
      rotation: rng.range(0, 180),
      width: rng.range(250, 350),
    }
  })
}

/**
 * Hook to get deterministic positions that are consistent between server and client
 */
export function useDeterministicPositions(count: number, baseSeed: number = 12345) {
  return createDeterministicPositions(count, baseSeed)
}
