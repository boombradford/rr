import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false,
    minify: false,
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "framer-motion",
      "lucide-react",
      "react",
      "react-dom/client",
      "react/jsx-dev-runtime",
      "tailwind-merge",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
