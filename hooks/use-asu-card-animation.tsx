"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"

export default function useAsuCardAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const deviceMockupRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Initialize animations
  useEffect(() => {
    if (!cardRef.current || !contentRef.current || !buttonRef.current || !deviceMockupRef.current) return

    // Set initial states
    gsap.set(buttonRef.current, {
      y: 20,
      opacity: 0,
    })
  }, [])

  // Card animation
  useEffect(() => {
    if (!cardRef.current || !contentRef.current || !buttonRef.current || !deviceMockupRef.current) return

    // Create animations based on hover state
    gsap.to(contentRef.current, {
      y: isHovered ? -40 : 0,
      duration: 0.4,
      ease: isHovered ? "power2.out" : "power2.inOut",
    })

    gsap.to(buttonRef.current, {
      y: isHovered ? 0 : 20,
      opacity: isHovered ? 1 : 0,
      duration: isHovered ? 0.4 : 0.3,
      delay: isHovered ? 0.1 : 0,
      ease: isHovered ? "power2.out" : "power2.inOut",
    })

    gsap.to(deviceMockupRef.current, {
      y: isHovered ? -75 : 0,
      duration: 0.6,
      ease: isHovered ? "power2.out" : "power2.inOut",
    })

    return () => {
      // No need for timeline cleanup as we're using direct gsap.to calls
    }
  }, [isHovered])

  return {
    isHovered,
    cardRef,
    contentRef,
    buttonRef,
    deviceMockupRef,
    handleMouseEnter,
    handleMouseLeave,
  }
}
