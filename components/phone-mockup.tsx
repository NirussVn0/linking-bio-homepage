"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function PhoneMockup() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-4 border-4 border-gray-800 shadow-2xl overflow-hidden">
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-[3rem] border-2 border-green-400/50"
          animate={
            isHovered
              ? {
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 0, 0.3)",
                    "0 0 40px rgba(0, 255, 0, 0.5)",
                    "0 0 20px rgba(0, 255, 0, 0.3)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full" />

          {/* Screen glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-[2.5rem]"
            animate={isHovered ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="p-6 pt-12">
            <div className="text-center mb-8">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden"
                animate={isHovered ? { rotate: [0, 360] } : {}}
                transition={{ duration: 2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <span className="text-2xl font-bold text-black relative z-10">JD</span>
              </motion.div>
              <h3 className="text-white text-xl font-bold">John Doe</h3>
              <p className="text-gray-400">Content Creator</p>
            </div>

            <div className="space-y-4">
              {["YouTube Channel", "Instagram", "Twitter", "Website"].map((link, index) => (
                <motion.div
                  key={link}
                  className="bg-gray-800 rounded-xl p-4 text-center text-white border border-green-500/30 relative overflow-hidden"
                  animate={{
                    scale: isHovered ? [1, 1.02, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 2,
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                    animate={
                      isHovered
                        ? {
                            x: ["-100%", "100%"],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  />
                  <span className="relative z-10">{link}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -inset-8 bg-green-400/10 rounded-full blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
