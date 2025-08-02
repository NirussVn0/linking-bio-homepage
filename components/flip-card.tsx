"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface Feature {
  id: number
  icon: LucideIcon
  title: string
  description: string
  details: string
}

interface FlipCardProps {
  feature: Feature
}

export function FlipCard({ feature }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = feature.icon

  return (
    <div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden"
          whileHover={{
            boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <Icon className="w-8 h-8 text-black relative z-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-900/20 to-black border border-green-400 rounded-2xl p-6 flex flex-col justify-center overflow-hidden"
          whileHover={{
            boxShadow: "0 0 40px rgba(0, 255, 0, 0.4)",
          }}
        >
          {/* Animated particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <h3 className="text-2xl font-bold text-green-400 mb-4">{feature.title}</h3>
          <p className="text-white leading-relaxed">{feature.details}</p>
          <motion.div
            className="mt-4 w-full h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full"
            animate={{
              background: [
                "linear-gradient(to right, rgba(0,255,0,1) 0%, transparent 100%)",
                "linear-gradient(to right, rgba(0,255,0,1) 50%, transparent 100%)",
                "linear-gradient(to right, rgba(0,255,0,1) 0%, transparent 100%)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
