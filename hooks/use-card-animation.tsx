"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"

interface UseCardAnimationOptions {
  hasDeviceMockup?: boolean
}

export default function useCardAnimation({ hasDeviceMockup = false }: UseCardAnimationOptions = {}) {
  const [isHovered, setIsHovered] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const exploreButtonRef = useRef<HTMLDivElement>(null)
  const deviceMockupRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Initialize animations
  useEffect(() => {
    if (buttonContainerRef.current && exploreButtonRef.current) {
      gsap.set(buttonContainerRef.current, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      })

      gsap.set(exploreButtonRef.current, {
        opacity: 0,
        y: 10,
      })
    }
  }, [])

  // Card animation
  useEffect(() => {
    if (!buttonContainerRef.current || !exploreButtonRef.current || !cardRef.current) {
      return
    }

    // Button animation
    gsap.to(buttonContainerRef.current, {
      height: isHovered ? "auto" : 0,
      opacity: isHovered ? 1 : 0,
      duration: 0.4,
      delay: isHovered ? 0 : 0.1,
      ease: isHovered ? "power2.out" : "power2.inOut",
    })

    gsap.to(exploreButtonRef.current, {
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 10,
      duration: isHovered ? 0.3 : 0.2,
      delay: isHovered ? 0.1 : 0,
      ease: isHovered ? "power2.out" : "power2.in",
    })

    // Card scaling
    gsap.to(cardRef.current, {
      scale: isHovered ? 1.02 : 1,
      duration: 0.4,
      ease: isHovered ? "power2.out" : "power2.inOut",
    })

    // Content wrapper animation
    if (contentWrapperRef.current) {
      gsap.to(contentWrapperRef.current, {
        y: isHovered ? -8 : 0,
        duration: 0.4,
        ease: isHovered ? "power2.out" : "power2.inOut",
      })
    }

    // Device mockup animation
    if (hasDeviceMockup && deviceMockupRef.current) {
      gsap.to(deviceMockupRef.current, {
        y: isHovered ? -75 : 0,
        duration: 0.6,
        ease: isHovered ? "power2.out" : "power2.inOut",
      })
    }
  }, [isHovered, hasDeviceMockup])

  return {
    isHovered,
    cardRef,
    buttonContainerRef,
    exploreButtonRef,
    deviceMockupRef,
    contentWrapperRef,
    handleMouseEnter,
    handleMouseLeave,
  }
}
