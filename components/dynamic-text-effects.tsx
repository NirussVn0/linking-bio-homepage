"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

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
  const [isDecoding, setIsDecoding] = useState(false)

  const currentEffect = textEffects[currentIndex]

  // Auto-cycle through effects
  useEffect(() => {
    const getEffectDuration = (type: string) => {
      switch (type) {
        case "typewriter":
          return 3000 // Wait for typing to complete
        case "decode":
          return 4000 // Wait for decoding to complete
        case "reveal":
          return 3500 // Wait for all letters to reveal
        case "3d-space":
          return 4000 // Allow full 3D rotation
        default:
          return 3000
      }
    }

    const duration = getEffectDuration(currentEffect.type)

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % textEffects.length)
    }, duration)

    return () => clearTimeout(timeout)
  }, [currentIndex, currentEffect.type])

  // Mouse tracking for black hole effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x: x * 30, y: y * 30 })
  }, [])

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

  // Decode effect
  useEffect(() => {
    if (currentEffect.type === "decode") {
      setIsDecoding(true)
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
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
              return char === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
            })
            .join(""),
        )

        if (iterations >= finalText.length) {
          clearInterval(decodeInterval)
          setIsDecoding(false)
        }

        iterations += 1 / 3
      }, 50)

      return () => clearInterval(decodeInterval)
    }
  }, [currentEffect])

  const renderTextEffect = () => {
    const baseClasses = "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cursor-pointer select-none leading-tight"

    switch (currentEffect.type) {
      case "typewriter":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} text-white text-center`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentEffect.id}
            >
              <span className="inline-block">{displayText}</span>
              {displayText.length < currentEffect.text.length && (
                <motion.span
                  className="inline-block w-1 h-12 md:h-16 bg-green-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.h1>
          </div>
        )

      case "glow":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent text-center`}
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
          </div>
        )

      case "3d-space":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} text-white text-center`}
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
              {currentEffect.text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      className="inline-block"
                      animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: (wordIndex * word.length + charIndex) * 0.1,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
        )

      case "black-hole":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.div className="relative max-w-4xl mx-auto" onMouseMove={handleMouseMove} key={currentEffect.id}>
              <motion.h1
                className={`${baseClasses} text-white relative z-10 text-center`}
                animate={{
                  filter: `blur(${Math.abs(mousePosition.x + mousePosition.y) * 0.05}px)`,
                }}
                transition={{ duration: 0.1 }}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
                }}
              >
                {currentEffect.text.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        className="inline-block"
                        animate={{
                          x: mousePosition.x * (0.02 + charIndex * 0.005),
                          y: mousePosition.y * (0.02 + charIndex * 0.005),
                          scale: Math.max(0.8, 1 - Math.abs(mousePosition.x + mousePosition.y) * 0.001),
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              {/* Black hole visual effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full"
                animate={{
                  background: `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, 
                    rgba(0,0,0,0.6) 0%, 
                    rgba(0,0,0,0.3) 20%, 
                    transparent 40%)`,
                  boxShadow: `inset 0 0 50px rgba(0,0,0,${Math.abs(mousePosition.x + mousePosition.y) * 0.01})`,
                }}
              />
            </motion.div>
          </div>
        )

      case "reveal":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent text-center`}
              key={currentEffect.id}
            >
              {currentEffect.text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: (wordIndex * word.length + charIndex) * 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 4,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
        )

      case "rainbow":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1 className={`${baseClasses} text-center`} key={currentEffect.id}>
              {currentEffect.text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      className="inline-block"
                      animate={{
                        color: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3", "#ff0000"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: (wordIndex * word.length + charIndex) * 0.1,
                      }}
                      style={{
                        textShadow: "0 0 10px currentColor",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
        )

      case "decode":
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} text-green-400 font-mono text-center`}
              key={currentEffect.id}
              style={{
                textShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              {displayText}
            </motion.h1>
          </div>
        )

      default:
        return (
          <div className="min-h-[120px] flex items-center justify-center">
            <motion.h1
              className={`${baseClasses} bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent text-center`}
              key={currentEffect.id}
            >
              {currentEffect.text}
            </motion.h1>
          </div>
        )
    }
  }

  return (
    <div className="relative leading-3">
      <AnimatePresence mode="wait">{renderTextEffect()}</AnimatePresence>

      {/* Effect indicators */}
      <motion.div
        className="flex justify-center space-x-3 mt-8"
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
                className="absolute inset-0 rounded-full bg-green-400"
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
        className="text-center mt-4"
        key={currentEffect.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <p className="text-green-400 text-sm font-medium">{currentEffect.name}</p>
      </motion.div>

      {/* Auto-progress indicator */}
      
    </div>
  )
}
