"use client"

import Image from "next/image"
import Link from "next/link"
import useAiLabsCardAnimation from "@/hooks/use-ai-labs-card-animation"

interface AiLabsCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  linkHref: string
}

export default function AiLabsCard({ title, description, imageSrc, imageAlt, linkHref }: AiLabsCardProps) {
  const { isHovered, cardRef, contentRef, buttonRef, handleMouseEnter, handleMouseLeave } = useAiLabsCardAnimation()

  return (
    <div className="w-[400px] h-[500px]">
      <div
        ref={cardRef}
        className="bg-white rounded-[8px] shadow-lg overflow-hidden w-full h-full relative transition-shadow duration-300 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={linkHref} className="block h-full">
          <div className="p-[16px] flex flex-col h-full">
            {/* Image container with fixed height */}
            <div className="w-full h-64 relative overflow-hidden rounded-md mb-4 bg-[#e5e5e5]">
              <div className="flex items-center justify-center h-full">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain relative z-10"
                />
              </div>
            </div>

            {/* Content area with fixed height */}
            <div className="relative flex-grow overflow-hidden">
              {/* Content that moves up */}
              <div ref={contentRef} className="will-change-transform">
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
              </div>

              {/* Button that appears from below */}
              <div
                ref={buttonRef}
                className="absolute bottom-0 left-0 mt-4 will-change-transform"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.location.href = linkHref
                }}
              >
                <div className="bg-[#8C1D40] hover:bg-[#781935] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 w-32 text-center cursor-pointer">
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
