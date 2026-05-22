import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"

type SectionHeaderProps = {
  className?: string
  description?: string
  eyebrow: string
  id: string
  title: string
}

export function SectionHeader({
  className,
  description,
  eyebrow,
  id,
  title,
}: SectionHeaderProps) {
  return (
    <div className={cn("section-heading", className)}>
      <Badge className="section-kicker" variant="label">
        {eyebrow}
      </Badge>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </div>
  )
}
