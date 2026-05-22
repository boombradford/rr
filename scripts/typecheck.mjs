import { readFileSync } from "node:fs"
import process from "node:process"
import ts from "typescript"

const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, "tsconfig.app.json")

if (!configPath) {
  console.error("Unable to find tsconfig.app.json")
  process.exit(1)
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile)

if (configFile.error) {
  reportDiagnostics([configFile.error])
  process.exit(1)
}

const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, process.cwd())

if (parsed.errors.length > 0) {
  reportDiagnostics(parsed.errors)
  process.exit(1)
}

let diagnostics = []

if (process.env.FULL_TYPECHECK === "1") {
  const program = ts.createProgram(parsed.fileNames, {
    ...parsed.options,
    incremental: false,
    noEmit: true,
  })

  diagnostics = [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
  ]
} else {
  diagnostics = parsed.fileNames.flatMap((fileName) => {
    const result = ts.transpileModule(readFileSync(fileName, "utf8"), {
      compilerOptions: parsed.options,
      fileName,
      reportDiagnostics: true,
    })

    return result.diagnostics ?? []
  })
}

if (diagnostics.length > 0) {
  reportDiagnostics(diagnostics)
  process.exit(1)
}

console.log(
  process.env.FULL_TYPECHECK === "1"
    ? `typecheck passed (${parsed.fileNames.length} roots)`
    : `source validation passed (${parsed.fileNames.length} roots)`
)

function reportDiagnostics(diagnostics) {
  const host = {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  }

  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, host))
}
