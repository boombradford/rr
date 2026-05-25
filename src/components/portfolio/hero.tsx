import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { type CSSProperties, type PointerEvent, useEffect, useState } from "react"
import { ArrowRightIcon } from "lucide-react"

import { Reveal } from "./reveal"

// Each role borrows from the Four-Lane palette so the hero, the studio index,
// and the project cards share one visual vocabulary. Coral is intentionally
// excluded — DESIGN.md reserves it as the Signature color of the brand seal.
const heroRoles = [
  { label: "AI ENGINEER", tone: "var(--color-signal-300)" },
  { label: "FILM EDITOR", tone: "var(--color-brass-300)" },
  { label: "PRODUCT DESIGNER", tone: "var(--color-clay-300)" },
  { label: "RESEARCHER", tone: "var(--color-sage-300)" },
] as const
const roleCycleDelay = 4200
const roleTransition = { duration: 1.05, ease: [0.22, 1, 0.36, 1] } as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="site-container hero-stage">
        <Reveal className="hero-visual-wrap">
          <HeroStudioPlate reduceMotion={reduceMotion} />
        </Reveal>
        <Reveal className="hero-context-wrap" delay={0.12}>
          <h1 id="hero-title" className="hero-statement">
            Zach Skov Grzeskowiak builds AI products, media tools, and the
            systems behind them.
          </h1>
          <p className="hero-context-line">An independent practice. Research, build, ship.</p>
          <a className="hero-cta" href="#contact">
            Start a conversation
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" strokeWidth={1.6} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

type HeroStudioPlateProps = {
  reduceMotion: boolean | null
}

function HeroStudioPlate({ reduceMotion }: HeroStudioPlateProps) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { damping: 34, mass: 0.42, stiffness: 160 })
  const smoothY = useSpring(pointerY, { damping: 34, mass: 0.42, stiffness: 160 })
  const plateRotateX = useTransform(smoothY, [-1, 1], [0.85, -0.85])
  const plateRotateY = useTransform(smoothX, [-1, 1], [-1.05, 1.05])
  const titleX = useTransform(smoothX, [-1, 1], [-4, 4])
  const titleY = useTransform(smoothY, [-1, 1], [-3, 3])

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  function handlePointerLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      aria-hidden="true"
      className="hero-visual"
      initial={reduceMotion ? false : { opacity: 0.92, y: 8 }}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX: plateRotateX,
              rotateY: plateRotateY,
              transformPerspective: 1200,
            }
      }
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.005, y: -2 }}
    >
      <HeroVideoLayer reduceMotion={reduceMotion} />
      <span className="hero-depth-field hero-depth-field--one" />
      <motion.div className="hero-title-plane" style={reduceMotion ? undefined : { x: titleX, y: titleY }}>
        <HeroRoleCycle reduceMotion={reduceMotion} />
      </motion.div>
    </motion.div>
  )
}

function HeroVideoLayer({ reduceMotion }: HeroStudioPlateProps) {
  return (
    <div className="hero-video-frame" aria-hidden="true">
      {reduceMotion ? (
        <img
          alt=""
          className="hero-video-poster"
          decoding="async"
          height={638}
          src="/hero-grok-poster.jpg"
          width={1120}
        />
      ) : (
        <video
          autoPlay
          className="hero-video"
          loop
          muted
          playsInline
          poster="/hero-grok-poster.jpg"
          preload="metadata"
        >
          <source src="/hero-grok.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}

function HeroRoleCycle({ reduceMotion }: HeroStudioPlateProps) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setRoleIndex(0)
      return
    }

    const interval = window.setInterval(() => {
      setRoleIndex((currentIndex) => (currentIndex + 1) % heroRoles.length)
    }, roleCycleDelay)

    return () => window.clearInterval(interval)
  }, [reduceMotion])

  const activeRole = reduceMotion ? heroRoles[0] : heroRoles[roleIndex]

  return (
    <div className="hero-title-cycle" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          animate="visible"
          className="hero-word"
          exit="exit"
          initial="hidden"
          key={activeRole.label}
          style={{ "--role-tone": activeRole.tone } as CSSProperties}
          transition={roleTransition}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: -18, filter: "blur(7px)" },
          }}
        >
          {activeRole.label.split("").map((letter, index) => (
            <motion.span
              aria-hidden="true"
              className="hero-letter"
              key={`${activeRole.label}-${letter}-${index}`}
              transition={{
                delay: reduceMotion ? 0 : index * 0.018,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -12 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
