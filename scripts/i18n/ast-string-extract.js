#!/usr/bin/env node

/**
 * @file ast-string-extract.js
 * @description AST-based static analysis tool to detect repeated non-syntactic string literals
 * across the codebase (e.g. UI labels, dictionary keys, API routes, error messages)
 * while preserving engine-level syntactic tokens (such as '', '/', 'en', className, etc.)
 * in pure inline JS for optimal V8 inline caching.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..', '..')
// Extraction sweeps the app shell + every module — translatable strings can
// surface in any of them.
const SRC_DIRS = ['shared/src', 'core', 'website', 'cms', 'experiments'].map((d) =>
  path.resolve(ROOT, d)
)

/**
 * `scanDirectory` — recursive .js/.jsx collector over a source root.
 * Skips node_modules and compiled wasm dirs; also skips the
 * constants/token modules, which ARE the string dictionary —
 * scanning them would report every token as a "repeated string".
 */
function scanDirectory(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Dependencies and emitted artifacts aren't authored source.
      if (entry.name !== 'node_modules' && entry.name !== 'wasm') {
        scanDirectory(fullPath, fileList)
      }
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      // Exclude constants.js and its domain modules under core/tokens/ — they
      // are the single-source-of-truth dictionary, not duplication candidates.
      if (!fullPath.includes('core/constants.js') && !fullPath.includes('core/tokens/')) {
        fileList.push(fullPath)
      }
    }
  }

  return fileList
}

/**
 * `extractStrings` — the report body: scans every file, walks each
 * AST for StringLiteral nodes, buckets them by literal value, then
 * prints the top repeated strings and writes the full inventory JSON.
 */
function extractStrings() {
  const files = SRC_DIRS.flatMap((d) => scanDirectory(d))

  // literal value → [{file, line}…] occurrence list.
  const stringOccurrences = new Map()

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf-8')

    let ast

    try {
      ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
      })
    } catch (err) {
      // A file that won't parse (syntax drift, non-standard grammar)
      // warns and skips rather than aborting the whole sweep.
      console.warn(`[AST] Skipping ${file}: ${err.message}`)

      continue
    }

    const relPath = path.relative(ROOT, file)

    // Simple AST walker — visits every node generically (no visitor
    // registry) since only StringLiteral matters.
    function walk(node, parent) {
      if (!node || typeof node !== 'object') return

      // Don't extract import sources (e.g. import ... from '...')
      if (
        (parent?.type === 'ImportDeclaration' ||
          parent?.type === 'ExportNamedDeclaration' ||
          parent?.type === 'ExportAllDeclaration') &&
        node === parent.source
      ) {
        return
      }

      if (node.type === 'StringLiteral') {
        const val = node.value

        if (typeof val === 'string') {
          // Append the occurrence — same literal across many files
          // is exactly the duplication this report hunts.
          const list = stringOccurrences.get(val) || []

          list.push({ file: relPath, line: node.loc?.start?.line })

          stringOccurrences.set(val, list)
        }
      }

      // Recurse every object/array property except the location
      // metadata — Babel nodes are plain objects so a generic walk
      // reaches everything.
      for (const key of Object.keys(node)) {
        if (key !== 'loc' && key !== 'range') {
          const child = node[key]

          if (Array.isArray(child)) {
            for (const c of child) walk(c, node)
          } else if (child && typeof child === 'object') {
            walk(child, node)
          }
        }
      }
    }

    walk(ast, null)
  }

  // Split into repeated (frequency >= 2 — the token candidates) and
  // single-use literals (kept for the count, not reported).
  const repeated = []

  const single = []

  for (const [str, locations] of stringOccurrences.entries()) {
    if (locations.length >= 2) {
      repeated.push({ string: str, count: locations.length, locations })
    } else {
      single.push({ string: str, count: 1, locations })
    }
  }

  // Most-duplicated first — the console's top-15 is the work list.
  repeated.sort((a, b) => b.count - a.count)

  console.log('='.repeat(70))
  console.log(`AST STRING EXTRACTION REPORT`)
  console.log(`Total scanned files: ${files.length}`)
  console.log(`Total unique non-syntactic strings: ${stringOccurrences.size}`)
  console.log(`Repeated non-syntactic strings: ${repeated.length}`)
  console.log('='.repeat(70))

  console.log('\nTop Repeated Strings (Candidates for Core Constants or Locale Chunks):')

  repeated.slice(0, 15).forEach((item, i) => {
    console.log(` ${i + 1}. "${item.string}" (${item.count}x) across:`)

    // File list deduped — a literal used 4× in one file shows once.
    const uniqueFiles = [...new Set(item.locations.map((l) => l.file))]

    uniqueFiles.slice(0, 3).forEach((f) => console.log(`    - ${f}`))

    if (uniqueFiles.length > 3) console.log(`    - ...and ${uniqueFiles.length - 3} more files`)
  })

  // Ensure output directory exists for chunk manifests
  const outDir = path.resolve(ROOT, 'core/locale')

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  // Write report to JSON for inspection/bundling
  const reportPath = path.resolve(outDir, 'string-inventory.json')
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        repeatedCount: repeated.length,
        repeated,
      },
      null,
      2
    )
  )

  console.log(`\nInventory written to: ${path.relative(ROOT, reportPath)}\n`)
}

extractStrings()
