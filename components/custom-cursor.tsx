"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

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
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [handleMouseMove, handleMouseOver])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference will-change-transform"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <div className="w-4 h-4 bg-green-400 rounded-full" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 will-change-transform"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-8 h-8 border border-green-400/60 rounded-full" />
      </motion.div>
    </>
  )
}
