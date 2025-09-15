"use client"

import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

// Create a custom event for background changes only
export const backgroundChangeEvent = "background-change"
export const THEME_STORAGE_KEY = "asu-gsv-theme-preference"

export default function ThemeToggle() {
  // Initialize from localStorage if available
  const [isLightMode, setIsLightMode] = useState(() => {
    // Default to true initially to avoid hydration mismatch
    return true
  })

  // Load the theme preference from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedPreference !== null) {
        setIsLightMode(savedPreference === "light")
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, "light")
      }
    }
  }, [])

  // Update localStorage and dispatch event when theme changes
  const toggleBackground = () => {
    const newMode = !isLightMode
    setIsLightMode(newMode)

    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, newMode ? "light" : "dark")
      const event = new CustomEvent(backgroundChangeEvent, { detail: { isLightMode: newMode } })
      window.dispatchEvent(event)
    }
  }

  // Sync theme with other components when isLightMode changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent(backgroundChangeEvent, { detail: { isLightMode } })
      window.dispatchEvent(event)
      console.log("Theme synced:", isLightMode ? "light" : "dark") // Debug log
    }
  }, [isLightMode])

  return (
    <div className="relative h-12 w-6 flex flex-col items-center">
      <div
        className={`w-6 h-12 flex flex-col items-center justify-between rounded-full p-1 cursor-pointer ${
          isLightMode ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
        } border`}
        onClick={toggleBackground}
        role="switch"
        aria-checked={isLightMode}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleBackground()
          }
        }}
      >
        <Sun className="h-3 w-3 text-amber-400" />
        <Moon className="h-3 w-3 text-blue-600" />
      </div>
      <div
        className={`absolute w-4 h-4 rounded-full transition-all duration-300 pointer-events-none ${
          isLightMode ? "bg-amber-400 top-7" : "bg-blue-600 top-1"
        }`}
      />
    </div>
  )
}
