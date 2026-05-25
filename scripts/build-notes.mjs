import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

const SITE_URL = "https://www.skovie.bio"
const SITE_AUTHOR = "Zach Skov Grzeskowiak"
const NOTES_TITLE = "Notes by Zach Skov Grzeskowiak"
const NOTES_DESCRIPTION =
  "Working notes on AI products, media tools, and what I am building."

marked.setOptions({ gfm: true, breaks: false })

export function buildNotes({ root, distDir, buildVersion }) {
  const notesDir = path.join(root, "content", "notes")
  if (!existsSync(notesDir)) {
    console.log("no content/notes directory; skipping notes build")
    return
  }

  const files = readdirSync(notesDir).filter(
    // Skip macOS AppleDouble sidecars (`._foo.md`) that appear on non-HFS+ drives.
    (f) => f.endsWith(".md") && !f.startsWith("._"),
  )
  const posts = files
    .map((file) => parsePost(path.join(notesDir, file), file.replace(/\.md$/, "")))
    .sort((a, b) => b.dateValue - a.dateValue)

  const distNotesDir = path.join(distDir, "notes")
  mkdirSync(distNotesDir, { recursive: true })

  for (const post of posts) {
    const postDir = path.join(distNotesDir, post.slug)
    mkdirSync(postDir, { recursive: true })
    writeFileSync(
      path.join(postDir, "index.html"),
      renderPostPage(post, buildVersion),
    )
  }

  writeFileSync(
    path.join(distNotesDir, "index.html"),
    renderIndexPage(posts, buildVersion),
  )
  writeFileSync(path.join(distNotesDir, "rss.xml"), renderRss(posts))

  console.log(`built ${posts.length} note${posts.length === 1 ? "" : "s"}`)
}

function parsePost(filePath, slug) {
  const source = readFileSync(filePath, "utf8")
  const parsed = matter(source)
  const data = parsed.data
  if (!data.title) {
    throw new Error(`note ${slug} is missing 'title' in frontmatter`)
  }
  if (!data.date) {
    throw new Error(`note ${slug} is missing 'date' in frontmatter`)
  }
  const date = new Date(data.date)
  return {
    slug,
    title: String(data.title),
    summary: data.summary ? String(data.summary) : "",
    date,
    dateValue: date.getTime(),
    bodyHtml: marked.parse(parsed.content),
  }
}

function formatDateLabel(date) {
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase()
}

function formatRfc822(date) {
  return date.toUTCString()
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function renderHead({ title, description, buildVersion, canonical }) {
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#08090c" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preload" href="/fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/assets/styles.css?v=${buildVersion}" />
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(NOTES_TITLE)}" href="/notes/rss.xml" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <title>${escapeHtml(title)}</title>`
}

function renderHeader() {
  const nav = ["work", "notes", "contact"]
    .map((key) => {
      const href = key === "notes" ? "/notes/" : `/#${key}`
      const label = key[0].toUpperCase() + key.slice(1)
      const ariaCurrent = key === "notes" ? ` aria-current="page"` : ""
      return `            <a class="ui-button ui-button--sm ui-button--ghost" href="${href}"${ariaCurrent}>${label}</a>`
    })
    .join("\n")
  return `      <header class="site-header">
        <nav class="site-container nav-shell" aria-label="Primary navigation">
          <a class="brand-link" href="/" aria-label="Portfolio home">
            <span class="brand-seal" aria-hidden="true">
              <span class="brand-orb"></span>
              <span class="brand-orbit"><span class="brand-orbit-dot"></span></span>
            </span>
            <span class="brand-copy" translate="no">
              <span>Zach Skov</span>
              <span>Grzeskowiak — Studio</span>
            </span>
          </a>
          <div class="nav-actions">
${nav}
          </div>
        </nav>
      </header>`
}

function renderShell({ headHtml, mainHtml }) {
  return `<!doctype html>
<html lang="en">
  <head>
${headHtml}
  </head>
  <body>
    <div class="site-shell">
${renderHeader()}
      <main>
${mainHtml}
      </main>
    </div>
  </body>
</html>
`
}

function renderIndexPage(posts, buildVersion) {
  const headHtml = renderHead({
    title: `Notes: ${SITE_AUTHOR}`,
    description: NOTES_DESCRIPTION,
    buildVersion,
    canonical: `${SITE_URL}/notes/`,
  })

  const listHtml =
    posts.length === 0
      ? `        <p class="note-empty">No notes yet.</p>`
      : `        <ul class="note-list">
${posts
  .map(
    (post) => `          <li class="note-list-item">
            <a href="/notes/${escapeHtml(post.slug)}/">
              <p class="note-list-meta">${escapeHtml(formatDateLabel(post.date))}</p>
              <h2 class="note-list-title">${escapeHtml(post.title)}</h2>${
                post.summary
                  ? `\n              <p class="note-list-summary">${escapeHtml(post.summary)}</p>`
                  : ""
              }
            </a>
          </li>`,
  )
  .join("\n")}
        </ul>`

  const mainHtml = `        <section class="section-block note-index-section">
          <div class="site-container">
            <div class="section-heading note-list-heading">
              <span class="ui-badge ui-badge--label section-kicker">Archive</span>
              <h1 class="section-heading__title">Notes</h1>
              <p class="section-heading__description">Working notes on what I am building. AI products, media tools, and the systems behind them.</p>
            </div>
${listHtml}
          </div>
        </section>`

  return renderShell({ headHtml, mainHtml })
}

function renderPostPage(post, buildVersion) {
  const headHtml = renderHead({
    title: `${post.title}: ${SITE_AUTHOR}`,
    description: post.summary || NOTES_DESCRIPTION,
    buildVersion,
    canonical: `${SITE_URL}/notes/${post.slug}/`,
  })

  const summaryHtml = post.summary
    ? `\n              <p class="note-summary">${escapeHtml(post.summary)}</p>`
    : ""

  const mainHtml = `        <article class="section-block note-article">
          <div class="site-container">
            <a class="note-back" href="/notes/">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              All notes
            </a>
            <header class="note-header">
              <p class="note-eyebrow">${escapeHtml(formatDateLabel(post.date))}</p>
              <h1 class="note-title">${escapeHtml(post.title)}</h1>${summaryHtml}
            </header>
            <div class="note-body">
${post.bodyHtml}
            </div>
          </div>
        </article>`

  return renderShell({ headHtml, mainHtml })
}

function renderRss(posts) {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/notes/${escapeXml(post.slug)}/</link>
      <guid isPermaLink="true">${SITE_URL}/notes/${escapeXml(post.slug)}/</guid>
      <pubDate>${formatRfc822(post.date)}</pubDate>${
        post.summary
          ? `\n      <description>${escapeXml(post.summary)}</description>`
          : ""
      }
    </item>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(NOTES_TITLE)}</title>
    <link>${SITE_URL}/notes/</link>
    <atom:link href="${SITE_URL}/notes/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(NOTES_DESCRIPTION)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`
}
