import { ArrowUpRightIcon, MailIcon } from "lucide-react"

import { Reveal } from "./reveal"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const emailHref = "mailto:zach@fluxninelabs.com"
const emailLabel = "zach@fluxninelabs.com"

const socialLinks = [
  { href: "https://x.com/madebyskovie", label: "X" },
  { href: "https://www.instagram.com/axio.mera/", label: "Instagram" },
]

export function ContactSection() {
  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-title">
      <div className="site-container">
        <Reveal>
          <Separator className="footer-separator" />
          <div className="contact-panel">
            <p className="footer-kicker">Contact</p>
            <h2 id="footer-title" className="contact-title">
              Available for the next system.
            </h2>
            <p className="contact-lead">
              AI infrastructure, media intelligence, and product tooling for teams
              shipping real work.
            </p>

            <div className="contact-actions">
              <Button
                asChild
                className="footer-link footer-link--primary"
                size="lg"
                variant="default"
              >
                <a href={emailHref}>
                  <MailIcon aria-hidden="true" data-icon="inline-start" strokeWidth={1.45} />
                  <span>{emailLabel}</span>
                  <span className="button-orbit" aria-hidden="true">
                    <ArrowUpRightIcon data-icon="inline-end" strokeWidth={1.45} />
                  </span>
                </a>
              </Button>

              <nav className="footer-links" aria-label="Social links">
                {socialLinks.map(({ href, label }) => (
                  <a className="footer-social-link" href={href} key={href} rel="noreferrer" target="_blank">
                    <span>{label}</span>
                    <span className="sr-only"> (opens in new tab)</span>
                    <ArrowUpRightIcon aria-hidden="true" data-icon="inline-end" strokeWidth={1.45} />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
