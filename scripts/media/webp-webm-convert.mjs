#!/usr/bin/env node

/**
 * @file shared/scripts/media/webp-webm-convert.mjs
 * @description Batch CDN transcode — every image (jpg/png) and video (mp4)
 * object under `public/_v3/` gets a `.webp` / `.webm` sibling uploaded back
 * to the same bucket path so the runtime can serve the compressed variant
 * when it exists and fall back to the original otherwise.
 *
 * Design notes:
 *  - Light compression only: webp q=92 / VP9 crf=30 keep near-source
 *    fidelity; an output that ends up >= its input is discarded (no point
 *    serving a bigger "compressed" file) and the source keeps standing
 *    alone — that is the "too big" escape hatch the runtime's
 *    if-exists check relies on.
 *  - Resumable: the manifest listing is fetched up front and any target
 *    key that already exists on the bucket is skipped, so interrupted runs
 *    simply continue where they stopped.
 *  - WebM is chunked/streamed by nature: clusters flush progressively so
 *    playback starts while later blocks still decode (the "small blocks
 *    that mount" behaviour) — no whole-file buffering like single-pass mp4.
 *
 * Usage: node shared/scripts/media/webp-webm-convert.mjs [--workers N] [--dry]
 */

import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import { MEDIA } from '../../../core/tokens/media/suffixes.ts'
import { fetchMediaManifest } from '../build/media-manifest.mjs'

const run = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const BUCKET = 'gs://luiskr.com/public/_v3/'

const WORK_DIR = path.join(os.tmpdir(), 'webp-webm-convert')

/** Source extensions → target extension + mime type. */
const CONVERT = Object.freeze({
  '.jpg': { ext: MEDIA.WEBP_EXT, mime: 'image/webp' },
  '.jpeg': { ext: MEDIA.WEBP_EXT, mime: 'image/webp' },
  '.png': { ext: MEDIA.WEBP_EXT, mime: 'image/webp' },
  '.mp4': { ext: MEDIA.WEBM_EXT, mime: 'video/webm' },
})

/** Video source size cap — heavier originals keep standing alone. */
const VIDEO_MAX_BYTES = 1024 * 1024 * 1024

/** Image source size cap — anything past 64 MB is a print asset. */
const IMAGE_MAX_BYTES = 64 * 1024 * 1024

const args = process.argv.slice(2)
const DRY = args.includes('--dry')
const keysFile = args[args.indexOf('--keys') + 1]
const workers = Math.max(
  1,
  Math.min(parseInt(args[args.indexOf('--workers') + 1] || '4', 10) || 4, 12)
)

/**
 * ffmpeg per-media conversion. WebP gets a high-quality picture preset;
 * WebM gets VP9+Opus with row-mt multithreading — cluster output streams
 * progressively so the file plays while still buffering.
 * @param {string} src - local source path
 * @param {string} dst - local target path
 * @param {string} srcExt - lowercase source extension
 */
const ffmpegArgs = (src, dst, srcExt) =>
  srcExt === '.mp4'
    ? [
        '-hide_banner',
        '-y',
        '-i',
        src,
        '-c:v',
        'libvpx-vp9',
        '-crf',
        '30',
        '-b:v',
        '0',
        '-row-mt',
        '1',
        '-cpu-used',
        '3',
        '-deadline',
        'good',
        '-c:a',
        'libopus',
        '-b:a',
        '96k',
        dst,
      ]
    : [
        '-hide_banner',
        '-y',
        '-i',
        src,
        '-c:v',
        'libwebp',
        '-quality',
        '92',
        '-compression_level',
        '4',
        '-preset',
        'picture',
        dst,
      ]

/** Downloads one key, transcodes, uploads the sibling, returns a status. */
const convertOne = async (key, spec) => {
  const srcExt = path.extname(key).toLowerCase()
  const target = key.slice(0, -srcExt.length) + spec.ext
  const hash = createHash('sha256').update(key).digest('base64url').slice(0, 16)
  const safe = `${path.basename(key).replace(/[^\w.-]+/g, '_')}_${hash}`
  const localSrc = path.join(WORK_DIR, `in_${safe}${srcExt}`)
  const localDst = path.join(WORK_DIR, `out_${safe}${spec.ext}`)

  try {
    await run('gsutil', ['cp', `${BUCKET}${key}`, localSrc], { maxBuffer: 1 << 24 })

    const sizeCap = srcExt === '.mp4' ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES
    const { size } = fs.statSync(localSrc)

    if (size > sizeCap) return [key, 'skipped-oversize']

    await run('ffmpeg', ffmpegArgs(localSrc, localDst, srcExt), { maxBuffer: 1 << 24 })

    const outSize = fs.statSync(localDst).size

    if (outSize >= size) return [key, 'skipped-not-smaller']

    if (!DRY) {
      await run(
        'gsutil',
        [
          '-h',
          `Content-Type:${spec.mime}`,
          '-h',
          'Cache-Control:public, max-age=31536000, immutable',
          'cp',
          localDst,
          `${BUCKET}${target}`,
        ],
        { maxBuffer: 1 << 24 }
      )
    }

    return [key, DRY ? 'dry-run' : `converted ${((outSize / size) * 100).toFixed(0)}%`]
  } catch (err) {
    // libwebp hard-caps frames at 16383px per side — full-page screenshots
    // exceed it, which is a format limit, not a conversion error.
    try {
      const { stdout } = await run(
        'ffprobe',
        [
          '-v',
          'error',
          '-select_streams',
          'v:0',
          '-show_entries',
          'stream=width,height',
          '-of',
          'csv=p=0',
          localSrc,
        ],
        { maxBuffer: 1 << 24 }
      )
      const [w, h] = stdout.trim().split(',').map(Number)

      if (Math.max(w || 0, h || 0) > 16383) return [key, 'skipped-dimension-limit']
    } catch {
      // probe failed — report the original error
    }

    return [key, `error ${String(err?.stderr || err?.message || err).slice(0, 160)}`]
  } finally {
    for (const f of [localSrc, localDst]) {
      try {
        fs.unlinkSync(f)
      } catch {
        // tmp cleanup — best effort
      }
    }
  }
}

/** Bounded worker pool over the key list. */
const main = async () => {
  fs.mkdirSync(WORK_DIR, { recursive: true })

  const manifest = await fetchMediaManifest()

  if (!manifest) {
    console.error('manifest listing failed — aborting')

    process.exit(1)
  }

  const only = keysFile
    ? new Set(fs.readFileSync(keysFile, 'utf-8').split('\n').filter(Boolean))
    : null

  const jobs = [...manifest]
    .map((key) => {
      const srcExt = path.extname(key).toLowerCase()
      const spec = CONVERT[srcExt]

      if (!spec) return null

      const target = key.slice(0, -srcExt.length) + spec.ext

      return manifest.has(target) ? null : { key, spec }
    })
    .filter((job) => job && (!only || only.has(job.key)))

  console.log(`[webp-webm] ${jobs.length} conversions pending (${workers} workers)`)

  const results = []
  let cursor = 0
  let done = 0

  const worker = async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++]

      results.push(await convertOne(job.key, job.spec))

      done++

      if (done % 25 === 0) console.log(`[webp-webm] ${done}/${jobs.length}`)
    }
  }

  await Promise.all(Array.from({ length: workers }, worker))

  const logPath = path.join(ROOT, 'website', 'public', 'meta', 'media-convert-log.json')
  const merged = new Map()

  try {
    for (const [k, s] of JSON.parse(fs.readFileSync(logPath, 'utf-8')).results) {
      merged.set(k, s)
    }
  } catch {
    // no prior log — this run is the whole record
  }

  for (const [k, s] of results) merged.set(k, s)

  const summary = { generated: new Date().toISOString(), results: [...merged] }

  fs.writeFileSync(logPath, `${JSON.stringify(summary, null, 1)}\n`, 'utf-8')

  const tally = {}

  for (const [, status] of results) {
    const k = status.split(' ')[0]

    tally[k] = (tally[k] || 0) + 1
  }

  console.log('[webp-webm] done:', tally)
}

await main()
