import { type CSSProperties, type PointerEvent, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRightIcon } from "lucide-react"

import { type Project } from "../../data/projects"
import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { BorderBeam } from "./border-beam"
import { Reveal } from "./reveal"

type ProjectCardProps = {
  index: number
  project: Project
}

// Hoisted: identical across every card, recreating it per render churns memory
// and keeps the inline-style branch from being CSS-cacheable.
const pointerStyle = {
  "--pointer-x": "50%",
  "--pointer-y": "50%",
} as CSSProperties

export function ProjectCard({ index, project }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, "0")
  const isWide = project.feature === "wide"
  const reduceMotion = useReducedMotion()
  const [imageBroken, setImageBroken] = useState(false)

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    event.currentTarget.style.setProperty("--pointer-x", `${x.toFixed(2)}%`)
    event.currentTarget.style.setProperty("--pointer-y", `${y.toFixed(2)}%`)
  }

  return (
    <Reveal
      className={cn(
        "project-card-shell",
        `project-card-shell--tone-${project.tone}`,
        isWide && "project-card-shell--wide",
      )}
      delay={0.04 + index * 0.035}
      id={`project-${project.id}`}
    >
      <Card className={cn("project-card", isWide && "project-card--wide")} asChild>
        <motion.a
          aria-label={`${project.title}: ${project.cta} (opens in new tab)`}
          href={project.href}
          onPointerMove={handlePointerMove}
          rel="noreferrer"
          style={pointerStyle}
          target="_blank"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduceMotion ? undefined : { y: isWide ? -6 : -4, scale: 1.006 }}
        >
          <BorderBeam delay={index * 0.4} duration={9 + index} />
          <CardHeader>
            <div className="project-kicker">
              <Badge className="project-index" variant="label">
                {projectNumber}
              </Badge>
              <Badge className="project-lane" variant="label">
                {project.lane}
              </Badge>
            </div>
            <div className={`project-media ${project.image.className}`}>
              {imageBroken ? null : (
                <img
                  alt={project.image.alt}
                  className="project-thumb"
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : undefined}
                  height={project.image.height}
                  loading={index < 2 ? "eager" : "lazy"}
                  onError={() => setImageBroken(true)}
                  src={project.image.src}
                  width={project.image.width}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="project-meta">
              <Badge className="project-status" data-status={project.status} variant="label">
                <span className="project-status__dot" aria-hidden="true" />
                {project.status}
              </Badge>
              <span className="project-meta-sep" aria-hidden="true" />
              <Badge className="project-year" variant="label">
                {project.year}
              </Badge>
            </div>
            <p className="project-context">
              {project.category} · {project.scope}
            </p>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription className="project-description">
              {project.description}
            </CardDescription>
            <ul className="project-tags" aria-label={`${project.title} tags`}>
              {project.tags.map((tag) => (
                <li className="project-tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <span>{project.cta}</span>
            <span className="button-orbit" aria-hidden="true">
              <ArrowUpRightIcon data-icon="inline-end" strokeWidth={1.45} />
            </span>
          </CardFooter>
        </motion.a>
      </Card>
    </Reveal>
  )
}
