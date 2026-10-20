#!/usr/bin/env node

/**
 * @file shared/scripts/media/validate-media-sizes.mjs
 * @description Validates every media `size` declared in `database.json`
 * against the intrinsic dimensions of the real object on the CDN bucket,
 * and optionally rewrites the database (`--fix`).
 *
 * Why it exists:
 *  - `size` feeds skeleton boxes, `--mf-natural-*` caps, the expand-modal
 *    WASM fit, and prerendered `width`/`height` attributes — a stale value
 *    produces CLS, wrong caps, or media that can never fill its container.
 *  - The CMS export path has no server-side check, so drift accumulates
 *    silently (e.g. a 1920x1080 declaration over a 997x720 file).
 *
 * How it works:
 *  - Collects every `{ src, size, isVideo }` node under each project in
 *    every locale — dedupes on `folder + src` (the same capture repeats
 *    across the 16 locale trees) but keeps a reference to every node so
 *    `--fix` updates all languages at once.
 *  - Resolves each entry to its canonical bucket object through the same
 *    `resolveMediaUrls` variant ladder the sitemap generators use
 *    (uncompressed mozjpeg pass → raw original → q50 → kodak thumb for
 *    images; `.mp4` → scaledown for videos). Thumbs are never used for
 *    dimensions — a kodak blur pass does not carry the source geometry.
 *  - Images are probed with a 512 KiB range GET + native header parsing
 *    (JPEG SOF, PNG IHDR, WebP VP8/VP8L/VP8X, SVG width/height/viewBox);
 *    videos are probed with `ffprobe` stream metadata over HTTPS.
 *  - `--fix` rewrites `database.json` with the canonical
 *    `JSON.stringify(db, null, 2)` shape the file already uses; without it
 *    the script only reports and exits non-zero when diffs exist, so it
 *    can gate CI.
 *  - `--push` writes the probed intrinsic sizes to the live Firebase RTDB:
 *    each locale's `translations/<loc>/projects` tree is read once, live
 *    `size` values are diffed against the probe, and only the drifted
 *    nodes are written through a single multi-path PATCH — so the CMS
 *    database converges to truth without touching unchanged nodes.
 *    Auth uses the gcloud Application Default Credentials token
 *    (`gcloud auth application-default login`) — no service-account key
 *    file required.
 *
 * Usage: node shared/scripts/media/validate-media-sizes.mjs [--fix] [--push] [--workers N] [--json <report-path>]
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import { MEDIA } from '../../../core/tokens/media/suffixes.ts'
import { MEDIA_PREFIX, fetchMediaManifest, loadMediaManifest } from '../build/media-manifest.mjs'

const run = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

/** Public object URL prefix — same base the sitemap generator emits. */
const CDN_BASE = `https://storage.googleapis.com/luiskr.com/${MEDIA_PREFIX}`

/** database.json at the monorepo root — the CMS export / source of truth. */
const DB_PATH = path.join(ROOT, 'database.json')

/** Persisted manifest next to the sitemap artifacts — listing fallback. */
const META_DIR = path.join(ROOT, 'website', 'public', 'meta')

/**
 * Bytes fetched per image — JPEG SOF sits inside the first marker run so
 * ~64 KiB usually suffices; 512 KiB covers files carrying large EXIF or
 * embedded thumbnail APP1 segments before the frame header.
 */
const HEADER_RANGE = 512 * 1024

/**
 * Image variants usable for *dimensions* — same-source derivative passes
 * only. The kodak MSSIM thumb is excluded deliberately: it is a downscaled
 * blur-up placeholder and would record the wrong intrinsic size.
 */
const IMAGE_DIM_VARIANTS = Object.freeze([
  `${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.EXT}`,
  `${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.WEBP_EXT}`,
  MEDIA.EXT,
  MEDIA.WEBP_EXT,
  '.png',
  '.svg',
  `${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
])

/** Video variants — original first, the half-res scaledown never for dims. */
const VIDEO_DIM_VARIANTS = Object.freeze([MEDIA.VIDEO_EXT])

const args = process.argv.slice(2)
const FIX = args.includes('--fix')
const PUSH = args.includes('--push')
const jsonIdx = args.indexOf('--json')
const JSON_OUT = jsonIdx >= 0 ? args[jsonIdx + 1] : null
const workersIdx = args.indexOf('--workers')
const WORKERS = workersIdx >= 0 ? Math.max(1, Number(args[workersIdx + 1]) || 8) : 8

/**
 * Extracts width/height from a JPEG byte stream by scanning markers until
 * a start-of-frame segment (SOF0–SOF15, excluding DHT/DAC/JPG extension
 * markers) whose payload carries `precision, height, width`.
 */
const jpegDims = (buf) => {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null

  let i = 2

  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++
      continue
    }

    const marker = buf[i + 1]

    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc)
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) }

    const len = buf.readUInt16BE(i + 2)
    i += 2 + len
  }

  return null
}

/** Extracts width/height from the PNG IHDR (fixed offset 16/20). */
const pngDims = (buf) =>
  buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47
    ? { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
    : null

/**
 * Extracts width/height from a WebP container: lossy VP8 keeps the 14-bit
 * dimensions in the frame tag, lossless VP8L packs them into a 28-bit
 * field, and VP8X stores them as 24-bit minus-one values on the canvas.
 */
const webpDims = (buf) => {
  if (
    buf.length < 30 ||
    buf.toString('ascii', 0, 4) !== 'RIFF' ||
    buf.toString('ascii', 8, 12) !== 'WEBP'
  )
    return null

  const fmt = buf.toString('ascii', 12, 16)

  if (fmt === 'VP8 ' && buf.length >= 30)
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }

  if (fmt === 'VP8L' && buf.length >= 25) {
    const bits = buf.readUInt32LE(21)
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }
  }

  if (fmt === 'VP8X' && buf.length >= 30)
    return {
      w: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      h: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
    }

  return null
}

/** Reads SVG geometry from the root tag — explicit dims first, viewBox fallback. */
const svgDims = async (key) => {
  const { stdout } = await run('curl', ['-s', CDN_BASE + encodeURI(key)], {
    maxBuffer: 1 << 20,
  })
  const tag = stdout.slice(0, 8192).match(/<svg\b[^>]*>/i)

  if (!tag) return null

  const w = tag[0].match(/\bwidth="?([\d.]+)/i)
  const h = tag[0].match(/\bheight="?([\d.]+)/i)

  if (w && h) return { w: Math.round(+w[1]), h: Math.round(+h[1]) }

  const vb = tag[0].match(/\bviewBox="?[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/i)

  return vb ? { w: Math.round(+vb[1]), h: Math.round(+vb[2]) } : null
}

/**
 * Probes an image object with a single range GET — JPEG/PNG/WebP headers
 * are parsed locally so only the first HEADER_RANGE bytes travel.
 */
const imageDims = async (key) => {
  if (key.endsWith('.svg')) return svgDims(key)

  const { stdout } = await run(
    'curl',
    ['-s', '-r', `0-${HEADER_RANGE - 1}`, '-o', '-', CDN_BASE + encodeURI(key)],
    { maxBuffer: HEADER_RANGE, encoding: 'buffer' }
  )
  const buf = Buffer.isBuffer(stdout) ? stdout : Buffer.from(stdout, 'binary')

  return jpegDims(buf) || pngDims(buf) || webpDims(buf)
}

/** Probes a video object's first video stream geometry via ffprobe over HTTPS. */
const videoDims = async (key) => {
  const { stdout } = await run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-of',
    'json',
    CDN_BASE + encodeURI(key),
  ])
  const s = JSON.parse(stdout)?.streams?.[0]

  return s ? { w: s.width, h: s.height } : null
}

/**
 * Collects every media node `{ src, size, isVideo }` in the database.
 * Returns a Map of `folder + src` → `{ folder, src, size, isVideo, nodes[] }`
 * where `nodes` holds `{ node, path }` for every locale occurrence — `node`
 * is the live object reference so `--fix` updates every language at once,
 * and `path` is the RTDB location (`translations/<loc>/projects/…`) so
 * `--push` can write the same leaf remotely.
 */
const collectMedia = (db) => {
  const map = new Map()

  const collect = (node, folder, path) => {
    if (!node || typeof node !== 'object') return

    if (typeof node.src === 'string' && Array.isArray(node.size)) {
      const key = folder + node.src
      let rec = map.get(key)

      if (!rec) {
        rec = {
          folder,
          src: node.src,
          size: node.size,
          isVideo: !!node.isVideo,
          nodes: [],
        }
        map.set(key, rec)
      }

      rec.nodes.push({ node, path })
      return
    }

    for (const k in node) collect(node[k], folder, path ? `${path}/${k}` : k)
  }

  const visit = (node, path) => {
    if (!node || typeof node !== 'object') return

    if (node.projects && typeof node.projects === 'object') {
      for (const p in node.projects) {
        const project = node.projects[p]
        collect(project, project.folder || '', `${path}/projects/${p}`)
      }
    }

    for (const k in node) {
      if (k !== 'projects') visit(node[k], path ? `${path}/${k}` : k)
    }
  }

  visit(db, '')
  return map
}

/** Picks the first bucket object whose suffix marks a source-fidelity variant. */
const pickObject = (entry, manifest) => {
  const base = entry.folder + entry.src
  const variants = entry.isVideo ? VIDEO_DIM_VARIANTS : IMAGE_DIM_VARIANTS

  for (const suffix of variants) {
    if (manifest.has(base + suffix)) return base + suffix
  }

  return null
}

/** Loads the live bucket listing, falling back to the persisted manifest. */
const getManifest = async () => {
  const live = await fetchMediaManifest()

  if (live) return live

  const persisted = loadMediaManifest(META_DIR)

  if (!persisted) {
    console.error('media-size-validation: bucket listing failed and no persisted manifest found')
    process.exit(2)
  }

  console.warn('media-size-validation: using persisted media-manifest.json (live listing failed)')
  return persisted
}

const main = async () => {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  const entries = [...collectMedia(db).values()]
  const manifest = await getManifest()

  console.log(`media-size-validation: ${entries.length} unique media entries`)

  const results = []
  let done = 0
  const queue = [...entries]

  const worker = async () => {
    while (queue.length) {
      const entry = queue.shift()
      const object = pickObject(entry, manifest)
      const rec = { ...entry, object, actual: null, error: null }

      try {
        if (!object) rec.error = 'no source-fidelity object in manifest'
        else rec.actual = entry.isVideo ? await videoDims(object) : await imageDims(object)
        if (object && !rec.actual) rec.error = 'probe failed'
      } catch (e) {
        rec.error = String(e).slice(0, 200)
      }

      results.push(rec)
      if (++done % 50 === 0) console.log(`media-size-validation: ${done}/${entries.length}`)
    }
  }

  await Promise.all(Array.from({ length: WORKERS }, worker))

  const diffs = results.filter(
    (r) => r.actual && (r.actual.w !== r.size[0] || r.actual.h !== r.size[1])
  )
  const errors = results.filter((r) => r.error)

  for (const d of diffs)
    console.log(
      `DIFF ${d.folder}${d.src} declared ${d.size[0]}x${d.size[1]} ` +
        `actual ${d.actual.w}x${d.actual.h} (${d.object})`
    )

  for (const e of errors)
    console.log(`ERR  ${e.folder}${e.src} ${e.error} (${e.object || 'no object'})`)

  console.log(
    `media-size-validation: ${results.length} probed, ` +
      `${diffs.length} mismatched, ${errors.length} errors`
  )

  if (JSON_OUT) {
    fs.writeFileSync(
      JSON_OUT,
      JSON.stringify(
        results.map(({ nodes, ...rest }) => ({ ...rest, locales: nodes.length })),
        null,
        2
      ) + '\n'
    )
    console.log(`media-size-validation: report written to ${JSON_OUT}`)
  }

  if (FIX && diffs.length) {
    for (const d of diffs) {
      for (const { node } of d.nodes) node.size = [d.actual.w, d.actual.h]
    }

    fs.writeFileSync(DB_PATH, `${JSON.stringify(db, null, 2)}\n`, 'utf-8')
    console.log(`media-size-validation: updated ${diffs.length} entries in database.json`)
  }

  if (PUSH) await pushLive(results)

  if (diffs.length || errors.length) process.exit(FIX && !errors.length ? 0 : 1)
}

/** RTDB REST root — multi-path PATCH target for the live CMS database. */
const RTDB_URL = 'https://luiskr-com.firebaseio.com'

/**
 * Reads a Google OAuth2 access token from gcloud Application Default
 * Credentials — the same auth surface `firebase deploy` uses, so no
 * service-account key file is needed on a machine that already runs
 * `gcloud auth application-default login`.
 */
const adcToken = async () => {
  const { stdout } = await run('gcloud', ['auth', 'application-default', 'print-access-token'])

  return stdout.trim()
}

/**
 * Pushes probed intrinsic sizes to the live Firebase RTDB.
 *
 * Per locale, `translations/<loc>/projects` is fetched once and every
 * media node's live `size` is compared against the probed value — only
 * drifted leaves go into the multi-path PATCH, so unchanged rows are
 * never rewritten and the request stays small even on a fully synced
 * database (the PATCH body ends up nearly empty).
 */
const pushLive = async (results) => {
  const wanted = new Map()

  for (const r of results) {
    if (!r.actual) continue

    for (const { path } of r.nodes) wanted.set(`${path}/size`, [r.actual.w, r.actual.h])
  }

  if (!wanted.size) {
    console.log('media-size-validation: nothing probed — skipping Firebase push')
    return
  }

  const locales = new Set([...wanted.keys()].map((p) => p.split('/')[1]).filter(Boolean))
  const token = await adcToken()
  const updates = {}

  for (const loc of locales) {
    const res = await fetch(
      `${RTDB_URL}/translations/${loc}/projects.json?access_token=${token}&shallow=false`
    )

    if (!res.ok) {
      console.error(`media-size-validation: RTDB read failed for ${loc} (${res.status})`)
      continue
    }

    const live = await res.json()
    const flat = new Map()
    const walk = (node, path) => {
      if (!node || typeof node !== 'object') return

      flat.set(path, node)
      for (const k in node) walk(node[k], `${path}/${k}`)
    }

    walk(live, `translations/${loc}/projects`)

    for (const [path, size] of wanted) {
      if (!path.startsWith(`translations/${loc}/`)) continue

      const liveNode = flat.get(path)

      if (!Array.isArray(liveNode) || liveNode[0] !== size[0] || liveNode[1] !== size[1])
        updates[path] = size
    }
  }

  const paths = Object.keys(updates)

  if (!paths.length) {
    console.log('media-size-validation: Firebase RTDB already in sync — 0 writes needed')
    return
  }

  const res = await fetch(`${RTDB_URL}/.json?access_token=${token}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updates),
  })

  if (!res.ok) {
    console.error(`media-size-validation: RTDB PATCH failed (${res.status}) ${await res.text()}`)
    process.exit(2)
  }

  console.log(`media-size-validation: pushed ${paths.length} size corrections to Firebase RTDB`)
}

main().catch((e) => {
  console.error(`media-size-validation: fatal ${e}`)
  process.exit(2)
})
