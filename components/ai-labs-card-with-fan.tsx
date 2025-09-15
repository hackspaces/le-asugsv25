"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"

interface AiLabsCardWithFanProps {
  linkHref: string
  setCardState: React.Dispatch<React.SetStateAction<{ isHovered: boolean }>>
  buttonContainerRef: React.RefObject<HTMLDivElement>
  exploreButtonRef: React.RefObject<HTMLButtonElement>
  cardRef: React.RefObject<HTMLDivElement>
}

// Card data for the fan cards
const cardData = [
  {
    id: "content-creator",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HPMzmxSdP2GOKNZ14oYhSNpgppxDbc.png",
  },
  {
    id: "recommendation-engine",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AxMqHjpgpfFRonYGEqJ0d4Q3ucnIJl.png",
  },
  {
    id: "guide",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rUDwS9GAc5OcrTBu7OTIeN3mUL5XzN.png",
  },
  {
    id: "learner-genome",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EwwtExWvuv0CDgkPmT8k86Q1fSHm2H.png",
  },
  {
    id: "library",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oYS7QmCYNwXWICXMYqyruR10pk4cEc.png",
  },
]

export default function AiLabsCardWithFan({
  linkHref,
  setCardState,
  buttonContainerRef,
  exploreButtonRef,
  cardRef,
}: AiLabsCardWithFanProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Refs for the fan cards
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const animatingRef = useRef(false)

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true)
    setCardState({ isHovered: true })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCardState({ isHovered: false })
  }

  // Initialize positions once on component mount
  useEffect(() => {
    if (!imageContainerRef.current || isInitialized) return

    // Initial positions for the cards (stacked fan at the bottom)
    // Accounting for card width (32%) to ensure they're not cut off at edges
    const initialPositions = [
      { x: "0%", y: "70%", rotation: -15, zIndex: 1, scale: 0.65 }, // Content Creator (leftmost edge)
      { x: "17%", y: "70%", rotation: -7, zIndex: 2, scale: 0.65 }, // Recommendation Engine
      { x: "34%", y: "70%", rotation: 0, zIndex: 3, scale: 0.65 }, // Guide
      { x: "51%", y: "70%", rotation: 7, zIndex: 2, scale: 0.65 }, // Learner Genome
      { x: "68%", y: "70%", rotation: 15, zIndex: 1, scale: 0.65 }, // Library (rightmost edge)
    ]

    // Set initial positions
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      gsap.set(card, {
        left: initialPositions[index].x,
        top: initialPositions[index].y,
        rotation: initialPositions[index].rotation,
        zIndex: initialPositions[index].zIndex,
        scale: initialPositions[index].scale,
        transformOrigin: "center top", // Rotate from top center
      })
    })

    setIsInitialized(true)

    // Clean up function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [isInitialized])

  // Create two separate timelines for expanding and collapsing
  useEffect(() => {
    if (!imageContainerRef.current || !isInitialized || animatingRef.current) return

    // Initial positions for the cards (stacked fan at the bottom)
    const initialPositions = [
      { x: "0%", y: "70%", rotation: -15, zIndex: 1, scale: 0.65 }, // Content Creator (leftmost edge)
      { x: "17%", y: "70%", rotation: -7, zIndex: 2, scale: 0.65 }, // Recommendation Engine
      { x: "34%", y: "70%", rotation: 0, zIndex: 3, scale: 0.65 }, // Guide
      { x: "51%", y: "70%", rotation: 7, zIndex: 2, scale: 0.65 }, // Learner Genome
      { x: "68%", y: "70%", rotation: 15, zIndex: 1, scale: 0.65 }, // Library (rightmost edge)
    ]

    // Final positions for the cards (grid layout) - more evenly spaced
    const finalPositions = [
      { x: "5%", y: "10%", rotation: 0, zIndex: 1, scale: 0.85 }, // Content Creator (top left)
      { x: "35%", y: "10%", rotation: 0, zIndex: 1, scale: 0.85 }, // Recommendation Engine (top middle)
      { x: "65%", y: "10%", rotation: 0, zIndex: 1, scale: 0.85 }, // Guide (top right)
      { x: "22%", y: "55%", rotation: 0, zIndex: 1, scale: 0.85 }, // Learner Genome (bottom left)
      { x: "52%", y: "55%", rotation: 0, zIndex: 1, scale: 0.85 }, // Library (bottom right)
    ]

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    animatingRef.current = true

    // Create a fresh timeline for each animation
    if (isHovered) {
      // Create expand timeline
      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false
        },
      })

      cardRefs.current.forEach((card, index) => {
        if (!card) return

        tl.to(
          card,
          {
            left: finalPositions[index].x,
            top: finalPositions[index].y,
            rotation: finalPositions[index].rotation,
            zIndex: finalPositions[index].zIndex,
            scale: finalPositions[index].scale,
            duration: 0.3,
            ease: "power1.out",
          },
          0, // Start all animations at the same time
        )
      })

      timelineRef.current = tl
    } else {
      // Create collapse timeline
      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false
        },
      })

      cardRefs.current.forEach((card, index) => {
        if (!card) return

        tl.to(
          card,
          {
            left: initialPositions[index].x,
            top: initialPositions[index].y,
            rotation: initialPositions[index].rotation,
            zIndex: initialPositions[index].zIndex,
            scale: initialPositions[index].scale,
            duration: 0.25, // Faster collapse
            ease: "power1.inOut",
          },
          0, // Start all animations at the same time
        )
      })

      timelineRef.current = tl
    }
  }, [isHovered, isInitialized])

  return (
    <div className="w-full h-[600px] relative">
      <Link href={linkHref} className="cursor-pointer">
        <div
          ref={cardRef}
          className="absolute inset-0 bg-white rounded-[8px] shadow-lg overflow-hidden w-full relative transition-shadow duration-300 hover:shadow-xl cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-[16px] flex flex-col h-full">
            <div className="flex justify-center mb-4 w-full">
              <div
                ref={imageContainerRef}
                className="w-full h-64 relative rounded-md transition-all duration-300"
                style={{
                  background: isHovered ? "linear-gradient(180deg, #FFC627 0%, #8C1D40 100%)" : "#e5e5e5",
                  overflow: "hidden", // Always clip to keep cards inside the gray box
                }}
              >
                {/* Fan cards container */}
                {cardData.map((card, index) => (
                  <div
                    key={card.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="absolute shadow-lg cursor-pointer"
                    style={{
                      width: "30%", // Reduced from 32% to make cards smaller and allow more spacing
                      position: "absolute",
                      transformOrigin: "center top", // Rotate from top center
                      willChange: "transform, left, top", // Optimize for animation performance
                    }}
                  >
                    <Image
                      src={card.imageSrc || "/placeholder.svg"}
                      alt={card.id}
                      width={300}
                      height={420}
                      className="w-full h-auto rounded-md object-contain"
                      style={{
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3">AI Labs</h2>
              <p
                style={{
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.3",
                  letterSpacing: "0%",
                  color: "#484848",
                }}
              >
                Explore the 5 tools that will power the future of learning and the AI capabilities that are transforming
                learning experiences and creating new spaces at ASU today.
              </p>

              {/* Button container that will expand/collapse */}
              <div ref={buttonContainerRef} className="mt-4 overflow-hidden">
                <button
                  ref={exploreButtonRef}
                  className="bg-[#8C1D40] hover:bg-[#781935] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 w-32 text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    window.location.href = linkHref
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
