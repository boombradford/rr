import { Button } from "../ui/button"

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-container nav-shell" aria-label="Primary navigation">
        <a className="brand-link" href="#top" aria-label="Portfolio home">
          <span className="brand-seal" aria-hidden="true">
            <span className="brand-orb" />
            <span className="brand-orbit">
              <span className="brand-orbit-dot" />
            </span>
          </span>
          <span className="brand-copy" translate="no">
            <span>Zach Skov</span>
            <span>Grzeskowiak — Studio</span>
          </span>
        </a>

        <div className="nav-actions">
          <Button asChild size="sm" variant="ghost">
            <a href="#work">Work</a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <a href="/notes/">Notes</a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
