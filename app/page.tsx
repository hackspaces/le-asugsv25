"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import ThemeToggle, { backgroundChangeEvent, THEME_STORAGE_KEY } from "@/components/theme-toggle"
import AsuForLifeCard from "@/components/asu-for-life-card"
import AiLabsCardWithFan from "@/components/ai-labs-card-with-fan"
import { gsap } from "gsap"
import { useRef } from "react"

export default function Home() {
  // Initialize theme state from localStorage
  const [isLightMode, setIsLightMode] = useState(true) // Default to light mode initially

  // Load theme from localStorage and set up event listener
  useEffect(() => {
    // Get theme from localStorage
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedPreference !== null) {
        setIsLightMode(savedPreference === "light")
      }
    }

    // Listen for background change events
    const handleBackgroundChange = (event: CustomEvent) => {
      setIsLightMode(event.detail.isLightMode)
    }

    // Add event listener
    window.addEventListener(backgroundChangeEvent, handleBackgroundChange as EventListener)

    // Clean up
    return () => {
      window.removeEventListener(backgroundChangeEvent, handleBackgroundChange as EventListener)
    }
  }, [])

  // ASU Card state
  const [asuCardState, setAsuCardState] = useState({ isHovered: false })

  // AI Labs Card state
  const [aiLabsCardState, setAiLabsCardState] = useState({ isHovered: false })

  // Refs for ASU Card elements
  const asuButtonContainerRef = useRef<HTMLDivElement>(null)
  const asuExploreButtonRef = useRef<HTMLButtonElement>(null)
  const asuCardRef = useRef<HTMLDivElement>(null)
  const asuDeviceMockupRef = useRef<HTMLImageElement>(null)

  // Refs for AI Labs Card elements
  const aiLabsButtonContainerRef = useRef<HTMLDivElement>(null)
  const aiLabsExploreButtonRef = useRef<HTMLButtonElement>(null)
  const aiLabsCardRef = useRef<HTMLDivElement>(null)

  // ASU Card animation
  useEffect(() => {
    if (
      !asuButtonContainerRef.current ||
      !asuExploreButtonRef.current ||
      !asuCardRef.current ||
      !asuDeviceMockupRef.current
    )
      return

    // Show/hide button based on hover state
    gsap.to(asuButtonContainerRef.current, {
      height: asuCardState.isHovered ? "auto" : 0,
      opacity: asuCardState.isHovered ? 1 : 0,
      duration: 0.4,
      ease: asuCardState.isHovered ? "power2.out" : "power2.inOut",
      delay: asuCardState.isHovered ? 0 : 0.1,
    })

    gsap.to(asuExploreButtonRef.current, {
      opacity: asuCardState.isHovered ? 1 : 0,
      y: asuCardState.isHovered ? 0 : -10,
      duration: asuCardState.isHovered ? 0.3 : 0.2,
      delay: asuCardState.isHovered ? 0.1 : 0,
      ease: asuCardState.isHovered ? "power2.out" : "power2.in",
    })

    // Animate device mockup
    gsap.to(asuDeviceMockupRef.current, {
      y: asuCardState.isHovered ? -75 : 0,
      duration: 0.6,
      ease: asuCardState.isHovered ? "power2.out" : "power2.inOut",
    })
  }, [asuCardState.isHovered])

  // AI Labs Card animation
  useEffect(() => {
    if (!aiLabsButtonContainerRef.current || !aiLabsExploreButtonRef.current || !aiLabsCardRef.current) return

    // Show/hide button based on hover state
    gsap.to(aiLabsButtonContainerRef.current, {
      height: aiLabsCardState.isHovered ? "auto" : 0,
      opacity: aiLabsCardState.isHovered ? 1 : 0,
      duration: 0.4,
      ease: aiLabsCardState.isHovered ? "power2.out" : "power2.inOut",
      delay: aiLabsCardState.isHovered ? 0 : 0.1,
    })

    gsap.to(aiLabsExploreButtonRef.current, {
      opacity: aiLabsCardState.isHovered ? 1 : 0,
      y: aiLabsCardState.isHovered ? 0 : -10,
      duration: aiLabsCardState.isHovered ? 0.3 : 0.2,
      delay: aiLabsCardState.isHovered ? 0.1 : 0,
      ease: aiLabsCardState.isHovered ? "power2.out" : "power2.in",
    })
  }, [aiLabsCardState.isHovered])

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Topographical Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            isLightMode
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NgogGH5PHSuXVMmHM63kguZYFC9wUv.png"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VEuKEkPQEJVYDvOOvVrn9bFDIlxgAx.png"
          }
          alt="Topographical background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
          {/* ASU for Life Card - Updated with Figma URL */}
          <AsuForLifeCard
            linkHref="https://www.figma.com/proto/EdlJ5AmTOqF7lKlfCeGdfh/Long-Term-Vision?page-id=1152%3A107&node-id=1268-212&p=f&viewport=-610%2C760%2C0.25&t=Ragpdbtb37AMn0II-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1268%3A212"
            setCardState={setAsuCardState}
            buttonContainerRef={asuButtonContainerRef}
            exploreButtonRef={asuExploreButtonRef}
            cardRef={asuCardRef}
            deviceMockupRef={asuDeviceMockupRef}
          />

          {/* AI Labs Card */}
          <AiLabsCardWithFan
            linkHref="/learning-experience"
            setCardState={setAiLabsCardState}
            buttonContainerRef={aiLabsButtonContainerRef}
            exploreButtonRef={aiLabsExploreButtonRef}
            cardRef={aiLabsCardRef}
          />
        </div>
      </div>
    </div>
  )
}
