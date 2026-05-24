import { Button } from "../ui/button"

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-container nav-shell" aria-label="Primary navigation">
        <a className="brand-link" href="#top" aria-label="Portfolio home">
          <span className="brand-seal" aria-hidden="true">
            <span className="brand-shape" />
          </span>
          <span className="brand-copy" translate="no">
            <span>
              zach <span className="brand-divider" aria-hidden="true">|</span> skov
            </span>
            <span>grzeskowiak</span>
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
