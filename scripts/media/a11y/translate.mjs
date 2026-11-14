#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/translate.mjs
 * @description Cloud Translation (v2 REST) layer for the a11y pipeline —
 * batches per-asset segments into single calls, memoizes every
 * (target, text) pair in a persistent on-disk translation memory so
 * re-runs and repeated boilerplate never re-bill, and routes dialect
 * locales through the corpus-derived transform on top of their base
 * translation.
 */

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

import { LOCALES, LOCALE_TRANSLATE } from '../../../../core/tokens/locales.ts'
import { gcpJson } from './gcp.mjs'
import { applyDialect } from './dialects.mjs'

const API = 'https://translation.googleapis.com/language/translate/v2'

/** v2 accepts up to 128 `q` segments per request. */
const BATCH_Q = 128

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')

/** Persistent translation memory — survives runs; identical segments re-bill zero. */
const MEMORY_PATH = path.join(ROOT, 'reports', 'a11y-translate-memory.json')

const TMP_MEMORY = path.join(os.tmpdir(), 'luiskr-a11y-translate-memory.json')

/** `${target}\n${text}` → translated text. */
const memory = new Map()

/** Characters billed this run — reported at the end. */
export const usage = { chars: 0, calls: 0, cacheHits: 0 }

/** Loads the persisted translation memory (best-effort). */
export function loadMemory() {
  for (const p of [MEMORY_PATH, TMP_MEMORY]) {
    try {
      for (const [k, v] of JSON.parse(fs.readFileSync(p, 'utf-8'))) {
        if (!memory.has(k)) memory.set(k, v)
      }
    } catch {
      /* absent/corrupt → cold memory */
    }
  }
}

/** Persists the memory — reports/ first, OS-temp mirror as backup. */
export function persistMemory() {
  const body = `${JSON.stringify([...memory].sort(), null, 1)}\n`

  for (const p of [MEMORY_PATH, TMP_MEMORY]) {
    try {
      fs.mkdirSync(path.dirname(p), { recursive: true })

      fs.writeFileSync(p, body, 'utf-8')
    } catch {
      /* read-only tree → tmp mirror still landed */
    }
  }
}

/**
 * Translates one batch of strings for a single MT target.
 * @param {string[]} texts Source strings (≤ BATCH_Q).
 * @param {string} target Google target code.
 * @returns {Promise<string[]>} Same-length translated array.
 */
const callTranslate = async (texts, target) => {
  const body = await gcpJson(API, {
    method: 'POST',
    body: { q: texts, target, source: 'en', format: 'text' },
  })

  usage.calls++

  usage.chars += texts.join('').length

  const out = (body.data?.translations || []).map((t) => t.translatedText || '')

  // Google hands entities back for a few marks — decode the minimal set
  // VTT/plain text needs (&quot; &amp; &#39; &lt; &gt;).
  return out.map((s) =>
    s
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, `'`)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
  )
}

/**
 * Translates every segment for one MT target — memory-first, batching the
 * misses, memoizing the results back.
 * @param {string[]} segments Source strings.
 * @param {string} target Google target code ('en' short-circuits).
 * @returns {Promise<string[]>} Same-length result array.
 */
export async function translateSegments(segments, target) {
  if (target === LOCALES.EN) return segments.map((s) => s)

  const out = new Array(segments.length)

  const misses = []

  const missIdx = []

  for (let i = 0; i < segments.length; i++) {
    const key = `${target}\n${segments[i]}`

    if (memory.has(key)) {
      out[i] = memory.get(key)

      usage.cacheHits++
    } else {
      misses.push(segments[i])

      missIdx.push(i)
    }
  }

  for (let off = 0; off < misses.length; off += BATCH_Q) {
    const slice = misses.slice(off, off + BATCH_Q)

    const translated = await callTranslate(slice, target)

    translated.forEach((text, j) => {
      const i = missIdx[off + j]

      out[i] = text

      memory.set(`${target}\n${segments[i]}`, text)
    })
  }

  return out
}

/**
 * Full locale routing — MT-target languages translate directly; dialect
 * locales first produce their base translation (shared with the base
 * locale's call — the memory makes the reuse free) then pass through the
 * corpus transform.
 * @param {string[]} segments Source strings.
 * @param {string} locale Site locale code (must exist in LOCALE_TRANSLATE).
 * @param {Map<string, Map<string, string>>} dialectTables From buildDialectTables.
 * @returns {Promise<string[]>} Localized strings.
 */
export async function localizeSegments(segments, locale, dialectTables) {
  const route = LOCALE_TRANSLATE[locale]

  if (!route) throw new Error(`no translate route for locale: ${locale}`)

  const base = await translateSegments(segments, route.target)

  return route.dialectOf ? base.map((t) => applyDialect(t, locale, dialectTables)) : base
}

/** The 16 routable locales in emission order — English first. */
export const OUTPUT_LOCALES = Object.freeze([
  LOCALES.EN,
  ...Object.keys(LOCALE_TRANSLATE).filter((l) => l !== LOCALES.EN),
])
