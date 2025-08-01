"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

export default function DiscordCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      setStatus("error")
      setTimeout(() => router.push("/"), 3000)
      return
    }

    if (code) {
      handleDiscordCallback(code)
    } else {
      setStatus("error")
      setTimeout(() => router.push("/"), 3000)
    }
  }, [searchParams, router])

  const handleDiscordCallback = async (code: string) => {
    try {
      const response = await fetch("/api/auth/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        setStatus("success")
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        setStatus("error")
        setTimeout(() => router.push("/"), 3000)
      }
    } catch (error) {
      console.error("Discord callback error:", error)
      setStatus("error")
      setTimeout(() => router.push("/"), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <motion.div
              className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <h2 className="text-2xl font-bold text-white">Connecting with Discord...</h2>
            <p className="text-gray-400">Please wait while we set up your account</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="w-16 h-16 bg-green-400 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Successfully Connected!</h2>
            <p className="text-gray-400">Redirecting to your dashboard...</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Connection Failed</h2>
            <p className="text-gray-400">Redirecting back to homepage...</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
