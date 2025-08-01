"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useCallback, useMemo } from "react"

export function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [fireflies, setFireflies] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const memoizedFireflies = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
  }, [])

  useEffect(() => {
    setFireflies(memoizedFireflies)
  }, [memoizedFireflies])

  const redLines = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      width: 250 + Math.random() * 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 180,
      delay: Math.random() * 2,
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
