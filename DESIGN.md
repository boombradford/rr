---
name: Zach Skov Grzeskowiak
description: Portfolio for AI infrastructure, media intelligence, and product systems.
colors:
  ink-950: "oklch(5.1% 0.009 238)"
  ink-900: "oklch(7.4% 0.011 238)"
  ink-850: "oklch(9.4% 0.012 238)"
  ink-800: "oklch(12.2% 0.013 238)"
  paper-100: "oklch(94.6% 0.018 83)"
  paper-200: "oklch(82.5% 0.015 83)"
  sage-300: "oklch(73% 0.054 162)"
  brass-300: "oklch(76% 0.083 83)"
  signal-300: "oklch(76.5% 0.078 206)"
  muted-foreground: "oklch(68% 0.016 83)"
  border: "oklch(19% 0.012 238)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.12rem, 5.35vw, 4.75rem)"
    fontWeight: 760
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 1.75vw, 1.5rem)"
    fontWeight: 680
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "SF Mono, SFMono-Regular, ui-monospace, Menlo, Monaco, monospace"
    fontSize: "0.75rem"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  md: "0.72rem"
  lg: "1rem"
  xl: "1.55rem"
  "2xl": "2rem"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  card: "clamp(1.125rem, 2vw, 1.5rem)"
  section: "clamp(4.75rem, 7.75vw, 8.25rem)"
components:
  button-primary:
    backgroundColor: "{colors.paper-100}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.md}"
    padding: "0 1.125rem"
    height: "2.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    height: "2.75rem"
  badge-label:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label}"
    padding: "0"
  card:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.paper-100}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
---

# Design System: Zach Skov Grzeskowiak

## 1. Overview

**Creative North Star: "The Signal Darkroom"**

The interface behaves like a late-night room where raw signal is developed into composed work. Surfaces are near-black, precise lines divide space, and a single cinematic instrument (the hero media plate) glows at the center. It is a workspace, not a showcase: the visitor reads it the way they would read a quiet archive, calmly and in order. Every effect is earned by light, proportion, motion, or typography, never by texture for its own sake.

The page is organized as four movements: hero, studio index, selected work, contact. Structure is left-aligned and editorial with asymmetric balance; the hero is the single centered movement, visual-first, with copy reduced to a quiet statement line, a cycling role word, and one understated call to action. Motion is slow and singular: one confident load moment, restrained ambient drift, and hover detail that resolves rather than competes.

This system explicitly rejects cyberpunk clutter, neon dashboards, fake terminal theatrics, default SaaS proof strips, generic icon-card grids, glassmorphism used for decoration, purple-blue AI gradients, and portfolio pages that read like a template with project links swapped in. It is dark because the scene demands it (a darkroom), not because tools "look cool dark."

**Key Characteristics:**
- Tinted near-black surfaces; depth from tonal layering plus soft ambient shadow.
- One restrained color strategy: three accents, each owning a single domain.
- Editorial grotesk display type; a monospace voice reserved for technical labels.
- Quiet at rest, alive on interaction: components hold still until hovered, then respond with slow, precise motion.
- Reduced-motion is a first-class path, not an afterthought.

## 2. Colors

A restrained, systemized palette: tinted near-black neutrals carry the surface, and three muted accents each own one domain. All tokens are authored in OKLCH in `src/index.css`; that file is the source of truth.

### Primary
- **Archive Sage** (`oklch(73% 0.054 162)`): The primary accent. System intelligence, archive surfaces, calm interaction lift, AXIOMERA's project tone, the focus ring. Muted and desaturated, never a bright green.

### Secondary
- **Editorial Brass** (`oklch(76% 0.083 83)`): Editorial warmth. Video and music domains, the WaveReact and Video project tones, the closing-CTA emphasis, hairline glints.

### Tertiary
- **Signal Cyan** (`oklch(76.5% 0.078 206)`): The analytical note. Data traces, scan points, Kevin / news intelligence, the Code studio lane. Small technical details only, never a surface.

### Neutral
- **Darkroom Ink** (`oklch(5.1% 0.009 238)`): The base background. A near-black tinted toward cool ink, never pure black.
- **Plate Ink** (`oklch(9.4% 0.012 238)`): Card and panel surface, one tonal step above the base.
- **Warm Archive Paper** (`oklch(94.6% 0.018 83)`): Primary type and high-emphasis foreground. A warm off-white, never pure white.
- **Faint Paper** (`oklch(68% 0.016 83)`): Secondary text, card descriptions, muted labels. Holds WCAG AA on the dark base.
- **Hairline** (`oklch(19% 0.012 238)`): Borders and dividers. Most lines are built by mixing paper into the surface at 5-12%.

### Named Rules
**The Three-Lane Rule.** Sage, brass, and signal cyan each own one domain (system / editorial / analytical). They are never swapped or blended decoratively. A project's `--project-tone` and its studio lane's `--lane-tone` always agree.

**The No-Pure-Black Rule.** `#000` and `#fff` are forbidden. Every neutral is tinted toward ink hue 238 or paper hue 83; every highlight and shadow is a `color-mix` against `--foreground` or `--scrim`, never a raw white or black.

## 3. Typography

**Display / Headline / Title / Body Font:** Bricolage Grotesque (with Helvetica Neue, Helvetica, Arial fallback).
**Label / Mono Font:** the system monospace stack (SF Mono, SFMono-Regular, ui-monospace, Menlo, Monaco).

**Character:** Bricolage Grotesque is a contemporary editorial grotesk: confident and a little raw in its heavy display weights, clean and quiet at text sizes. The monospace voice is the instrument's faceplate, used only for the small technical labels that give the archive its calibrated feel.

### Hierarchy
- **Display** (760 weight, `clamp(2.12rem, 5.35vw, 4.75rem)`, line-height 0.92, tracking -0.02em): The cycling hero role word. The largest, most authored type on the page.
- **Headline** (760 weight, `clamp(2rem, 3.5vw, 2.75rem)`, line-height 1, tracking -0.015em): Section titles and the contact closing line.
- **Title** (650-680 weight, `clamp(1.35rem, 1.75vw, 1.5rem)`, line-height 1.05): Project card titles; wider on the feature cards.
- **Body** (400 weight, `clamp(1rem, 1.2vw, 1.12rem)`, line-height 1.62): Project and section descriptions, the contact lead, the hero statement line (460 weight). Capped at roughly 34rem so lines stay under 75 characters.
- **Label** (600-720 weight, `0.75rem`, tracking +0.06em, uppercase): Section kickers, studio lane labels, project metadata, badges. Always monospace, always tracked open.

### Named Rules
**The Mono-Label Rule.** The monospace voice is reserved for small uppercase labels, kickers, project metadata, and technical detail lines. It never sets body copy and never sets a heading.

**The Tight-Display Rule.** Large display type carries negative tracking (-0.02em on the hero word, -0.015em on headlines); small uppercase labels carry positive tracking (+0.06em). Tracking is always deliberate, never left at a no-op default.

## 4. Elevation

Layered with ambient shadow. Depth is built first from tonal surface layering (the base ink steps up to `--surface-0`, `--surface-1`, then card and plate surfaces) and 1px hairlines; shadow is the second layer, never the first. Every shadow is large-radius, low-opacity, and tinted near-black (mixed from `--scrim`, the base ink), so panels read as lifted out of a dark room rather than dropped onto a bright one. Raised surfaces also carry a faint inset top highlight (a 1px paper-tinted line) to catch light at their upper edge.

### Shadow Vocabulary
- **Ambient card** (`box-shadow: 0 16px 48px color-mix(in oklch, var(--scrim) 20%, transparent)`): The `--shadow-tight` token. Default lift for cards and composed surfaces.
- **Ambient plate** (`box-shadow: 0 24px 80px ... 0 34px 96px`, scrim at 18-24%): The deeper, softer shadow under the hero media plate and project card shells.
- **Inset highlight** (`inset 0 1px 0 color-mix(in oklch, var(--foreground) 4.5-7.5%, transparent)`): A 1px warm top edge on raised surfaces (nav, hero plate, cards).

### Named Rules
**The Soft-Shadow Rule.** Shadows are always large-radius, low-opacity, and near-black-tinted. Hard, dark, or tight drop shadows are forbidden; if a shadow reads as a hard edge it is wrong. When in doubt, add a tonal surface step instead of a shadow.

## 5. Components

Components are quiet at rest and alive on interaction: flat and composed until hovered, then responding with slow, precise motion (border beams, scan lines, subtle lifts) on the `--motion-ease` curves. No bounce, no elastic.

### Buttons
- **Shape:** Gently rounded (`0.72rem`, `--radius-md`); pill-shaped (`999px`) in the nav and footer link contexts.
- **Primary:** Warm paper background, dark ink text, soft ambient shadow. Used for the single most important action (the contact email link). Hover lifts 1px and warms slightly.
- **Outline / Ghost:** Transparent or near-transparent fill, hairline border, faint-paper text. Ghost is the nav's resting state. Hover raises fill and border opacity and shifts text to full paper.
- **All buttons:** minimum 2.75rem (44px) target; `:focus-visible` shows the global sage focus ring.

### Badges
- **The label variant is the working badge.** Transparent, borderless, no padding: the monospace label treatment for index numbers, lane names, status, year, and tags. The styled `default` and `outline` pill variants are retained as primitive API but currently unused.
- **State:** Tags and lane labels shift color on parent-card hover; metadata is separated by a generated `/` glyph.

### Cards / Containers
- **Corner Style:** Large radius (`1rem`-`1.55rem`); the project card shell adds an outer radius for a framed, double-edged look.
- **Background:** Plate Ink, lifted with a faint project-tone tint and the inset top highlight.
- **Shadow Strategy:** Ambient card / ambient plate (see Elevation). Never a hard shadow.
- **Border:** A single 1px hairline, tinted with the project tone. Never a side-stripe.
- **Internal Padding:** The `--space-card` scale (`clamp(1.125rem, 2vw, 1.5rem)`).

### Navigation
- A floating, pill-shaped sticky bar with a backdrop blur. Brand seal with a slowly rotating geometric mark on the left; ghost-button anchors on the right. Anchor links draw a hairline underline on hover and focus. Mobile keeps the pill, tightening gaps.

### Signature Components
- **Hero Studio Plate:** The single cinematic instrument. A framed video object with stable coordinate lines, corner marks, one ambient depth drift, a pointer-driven 3D tilt, and a cycling role word. Poster image fallback for reduced-motion users. Treated as an authored artifact, never a sphere, dashboard, or texture sample.
- **Project Card:** A framed shell wrapping a 16:9 media plate, monospace metadata, an editorial title, description, and tags. Hover traces a hairline beam across the top edge, sweeps a project-tone scan line across the media, and lifts the card. Each card carries an `id` so the studio lanes can deep-link to it.
- **Studio Lane:** One of four bordered cells in the studio index ledger. Each lane is a link into its matching project; hover lifts the cell, draws a top gleam, and extends a project-tone meter. Affordance and destination always agree.

## 6. Do's and Don'ts

### Do:
- **Do** author every neutral, highlight, and shadow as an OKLCH value or a `color-mix` against `--foreground` / `--scrim`.
- **Do** keep the three accents in their lanes: sage for system intelligence and archive, brass for video / music / editorial warmth, signal cyan for data and analytical detail.
- **Do** reserve the monospace voice for small uppercase labels and metadata; set everything else in Bricolage Grotesque.
- **Do** build depth from tonal surface steps first, soft ambient shadow second.
- **Do** keep motion slow and singular: one confident hero load moment, hover detail that resolves.
- **Do** give every interactive element a 44px target, a visible focus ring, and a reduced-motion path.
- **Do** keep body measure under 75 characters and large display type on tight negative tracking.

### Don't:
- **Don't** introduce cyberpunk clutter, neon dashboards, or fake terminal theatrics.
- **Don't** add default SaaS proof strips, hero-metric templates, or generic icon-card grids.
- **Don't** use glassmorphism for decoration; the one nav backdrop blur is the only sanctioned blur.
- **Don't** reach for purple-blue AI gradients, rainbow gradients, or `background-clip: text` gradient text.
- **Don't** let the page read like a template with project links swapped in.
- **Don't** use `#000`, `#fff`, hard drop shadows, or `border-left` / `border-right` greater than 1px as a colored stripe.
- **Don't** use em dashes in copy; use commas, colons, semicolons, periods, or parentheses.
- **Don't** stack competing ambient animations in the hero; one drift layer is the ceiling.
