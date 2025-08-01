"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"

const legalSections = [
  {
    id: "terms",
    title: "Terms of Service",
    content:
      "By using our service, you agree to these terms and conditions. Our platform provides bio-link services subject to your compliance with our guidelines and policies.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content:
      "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.",
  },
  {
    id: "sla",
    title: "Service Level Agreement",
    content:
      "We guarantee 99.9% uptime for our services. Our SLA outlines our commitments to service availability, performance, and support response times.",
  },
]

export function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  return (
    <footer className="bg-black border-t border-green-500/30 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-8"
            >
              Legal Information
            </motion.h3>

            <div className="space-y-4">
              {legalSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-green-500/30 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left flex items-center justify-between bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                  >
                    <span className="text-white font-semibold">{section.title}</span>
                    <motion.div
                      animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-green-400" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSection === section.id ? "auto" : 0,
                      opacity: expandedSection === section.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        transform:
                          expandedSection === section.id
                            ? "translateZ(20px) rotateX(5deg)"
                            : "translateZ(0px) rotateX(0deg)",
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="p-6 bg-green-500/5 text-gray-300 leading-relaxed"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {section.content}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-8"
            >
              Join Our Community
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-gray-300 text-lg mb-6">
                Connect with other creators, get support, and stay updated with the latest features.
              </p>

              <motion.button
                className="relative group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 0, 0.3)",
                    "0 0 40px rgba(0, 255, 0, 0.5)",
                    "0 0 20px rgba(0, 255, 0, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
                onClick={() => window.open("https://discord.gg/biolink", "_blank")}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(0,255,0,0.1) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join Our Community
                  <ExternalLink className="w-4 h-4" />
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <motion.a
                href="https://discord.gg/biolink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center border border-green-500/30 hover:border-green-400 transition-colors group"
                whileHover={{ scale: 1.1, rotateY: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-green-500/30 mt-16 pt-8 text-center"
        >
          <p className="text-gray-400">© 2024 BioLink Platform. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
