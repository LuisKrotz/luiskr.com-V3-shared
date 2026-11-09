/**
 * @file css-width-class-drift.test.js
 * @description Drift guard for the breakpoint stylesheet split: the
 * build-side registry (shared/build/css-classes.mjs) and the runtime
 * tokens (core/tokens/layout/css-classes.ts) are TWO mirrors of one class
 * contract — the build splits media blocks by it, the browser loader and
 * the ?tiers adoption path evaluate it. If either side's names, order, or
 * gate queries move, viewport picks stop agreeing with the emitted files,
 * so this test fails before the mismatch ships.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { WIDTH_CLASSES, WIDTH_CLASS_NAMES } from '@build/css-classes.mjs'
import {
  WIDTH_CLASS_GATES,
  WIDTH_CLASS_NAMES as RUNTIME_NAMES,
  WIDTH_CLASS_RANK,
} from '@core/tokens/layout/css-classes.js'
import { DB_PATHS } from '@core/tokens/routes/paths.js'
import { splitComponentSheet } from '@build/css-split.mjs'
import * as sass from 'sass'

describe('css width-class registries stay in sync', () => {
  test('runtime class names match the build table in order', () => {
    expect([...RUNTIME_NAMES]).toEqual(WIDTH_CLASS_NAMES)
  })

  test('runtime ranks match the build table order', () => {
    for (let i = 0; i < WIDTH_CLASSES.length; i++) {
      expect(WIDTH_CLASS_RANK[WIDTH_CLASSES[i].name]).toBe(i)
    }
  })

  test('runtime gate queries match the build gate breakpoints', () => {
    for (const cls of WIDTH_CLASSES) {
      expect(WIDTH_CLASS_GATES[cls.name]).toBe(`(min-width: ${cls.gate}px)`)
    }
  })
})

// ── ?inline sheets must not carry splittable media ──────────────────────────
// A `.scss?inline` import embeds the compiled css inside the JS chunk — it is
// served to every viewport. Only sheets whose compiled output produces no
// tiers may stay on ?inline; anything the splitter could tier must import
// `?tiers` so its breakpoints ship lazily. Each import is compiled with the
// same sass entry vite uses, then run through the real splitter — text-level
// heuristics would flag unemitted mixin/placeholder definitions.
describe('?inline scss sheets carry no splittable media', () => {
  const dirHere = path.dirname(fileURLToPath(import.meta.url))
  const rootDir = path.join(dirHere, '..', '..', '..')

  // Mirrors style-governance's AREA_DIRS — application source roots.
  const AREA_DIRS = ['shared/src', DB_PATHS.CORE_SEGMENT, 'website', 'cms', 'experiments']

  const SKIP_DIRS = new Set([
    '.git',
    'dist',
    'node_modules',
    'vendor',
    'tests',
    'reports',
    'public',
  ])

  /** Recursively lists source files under dir, skipping generated trees. */
  const walk = (dir, out = []) => {
    if (!fs.existsSync(dir)) return out

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full, out)
      } else if (/\.(ts|tsx|js)$/.test(entry.name)) {
        out.push(full)
      }
    }

    return out
  }

  /** Resolves a scss file path, tolerating partial-underscore naming. */
  const resolveScss = (spec) => {
    const dir = path.dirname(spec)
    const base = path.basename(spec)
    const candidates = [
      spec,
      `${spec}.scss`,
      path.join(dir, `_${base}.scss`),
      path.join(dir, `_${base}.sass`),
      path.join(spec, '_index.scss'),
      path.join(spec, 'index.scss'),
    ]

    return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile())
  }

  /** Maps a ?inline import specifier to a repo-relative scss path. */
  const specToPath = (importer, spec) => {
    const noQuery = spec.replace(/\?.*$/, '')

    if (noQuery.startsWith('@core/')) {
      return path.join(rootDir, DB_PATHS.CORE_SEGMENT, noQuery.slice('@core/'.length))
    }

    if (noQuery.startsWith('.')) return path.resolve(path.dirname(importer), noQuery)

    // Bare alias (e.g. shared sass dirs) — resolve under the repo root.
    return path.join(rootDir, noQuery)
  }

  // Explicitly-exempt ?inline sheets whose delivery path bypasses component
  // adoption: safari-media is a browser-gated one-time patch string whose
  // ~150B of splittable media doesn't earn a lazy-tier roundtrip. Anything
  // else flagged here must convert to ?tiers.
  const EXEMPT = new Set(['core/sass/components/safari/safari-media.scss'])

  test('no ?inline import compiles to a splittable sheet', () => {
    const violations = []

    for (const dir of AREA_DIRS) {
      for (const file of walk(path.join(rootDir, dir))) {
        const text = fs.readFileSync(file, 'utf8')

        for (const m of text.matchAll(/from\s+['"]([^'"]+\.scss)\?inline['"]/g)) {
          const scssPath = specToPath(file, m[1])
          const rel = path.relative(rootDir, scssPath).replace(/\\/g, '/')

          if (EXEMPT.has(rel)) continue

          const abs = resolveScss(scssPath)

          if (!abs) {
            violations.push(`unresolved ?inline: ${path.relative(rootDir, file)} -> ${m[1]}`)
            continue
          }

          const { tiers } = splitComponentSheet(sass.compile(abs).css)

          if (Object.keys(tiers).length) {
            violations.push(
              `${path.relative(rootDir, file)} -> ${m[1]} (tiers: ${Object.keys(tiers)})`
            )
          }
        }
      }
    }

    expect(violations).toEqual([])
  })
})
