/**
 * @file print-sheet-determinism.test.js
 * @description Determinism contract for the print sheet: the content
 *   area, the bleed insets and the cover/plate bands must resolve to the
 *   same lengths for every user and every headless capture. The one
 *   failure mode that breaks the contract is a screen-dependent rung —
 *   vh/vw resolve against the SCREEN viewport in paged media, and the
 *   real print path evaluates media features against a reduced page
 *   area, so either lands a different box per machine. The contract
 *   therefore lives in three invariants: no viewport units inside
 *   @media print/@page blocks anywhere in the tree, bleed bands
 *   (covers/plates) sized by the fragmentainer (100% / cqh / cqw on the
 *   margin-zero named page — identical on every engine), and a
 *   size-detection ladder of physical mm rungs floor-snapping the page
 *   box to the standard format dims (ISO A0–A6/B-series, US Letter/
 *   Legal/Executive/Tabloid-Ledger) on BOTH axes so any orientation
 *   resolves too.
 */
import fs from 'fs'
import path from 'path'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'
import { readSassDeep } from '@tests/fixtures/sass-resolve.js'

const printSheet = readSassDeep(path.join(ROOT_DIR, 'core/sass/base/structure/_print.scss'))
const tokens = readSassDeep(path.join(ROOT_DIR, 'core/sass/base/structure/_tokens.scss'))

// Comment stripper — assertions match against code, never prose.
const strip = (s) => s.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')

const printSrc = strip(printSheet)
const tokenSrc = strip(tokens)

/** Viewport-unit value — the screen-dependent rung paged media forbids. */
const VIEWPORT_UNIT_RE = /\d*\.?\d+(?:[dl]?sv[hw]|vmax|vmin|[dl]?v[hw])\b/

/** Application source roots the print-context scan walks. */
const AREA_DIRS = ['shared/src', 'core', 'website', 'cms', 'experiments']

/** Collects every .scss path under the application roots. */
const scssFiles = (() => {
  const out = []

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return

    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name)

      if (ent.isDirectory()) walk(p)
      else if (ent.name.endsWith('.scss')) out.push(p)
    }
  }

  for (const d of AREA_DIRS) walk(path.join(ROOT_DIR, d))

  return out
})()

/**
 * Extracts the body text of every `@media print` and `@page` block in a
 * source string — brace-matched so nested @media/@supports survive.
 * @param {string} src Stripped SCSS source.
 * @returns {string[]} Print-context block bodies.
 */
const printBlocks = (src) => {
  const blocks = []
  const re = /@media\s+print\b|@page\b/g

  let m

  while ((m = re.exec(src))) {
    let depth = 0

    let j = src.indexOf('{', m.index)

    if (j === -1) break

    const start = j + 1

    for (; j < src.length; j++) {
      if (src[j] === '{') depth++
      else if (src[j] === '}' && --depth === 0) break
    }

    blocks.push(src.slice(start, j))
  }

  return blocks
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. No viewport units inside print contexts — the whole determinism contract.
// ─────────────────────────────────────────────────────────────────────────────
describe('print contexts carry no viewport units', () => {
  const offenders = []

  for (const file of scssFiles) {
    const src = strip(fs.readFileSync(file, 'utf-8'))

    for (const block of printBlocks(src)) {
      const hit = block.match(VIEWPORT_UNIT_RE)

      if (hit) offenders.push(`${path.relative(ROOT_DIR, file)} → ${hit[0]}`)
    }
  }

  test('no @media print / @page block sizes anything by the screen', () => {
    expect(offenders).toEqual([])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. Sheet geometry is physical — mm rungs + token-derived content area only.
// ─────────────────────────────────────────────────────────────────────────────
describe('sheet tokens resolve to physical units', () => {
  const decl = (name) => {
    const m = tokenSrc.match(new RegExp(`${name}:\\s*([^;]+);`))

    return m ? m[1].trim() : null
  }

  test('sheet box rungs are mm literals or token compositions', () => {
    for (const name of ['--print-sheet-w', '--print-sheet-h']) {
      const value = decl(name)

      expect(value).not.toBeNull()
      expect(value).toMatch(/^[\d.]+mm$/)
    }
  })

  test('content area derives from sheet + margin tokens only', () => {
    for (const name of ['--print-content-w', '--print-content-h']) {
      const value = decl(name)

      expect(value).not.toBeNull()
      // Only calc() over var(--print-*) rungs — no px, %, or viewport rungs.
      expect(value).toMatch(/^calc\(/)
      expect(value).not.toMatch(VIEWPORT_UNIT_RE)
      expect(value).not.toMatch(/\dpx|%/)
      expect(value.replace(/var\(--print-[a-z-]+\)/g, '')).not.toMatch(/var\(/)
    }
  })

  test('margin rungs are mm literals — the physical frame every size shares', () => {
    for (const name of ['--print-margin-top', '--print-margin-h', '--print-margin-bottom']) {
      const value = decl(name)

      expect(value).not.toBeNull()
      expect(value).toMatch(/^[\d.]+mm$/)
    }
  })

  test('page margin shorthand composes the margin tokens', () => {
    const value = decl('--print-page-margin')

    expect(value).not.toBeNull()
    expect(value).toMatch(/var\(--print-margin-top\)/)
    expect(value).toMatch(/var\(--print-margin-h\)/)
    expect(value).toMatch(/var\(--print-margin-bottom\)/)
  })

  test('media cap is a sheet-token calc, not a viewport rung', () => {
    const value = decl('--print-media-max-h')

    expect(value).not.toBeNull()
    expect(value).not.toMatch(VIEWPORT_UNIT_RE)
    expect(value).not.toMatch(/%|vh|vw/)
    expect(value).toMatch(/var\(--print-content-h\)/)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. Paper choice is the user's — the page box follows the dialog.
// ─────────────────────────────────────────────────────────────────────────────
describe('page box follows the chosen paper', () => {
  test('@page never imposes a fixed sheet — size stays auto', () => {
    const pageHead = printSrc.match(/@page\s*\{([^}]*)\}/)

    expect(pageHead).not.toBeNull()

    const size = pageHead[1].match(/size:\s*([^;]+)/)

    expect(size).not.toBeNull()
    expect(size[1].trim()).toBe('auto')
  })

  test('the margin-zero named page exists for covers and plates', () => {
    expect(printSrc).toMatch(/@page\s+print-cover\s*\{[^}]*margin:\s*0/)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. The size ladder floor-snaps every standard sheet dim on both axes.
// ─────────────────────────────────────────────────────────────────────────────
describe('sheet-size ladder covers the standard formats', () => {
  // Every sheet dim that appears as some format's width or height — ISO
  // A0–A6, B3–B5, US Letter/Legal/Junior-Legal/Half-Letter/Executive and
  // Tabloid-Ledger. One union serves both axes and both orientations.
  const STANDARD_DIMS = [
    105, 127, 139.7, 148, 176, 184.2, 203.2, 210, 215.9, 250, 266.7, 279.4, 297, 353, 355.6, 420,
    431.8, 500, 594, 841, 1189,
  ]

  // Gates sit 0.5mm under their nominal — engine mm→px rounding can land
  // a true-format sheet a hair under a gate parked at the exact dim.
  const GATE_TOLERANCE = 0.5

  const gates = (axis, token) =>
    [
      ...printSrc.matchAll(
        new RegExp(
          `@media\\s+print\\s+and\\s+\\(min-${axis}:\\s*([\\d.]+)mm\\)\\s*\\{[^}]*${token}:\\s*([\\d.]+)mm`,
          'g'
        )
      ),
    ].map((m) => ({ gate: Number(m[1]), value: Number(m[2]) }))

  const widthGates = gates('width', '--print-sheet-w')
  const heightGates = gates('height', '--print-sheet-h')

  test('both axes snap to every standard sheet dim', () => {
    for (const dim of STANDARD_DIMS) {
      // The floor rung (105) is the :root default, not a gate.
      if (dim === 105) continue

      expect(
        widthGates.some(
          (g) => g.value === dim && dim - g.gate > 0 && dim - g.gate <= GATE_TOLERANCE
        )
      ).toBe(true)
      expect(
        heightGates.some(
          (g) => g.value === dim && dim - g.gate > 0 && dim - g.gate <= GATE_TOLERANCE
        )
      ).toBe(true)
    }
  })

  test('each rung carries an exact physical value — ascending floor-snap', () => {
    for (const g of [...widthGates, ...heightGates]) {
      // A gate above its own rung value would never match that paper.
      expect(g.gate).toBeLessThan(g.value)
      // And a gate more than the rounding tolerance under its nominal
      // would mis-snap an undersized sheet one rung too high.
      expect(g.value - g.gate).toBeLessThanOrEqual(GATE_TOLERANCE)
    }

    // Ascending order in source — the last matching rung must be the
    // largest standard dim the paper clears (floor-snap semantics).
    const seq = (gs) => gs.map((g) => g.gate)

    expect(seq(widthGates)).toEqual([...seq(widthGates)].sort((a, b) => a - b))
    expect(seq(heightGates)).toEqual([...seq(heightGates)].sort((a, b) => a - b))
  })

  test('the :root floor rung is the smallest standard dim (A6 edge)', () => {
    const floor = printSrc.match(
      /:root\s*\{[^}]*--print-sheet-w:\s*([\d.]+)mm[^}]*--print-sheet-h:\s*([\d.]+)mm/
    )

    expect(floor).not.toBeNull()
    expect(Number(floor[1])).toBe(105)
    expect(Number(floor[2])).toBe(105)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 5. Cover/plate bands measure the fragmentainer — 100% on the margin-zero
//    named page resolves to the page box itself, identical for every engine
//    and capture. (Media-feature rungs resolved against a reduced box on the
//    real print path — the ~30mm-short cover — so %/cq geometry, not the
//    ladder, owns the bleed bands. The ladder stays for content-area caps.)
// ─────────────────────────────────────────────────────────────────────────────
describe('cover and plate bands are fragmentainer-derived', () => {
  test('covers and plates size to the page box, never the ladder', () => {
    for (const sel of ['print-cover', 'print-face', 'print-plate']) {
      // The class may open several blocks — shared selectors group
      // unrelated rungs, so ANY block carrying the box counts. Height is
      // the one-page-fit contract every band shares, fragmentainer-
      // derived either way the sheet carries it: a plain 100% fill or
      // the 100vb page-box rung (which wins over 100% in Chromium's
      // paginated root flow, where an in-flow % fragments empty sheets).
      // Width stays implicit (a block box fills the margin-zero page).
      const blocks = [...printSrc.matchAll(new RegExp(`\\.${sel}[^{]*\\{[^}]*\\}`, 'g'))].map(
        (m) => m[0]
      )

      expect(blocks.length).toBeGreaterThan(0)
      expect(blocks.some((b) => /height:\s*(?:calc\()?100(?:%|vb\b)/.test(b))).toBe(true)
    }

    // The plate is the cq pivot — container-type: size makes cqh/cqw
    // resolve to the fragmentainer's dims so the rotated copy can take
    // the swapped pair (pre-rotation box = page-h × page-w).
    const plate = [...printSrc.matchAll(/\.print-plate[^{]*\{[^}]*\}/g)].map((m) => m[0])

    expect(plate.some((b) => /container-type:\s*size/.test(b))).toBe(true)
  })

  test('plate chrome anchors borrow the page-margin rungs', () => {
    const plate = printSrc.match(/\.print-plate\s*\{[\s\S]*?\.print-caption\s*\{[^}]*\}/)

    expect(plate).not.toBeNull()
    expect(plate[0]).toMatch(/bottom:\s*var\(--print-margin-bottom\)/)
    expect(plate[0]).toMatch(/left:\s*var\(--print-margin-h\)/)
  })

  test('landscape plate rotation swaps the container rungs', () => {
    const arm = printSrc.match(/\.print-plate--landscape\s+\.print-copy[^}]*\}/)

    expect(arm).not.toBeNull()
    expect(arm[0]).toMatch(/width:\s*100cqh/)
    expect(arm[0]).toMatch(/height:\s*100cqw/)
    expect(arm[0]).toMatch(/rotate\(90deg\)/)
  })
})
