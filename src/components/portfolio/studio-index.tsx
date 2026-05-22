import { motion, useReducedMotion } from "framer-motion"

const studioLanes = [
  {
    key: "code",
    label: "Code",
    detail: "Compact AI systems, automations, and interfaces that ship.",
    href: "#project-kevin",
  },
  {
    key: "music",
    label: "Music",
    detail: "Release tracking, artist discovery, and listening tools.",
    href: "#project-wavereact",
  },
  {
    key: "archive",
    label: "Archive",
    detail: "Research archives for anomalous media, claims, and source material.",
    href: "#project-axiomera",
  },
  {
    key: "video",
    label: "Video",
    detail: "Cinematic editing, AI-assisted production, and visual storytelling.",
    href: "#project-video",
  },
]

export function StudioIndex() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="studio-index-section" aria-label="Studio index">
      <div className="site-container">
        <div className="studio-index-grid">
          {studioLanes.map((lane, index) => (
            <motion.div
              className="studio-index-cell"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              key={lane.label}
              transition={{
                duration: 0.72,
                delay: 0.08 + index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-12% 0px -10%" }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <a className={`studio-index-item studio-index-item--${lane.key}`} href={lane.href}>
                <div className="studio-index-item__header">
                  <span className="studio-index-label">{lane.label}</span>
                </div>
                <div className="studio-index-item__content">
                  <p>{lane.detail}</p>
                  <span className="studio-index-meter" aria-hidden="true" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
