"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import gsap from "gsap"

interface AnimatedCardProps {
  title: string
  type: string
  imageSrc: string
  imageAlt: string
}

export default function AnimatedCard({ title, type, imageSrc, imageAlt }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageElementRef = useRef<HTMLImageElement>(null)

  // Track hover state
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Set up the animation context
    if (
      !cardRef.current ||
      !bgRef.current ||
      !imageRef.current ||
      !contentRef.current ||
      !overlayRef.current ||
      !imageElementRef.current ||
      !imageContainerRef.current
    )
      return

    // Set initial state - hidden background and grayscale image
    gsap.set(bgRef.current, {
      scale: 0,
      opacity: 1,
      transformOrigin: "center center",
    })

    gsap.set(imageElementRef.current, {
      filter: "grayscale(100%)",
    })

    // Create animations based on hover state
    gsap.to(bgRef.current, {
      scale: isHovered ? 15 : 0,
      duration: 1.5,
      ease: isHovered ? "power2.out" : "power2.inOut",
      overwrite: true,
    })

    gsap.to(imageRef.current, {
      scale: isHovered ? 1.1 : 1,
      duration: 1.5,
      ease: isHovered ? "power2.out" : "power2.inOut",
      overwrite: true,
    })

    gsap.to(imageElementRef.current, {
      filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
      duration: 1.5,
      ease: isHovered ? "power2.out" : "power2.inOut",
      overwrite: true,
    })

    gsap.to(overlayRef.current, {
      opacity: isHovered ? 0 : 1,
      duration: 1.5,
      ease: isHovered ? "power2.out" : "power2.inOut",
      overwrite: true,
    })

    gsap.to(imageContainerRef.current, {
      padding: isHovered ? 0 : "0.25rem",
      duration: 1.5,
      ease: isHovered ? "power2.out" : "power2.inOut",
      overwrite: true,
    })
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Adjust image height based on type - increased heights
  const imageHeight = type === "Demo" ? "h-36" : "h-44"

  return (
    <div
      ref={cardRef}
      className="w-full bg-white rounded overflow-hidden cursor-pointer relative flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image container - increased height */}
      <div ref={imageContainerRef} className={`relative ${imageHeight} p-1 bg-white overflow-hidden z-20`}>
        <div ref={imageRef} className="relative w-full h-full" style={{ transformOrigin: "center" }}>
          <Image
            ref={imageElementRef}
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover rounded-sm filter grayscale"
          />
          <div ref={overlayRef} className="absolute inset-0 bg-black bg-opacity-30 rounded-sm" />
        </div>
      </div>

      {/* Content area - with balanced padding top and bottom */}
      <div
        ref={contentRef}
        className="px-3 py-6 relative bg-white flex-grow flex flex-col justify-center overflow-hidden"
      >
        {/* Yellow circle background that expands radially - positioned at the top of the content area */}
        <div
          ref={bgRef}
          className="w-16 h-16 rounded-full bg-amber-400 z-10 absolute"
          style={{
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            scale: 0,
          }}
        />

        {/* Content that stays on top of the background */}
        <div className="relative z-20">
          <Badge variant="outline" className="bg-gray-100 text-zinc-900 font-bold rounded-full text-xs mb-1">
            {type}
          </Badge>
          <h3 className={`font-bold leading-tight ${type === "Demo" ? "text-sm" : "text-base"}`}>{title}</h3>
        </div>
      </div>
    </div>
  )
}
