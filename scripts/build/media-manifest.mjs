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

    for (;;) {
      const url =
        `${LIST_ENDPOINT}?prefix=${encodeURIComponent(MEDIA_PREFIX)}` +
        `&fields=items(name),nextPageToken&maxResults=${PAGE_SIZE}` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '')

      const res = await fetch(url)

      if (!res.ok) return null

      const body = await res.json()

      for (const item of body.items || []) {
        if (item.name) keys.add(String(item.name).slice(MEDIA_PREFIX.length))
      }

      if (!body.nextPageToken) break

      pageToken = body.nextPageToken
    }

    return keys
  } catch {
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
