import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import process from "node:process"
import ts from "typescript"

const root = process.cwd()
const srcDir = path.join(root, "src")
const distDir = path.join(root, "dist")
const assetsDir = path.join(distDir, "assets")
const modulesDir = path.join(assetsDir, "modules")
const buildVersion = Date.now().toString(36)

rmSync(distDir, { force: true, recursive: true })
mkdirSync(modulesDir, { recursive: true })

writeFileSync(path.join(assetsDir, "styles.css"), readFileSync(path.join(srcDir, "index.css"), "utf8"))

for (const sourceFile of collectSourceFiles(srcDir)) {
  const relativePath = path.relative(srcDir, sourceFile)
  const outputPath = path.join(modulesDir, relativePath).replace(/\.(tsx|ts)$/, ".js")
  const source = readFileSync(sourceFile, "utf8")
  const result = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName: sourceFile,
    reportDiagnostics: true,
  })

  if (result.diagnostics?.length) {
    const message = ts.formatDiagnosticsWithColorAndContext(result.diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })
    throw new Error(message)
  }

  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, rewriteLocalImports(result.outputText))
}

if (existsSync(path.join(root, "public"))) {
  cpSync(path.join(root, "public"), distDir, { recursive: true })
}

const sourceHtml = readFileSync(path.join(root, "index.html"), "utf8")
const importMap = {
  imports: {
    "@radix-ui/react-separator":
      "https://esm.sh/@radix-ui/react-separator@1.1.7?external=react,react-dom",
    "@radix-ui/react-slot":
      "https://esm.sh/@radix-ui/react-slot@1.2.3?external=react,react-dom",
    "class-variance-authority": "https://esm.sh/class-variance-authority@0.7.1",
    clsx: "https://esm.sh/clsx@2.1.1",
    "framer-motion": "https://esm.sh/framer-motion@12.38.0?external=react,react-dom",
    "lucide-react": "https://esm.sh/lucide-react@1.14.0?external=react",
    react: "https://esm.sh/react@19.2.6",
    "react-dom": "https://esm.sh/react-dom@19.2.6?external=react",
    "react-dom/client": "https://esm.sh/react-dom@19.2.6/client?external=react",
    "react/jsx-runtime": "https://esm.sh/react@19.2.6/jsx-runtime",
    "tailwind-merge": "https://esm.sh/tailwind-merge@3.6.0",
  },
}

const html = sourceHtml.replace(
  /<script type="module" src="\/src\/main\.tsx"><\/script>/,
  `<link rel="stylesheet" href="/assets/styles.css?v=${buildVersion}" />\n    <script type="importmap">${JSON.stringify(importMap)}</script>\n    <script type="module" crossorigin src="/assets/modules/main.js?v=${buildVersion}"></script>`
)

writeFileSync(path.join(distDir, "index.html"), html)
console.log(`static build complete (${collectSourceFiles(srcDir).length} modules)`)

function collectSourceFiles(directory) {
  return readdirSync(directory)
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        return collectSourceFiles(fullPath)
      }

      if (/\.(ts|tsx)$/.test(entry) && !/\.d\.ts$/.test(entry)) {
        return [fullPath]
      }

      return []
    })
    .sort()
}

function rewriteLocalImports(code) {
  return code
    .replace(/^\s*import\s+["']\.\/index\.css["'];?\s*$/gm, "")
    .replace(/(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${withBuildVersion(withJsExtension(specifier))}${suffix}`
    })
    .replace(/(import\s+["'])(\.{1,2}\/[^"']+)(["'];?)/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${withBuildVersion(withJsExtension(specifier))}${suffix}`
    })
}

function withJsExtension(specifier) {
  if (path.extname(specifier)) {
    return specifier
  }

  return `${specifier}.js`
}

function withBuildVersion(specifier) {
  return specifier.includes("?") ? `${specifier}&v=${buildVersion}` : `${specifier}?v=${buildVersion}`
}
