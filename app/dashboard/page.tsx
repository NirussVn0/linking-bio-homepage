"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface User {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  email: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : "/placeholder.svg?height=80&width=80"

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={user.username}
              className="w-16 h-16 rounded-full border-2 border-green-400"
            />
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
              <p className="text-gray-400">Ready to build your bio-link page?</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Links</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Clicks</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profile Views</span>
                <span className="font-bold">0</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">Recent Activity</h3>
            <p className="text-gray-400 text-center py-8">No activity yet</p>
          </div>

          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
                Add New Link
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Customize Theme
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
