"use client"

import type React from "react"

import { throttle } from "@/lib/performance-utils"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"


const textEffects = [
  {
    id: 1,
    text: "Connect. Share. Grow.",
    type: "typewriter",
    name: "Typewriter Effect",
  },
  {
    id: 2,
    text: "Connect. Share. Grow.",
    type: "glow",
    name: "Glowing Text",
  },
  {
    id: 3,
    text: "Connect. Share. Grow.",
    type: "3d-space",
    name: "3D Space Text",
  },
  {
    id: 4,
    text: "Connect. Share. Grow.",
    type: "black-hole",
    name: "Black Hole Effect",
  },
  {
    id: 5,
    text: "Connect. Share. Grow.",
    type: "reveal",
    name: "Gradual Reveal",
  },
  {
    id: 6,
    text: "Connect. Share. Grow.",
    type: "rainbow",
    name: "Rainbow Colors",
  },
  {
    id: 7,
    text: "Connect. Share. Grow.",
    type: "decode",
    name: "Matrix Decode",
  },
]

export function DynamicTextEffects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [displayText, setDisplayText] = useState("")

  // Generate deterministic positions for particles to avoid hydration mismatch
  const particlePositions = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      animationX: (i % 2 === 0 ? 1 : -1) * (10 + (i * 3)),
      animationY: (i % 3 === 0 ? 1 : -1) * (8 + (i * 2)),
    }))
  }, [])

  const currentEffect = textEffects[currentIndex]

  // Auto-cycle through effects - wait for each effect to complete
  useEffect(() => {
    const getEffectDuration = (type: string) => {
      switch (type) {
        case "typewriter":
          return 2100 // 21 characters * 100ms + buffer
        case "decode":
          return 3500 // Decode animation duration + buffer
        case "reveal":
          return 2600 // 21 characters * 100ms delay + animation + buffer
        case "3d-space":
          return 4000 // Full 3D animation cycle
        case "glow":
          return 4000 // Full glow cycle
        case "rainbow":
          return 4000 // Full rainbow cycle
        case "black-hole":
          return 5000 // Interactive effect, longer duration
        default:
          return 3000
      }
    }

    const currentDuration = getEffectDuration(currentEffect.type)

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % textEffects.length)
    }, currentDuration)

    return () => clearTimeout(timeout)
  }, [currentIndex, currentEffect])

  // Throttled mouse tracking for black hole effect
  const throttledSetMousePosition = useMemo(
    () => throttle((position: { x: number; y: number }) => {
      setMousePosition(position)
    }, 16), // ~60fps
    []
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    throttledSetMousePosition({ x: x * 30, y: y * 30 })
  }, [throttledSetMousePosition])

  // Typewriter effect
  useEffect(() => {
    if (currentEffect.type === "typewriter") {
      setDisplayText("")
      const text = currentEffect.text
      let index = 0

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 100)

      return () => clearInterval(typeInterval)
    }
  }, [currentEffect])

  // Decode effect with proper timing
  useEffect(() => {
    if (currentEffect.type === "decode") {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
      const finalText = currentEffect.text
      let iterations = 0

      const decodeInterval = setInterval(() => {
        setDisplayText(
          finalText
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return finalText[index]
              }
              // Use deterministic character selection based on index and iteration
              const charIndex = (index + Math.floor(iterations)) % chars.length
              return char === " " ? " " : chars[charIndex]
            })
            .join(""),
        )

        if (iterations >= finalText.length) {
          clearInterval(decodeInterval)
        }

        iterations += 0.8
      }, 80)

      return () => clearInterval(decodeInterval)
    }
  }, [currentEffect])

  const renderTextEffect = () => {
    const baseClasses =
      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 cursor-pointer select-none leading-tight"

    switch (currentEffect.type) {
      case "typewriter":
        return (
          <motion.h1
            className={`${baseClasses} text-white`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentEffect.id}
          >
            {displayText}
            <motion.span
              className="inline-block w-1 h-16 ml-2 bg-green-400"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.h1>
        )

      case "glow":
        return (
          <motion.h1
            className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent`}
            key={currentEffect.id}
            animate={{
              textShadow: [
                "0 0 20px rgba(0, 255, 0, 0.5)",
                "0 0 40px rgba(0, 255, 0, 0.8)",
                "0 0 60px rgba(0, 255, 0, 1)",
                "0 0 40px rgba(0, 255, 0, 0.8)",
                "0 0 20px rgba(0, 255, 0, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {currentEffect.text}
          </motion.h1>
        )

      case "3d-space":
        return (
          <motion.h1
            className={`${baseClasses} text-white`}
            key={currentEffect.id}
            animate={{
              rotateX: [0, 15, -15, 0],
              rotateY: [0, 25, -25, 0],
              z: [0, 100, -100, 0],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              textShadow: "0 0 20px rgba(0, 255, 0, 0.5)",
            }}
          >
            {currentEffect.text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.1,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        )

      case "black-hole":
        return (
          <motion.div
            className="relative flex justify-center w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            key={currentEffect.id}
          >
            <motion.h1
              className={`${baseClasses} text-white relative z-10 text-center`}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, filter",
              }}
            >
              {currentEffect.text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  animate={{
                    x: mousePosition.x * (0.02 + index * 0.005),
                    y: mousePosition.y * (0.02 + index * 0.005),
                    scale: Math.max(0.8, 1 - Math.abs(mousePosition.x + mousePosition.y) * 0.001),
                    rotateX: mousePosition.y * 0.2,
                    rotateY: mousePosition.x * 0.2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  style={{
                    textShadow: `${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px 10px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Enhanced Black hole effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                background: `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%,
                  rgba(0,0,0,0.9) 0%,
                  rgba(0,0,0,0.6) 20%,
                  rgba(0,255,0,0.1) 40%,
                  transparent 70%)`,
                scale: 1 + Math.abs(mousePosition.x + mousePosition.y) * 0.002,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Particle effect around black hole */}
            {Math.abs(mousePosition.x) > 5 || Math.abs(mousePosition.y) > 5 ? (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${50 + mousePosition.x * 0.3}%`,
                      top: `${50 + mousePosition.y * 0.3}%`,
                    }}
                    animate={{
                      x: [0, particlePositions[i].animationX],
                      y: [0, particlePositions[i].animationY],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        )

      case "reveal":
        return (
          <motion.h1
            className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent`}
            key={currentEffect.id}
          >
            {currentEffect.text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        )

      case "rainbow":
        return (
          <motion.h1 className={`${baseClasses}`} key={currentEffect.id}>
            {currentEffect.text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={{
                  color: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3", "#ff0000"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.1,
                }}
                style={{
                  textShadow: "0 0 10px currentColor",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        )

      case "decode":
        return (
          <motion.h1
            className={`${baseClasses} text-green-400 font-mono`}
            key={currentEffect.id}
            style={{
              textShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
              fontFamily: "monospace",
            }}
          >
            {displayText}
          </motion.h1>
        )

      default:
        return (
          <motion.h1
            className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent`}
            key={currentEffect.id}
          >
            {currentEffect.text}
          </motion.h1>
        )
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">{renderTextEffect()}</AnimatePresence>

      {/* Effect indicators */}
      <motion.div
        className="flex justify-center mt-8 space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {textEffects.map((effect, index) => (
          <motion.button
            key={effect.id}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-green-400 shadow-lg" : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(0, 255, 0, 0.5)",
                    "0 0 15px rgba(0, 255, 0, 0.8)",
                    "0 0 5px rgba(0, 255, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Effect name display */}
      <motion.div
        className="mt-4 text-center"
        key={currentEffect.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <p className="text-sm font-medium text-green-400">{currentEffect.name}</p>
      </motion.div>

      {/* Auto-progress indicator with dynamic duration */}
      <div className="w-64 mx-auto mt-6">
        <div className="w-full h-1 overflow-hidden bg-gray-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: (() => {
                switch (currentEffect.type) {
                  case "typewriter":
                    return 2.1
                  case "decode":
                    return 3.5
                  case "reveal":
                    return 2.6
                  case "3d-space":
                    return 4.0
                  case "glow":
                    return 4.0
                  case "rainbow":
                    return 4.0
                  case "black-hole":
                    return 5.0
                  default:
                    return 3.0
                }
              })(),
              ease: "linear",
            }}
            key={currentIndex}
          />
        </div>
        <p className="mt-2 text-xs text-center text-gray-400">
          {currentIndex + 1} of {textEffects.length} • {currentEffect.name}
        </p>
      </div>
    </div>
  )
}
