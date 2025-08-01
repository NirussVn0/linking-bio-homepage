"use client"

import { motion } from "framer-motion"
import { FlipCard } from "./flip-card"
import { PhoneMockup } from "./phone-mockup"
import { Timeline } from "./timeline"
import { Link, BarChart3, Palette } from "lucide-react"
import { Mouse3DCard } from "./mouse-3d-card"
import { TestimonialsSection } from "./testimonials-section"

const features = [
  {
    id: 1,
    icon: Link,
    title: "Link Management",
    description: "Organize and customize all your important links in one beautiful, easy-to-manage dashboard.",
    details: "Add unlimited links, customize their appearance, and track their performance with detailed analytics.",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your link performance with detailed analytics and insights about your audience.",
    details: "Monitor clicks, views, geographic data, and engagement metrics to optimize your bio-link strategy.",
  },
  {
    id: 3,
    icon: Palette,
    title: "Theme Customizer",
    description: "Personalize your bio-link page with beautiful themes and custom styling options.",
    details: "Choose from premium themes, customize colors, fonts, and layouts to match your brand perfectly.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create a stunning bio-link page that converts visitors into followers
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="grid gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Mouse3DCard intensity={15}>
                  <FlipCard feature={feature} />
                </Mouse3DCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Mouse3DCard intensity={10}>
              <PhoneMockup />
            </Mouse3DCard>
          </motion.div>
        </div>

        <Timeline />

        {/* Add testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TestimonialsSection />
        </motion.div>
      </div>
    </section>
  )
}
