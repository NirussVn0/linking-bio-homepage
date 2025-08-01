"use client"

import { useEffect, useCallback } from "react"

export function SmoothScroll() {
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()

    const scrollAmount = e.deltaY * 0.6
    requestAnimationFrame(() => {
      window.scrollBy({
        top: scrollAmount,
        behavior: "auto",
      })
    })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const scrollDistance = window.innerHeight * 0.7

    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        e.preventDefault()
        window.scrollBy({ top: scrollDistance, behavior: "smooth" })
        break
      case "ArrowUp":
      case "PageUp":
        e.preventDefault()
        window.scrollBy({ top: -scrollDistance, behavior: "smooth" })
        break
      case "Home":
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
        break
      case "End":
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        break
    }
  }, [])

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  return null
}
