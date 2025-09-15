"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import gsap from "gsap"

interface ExpandableCardProps {
  title: string
  type: string
  imageSrc: string
  imageAlt: string
  description: string
  isExpanded: boolean
  id: string
  onHover: (id: string | null) => void
  buttonText?: string
}

export default function ExpandableCard({
  title,
  type,
  imageSrc,
  imageAlt,
  description,
  isExpanded,
  id,
  onHover,
  buttonText,
}: ExpandableCardProps) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Animation timeline reference
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Handle card click - navigate to a placeholder page
  // Replace the existing handleCardClick function with this:
  const handleCardClick = () => {
    // Skip navigation for cards with "Developing" type
    if (type === "Developing") {
      return
    }

    // For Content Creator, open external URL in a new tab
    if (id === "content-creator") {
      window.open("https://ait-v0.vercel.app/", "_blank", "noopener,noreferrer")
    }
    // For Guide, open AI Grader in a new tab
    else if (id === "guide") {
      window.open("https://v0-ai-grader.vercel.app/", "_blank", "noopener,noreferrer")
    }
    // For Pathway Builder (recommendation-engine), open Career Catalyst in a new tab
    else if (id === "recommendation-engine") {
      window.open("https://demo.careercatalyst.asu.edu/", "_blank", "noopener,noreferrer")
    } else {
      // For other cards, navigate to the internal demo page
      router.push(`/demo/${id}`)
    }
  }

  // Handle button click - prevent propagation to avoid triggering card click
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Skip navigation for cards with "Developing" type
    if (type === "Developing") {
      return
    }

    // For Content Creator button, open external URL in a new tab
    if (id === "content-creator") {
      window.open("https://ait-v0.vercel.app/", "_blank", "noopener,noreferrer")
    }
    // For Guide button, open AI Grader in a new tab
    else if (id === "guide") {
      window.open("https://v0-ai-grader.vercel.app/", "_blank", "noopener,noreferrer")
    }
    // For Pathway Builder button, open Career Catalyst in a new tab
    else if (id === "recommendation-engine") {
      window.open("https://demo.careercatalyst.asu.edu/", "_blank", "noopener,noreferrer")
    } else {
      // For other buttons, navigate to the internal action page
      router.push(`/demo/${id}/action`)
    }
  }

  // Handle animation setup and cleanup
  useEffect(() => {
    // Kill any existing timeline to prevent conflicts
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create a new timeline
    timelineRef.current = gsap.timeline({
      paused: true,
    })

    if (!cardRef.current || !imageRef.current || !contentRef.current || !descriptionRef.current) return

    // Set initial states for elements
    gsap.set(descriptionRef.current, {
      display: isExpanded ? "block" : "none",
      height: isExpanded ? "auto" : 0,
      opacity: isExpanded ? 0 : 0,
    })

    // Only set up button animations if buttonText exists
    if (buttonText && buttonRef.current) {
      gsap.set(buttonRef.current, {
        display: isExpanded ? "inline-flex" : "none",
        opacity: isExpanded ? 0 : 0,
        y: isExpanded ? 10 : 10,
      })
    }

    // Build the animation timeline
    const timeline = timelineRef.current
      .to(
        cardRef.current,
        {
          y: isExpanded ? -20 : 0,
          zIndex: isExpanded ? 10 : 1,
          duration: 0.4,
          ease: isExpanded ? "power2.out" : "power2.inOut",
        },
        0,
      )
      .to(
        contentRef.current,
        {
          backgroundColor: isExpanded ? "#FBBF24" : "#FFFFFF",
          duration: 0.4,
          ease: isExpanded ? "power2.out" : "power2.inOut",
        },
        0,
      )
      .to(
        imageRef.current,
        {
          filter: isExpanded ? "grayscale(0%)" : "grayscale(100%)",
          duration: 0.4,
          ease: isExpanded ? "power2.out" : "power2.inOut",
        },
        0,
      )
      .to(
        descriptionRef.current,
        {
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
          duration: isExpanded ? 0.4 : 0.3,
          ease: isExpanded ? "power2.out" : "power2.inOut",
        },
        isExpanded ? 0.1 : 0,
      )

    // Only add button animation if buttonText exists
    if (buttonText && buttonRef.current) {
      timeline.to(
        buttonRef.current,
        {
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : 10,
          duration: isExpanded ? 0.4 : 0.3,
          ease: isExpanded ? "power2.out" : "power2.inOut",
        },
        isExpanded ? 0.2 : 0,
      )
    }

    // Add callback to hide elements after collapse animation completes
    if (!isExpanded) {
      timeline.call(() => {
        // Hide elements after animation completes
        if (descriptionRef.current) {
          gsap.set(descriptionRef.current, { display: "none" })
        }

        // Only hide button if it exists
        if (buttonText && buttonRef.current) {
          gsap.set(buttonRef.current, { display: "none" })
        }
      })
    }

    // Play the timeline
    timeline.play()

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isExpanded, buttonText])

  return (
    <div
      className="relative"
      style={{
        minHeight: "300px",
        paddingTop: isExpanded ? "20px" : "0",
        transition: "padding-top 0.4s ease",
      }}
    >
      <div
        ref={cardRef}
        className={`relative bg-white overflow-hidden shadow-md rounded-md transition-shadow duration-300 hover:shadow-lg ${
          isExpanded ? "z-10" : "z-1"
        } ${type === "Developing" ? "cursor-default" : "cursor-pointer"}`}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        onClick={handleCardClick}
      >
        {/* Image container */}
        <div className="relative w-full aspect-[4/3]">
          <Image
            ref={imageRef}
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{
              filter: isExpanded ? "grayscale(0%)" : "grayscale(100%)",
              transition: "filter 0.4s ease",
            }}
          />
        </div>

        {/* Content area */}
        <div
          ref={contentRef}
          className="p-4 transition-colors duration-300"
          style={{
            backgroundColor: isExpanded ? "#FBBF24" : "#FFFFFF",
          }}
        >
          <Badge variant="outline" className="bg-gray-100 text-zinc-900 font-bold rounded-full text-xs mb-1">
            {type}
          </Badge>
          <h3 className="font-bold text-lg mb-2">{title}</h3>

          {/* Expandable description */}
          <div
            ref={descriptionRef}
            className="text-sm text-gray-800 mb-4 overflow-hidden"
            style={{ display: "none", opacity: 0, height: 0 }}
          >
            {description}
          </div>

          {/* CTA Button - Only render if buttonText exists */}
          {buttonText && (
            <Button
              ref={buttonRef}
              variant="default"
              className="bg-[#8C1D40] hover:bg-[#781935] text-white"
              style={{ display: "none", opacity: 0 }}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
