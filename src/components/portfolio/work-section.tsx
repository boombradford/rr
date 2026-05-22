import { projects } from "../../data/projects"
import { ProjectCard } from "./project-card"
import { Reveal } from "./reveal"
import { SectionHeader } from "./section-header"

export function WorkSection() {
  return (
    <section id="work" className="section-block work-section" aria-labelledby="work-title">
      <div className="site-container">
        <Reveal>
          <SectionHeader
            className="work-heading"
            eyebrow="Selected systems"
            id="work-title"
            title="Recent work"
          />
        </Reveal>

        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
