import { type CSSProperties } from "react"

import { cn } from "../../lib/utils"

type BorderBeamProps = {
  className?: string
  delay?: number
  duration?: number
}

export function BorderBeam({ className, delay = 0, duration = 8 }: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("border-beam", className)}
      style={
        {
          "--beam-delay": `${delay}s`,
          "--beam-duration": `${duration}s`,
        } as CSSProperties
      }
    />
  )
}
