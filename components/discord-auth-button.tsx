"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DiscordAuthButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDiscordAuth = async () => {
    setIsLoading(true)

    try {
      const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/discord/callback`)
      const scope = encodeURIComponent("identify email")

      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`

      window.location.href = discordAuthUrl
    } catch (error) {
      console.error("Discord auth error:", error)
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handleDiscordAuth}
      disabled={isLoading}
      className="relative group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: ["0 0 20px rgba(0, 255, 0, 0.3)", "0 0 40px rgba(0, 255, 0, 0.5)", "0 0 20px rgba(0, 255, 0, 0.3)"],
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10 flex items-center gap-3">
        {isLoading ? (
          <motion.div
            className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        )}
        {isLoading ? "Connecting..." : "Sign in with Discord"}
      </span>
    </motion.button>
  )
}
