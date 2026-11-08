/**
 * @file css-split.mjs
 * @description Breakpoint splitter for compiled stylesheets.
 *
 * The site authors responsive rules as Sass `layout-N` mixins that compile
 * to pure `@media (min-width: Npx)` blocks (lightningcss renders them as
 * `(width>=Npx)`). This module walks a compiled sheet top-level, buckets
 * every pure min-width media block by width class (see css-classes.mjs),
 * and rebuilds cumulative sheets: the `tablet` file carries every block a
 * tablet viewport can need — base + mobile + tablet blocks in original
 * document order — so one served file reproduces the monolithic sheet's
 * cascade semantics for that class exactly.
 *
 * Two output shapes:
 *   - `splitDocumentSheet(css)` → {mobile,tablet,desktop,wide} full sheets
 *     for the <link>-delivered document CSS. Each variant is the original
 *     text with future-class media blocks dropped in place, so rule order
 *     is fully preserved — zero cascade risk by construction.
 *   - `splitComponentSheet(css)` → {base, tiers:{cls→css}} for ?tiers
 *     component modules: base keeps every non-bucketed part; each tier
 *     holds the source-ordered media blocks up to its class and is
 *     adopted AFTER the base sheet. A moved block whose selectors
 *     reappear in a later kept part stays in base — that is the only
 *     position where reordered adoption could flip a same-specificity
 *     tie, so it is the conservative extraction boundary.
 */
import { WIDTH_CLASSES, classForMinWidth } from './css-classes.mjs'

/** Pure `min-width` media queries — range syntax and legacy form. */
const MIN_WIDTH_RE = /^\(?(?:min-width:\s*|width\s*>=\s*)(\d+(?:\.\d+)?)px\)?$/

/**
 * Extracts the px value from a pure min-width query, or null for anything
 * else (max-width, ranges, pointer/print/reduced-motion, compound queries).
 * Compound queries stay in base deliberately: class membership is ambiguous
 * and their byte share is small.
 * @param {string} query media query text without `@media`.
 * @returns {number|null} px value or null.
 */
const minWidthOf = (query) => {
  const m = MIN_WIDTH_RE.exec(query.trim())

  return m ? Number(m[1]) : null
}

/**
 * Splits a compiled stylesheet into ordered top-level parts, separating
 * `@media` blocks from everything else. String literals, comments, and
 * nested braces are skipped so `content:'@media'` or a braced declaration
 * never breaks the scan. Iterative depth tracking — the input is a flat
 * byte stream, not a self-similar tree.
 * @param {string} css compiled (possibly minified) stylesheet text.
 * @returns {Array<{kind:'media'|'other', query:string, text:string, body:string}>}
 */
const topLevelParts = (css) => {
  const parts = []
  const n = css.length
  let start = 0
  let i = 0
  let depth = 0

  while (i < n) {
    const c = css[i]

    if (c === '"' || c === "'") {
      const q = c
      i++
      while (i < n && css[i] !== q) i += css[i] === '\\' ? 2 : 1
      i++
      continue
    }

    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      i = end < 0 ? n : end + 2
      continue
    }

    if (c === '{') {
      depth++
      i++
      continue
    }

    if (c === '}') {
      depth--
      i++
      continue
    }

    if (depth === 0 && c === '@' && css.startsWith('@media', i)) {
      if (i > start) parts.push({ kind: 'other', query: '', text: css.slice(start, i), body: '' })

      let j = i + 6

      while (j < n && css[j] !== '{') j++

      const query = css.slice(i + 6, j).trim()
      let d = 0
      let k = j

      do {
        const ch = css[k]

        if (ch === '"' || ch === "'") {
          const q = ch
          k++
          while (k < n && css[k] !== q) k += css[k] === '\\' ? 2 : 1
        } else if (ch === '{') {
          d++
        } else if (ch === '}') {
          d--
        }

        k++
      } while (d > 0 && k < n)

      parts.push({ kind: 'media', query, text: css.slice(i, k), body: css.slice(j, k) })
      start = i = k
      continue
    }

    i++
  }

  if (start < n) parts.push({ kind: 'other', query: '', text: css.slice(start), body: '' })

  return parts
}

/**
 * Lists the selector texts of every rule inside a media block's body —
 * the depth-1 pre-brace spans. Used by the component conflict guard; a
 * nested at-rule's prelude is captured too, which can only over-keep a
 * block in base, never under-keep.
 * @param {string} body media block inner text including its outer braces.
 * @returns {string[]} trimmed selector texts.
 */
const innerSelectors = (body) => {
  const sels = []
  const n = body.length
  let depth = 0
  let start = 0
  let i = 0

  while (i < n) {
    const c = body[i]

    if (c === '"' || c === "'") {
      const q = c
      i++
      while (i < n && body[i] !== q) i += body[i] === '\\' ? 2 : 1
      i++
      continue
    }

    if (c === '{') {
      if (depth === 1) sels.push(body.slice(start, i).trim())

      depth++
      i++

      if (depth === 1) start = i

      continue
    }

    if (c === '}') {
      depth--
      i++

      if (depth === 1) start = i

      continue
    }

    i++
  }

  return sels
}

/**
 * Captures the depth-1 rule spans inside a media block's body — each
 * `selector{declarations}` span verbatim, selector start through its
 * closing brace. A nested at-rule's whole `{...}` span is captured as one
 * "rule", which is still a verbatim-comparable unit. String literals,
 * comments, and nested braces are skipped.
 * @param {string} body media block inner text including its outer braces.
 * @returns {string[]} rule texts in source order.
 */
const innerRuleTexts = (body) => {
  const rules = []
  const n = body.length
  let depth = 0
  let start = 0
  let ruleStart = -1
  let i = 0

  while (i < n) {
    const c = body[i]

    if (c === '"' || c === "'") {
      const q = c
      i++
      while (i < n && body[i] !== q) i += body[i] === '\\' ? 2 : 1
      i++
      continue
    }

    if (c === '/' && body[i + 1] === '*') {
      const end = body.indexOf('*/', i + 2)
      i = end < 0 ? n : end + 2
      continue
    }

    if (c === '{') {
      if (depth === 1) ruleStart = start

      depth++
      i++

      if (depth === 1) start = i

      continue
    }

    if (c === '}') {
      depth--
      i++

      if (depth === 1) {
        if (ruleStart >= 0) rules.push(body.slice(ruleStart, i))
        ruleStart = -1
        start = i
      }

      continue
    }

    i++
  }

  return rules
}

/**
 * Drops provably redundant rules from a compiled sheet. When the same
 * `selector{declarations}` rule appears inside `@media (min-width:Apx)`
 * and again inside `@media (min-width:Bpx)` with A <= B, the B copy is
 * dead text — every viewport matching >=B already matched >=A, so the
 * identical earlier-width rule reproduces it at any position. This holds
 * for the cumulative outputs built here because every file that could
 * contain the >=B block also contains the >=A block. Position and block
 * order are irrelevant to the drop decision — only domain width matters.
 * Whole media blocks whose body empties are removed; byte-identical
 * duplicate media blocks of any query type are also dropped. Non-pure
 * media queries and unconditional parts are never touched — only
 * verbatim-redundant copies ever leave the sheet, never reordered rules.
 * @param {string} css compiled stylesheet text.
 * @returns {string} the sheet with redundant min-width copies removed.
 */
const dedupeMediaRules = (css) => {
  const parts = topLevelParts(css)
  const coveredMin = new Map()

  for (const p of parts) {
    const px = p.kind === 'media' ? minWidthOf(p.query) : null

    if (px === null) continue

    for (const rule of innerRuleTexts(p.body)) {
      const prev = coveredMin.get(rule)

      if (prev === undefined || px < prev) coveredMin.set(rule, px)
    }
  }

  const seenMedia = new Set()
  const emitted = new Set()

  return parts
    .map((p) => {
      if (p.kind !== 'media') return p.text
      if (seenMedia.has(p.text)) return ''
      seenMedia.add(p.text)

      const px = minWidthOf(p.query)

      if (px === null) return p.text

      const kept = innerRuleTexts(p.body).filter((rule) => {
        if (coveredMin.get(rule) < px || emitted.has(rule)) return false
        emitted.add(rule)
        return true
      })

      if (!kept.length) return ''
      if (kept.length === innerRuleTexts(p.body).length) return p.text

      return `@media ${p.query}{${kept.join('')}}`
    })
    .join('')
}

/**
 * Splits the document (<link>-delivered) stylesheet into cumulative sheets
 * per width class. `tablet` = base + mobile + tablet blocks — the original
 * text with only future-class media blocks dropped in place, preserving
 * rule order exactly.
 * @param {string} css compiled stylesheet text.
 * @returns {Record<string,string>} {mobile,tablet,desktop,wide} sheets.
 */
export const splitDocumentSheet = (css) => {
  const parts = topLevelParts(dedupeMediaRules(css))
  const out = {}

  for (const cls of WIDTH_CLASSES) {
    out[cls.name] = parts
      .filter((p) => {
        if (p.kind !== 'media') return true

        const px = minWidthOf(p.query)

        return px === null || px <= cls.maxWidth
      })
      .map((p) => p.text)
      .join('')
  }

  return out
}

/**
 * Splits a component `?inline`-style sheet into an embedded base plus
 * lazily-delivered width-class tiers. Base keeps every part that is not a
 * pure min-width media block; each tier string is the source-ordered join
 * of moved media blocks up to that class — adopted after the base sheet,
 * so the only relocation hazard is a later KEPT part sharing a selector:
 * those blocks stay in base. Tiers whose cumulative content adds nothing
 * over the previous class are omitted (the runtime falls back to the
 * highest defined lower tier).
 * @param {string} css compiled component stylesheet text.
 * @returns {{base:string, tiers:Record<string,string>, guarded:string[]}}
 */
export const splitComponentSheet = (css) => {
  const parts = topLevelParts(css)
  const kept = []
  const moved = []
  const guarded = []

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    const px = p.kind === 'media' ? minWidthOf(p.query) : null

    if (px === null) {
      kept.push(p.text)
      continue
    }

    // Later parts that deterministically stay in base ('other' parts and
    // non-pure media) — a moved block lands after all of them at adoption
    // time, so a shared selector means the tie flips and the block stays.
    const later = parts
      .slice(i + 1)
      .filter((q) => q.kind !== 'media' || minWidthOf(q.query) === null)
      .map((q) => q.text)
      .join('')

    if (later && innerSelectors(p.body).some((sel) => sel && later.includes(sel))) {
      guarded.push(p.query)
      kept.push(p.text)
      continue
    }

    moved.push({
      rank: WIDTH_CLASSES.findIndex((c) => c.name === classForMinWidth(px)),
      text: p.text,
    })
  }

  const tiers = {}
  let prev = ''

  WIDTH_CLASSES.forEach((cls, rank) => {
    const text = moved
      .filter((m) => m.rank <= rank)
      .map((m) => m.text)
      .join('')

    if (text && text !== prev) {
      tiers[cls.name] = text
      prev = text
    }
  })

  return { base: kept.join(''), tiers, guarded }
}
