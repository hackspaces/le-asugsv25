import Image from "next/image"

interface BackgroundProps {
  isLightMode: boolean
}

export default function Background({ isLightMode }: BackgroundProps) {
  return (
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
  )
}
