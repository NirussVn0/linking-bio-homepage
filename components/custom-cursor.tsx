"use client"

import { createOptimizedMouseTracker, isTouchDevice, prefersReducedMotion } from "@/lib/performance-utils"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const trackerRef = useRef<{ handleMouseMove: (e: MouseEvent) => void; cleanup: () => void } | null>(null)

  // Don't render cursor on touch devices or if user prefers reduced motion
  const shouldShowCursor = !isTouchDevice() && !prefersReducedMotion()

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const isInteractive =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.classList.contains("cursor-pointer") ||
      target.closest("button") ||
      target.closest("a")
    setIsHovering(isInteractive)
  }, [])

  useEffect(() => {
    if (!shouldShowCursor) return

    // Create optimized mouse tracker
    trackerRef.current = createOptimizedMouseTracker(
      (position) => setMousePosition(position),
      8 // ~120fps throttling for smoother cursor
    )

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", trackerRef.current.handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      if (trackerRef.current) {
        window.removeEventListener("mousemove", trackerRef.current.handleMouseMove)
        trackerRef.current.cleanup()
      }
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseOver, shouldShowCursor])

  if (!shouldShowCursor || !isVisible) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 }
        }}
      >
        <div className="w-4 h-4 bg-green-400 rounded-full" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 will-change-transform"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20, mass: 0.8 },
          opacity: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <div className="w-8 h-8 border border-green-400/60 rounded-full" />
      </motion.div>
    </>
  )
}
