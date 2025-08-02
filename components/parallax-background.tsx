"use client"

import { createOptimizedMouseTracker, isTouchDevice } from "@/lib/performance-utils"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [fireflies, setFireflies] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const trackerRef = useRef<{ handleMouseMove: (e: MouseEvent) => void; cleanup: () => void } | null>(null)

  // Don't track mouse on touch devices for better performance
  const shouldTrackMouse = !isTouchDevice()

  useEffect(() => {
    if (!shouldTrackMouse) return

    // Create optimized mouse tracker with lower frequency for background effects
    trackerRef.current = createOptimizedMouseTracker(
      (position) => setMousePosition(position),
      32 // ~30fps for background effects is sufficient
    )

    window.addEventListener("mousemove", trackerRef.current.handleMouseMove, { passive: true })

    return () => {
      if (trackerRef.current) {
        window.removeEventListener("mousemove", trackerRef.current.handleMouseMove)
        trackerRef.current.cleanup()
      }
    }
  }, [shouldTrackMouse])

  const memoizedFireflies = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i * 13 + 7) % 100, // Deterministic x position
      y: (i * 17 + 11) % 100, // Deterministic y position
      delay: (i * 0.4) % 3, // Deterministic delay
    }))
  }, [])

  useEffect(() => {
    setFireflies(memoizedFireflies)
  }, [memoizedFireflies])

  const redLines = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      width: 250 + (i * 17) % 100, // Deterministic width variation
      left: (i * 23 + 13) % 100,   // Deterministic left position
      top: (i * 31 + 7) % 100,     // Deterministic top position
      rotation: (i * 37) % 180,    // Deterministic rotation
      delay: (i * 0.4) % 2,        // Deterministic delay
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Square Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px, 60px 60px, 20px 20px, 20px 20px",
        }}
      />

      {/* 3D Grid Overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(800px) rotateX(45deg) translateZ(-50px)",
          transformOrigin: "center bottom",
        }}
      />

      {/* Optimized Red Lines */}
      <div className="absolute inset-0">
        {redLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute bg-gradient-to-r from-transparent via-red-500/30 to-transparent will-change-transform"
            style={{
              width: `${line.width}px`,
              height: "1px",
              left: `${line.left}%`,
              top: `${line.top}%`,
              transform: `rotate(${line.rotation}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Optimized Fireflies */}
      <div className="absolute inset-0">
        {fireflies.map((firefly) => (
          <motion.div
            key={firefly.id}
            className="absolute w-2 h-2 bg-green-400 rounded-full will-change-transform"
            style={{
              left: `${firefly.x}%`,
              top: `${firefly.y}%`,
              filter: "blur(0.5px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 20, 0],
              opacity: [0.4, 0.8, 0.6, 0.4],
              scale: [0.8, 1, 0.9, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              delay: firefly.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle Mouse Glow */}
      <motion.div
        className="absolute w-24 h-24 pointer-events-none rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0,255,0,0.08) 0%, transparent 70%)",
          left: mousePosition.x - 48,
          top: mousePosition.y - 48,
          filter: "blur(15px)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </div>
  )
}
