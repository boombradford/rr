import { type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

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
      initial={{ opacity: 0, y: 28, scale: 0.992 }}
      transition={{ duration: 0.82, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-12% 0px -10%" }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
    >
      {children}
    </motion.div>
  )
}
