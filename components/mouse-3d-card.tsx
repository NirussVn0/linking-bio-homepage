"use client"

import type React from "react"

import { calculateRelativePosition, throttle } from "@/lib/performance-utils"
import { motion } from "framer-motion"
import { useCallback, useMemo, useState, type ReactNode } from "react"

interface Mouse3DCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Mouse3DCard({ children, className = "", intensity = 1 }: Mouse3DCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Throttle mouse move handler for better performance
  const throttledSetMousePosition = useMemo(
    () => throttle((position: { x: number; y: number }) => {
      setMousePosition(position)
    }, 16), // ~60fps
    []
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const position = calculateRelativePosition(e, intensity)
      throttledSetMousePosition(position)
    },
    [intensity, throttledSetMousePosition],
  )

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle at ${((mousePosition.x + 1) / 2) * 100}% ${((mousePosition.y + 1) / 2) * 100}%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
