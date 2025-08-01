import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll />
      <main className="min-h-screen bg-black text-white overflow-hidden cursor-none">
        <HeroSection />
        <ScrollReveal direction="up" delay={0.2}>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.4}>
          <Footer />
        </ScrollReveal>
      </main>
    </>
  )
}
