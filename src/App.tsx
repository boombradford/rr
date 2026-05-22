import { MotionConfig } from "framer-motion"

import { AmbientField } from "./components/portfolio/ambient-field"
import { ContactSection } from "./components/portfolio/contact-section"
import { Hero } from "./components/portfolio/hero"
import { SiteHeader } from "./components/portfolio/site-header"
import { StudioIndex } from "./components/portfolio/studio-index"
import { WorkSection } from "./components/portfolio/work-section"
import { Button } from "./components/ui/button"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <AmbientField />
        <Button asChild className="skip-link" size="sm">
          <a href="#work">Skip to work</a>
        </Button>
        <SiteHeader />
        <main>
          <Hero />
          <StudioIndex />
          <WorkSection />
          <ContactSection />
        </main>
      </div>
    </MotionConfig>
  )
}
