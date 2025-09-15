"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  linkHref: string
  hasGradientBackground?: boolean
  isDeviceMockup?: boolean
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  hasGradientBackground = false,
  isDeviceMockup = false,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [cardHeight, setCardHeight] = useState(0)

  const cardRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const exploreButtonRef = useRef<HTMLDivElement>(null)
  const deviceMockupRef = useRef<HTMLDivElement>(null)

  // Calculate and set initial card height
  useEffect(() => {
    if (cardInnerRef.current) {
      const height = cardInnerRef.current.offsetHeight
      setCardHeight(height)
    }
  }, [])

  // Handle hover events
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
        overflow: "hidden",
        opacity: 0,
      })

      gsap.set(exploreButtonRef.current, {
        opacity: 0,
        y: -10,
      })
    }
  }, [])

  // Card animation
  useEffect(() => {
    if (!buttonContainerRef.current || !exploreButtonRef.current || !cardInnerRef.current) {
      return
    }

    // Button animation
    if (isHovered) {
      // Show button
      gsap.to(buttonContainerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          if (cardInnerRef.current) {
            // Update card height in wrapper to match inner content
            setCardHeight(cardInnerRef.current.offsetHeight)
          }
        },
      })

      gsap.to(exploreButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      })

      // Device mockup animation if applicable
      if (isDeviceMockup && deviceMockupRef.current) {
        gsap.to(deviceMockupRef.current, {
          y: -75,
          duration: 0.6,
          ease: "power2.out",
        })
      }
    } else {
      // Hide button
      gsap.to(exploreButtonRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      })

      gsap.to(buttonContainerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (cardInnerRef.current) {
            // Update card height in wrapper to match inner content
            setCardHeight(cardInnerRef.current.offsetHeight)
          }
        },
      })

      // Reset device mockup if applicable
      if (isDeviceMockup && deviceMockupRef.current) {
        gsap.to(deviceMockupRef.current, {
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
        })
      }
    }
  }, [isHovered, isDeviceMockup])

  return (
    <div ref={cardRef} className="w-[400px] relative" style={{ height: `${cardHeight}px` }}>
      <div
        ref={cardInnerRef}
        className="bg-white rounded-[8px] shadow-lg overflow-hidden w-full absolute top-0 left-0 transition-shadow duration-300 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={linkHref} className="block">
          <div className="p-[16px] flex flex-col">
            <div className="flex justify-center mb-4 w-full">
              <div
                className="w-full h-64 relative overflow-hidden rounded-md transition-all duration-300"
                style={{
                  background:
                    hasGradientBackground && isHovered
                      ? "linear-gradient(180deg, #FFC627 0%, #8C1D40 100%)"
                      : "#e5e5e5",
                }}
              >
                {isDeviceMockup ? (
                  <div
                    ref={deviceMockupRef}
                    className="absolute w-[90%] left-[5%] bottom-[-30%] will-change-transform"
                    style={{ transform: "translateY(0)" }}
                  >
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={imageAlt}
                      width={600}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={imageAlt}
                      width={800}
                      height={400}
                      className="w-full h-auto object-contain relative z-10"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-3">{title}</h2>
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
                {description}
              </p>

              {/* Button container that will expand/collapse */}
              <div ref={buttonContainerRef} className="mt-4 overflow-hidden">
                <div
                  ref={exploreButtonRef}
                  className="bg-[#8C1D40] hover:bg-[#781935] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 w-32 text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    window.location.href = linkHref
                  }}
                >
                  Explore
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
