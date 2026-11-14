#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/run.mjs
 * @description Media accessibility pipeline — generates co-located
 * WebVTT description tracks for every video and `longdesc` files for
 * every image in the site's media inventory, in all 16 locales, and
 * uploads them next to the source objects on the CDN bucket.
 *
 * Flow per asset:
 *   video: Video Intelligence annotate (gs:// input) → shot/label/OCR
 *          windows → English cue parts → Cloud Translation ×11 +
 *          corpus-dialect derivation ×4 → <stem>[.<locale>].vtt ×16
 *   image: Vision annotate → structured longdesc parts → same 16-locale
 *          pass → <stem>_longdesc[.<locale>].txt ×16
 *
 * Resumable by construction: the bucket's write-once retention plus a
 * manifest pre-check make every existing sibling a skip, so re-runs only
 * fill gaps. `--dry` writes the whole artifact tree under reports/a11y-out/
 * for review instead of touching the bucket.
 *
 * Usage:
 *   node shared/scripts/media/a11y/run.mjs [--dry] [--workers N]
 *     [--only <substr>] [--keys <file>] [--videos-only|--images-only]
 *     [--locales=en,de] [--force] [--verbose] [--report <path>]
 *     [--watch <seconds>]
 *
 * `--watch` keeps the process alive after a pass — every interval it
 * re-fetches the manifest and fills the gaps, which is what makes the
 * "upload ⇒ captions/longdesc appear automatically next to the file"
 * acceptance criterion literal: any new media object lands its 16
 * siblings on the next sweep without a manual re-run.
 */

import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import { LOCALES } from '../../../../core/tokens/locales.ts'
import { MEDIA } from '../../../../core/tokens/media/suffixes.ts'
import {
  fetchMediaManifest,
  persistMediaManifest,
  MEDIA_BUCKET,
  MEDIA_PREFIX,
} from '../../build/media-manifest.mjs'
import { collectMedia, fetchTranslations, analysisSource } from './inventory.mjs'
import { buildDialectTables } from './dialects.mjs'
import { loadMemory, localizeSegments, persistMemory, usage, OUTPUT_LOCALES } from './translate.mjs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import os from 'node:os'

import { annotateVideo } from './video-annotate.mjs'
import {
  annotateImage,
  annotateImageContent,
  composeLongdescParts,
  renderLongdesc,
  LONGDESC_SCAFFOLDS,
} from './image-annotate.mjs'
import { normalizeAnnotation, synthCues, cuesToVtt, renderCue, OCR_PREFIX } from './vtt.mjs'
import { vttKey, longdescKey } from './keys.mjs'
import { uploadText, A11Y_MIME } from './upload.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')

/** Annotation-result cache — `--skip-annotate` reruns compose without re-billing. */
const CACHE_DIR = path.join(ROOT, 'reports', 'a11y-cache')

const runProc = promisify(execFile)

/** Public CDN object URL — anonymous GET; the bucket is world-readable. */
const cdnUrl = (key) => `https://storage.googleapis.com/${MEDIA_BUCKET}/${MEDIA_PREFIX}${key}`

/** `--dry` output tree — full artifact mirror for review. */
const DRY_DIR = path.join(ROOT, 'reports', 'a11y-out')

/** Persistent per-key status log — same convention as media-convert-log.json. */
const LOG_PATH = path.join(ROOT, 'website', 'public', 'meta', 'media-a11y-log.json')

/** Where the runtime's /meta/media-manifest.json artifact is persisted. */
const META_DIR = path.join(ROOT, 'website', 'public', 'meta')

const args = process.argv.slice(2)

const flag = (name) => args.includes(name)

const opt = (name, dflt) => {
  const i = args.indexOf(name)

  if (i !== -1) return args[i + 1]

  const eq = args.find((a) => a.startsWith(`${name}=`))

  return eq ? eq.slice(name.length + 1) : dflt
}

const DRY = flag('--dry')

const FORCE = flag('--force')

const VERBOSE = flag('--verbose')

const VIDEOS_ONLY = flag('--videos-only')

const IMAGES_ONLY = flag('--images-only')

const SKIP_ANNOTATE = flag('--skip-annotate')

const WORKERS = Math.max(1, Math.min(parseInt(opt('--workers', '4'), 10) || 4, 16))

const ONLY = opt('--only', '')

const KEYS_FILE = opt('--keys', '')

const LOCALES_SUBSET = opt('--locales', '')
  ? opt('--locales', '').split(',').filter(Boolean)
  : [...OUTPUT_LOCALES]

const REPORT_PATH = path.resolve(opt('--report', path.join(ROOT, 'reports', 'a11y-media.json')))

/** `--watch <seconds>` interval (0 = single pass). */
const WATCH_MS = Math.max(0, parseInt(opt('--watch', '0'), 10) || 0) * 1000

const log = (msg) => console.log(`[a11y] ${msg}`)

const vlog = (msg) => VERBOSE && log(msg)

/** Content-hash cache path for one stem's annotation result. */
const cacheFile = (key) =>
  path.join(CACHE_DIR, `${createHash('sha256').update(key).digest('base64url').slice(0, 16)}.json`)

/** Loads a cached annotation (null on miss). */
const loadAnnCache = async (key) => {
  try {
    return JSON.parse(await fsp.readFile(cacheFile(key), 'utf-8'))
  } catch {
    return null
  }
}

/** Persists an annotation result for --skip-annotate reruns. */
const saveAnnCache = (key, ann) =>
  fsp
    .mkdir(CACHE_DIR, { recursive: true })
    .then(() => fsp.writeFile(cacheFile(key), JSON.stringify(ann), 'utf-8'))
    .catch(() => {})

/**
 * Translates the unique English segments for one asset across every
 * output locale — returns `{locale → Map<enSegment, localized>}` so
 * cue/part reassembly is pure lookups.
 * @param {string[]} segments Unique English segments.
 * @returns {Promise<Map<string, Map<string, string>>>}
 */
const localizeAll = async (segments, dialectTables) => {
  const uniq = [...new Set(segments.filter(Boolean))]

  const out = new Map()

  for (const locale of LOCALES_SUBSET) {
    const translated = await localizeSegments(uniq, locale, dialectTables)

    out.set(locale, new Map(uniq.map((s, i) => [s, translated[i]])))
  }

  return out
}

/**
 * Video job: annotate → normalize → cues → 16-locale .vtt payloads →
 * uploads. `rec.labels[locale]` seeds each file's NOTE header in its own
 * language (the CMS labels are already human-localized).
 */
const processVideo = async (rec, manifest, dialectTables) => {
  const { gsUri } = analysisSource(rec, manifest)

  let ann = SKIP_ANNOTATE ? await loadAnnCache(rec.key) : null

  if (!ann) {
    try {
      ann = await annotateVideo(gsUri, (p) => vlog(`${rec.key} ${p}`))
    } catch (err) {
      // Very large mp4s (100MB+ CMS tours) can outlive the poll timeout —
      // the `-scaledown-2x` sibling carries the same shots and readable
      // UI text in a fraction of the bytes, so retry against it.
      const smallKey = `${rec.key}${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_EXT}`

      if (!/timed out/i.test(String(err.message)) || !manifest || !manifest.has(smallKey)) {
        throw err
      }

      vlog(`${rec.key} annotate timed out — retrying scaledown-2x sibling`)

      ann = await annotateVideo(`gs://${MEDIA_BUCKET}/${MEDIA_PREFIX}${smallKey}`, (p) =>
        vlog(`${rec.key} [2x] ${p}`)
      )
    }

    await saveAnnCache(rec.key, ann)
  }

  const { windows } = normalizeAnnotation(ann)

  const cues = synthCues(windows)

  // Unique segments: cue visual lines + the shared OCR scaffold —
  // deduped before billing so repeated shots re-bill zero characters.
  const segments = [...new Set(cues.map((c) => c.visual).filter(Boolean))]

  if (cues.some((c) => c.ocr)) segments.push(OCR_PREFIX)

  const localized = await localizeAll(segments, dialectTables)

  const files = LOCALES_SUBSET.map((locale) => {
    const map = localized.get(locale)

    const scaffold = map.get(OCR_PREFIX) || OCR_PREFIX

    const localeCues = cues.map((c) => ({
      start: c.start,
      end: c.end,
      text: renderCue({ visual: map.get(c.visual) || c.visual, ocr: c.ocr }, scaffold),
    }))

    const note = rec.labels[locale] || rec.labels[LOCALES.EN] || rec.key

    return {
      key: vttKey(rec.key, locale),
      body: cuesToVtt(localeCues, note),
      mime: A11Y_MIME.vtt,
      locale,
    }
  })

  return { files, cueCount: cues.length }
}

/**
 * Downloads one bucket object over the public CDN URL.
 * @param {string} key MEDIA_PREFIX-relative object key.
 * @returns {Promise<Buffer>} Raw object bytes.
 */
const fetchObjectBytes = async (key) => {
  const res = await fetch(cdnUrl(key))

  if (!res.ok) throw new Error(`cdn fetch ${res.status}: ${key}`)

  return Buffer.from(await res.arrayBuffer())
}

/**
 * ImageMagick transcode — arithmetic-coded mozjpeg output is a real JPEG
 * every consumer reads but Vision's gs:// path rejects as "Bad image
 * data". `magick` re-encodes to baseline Huffman; the 1600px cap keeps
 * content-annotate payloads modest while preserving legibility.
 * @param {Buffer} bytes Source image bytes.
 * @returns {Promise<Buffer>} Standard baseline-JPEG bytes.
 */
const transcodeJpeg = async (bytes) => {
  const inPath = path.join(os.tmpdir(), `a11y-in-${Date.now()}.jpg`)
  const outPath = path.join(os.tmpdir(), `a11y-out-${Date.now()}.jpg`)

  fs.writeFileSync(inPath, bytes)

  try {
    await runProc('magick', [inPath, '-resize', '1600x1600>', '-quality', '85', outPath])

    return fs.readFileSync(outPath)
  } finally {
    fs.rmSync(inPath, { force: true })
    fs.rmSync(outPath, { force: true })
  }
}

/**
 * gs:// annotate with progressive fallbacks — the q50 mozjpeg sibling
 * covers Vision's 20MB cap; a local magick transcode + inline-content
 * annotate covers arithmetic-coded JPEGs Vision can't open at all.
 * @param {object} rec Inventory record.
 * @param {string} gsUri Primary `gs://` source.
 * @param {Set<string>|null} manifest Bucket key set.
 * @returns {Promise<object>} `responses[0]`.
 */
const annotateImageWithFallback = async (rec, gsUri, manifest) => {
  try {
    return await annotateImage(gsUri)
  } catch (err) {
    if (!/Image size|Bad image data|opening file/i.test(String(err.message))) throw err
  }

  const q50Key = `${rec.key}${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`
  const q50Listed = !manifest || manifest.has(q50Key)

  if (q50Listed) {
    try {
      return await annotateImage(`gs://${MEDIA_BUCKET}/${MEDIA_PREFIX}${q50Key}`)
    } catch {
      /* fall through to transcode */
    }
  }

  vlog(`${rec.key} gs:// annotate failed — transcoding locally for inline annotate`)

  const bytes = await fetchObjectBytes(q50Listed ? q50Key : `${rec.key}${MEDIA.EXT}`)

  return annotateImageContent(await transcodeJpeg(bytes))
}

/**
 * Image job: annotate → structured parts → 16-locale .txt payloads →
 * uploads. Each locale's own CMS label heads its file; the scaffold
 * sentences translate; the quoted OCR string stays verbatim.
 */
const processImage = async (rec, manifest, dialectTables) => {
  const { gsUri } = analysisSource(rec, manifest)

  let ann = SKIP_ANNOTATE ? await loadAnnCache(rec.key) : null

  if (!ann) {
    ann = await annotateImageWithFallback(rec, gsUri, manifest)

    await saveAnnCache(rec.key, ann)
  }

  const parts = composeLongdescParts(ann)

  const segments = [parts.scene, parts.elements, parts.palette, parts.context].filter(Boolean)

  if (parts.ocr) segments.push(LONGDESC_SCAFFOLDS.OCR)

  const localized = await localizeAll(segments, dialectTables)

  const files = LOCALES_SUBSET.map((locale) => {
    const map = localized.get(locale)

    const body = renderLongdesc({
      label: rec.labels[locale] || rec.labels[LOCALES.EN] || rec.key,
      parts: {
        scene: map.get(parts.scene) || parts.scene,
        elements: map.get(parts.elements) || parts.elements,
        ocr: parts.ocr,
        palette: map.get(parts.palette) || parts.palette,
        context: map.get(parts.context) || parts.context,
      },
      ocrScaffold: map.get(LONGDESC_SCAFFOLDS.OCR) || LONGDESC_SCAFFOLDS.OCR,
    })

    return { key: longdescKey(rec.key, locale), body, mime: A11Y_MIME.longdesc, locale }
  })

  return { files, cueCount: 0 }
}

/**
 * Writes one artifact — `--dry` mirrors it under reports/a11y-out/;
 * otherwise uploads to the sibling key (manifest-listed keys skip).
 */
const emitFile = async (file, manifest) => {
  if (DRY) {
    const dest = path.join(DRY_DIR, file.key)

    await fsp.mkdir(path.dirname(dest), { recursive: true })

    await fsp.writeFile(dest, file.body, 'utf-8')

    return 'dry'
  }

  if (manifest && manifest.has(file.key) && !FORCE) return 'exists'

  return uploadText(file.key, file.body, file.mime)
}

/** One inventory record end-to-end; returns the report row. */
const processOne = async (rec, manifest, dialectTables) => {
  const kind = rec.isVideo ? 'video' : 'image'

  try {
    const { files, cueCount } = rec.isVideo
      ? await processVideo(rec, manifest, dialectTables)
      : await processImage(rec, manifest, dialectTables)

    const statuses = []

    for (const file of files) statuses.push(`${file.locale}:${await emitFile(file, manifest)}`)

    return { key: rec.key, kind, files: files.length, cues: cueCount, status: statuses.join(' ') }
  } catch (err) {
    return {
      key: rec.key,
      kind,
      files: 0,
      cues: 0,
      status: `error ${String(err.message || err).slice(0, 200)}`,
    }
  }
}

/** Whether every required sibling already exists (skip without --force). */
const complete = (rec, manifest) =>
  !FORCE &&
  LOCALES_SUBSET.every((locale) =>
    manifest.has(rec.isVideo ? vttKey(rec.key, locale) : longdescKey(rec.key, locale))
  )

/** One full sweep — fetch manifest, process every gap, merge the
 *  status log + report. Returns the report object for the caller. */
const sweep = async (started, translations, dialectTables) => {
  const manifest = await fetchMediaManifest()

  if (!manifest) log('manifest listing failed — no pre-skip knowledge (all jobs run)')

  const stems = collectMedia(translations)

  const only = KEYS_FILE
    ? new Set(
        fs
          .readFileSync(KEYS_FILE, 'utf-8')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      )
    : null

  const jobs = [...stems.values()].filter((rec) => {
    if (VIDEOS_ONLY && !rec.isVideo) return false

    if (IMAGES_ONLY && rec.isVideo) return false

    if (ONLY && !rec.key.includes(ONLY)) return false

    if (only && !only.has(rec.key)) return false

    return true
  })

  const pending = manifest ? jobs.filter((rec) => !complete(rec, manifest)) : jobs

  log(
    `${jobs.length} media stems (${jobs.filter((r) => r.isVideo).length} videos), ` +
      `${pending.length} need artifacts across ${LOCALES_SUBSET.length} locales — ${WORKERS} workers`
  )

  const results = []

  let cursor = 0

  let done = 0

  const worker = async () => {
    while (cursor < pending.length) {
      const rec = pending[cursor++]

      results.push(await processOne(rec, manifest, dialectTables))

      done++

      if (done % 10 === 0 || done === pending.length) {
        persistMemory()

        log(
          `${done}/${pending.length} — billed ${usage.chars} chars, ${usage.cacheHits} cache hits`
        )
      }
    }
  }

  await Promise.all(Array.from({ length: WORKERS }, worker))

  persistMemory()

  // The runtime gates <track>/longdesc emission on
  // /meta/media-manifest.json — a stale build artifact would prove every
  // freshly-uploaded sibling absent and prune the tracks we just wrote.
  // Repersist the listing whenever a real sweep uploaded anything so the
  // site's own manifest reflects the new co-located files immediately.
  if (!DRY && results.some((r) => r.status.includes(':uploaded'))) {
    const fresh = await fetchMediaManifest()

    if (fresh) {
      persistMediaManifest(META_DIR, fresh)

      log(`media-manifest refreshed — ${fresh.size} keys`)
    }
  }

  // ── Persistent status log — merged over prior entries (media-convert
  //    convention) so re-runs accumulate one canonical record per key.
  const merged = new Map()

  try {
    for (const row of JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8')).results) {
      merged.set(row.key, row)
    }
  } catch {
    /* no prior log */
  }

  for (const row of results) merged.set(row.key, row)

  const logBody = { generated: new Date().toISOString(), results: [...merged.values()] }

  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true })

  fs.writeFileSync(LOG_PATH, `${JSON.stringify(logBody, null, 1)}\n`, 'utf-8')

  const report = {
    generated: logBody.generated,
    elapsedMs: Date.now() - started,
    locales: LOCALES_SUBSET,
    dry: DRY,
    totals: {
      stems: jobs.length,
      processed: results.length,
      ok: results.filter((r) => !r.status.startsWith('error')).length,
      errors: results.filter((r) => r.status.startsWith('error')).length,
      filesEmitted: results.reduce((n, r) => n + r.files, 0),
    },
    translateUsage: usage,
    results,
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true })

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 1)}\n`, 'utf-8')

  log(
    `done in ${((Date.now() - started) / 60000).toFixed(1)}min — ` +
      `${report.totals.ok} ok / ${report.totals.errors} errors / ` +
      `${usage.chars} billed chars (${usage.calls} calls, ${usage.cacheHits} cached)`
  )

  return report
}

/**
 * Entry — one sweep, or `--watch` re-sweeps forever. Translations +
 * dialect tables fetch once per process (the corpus is build-stable);
 * each pass re-fetches the manifest so newly uploaded media is the only
 * work that ever repeats.
 */
const main = async () => {
  const started = Date.now()

  log('fetching translations + building dialect tables…')

  const translations = await fetchTranslations()

  const dialectTables = buildDialectTables(translations)

  loadMemory()

  await sweep(started, translations, dialectTables)

  while (WATCH_MS > 0) {
    log(`watch mode — next sweep in ${WATCH_MS / 1000}s`)

    await new Promise((resolve) => setTimeout(resolve, WATCH_MS))

    await sweep(started, translations, dialectTables)
  }
}

await main()
