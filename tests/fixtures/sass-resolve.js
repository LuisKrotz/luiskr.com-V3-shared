/**
 * @file fixtures/sass-resolve.js
 * @description Manifest-aware SCSS reader for governance tests — inlines
 * `@import 'x'` statements recursively so tests assert the effective
 * stylesheet content regardless of how the Sass is split into partials.
 * `@import` chains are self-similar, so the resolver is recursive per
 * project rule 20 (cycle-guarded by a visited set).
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

/** Matches Sass import statements — `@import 'path';` (single/double quote). */
const IMPORT_RE = /@import\s+['"]([^'"]+)['"]\s*;?/g

/**
 * Resolves an `@import` specifier to an absolute file path, honoring the
 * Sass partial convention (`_name.scss`) and extensionless imports.
 * @param {string} spec The import path (e.g. `media-figure/host`).
 * @param {string} fromDir Directory of the importing file.
 * @returns {string|null} Absolute path, or null when unresolved.
 */
function resolveImport(spec, fromDir) {
  const base = resolve(fromDir, spec)
  const dir = dirname(base)
  const name = base.slice(dir.length + 1)

  for (const cand of [`${dir}/_${name}.scss`, `${base}.scss`, `${dir}/_${name}`, base]) {
    // Partial names come first — a `structure/` directory can shadow the
    // `_structure.scss` partial Sass actually resolves.
    if (existsSync(cand) && statSync(cand).isFile()) return cand
  }

  return null
}

/**
 * Reads an SCSS file and recursively inlines its `@import` partials.
 * @param {string} absPath Absolute path of the entry file.
 * @param {Set<string>} [seen] Visited files — guards import cycles.
 * @returns {string} The file's content with imports replaced inline.
 */
export function readSassDeep(absPath, seen = new Set()) {
  if (!existsSync(absPath) || seen.has(absPath)) return ''

  seen.add(absPath)

  const src = readFileSync(absPath, 'utf-8')

  return src.replace(IMPORT_RE, (full, spec) => {
    // External/CSS imports (`sass:`, `url(…)`, `http…`) have no local file.
    if (/^(sass:|https?:|url\()/.test(spec)) return full

    const target = resolveImport(spec, dirname(absPath))

    // Keep the import line itself — some assertions check the manifest's
    // wiring (e.g. "imports _variables") — then append the inlined content.
    return target ? `${full}\n${readSassDeep(target, seen)}` : full
  })
}
