#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/dialects.mjs
 * @description Dialect derivation for the site's four contact languages —
 * Hunsrik (hrk), Castellano/Rioplatense (cas), Portuñol (riv) and Talian
 * (tln) — which Cloud Translation cannot target. The site's own
 * `translations/<locale>` corpus already encodes each dialect's systematic
 * distance from its MT-able base (de, es, pt, it), so this module mines
 * every base↔dialect leaf pair, word-aligns them by LCS, and keeps the
 * consistent substitutions as a per-dialect rewrite table applied on top
 * of the translated base text.
 *
 * Anything the corpus never observed falls through to the base language —
 * these dialects are mutually intelligible with their bases, so a partial
 * transform still reads natively.
 */

import { LOCALE_TRANSLATE } from '../../../../core/tokens/locales.ts'

/** Dialect locales this module serves — keyed to their MT base locale. */
export const DIALECT_LOCALES = Object.freeze(
  Object.entries(LOCALE_TRANSLATE)
    .filter(([, v]) => v.dialectOf)
    .map(([locale, v]) => ({ locale, base: v.dialectOf }))
)

/** Minimum share of observations that must agree for a pair to stick. */
const CONSISTENCY = 0.6

/**
 * Tokenizes a string into alternating word/non-word runs — whitespace and
 * punctuation tokens are preserved verbatim so reassembly is loss-free.
 * @param {string} text
 * @returns {string[]}
 */
const tokenize = (text) => String(text).match(/\w+|\W+/g) || []

/** Case-shape copier: 'UND'→'UN' style base casing reapplies to output. */
const matchCase = (base, out) => (base.toUpperCase() === base ? out.toUpperCase() : out)

/**
 * LCS alignment of two token sequences — returns index pairs
 * `[baseIdx, dialIdx]` aligned inside the common subsequence plus the
 * unaligned leftovers that constitute substitutions/insertions.
 * @param {string[]} a Base token list.
 * @param {string[]} b Dialect token list.
 * @returns {{aligned: Array<[number,number]>, baseOnly: number[], dialOnly: number[]}}
 */
const lcsAlign = (a, b) => {
  const n = a.length

  const m = b.length

  // Classic DP table — cells hold the LCS length of suffixes.
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        a[i].toLowerCase() === b[j].toLowerCase()
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const aligned = []

  const baseOnly = []

  const dialOnly = []

  let i = 0

  let j = 0

  while (i < n && j < m) {
    if (a[i].toLowerCase() === b[j].toLowerCase()) {
      aligned.push([i, j])

      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      baseOnly.push(i++)
    } else {
      dialOnly.push(j++)
    }
  }

  while (i < n) baseOnly.push(i++)

  while (j < m) dialOnly.push(j++)

  return { aligned, baseOnly, dialOnly }
}

/**
 * Recursively collects `[path, baseText, dialText]` triples from two
 * parallel translation trees — only where BOTH sides carry a string leaf
 * (a missing dialect leaf contributes nothing).
 * @param {*} baseNode Base-locale subtree.
 * @param {*} dialNode Dialect-locale subtree.
 * @param {string[]} path Accumulated key path.
 * @param {Array<[string, string, string]>} out Sink triples.
 */
const collectPairs = (baseNode, dialNode, path, out) => {
  if (typeof baseNode === 'string' && typeof dialNode === 'string' && baseNode !== dialNode) {
    out.push([path.join('.'), baseNode, dialNode])

    return
  }

  if (!baseNode || typeof baseNode !== 'object' || !dialNode || typeof dialNode !== 'object') {
    return
  }

  for (const key of Object.keys(baseNode)) {
    collectPairs(baseNode[key], dialNode[key], [...path, key], out)
  }
}

/**
 * Mines the DB corpus into per-dialect word maps.
 * @param {object} db Full `translations` object keyed by locale.
 * @returns {Map<string, Map<string, string>>} locale → (base word → dialect word).
 */
export function buildDialectTables(db = {}) {
  const tables = new Map()

  for (const { locale, base } of DIALECT_LOCALES) {
    const pairs = []

    collectPairs(db[base], db[locale], [], pairs)

    // Word-level replacement votes — only balanced substitutions
    // (|baseOnly| == |dialOnly|) are trusted: positionally pairing
    // leftovers across unequal lengths manufactures false mappings
    // (insertions/deletions aren't 1:1 rewrites).
    const votes = new Map()

    for (const [, baseText, dialText] of pairs) {
      const baseToks = tokenize(baseText)

      const dialToks = tokenize(dialText)

      const { baseOnly, dialOnly } = lcsAlign(baseToks, dialToks)

      if (baseOnly.length !== dialOnly.length) continue

      const queue = dialOnly.map((idx) => dialToks[idx])

      for (const bi of baseOnly) {
        const bw = baseToks[bi]

        if (!bw || !/^\w+$/.test(bw)) continue

        const dw = queue.shift()

        if (!dw || !/^\w+$/.test(dw)) continue

        const key = bw.toLowerCase()

        if (key === dw.toLowerCase()) continue

        if (!votes.has(key)) votes.set(key, new Map())

        const bag = votes.get(key)

        bag.set(dw.toLowerCase(), (bag.get(dw.toLowerCase()) || 0) + 1)
      }
    }

    // Majority-vote each base word — only consistent pairs land.
    const table = new Map()

    for (const [bw, bag] of votes) {
      let best = null

      let bestN = 0

      let total = 0

      for (const [dw, n] of bag) {
        total += n

        if (n > bestN) {
          bestN = n
          best = dw
        }
      }

      if (best && bestN / total >= CONSISTENCY) table.set(bw, best)
    }

    tables.set(locale, table)
  }

  return tables
}

/**
 * Applies a dialect table word-by-word, preserving the source casing.
 * Non-word tokens pass through untouched.
 * @param {string} text Base-language text.
 * @param {string} locale Dialect locale code.
 * @param {Map<string, Map<string, string>>} tables From buildDialectTables.
 * @returns {string} Dialect-derived text.
 */
export function applyDialect(text, locale, tables) {
  const table = tables.get(locale)

  if (!table || !table.size || !text) return text

  return tokenize(text)
    .map((tok) => {
      if (!/^\w+$/.test(tok)) return tok

      const mapped = table.get(tok.toLowerCase())

      return mapped ? matchCase(tok, mapped) : tok
    })
    .join('')
}
