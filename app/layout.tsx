import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "BioLink - Connect. Share. Grow.",
  description: "Transform your online presence with a stunning bio-link page that showcases everything you are",
  keywords: "bio link, social media, link in bio, personal branding, content creator",
  authors: [{ name: "BioLink Platform" }],
  openGraph: {
    title: "BioLink - Connect. Share. Grow.",
    description: "Transform your online presence with a stunning bio-link page",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioLink - Connect. Share. Grow.",
    description: "Transform your online presence with a stunning bio-link page",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
