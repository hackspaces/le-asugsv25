import Image from "next/image"

export default function StickyFooter() {
  return (
    <footer className="w-full px-16 py-1.5 bg-black flex flex-row justify-between items-center border-t border-gray-800 z-10 sticky bottom-0 left-0">
      <div className="h-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dTOQ1Dc4HGvHzWVf9Fi7Dwfhcqnz8E.png"
          alt="ASU Learning Enterprise"
          width={180}
          height={50}
          className="h-full w-auto"
        />
      </div>
      <div className="text-white text-base font-semibold whitespace-nowrap">AI Day 2025</div>
      <div className="text-white text-base font-semibold whitespace-nowrap">Sept 15, 2025  </div>
    </footer>
  )
}
