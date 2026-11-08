#!/usr/bin/env node

/**
 * @file shared/scripts/build/media-manifest.mjs
 * @description CDN media inventory + best-variant resolution shared by the
 * build-time generators (generate-sitemap.js, build-locale-pages.mjs).
 *
 * Derivative naming on the bucket is per-object, not global: newer uploads
 * carry `-mozjpg-uncompressed` / `-mozjpg-50` / `-mozjpg3-MSSIM-tuned-kodak`
 * passes while legacy entries exist only as the raw `<src>.jpg`. Emitting a
 * guessed variant that 404s makes Google drop the indexing candidate — so
 * every media URL emitted for crawling resolves against a real object
 * listing fetched once through the bucket's public JSON listing API.
 *
 * `fetchMediaManifest()` returns a Set of keys relative to `MEDIA_PREFIX`
 * (e.g. `metcha/feed/x.jpg`); `persistMediaManifest` writes it next to the
 * sitemap artifacts so the synchronous locale-page generator can reload it
 * via `loadMediaManifest()` without a second listing round-trip.
 */

import fs from 'node:fs'

import { MEDIA } from '../../../core/tokens/media/suffixes.ts'

/** Object-name prefix every public media asset lives under on the bucket. */
export const MEDIA_PREFIX = 'public/_v3/'

const BUCKET = 'luiskr.com'

/** Anonymous `storage.objects.list` endpoint — the bucket is public. */
const LIST_ENDPOINT = `https://storage.googleapis.com/storage/v1/b/${BUCKET}/o`

const PAGE_SIZE = 1000

/**
 * Image-variant priority for indexing — highest available quality first:
 * the mozjpeg uncompressed pass, then the raw original, then q50, then the
 * kodak blur thumb. The first suffix that exists on the bucket wins.
 */
const IMAGE_VARIANTS = Object.freeze([
  `${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.EXT}`,
  MEDIA.EXT,
  `${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
  `${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
])

/** Video-content priority — full file first, scaledown fallback second. */
const VIDEO_CONTENT_VARIANTS = Object.freeze([
  MEDIA.VIDEO_EXT,
  `${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_EXT}`,
])

/** Poster variants a video can expose, in preference order. */
const VIDEO_THUMB_VARIANTS = Object.freeze([
  MEDIA.VIDEO_THUMB_EXT,
  `${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_THUMB_EXT}`,
  `${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
  MEDIA.EXT,
])

/** Image thumb/poster priority for previews (og:image, video posters). */
const IMAGE_THUMB_VARIANTS = Object.freeze([
  `${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
  `${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
  MEDIA.EXT,
])

/** First `base`-suffixed key from `variants` that exists in `manifest`. */
const pickVariant = (base, variants, manifest) => {
  for (const suffix of variants) {
    if (manifest.has(`${base}${suffix}`)) return `${base}${suffix}`
  }

  return null
}

/**
 * Lists every object key under MEDIA_PREFIX → Set of names relative to the
 * prefix (`metcha/feed/x.jpg`). Returns `null` when the listing fails so
 * callers can fall back to the historic naming convention.
 */
export async function fetchMediaManifest() {
  const keys = new Set()

  try {
    let pageToken = ''

    // Page through the listing until nextPageToken stops — a 1000-item
    // page ceiling means several round-trips for the full bucket.
    for (;;) {
      const url =
        `${LIST_ENDPOINT}?prefix=${encodeURIComponent(MEDIA_PREFIX)}` +
        `&fields=items(name),nextPageToken&maxResults=${PAGE_SIZE}` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '')

      const res = await fetch(url)

      if (!res.ok) return null

      const body = await res.json()

      // Keys arrive under the prefix — strip it so the Set holds
      // the same relative names resolveMediaUrls composes.
      for (const item of body.items || []) {
        if (item.name) keys.add(String(item.name).slice(MEDIA_PREFIX.length))
      }

      if (!body.nextPageToken) break

      pageToken = body.nextPageToken
    }

    return keys
  } catch {
    // Network/parse failure → null so callers fall back to convention.
    return null
  }
}

/**
 * Writes the key set next to the sitemap artifacts (`<meta>/media-manifest.json`)
 * so the synchronous locale-page generator can reload it without network.
 */
export function persistMediaManifest(metaDir, manifest) {
  fs.writeFileSync(
    `${metaDir}/media-manifest.json`,
    `${JSON.stringify([...manifest].sort(), null, 1)}\n`,
    'utf-8'
  )
}

/** Reads a previously persisted key set; `null` when absent/unreadable. */
export function loadMediaManifest(metaDir) {
  try {
    const raw = JSON.parse(fs.readFileSync(`${metaDir}/media-manifest.json`, 'utf-8'))

    return new Set(raw)
  } catch {
    return null
  }
}

/**
 * Resolves one media item to crawlable URLs — `{ source, thumb, isVideo }`.
 *
 * `source` is the highest-quality indexable variant (uncompressed pass →
 * raw original → q50 → blur thumb); `thumb` is the poster/preview variant.
 * With no manifest (listing failed) the historic convention is emitted —
 * `-mozjpg-uncompressed` for images, `.mp4`/`.mp4.jpg-thumb.jpg` for video —
 * matching the runtime URL builders in `core/utils/media.ts`.
 */
export function resolveMediaUrls(folder, item, manifest) {
  if (!item || !item.src) return { source: '', thumb: '', isVideo: false }

  const isVideo = item.isVideo ?? false
  const base = `${folder || ''}${item.src}`

  if (!manifest) {
    return isVideo
      ? {
          source: `${base}${MEDIA.VIDEO_EXT}`,
          thumb: `${base}${MEDIA.VIDEO_THUMB_EXT}`,
          isVideo,
        }
      : {
          source: `${base}${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.EXT}`,
          thumb: `${base}${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
          isVideo,
        }
  }

  if (isVideo) {
    const content = pickVariant(base, VIDEO_CONTENT_VARIANTS, manifest)
    const thumb = pickVariant(base, VIDEO_THUMB_VARIANTS, manifest)

    return { source: content || '', thumb: thumb || '', isVideo }
  }

  const source = pickVariant(base, IMAGE_VARIANTS, manifest)
  const thumb = pickVariant(base, IMAGE_THUMB_VARIANTS, manifest)

  return { source: source || '', thumb: thumb || source || '', isVideo }
}

/** Resolves a home-mosaic cover image to its best indexable key. */
export function resolveCoverKey(image, manifest) {
  const base = `covers/${image}`

  if (!manifest) return `${base}${MEDIA.EXT}`

  return pickVariant(base, IMAGE_VARIANTS, manifest) || `${base}${MEDIA.EXT}`
}

/** Bytes fetched per image-dims probe — SOF/IHDR headers live in the head. */
const DIMS_PROBE_BYTES = 64 * 1024

/**
 * Scans an image header for intrinsic dims — PNG IHDR (8-byte signature)
 * or JPEG SOFn marker walk (FFD8 + length-prefixed segments; SOF markers
 * are C0–CF except DHT/DAC/RST: C4, C8, CC). Returns [w, h] or null.
 * @param {Buffer} buf - head bytes of the image
 */
export const scanImageDims = (buf) => {
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  }

  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null

  let off = 2

  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) {
      off += 1

      continue
    }

    const marker = buf[off + 1]

    if (marker >= 0xd0 && marker <= 0xd9) {
      off += 2

      continue
    }

    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [buf.readUInt16BE(off + 7), buf.readUInt16BE(off + 5)]
    }

    off += 2 + buf.readUInt16BE(off + 2)
  }

  return null
}

/**
 * Probes a set of absolute image URLs for intrinsic dims — one 64 KB
 * range request per unique URL (the IHDR/SOF headers sit in the head).
 * Failures are silent: an unreachable or unparseable asset simply has
 * no entry in the returned map.
 * @param {string[]} urls absolute image URLs to probe
 * @param {number} timeoutMs per-request ceiling
 * @returns {Promise<Map<string, number[]>>} URL → [w, h]
 */
export async function probeImageDims(urls, timeoutMs = 20 * 1000) {
  const dims = new Map()

  await Promise.all(
    [...new Set(urls)].map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { Range: `bytes=0-${DIMS_PROBE_BYTES - 1}` },
          signal: AbortSignal.timeout(timeoutMs),
        })

        if (!res.ok) return

        const pair = scanImageDims(Buffer.from(await res.arrayBuffer()))

        if (pair) dims.set(url, pair)
      } catch {
        /* unreachable host → no dims for this asset */
      }
    })
  )

  return dims
}
