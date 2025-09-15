"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface AsuForLifeCardProps {
  linkHref: string
  setCardState: React.Dispatch<React.SetStateAction<{ isHovered: boolean }>>
  buttonContainerRef: React.RefObject<HTMLDivElement>
  exploreButtonRef: React.RefObject<HTMLButtonElement>
  cardRef: React.RefObject<HTMLDivElement>
  deviceMockupRef: React.RefObject<HTMLImageElement>
}

export default function AsuForLifeCard({
  linkHref,
  setCardState,
  buttonContainerRef,
  exploreButtonRef,
  cardRef,
  deviceMockupRef,
}: AsuForLifeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setCardState({ isHovered: true })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCardState({ isHovered: false })
  }

  // Function to handle external link opening
  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    window.open(linkHref, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="w-full h-[600px] relative">
      <a href={linkHref} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        <div
          ref={cardRef}
          className="absolute inset-0 bg-white rounded-[8px] shadow-lg overflow-hidden w-full relative transition-shadow duration-300 hover:shadow-xl cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleExternalLinkClick}
        >
          <div className="p-[16px] flex flex-col">
            <div className="flex justify-center mb-4 w-full">
              <div
                className="w-full h-64 relative overflow-hidden rounded-md transition-all duration-300 cursor-pointer"
                style={{
                  background: isHovered ? "linear-gradient(180deg, #FFC627 0%, #8C1D40 100%)" : "#e5e5e5",
                }}
              >
                {/* Device mockup positioned to show only top portion */}
                <div
                  className="absolute w-[90%] left-[5%] bottom-[-30%] will-change-transform"
                  style={{ transform: "translateY(0)" }}
                >
                  <Image
                    ref={deviceMockupRef}
                    src="/images/asu-for-life-navigator.png"
                    alt="ASU for Life Navigator Interface"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3">ASU for Life</h2>
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
                Launched this Fall 2025 - ASU for Life is the learning system of the future - one that is accessible, hyper-personalized, adaptable and built to help everyone thrive in a world transformed by AI.
              </p>

              {/* Button container that will expand/collapse */}
              <div ref={buttonContainerRef} className="mt-4 overflow-hidden">
                <button
                  ref={exploreButtonRef}
                  className="bg-[#8C1D40] hover:bg-[#781935] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 w-32 text-center cursor-pointer"
                  onClick={handleExternalLinkClick}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
