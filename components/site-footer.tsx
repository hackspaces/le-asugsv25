import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="w-full px-16 py-1.5 bg-black flex flex-row justify-between items-center border-t border-gray-800 z-10 mt-auto">
      <div className="h-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dTOQ1Dc4HGvHzWVf9Fi7Dwfhcqnz8E.png"
          alt="ASU Learning Enterprise"
          width={180}
          height={50}
          className="h-full w-auto"
        />
      </div>
      <div className="h-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yhcG62nwj1UpCA0OMtE9OhNr0fBrcW.png"
          alt="ASU + GSV Summit"
          width={120}
          height={33}
          className="h-full w-auto"
        />
      </div>
      <div className="text-white text-base font-semibold whitespace-nowrap">Apr 5-7, 2025</div>
    </footer>
  )
}
