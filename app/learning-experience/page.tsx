"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ExpandableCard from "@/components/expandable-card"
import ThemeToggle, { backgroundChangeEvent, THEME_STORAGE_KEY } from "@/components/theme-toggle"

function LearningExperienceContent() {
  const searchParams = useSearchParams()
  const initialCard = searchParams.get("card")

  // Initialize from localStorage if available
  const [isLightMode, setIsLightMode] = useState(() => {
    // Initialize from localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY)
      return savedPreference === "light"
    }
    return false
  })

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(initialCard)

  // Card data
  const cards = [
    {
      id: "learner-genome",
      title: "The Learner Genome",
      type: "Developing",
      imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L5hvl9yidUxW1XXnIodUF4Nvy02hkO.png",
      imageAlt: "The Learner Genome",
      description:
        "A robust database mapping all known information about a learner, including skills, interests, goals, and past experience, for use in smart recommendations, social connection, and personalization, built from the ground up for AI usage.",
    },
    {
      id: "content-creator",
      title: "The Content Creator",
      type: "Demo",
      imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7dtkKREkTI0Iv7CIsa76aTBdfOBPZ0.png",
      imageAlt: "The Content Creator",
      description:
        "Rapidly accelerate the process of converting existing ASU learning content into bite-sized, stackable modules, or highly personalized new courses.",
    },
    {
      id: "library",
      title: "The Library",
      type: "Developing",
      imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZKrYfV7jsVMjex5UajJuuLzFHk6EiC.png",
      imageAlt: "The Library",
      description:
        "A comprehensive searchable repository of learning resources, including courses, modules, assessments, and materials, with intelligent tagging, categorization, and discovery mechanisms that align with learner needs and learning objectives.",
    },
    {
      id: "guide",
      title: "The Guide",
      type: "Demo",
      imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qnqdCTmMB2m8W3sk4AUtKFxi4h8f1l.png",
      imageAlt: "The Guide",
      description:
        "A smart learning companion that adapts to each learner's needs, offering personalized support to keep them motivated and engaged.",
    },
    {
      id: "recommendation-engine",
      title: "The Pathway Builder",
      type: "Demo",
      imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q2z7nEAlzb1h3O7ztYAoZdxTvUo9x7.png",
      imageAlt: "The Recommendation Engine",
      description:
        "A sophisticated system that uses learner data to recommend the best paths, resources, and activities—adapting in real time to progress, performance, and evolving goals.",
    },
  ]

  // Listen for background change events
  useEffect(() => {
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

  // Simple hover handler
  const handleCardHover = (cardId: string | null) => {
    setHoveredCardId(cardId)
  }

  return (
    <div className="relative w-full min-h-screen bg-black overflow-y-auto flex flex-col">
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

      {/* Navigation - Back button on yellow vertical bar */}
      <div className="fixed left-0 top-0 h-[calc(56px+64px)] w-10 bg-amber-400 z-50 flex flex-col items-center justify-center">
        <Link href="/" className="p-2 transition-colors duration-200" aria-label="Back to home">
          <ArrowLeft className="h-6 w-6 text-black" />
        </Link>
      </div>

      {/* Main Content - Centered vertically and horizontally */}
      <div className="relative z-10 w-full flex flex-col min-h-screen pb-20">
        {/* Header - with increased bottom padding */}
        <div className="w-full px-16 pt-8 pb-16">
          {/* Title */}
          <div className="px-4 py-2 bg-amber-400 inline-flex justify-start items-center">
            <h1 className="text-black text-3xl font-bold font-['Arial'] leading-10">AI Labs</h1>
          </div>
        </div>

        {/* Cards Grid - Centered in the page with more vertical space */}
        <div className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 -mt-8 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative">
            {cards.map((card) => (
              <ExpandableCard
                key={card.id}
                id={card.id}
                title={card.title}
                type={card.type}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                description={card.description}
                isExpanded={card.id === hoveredCardId}
                onHover={handleCardHover}
                buttonText={card.type === "Demo" ? "Demo now" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LearningExperience() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      }
    >
      <LearningExperienceContent />
    </Suspense>
  )
}
