import { type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

// Hoist motion config so we don't allocate fresh objects per Reveal instance per
// render — framer-motion does identity checks on these, and the values never change.
const revealInitial = { opacity: 0, y: 28, scale: 0.992 } as const
const revealWhileInView = { opacity: 1, y: 0, scale: 1 } as const
const revealViewport = { once: true, margin: "-12% 0px -10%" } as const
const revealEase = [0.16, 1, 0.3, 1] as const

export function Reveal({ children, className, delay = 0, id }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      id={id}
      initial={revealInitial}
      transition={{ duration: 0.82, delay, ease: revealEase }}
      viewport={revealViewport}
      whileInView={revealWhileInView}
    >
      {children}
    </motion.div>
  )
}
