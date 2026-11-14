#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/upload.mjs
 * @description Co-located artifact writer — uploads generated .vtt/.txt
 * bodies to the media bucket at the exact sibling key of the source asset
 * via the Storage JSON API (`uploadType=media`). The bucket enforces a
 * retention policy (objects are write-once), so `uploadText` treats a
 * 403 retention rejection as "already exists" and the orchestrator
 * pre-filters known keys through the fetched manifest — no doomed writes.
 */

import { gcpFetch } from './gcp.mjs'
import { MEDIA_BUCKET, MEDIA_PREFIX } from '../../build/media-manifest.mjs'

const UPLOAD_API = `https://storage.googleapis.com/upload/storage/v1/b/${MEDIA_BUCKET}/o`

/** Content types per generated artifact kind. */
export const A11Y_MIME = Object.freeze({
  vtt: 'text/vtt; charset=utf-8',
  longdesc: 'text/plain; charset=utf-8',
})

/** Immutable cache — generated files are content-stable once written. */
const CACHE_CONTROL = 'public, max-age=31536000, immutable'

/**
 * Uploads one text artifact to a prefix-relative key.
 * @param {string} key Key relative to `public/_v3/` (e.g. `a/b/x.vtt`).
 * @param {string} body UTF-8 file body.
 * @param {string} mime Content-Type (an A11Y_MIME member).
 * @returns {Promise<'uploaded'|'exists'|'failed'>}
 */
export async function uploadText(key, body, mime) {
  const url =
    `${UPLOAD_API}?uploadType=media&name=${encodeURIComponent(`${MEDIA_PREFIX}${key}`)}` +
    `&ifGenerationMatch=0`

  const res = await gcpFetch(url, {
    method: 'POST',
    headers: {
      'content-type': mime,
      'x-goog-meta-cache-control': CACHE_CONTROL,
    },
    body,
    _raw: true,
  })

  if (res.ok) return 'uploaded'

  // 403 retention / 412 precondition ⇒ object already present — a skip,
  // not a failure, on the write-once bucket.
  if (res.status === 403 || res.status === 404 || res.status === 412) {
    await res.text().catch(() => {})

    return 'exists'
  }

  const detail = await res.text().catch(() => '')

  console.warn(`[a11y-upload] ${key} → HTTP ${res.status} ${detail.slice(0, 160)}`)

  return 'failed'
}
