"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    bio: "@sarahcreates",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "This platform transformed my online presence completely. The 3D effects are stunning!",
    bioPreview: {
      theme: "neon",
      links: ["YouTube", "Instagram", "TikTok", "Patreon"],
      colors: ["#ff006e", "#8338ec", "#3a86ff"],
    },
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Musician",
    bio: "@marcusbeats",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "Amazing analytics and the Discord integration works flawlessly. Highly recommend!",
    bioPreview: {
      theme: "dark",
      links: ["Spotify", "SoundCloud", "Apple Music", "Bandcamp"],
      colors: ["#1db954", "#ff5500", "#000000"],
    },
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Digital Artist",
    bio: "@emmadraws",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "The customization options are endless. I love how my bio-link reflects my art style!",
    bioPreview: {
      theme: "gradient",
      links: ["DeviantArt", "Instagram", "Etsy", "Portfolio"],
      colors: ["#ff9a8b", "#a8edea", "#fed6e3"],
    },
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Tech Blogger",
    bio: "@alextech",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "Clean interface, powerful features, and the 3D animations add that professional touch!",
    bioPreview: {
      theme: "minimal",
      links: ["Medium", "Twitter", "LinkedIn", "Newsletter"],
      colors: ["#00d2ff", "#3a7bd5", "#000428"],
    },
  },
  {
    id: 5,
    name: "Zoe Kim",
    role: "Fashion Influencer",
    bio: "@zoestyle",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "Perfect for showcasing my brand! The themes are gorgeous and so easy to customize.",
    bioPreview: {
      theme: "pastel",
      links: ["Instagram", "Pinterest", "YouTube", "Shop"],
      colors: ["#ffeaa7", "#fab1a0", "#fd79a8"],
    },
  },
  {
    id: 6,
    name: "David Kumar",
    role: "Fitness Coach",
    bio: "@davidfitness",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    feedback: "Great platform for fitness professionals. The analytics help me understand my audience better!",
    bioPreview: {
      theme: "sport",
      links: ["YouTube", "Instagram", "MyFitnessPal", "Coaching"],
      colors: ["#00b894", "#fdcb6e", "#e17055"],
    },
  },
]

export function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Loved by Creators
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of creators who've transformed their online presence with our platform
          </p>
        </motion.div>

        {/* Scrolling testimonials */}
        <div className="relative h-96 overflow-hidden">
          <motion.div
            className="flex space-x-6 h-full"
            animate={{
              x: [0, -2400], // Adjust based on card width * number of cards
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 h-full relative"
                onHoverStart={() => setHoveredCard(testimonial.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={
                      hoveredCard === testimonial.id
                        ? {
                            background: [
                              "radial-gradient(circle at 20% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                              "radial-gradient(circle at 80% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                              "radial-gradient(circle at 20% 50%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* User info */}
                  <div className="flex items-center mb-4 relative z-10">
                    <motion.img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-green-400 mr-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-green-400 text-xs">{testimonial.bio}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4 relative z-10">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div className="flex-grow relative z-10 mb-4">
                    <Quote className="w-6 h-6 text-green-400 mb-2 opacity-60" />
                    <p className="text-gray-300 text-sm italic leading-relaxed">{testimonial.feedback}</p>
                  </div>

                  {/* Bio preview */}
                  <div className="bg-black/50 rounded-xl p-4 border border-green-500/20 relative z-10">
                    <div className="text-center mb-3">
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold text-black"
                        style={{
                          background: `linear-gradient(135deg, ${testimonial.bioPreview.colors[0]}, ${testimonial.bioPreview.colors[1]})`,
                        }}
                      >
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <p className="text-white text-xs font-semibold">{testimonial.name}</p>
                    </div>

                    <div className="space-y-1">
                      {testimonial.bioPreview.links.slice(0, 3).map((link, linkIndex) => (
                        <motion.div
                          key={link}
                          className="bg-gray-800/50 rounded-lg py-1 px-2 text-center text-xs text-gray-300 border border-green-500/10"
                          style={{
                            background:
                              hoveredCard === testimonial.id
                                ? `linear-gradient(90deg, ${testimonial.bioPreview.colors[linkIndex % 3]}20, transparent)`
                                : undefined,
                          }}
                          animate={
                            hoveredCard === testimonial.id
                              ? {
                                  borderColor: [
                                    `${testimonial.bioPreview.colors[linkIndex % 3]}20`,
                                    `${testimonial.bioPreview.colors[linkIndex % 3]}40`,
                                    `${testimonial.bioPreview.colors[linkIndex % 3]}20`,
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {link}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={
                      hoveredCard === testimonial.id
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(0, 255, 0, 0.2)",
                              "0 0 40px rgba(0, 255, 0, 0.4)",
                              "0 0 20px rgba(0, 255, 0, 0.2)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { number: "10,000+", label: "Happy Creators" },
            { number: "99.9%", label: "Uptime" },
            { number: "4.9/5", label: "Average Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl font-bold text-green-400 mb-2"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0, 255, 0, 0.3)",
                    "0 0 20px rgba(0, 255, 0, 0.5)",
                    "0 0 10px rgba(0, 255, 0, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
