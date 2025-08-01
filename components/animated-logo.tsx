"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-32 h-32 mx-auto mb-4 relative"
        animate={{
          rotateY: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl transform rotate-12" />
        <div className="absolute inset-2 bg-black rounded-xl flex items-center justify-center">
          <motion.div
            className="text-4xl font-bold text-green-400"
            animate={{
              textShadow: isHovered ? "0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00" : "0 0 10px #00ff00",
            }}
            transition={{ duration: 0.3 }}
          >
            BL
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -inset-4 bg-green-400/20 rounded-full blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
