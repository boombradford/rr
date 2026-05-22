export type Project = {
  category: string
  cta: string
  description: string
  feature?: "wide" | "standard"
  href: string
  id: string
  image: {
    alt: string
    className: string
    height: number
    src: string
    width: number
  }
  lane: "LISTEN" | "READ" | "WATCH" | "ARCHIVE"
  scope: string
  status: string
  tags: string[]
  tone: "sage" | "brass" | "signal"
  title: string
  year: string
}

export const projects: Project[] = [
  {
    title: "Kevin",
    id: "kevin",
    category: "Smart news",
    feature: "wide",
    lane: "READ",
    description:
      "An RSS reader that summarizes your feeds and turns them into audio overviews.",
    tags: ["RSS", "Summaries", "Audio AI"],
    scope: "Reader interface",
    status: "Live",
    year: "2026",
    tone: "signal",
    cta: "Open Reader",
    href: "https://kevin.cheap",
    image: {
      src: "/thumbnails/kevin.jpg",
      alt: "Kevin smart news reader article summary interface",
      width: 1600,
      height: 864,
      className: "project-media--kevin",
    },
  },
  {
    title: "WaveReact",
    id: "wavereact",
    category: "Music intelligence",
    lane: "LISTEN",
    description:
      "A music platform that tracks upcoming releases, follows artists, and syncs your Spotify saves.",
    tags: ["Spotify", "Discovery", "Release Tracking"],
    scope: "Product system",
    status: "Live",
    year: "2026",
    tone: "brass",
    cta: "Open Platform",
    href: "https://wavereact.online",
    image: {
      src: "/thumbnails/wavereact.jpg",
      alt: "WaveReact release tracking interface",
      width: 1600,
      height: 860,
      className: "project-media--wavereact",
    },
  },
  {
    title: "AXIOMERA",
    id: "axiomera",
    category: "Archive intelligence",
    lane: "ARCHIVE",
    description:
      "A research archive for anomalous phenomena: the claims, the source material, and the evidence behind them.",
    tags: ["Archive", "Research", "Evidence"],
    scope: "Narrative system",
    status: "Live",
    year: "2026",
    tone: "sage",
    cta: "Open Archive",
    href: "https://axiomera.xyz",
    image: {
      src: "/thumbnails/axiomera.jpg",
      alt: "AXIOMERA archive interface with technical image analysis",
      width: 1600,
      height: 872,
      className: "project-media--axiomera",
    },
  },
  {
    title: "Video + Story Systems",
    id: "video",
    category: "Moving image",
    feature: "wide",
    lane: "WATCH",
    description:
      "Cinematic editing, YouTube production, and AI-assisted visual storytelling.",
    tags: ["Video", "AI Production", "Editorial"],
    scope: "Creative workflow",
    status: "Reel",
    year: "2026",
    tone: "brass",
    cta: "Watch Reel",
    href: "https://www.youtube.com/watch?v=E2_YGsDjHyk",
    image: {
      src: "/thumbnails/video-reel.jpg",
      alt: "AI video reel playback interface",
      width: 1600,
      height: 1258,
      className: "project-media--video",
    },
  },
]
