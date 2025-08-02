"use client"

import { motion, useDragControls } from "framer-motion"
import { Palette, Plus, Share2 } from "lucide-react"
import { useMemo, useState } from "react"

const timelineSteps = [
  {
    id: 1,
    icon: Plus,
    title: "Add Links",
    description: "Start by adding all your important links and social media profiles",
  },
  {
    id: 2,
    icon: Palette,
    title: "Customize Theme",
    description: "Choose from beautiful themes and customize colors to match your brand",
  },
  {
    id: 3,
    icon: Share2,
    title: "Share & Grow",
    description: "Share your bio-link and watch your audience grow with detailed analytics",
  },
]

export function Timeline() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [glowPosition, setGlowPosition] = useState(0)
  const dragControls = useDragControls()

  // Generate deterministic positions for particles to avoid hydration mismatch
  const particlePositions = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      left: 15 + (i * 15) % 70, // Distribute across 70% width
      top: 20 + (i * 12) % 60,  // Distribute across 60% height
    }))
  }, [])

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
          How It Works
        </h3>
        <p className="text-xl text-gray-300">Get started in just three simple steps</p>
      </motion.div>

      <div className="relative">
        {/* Animated Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 transform -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              width: "200%",
            }}
          />
        </div>

        {/* Glowing Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-green-400 to-green-600 transform -translate-y-1/2 rounded-full shadow-lg"
          animate={{
            width: hoveredStep ? `${(hoveredStep / 3) * 100}%` : "0%",
            boxShadow: hoveredStep ? "0 0 20px rgba(0, 255, 0, 0.6)" : "0 0 10px rgba(0, 255, 0, 0.3)",
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex justify-between items-center">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon
            const isHovered = hoveredStep === step.id

            return (
              <motion.div
                key={step.id}
                drag
                dragControls={dragControls}
                dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
                dragElastic={0.2}
                dragSnapToOrigin
                whileDrag={{ scale: 1.1, zIndex: 10 }}
                onDragEnd={() => {
                  // Ensure element returns to original position
                  return { x: 0, y: 0 }
                }}
                className="flex flex-col items-center text-center max-w-xs cursor-grab active:cursor-grabbing"
                onHoverStart={() => setHoveredStep(step.id)}
                onHoverEnd={() => setHoveredStep(null)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                animate={{ x: 0, y: 0 }}
              >
                <motion.div
                  className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 z-10 overflow-hidden"
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    boxShadow: isHovered
                      ? [
                          "0 0 20px rgba(0, 255, 0, 0.4)",
                          "0 0 40px rgba(0, 255, 0, 0.6)",
                          "0 0 20px rgba(0, 255, 0, 0.4)",
                        ]
                      : "0 0 15px rgba(0, 255, 0, 0.3)",
                    rotateY: isHovered ? [0, 360] : 0,
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    rotateY: { duration: 0.8 },
                    scale: { duration: 0.3 },
                  }}
                >
                  {/* Rotating glow effect inside icon */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={
                      isHovered
                        ? {
                            rotate: [0, 360],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <Icon className="w-8 h-8 text-black relative z-10" />
                </motion.div>

                <motion.div
                  drag
                  dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                  dragElastic={0.3}
                  dragSnapToOrigin
                  onDragEnd={() => ({ x: 0, y: 0 })}
                  animate={{
                    y: isHovered ? -8 : 0,
                    x: 0, // Ensure it returns to center
                  }}
                  transition={{ duration: 0.3 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.h4
                    className="text-xl font-bold text-white mb-2"
                    animate={{
                      textShadow: isHovered ? "0 0 10px rgba(0, 255, 0, 0.5)" : "none",
                    }}
                  >
                    {step.title}
                  </motion.h4>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </motion.div>

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute top-full mt-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-xs text-green-400 shadow-lg"
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
                    dragElastic={0.2}
                    dragSnapToOrigin
                    onDragEnd={() => ({ x: 0, y: 0 })}
                  >
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(0,255,0,0.1), rgba(0,100,255,0.1))",
                          "linear-gradient(45deg, rgba(0,100,255,0.1), rgba(255,0,100,0.1))",
                          "linear-gradient(45deg, rgba(255,0,100,0.1), rgba(0,255,0,0.1))",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 rounded-lg"
                    />
                    <span className="relative z-10">Step {step.id} of 3</span>
                  </motion.div>
                )}

                {/* Particle effects */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400 rounded-full"
                        style={{
                          left: `${particlePositions[i].left}%`,
                          top: `${particlePositions[i].top}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [0, -20],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
