#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/inventory.mjs
 * @description Media inventory for the a11y pipeline — walks the public
 * RTDB `translations` tree (all 16 locales in one fetch, falling back to
 * the repo's `database.json` snapshot) and collects every `{src,isVideo,label}`
 * media item into per-stem records carrying every locale's human label —
 * the localized labels seed each language's description text for free.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { CDN_URLS } from '../../../../core/tokens/media/urls.ts'
import { MEDIA } from '../../../../core/tokens/media/suffixes.ts'
import { MEDIA_BUCKET, MEDIA_PREFIX } from '../../build/media-manifest.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')

/** Local DB snapshot used when the live RTDB fetch fails. */
const LOCAL_DB = path.join(ROOT, 'database.json')

/** Public read endpoint — `translations` is `.read: true` for all. */
const DB_URL = `${CDN_URLS.FIREBASE_DB}/translations.json`

/**
 * Fetches the full translations tree — live RTDB first, repo snapshot as
 * the offline fallback so the pipeline still runs without network DB.
 * @returns {Promise<object>} `translations` object keyed by locale.
 */
export async function fetchTranslations() {
  try {
    const res = await fetch(DB_URL)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const body = await res.json()

    if (body && typeof body === 'object') return body
  } catch {
    /* offline → snapshot */
  }

  return JSON.parse(fs.readFileSync(LOCAL_DB, 'utf-8')).translations
}

/**
 * Recursively harvests media items `{src,isVideo,label}` under a node —
 * every project cover + section media row anywhere in the tree counts as
 * a site asset. `folder` propagates down so nested media rows resolve
 * against their project's bucket prefix.
 * @param {*} node Subtree to walk.
 * @param {string} folder Active bucket folder prefix.
 * @param {(item: object, folder: string) => void} emit Item sink.
 */
const harvest = (node, folder, emit) => {
  if (!node || typeof node !== 'object') return

  const nextFolder = typeof node.folder === 'string' && node.folder ? node.folder : folder

  if (typeof node.src === 'string' && node.src) emit(node, nextFolder)

  for (const key of Object.keys(node)) harvest(node[key], nextFolder, emit)
}

/**
 * Collects the deduplicated media inventory across every locale —
 * `{key, isVideo, folder, src, labels}` where `labels[locale]` is that
 * language's own human-written caption (empty string when the locale
 * leaves the item unlabelled).
 * @param {object} translations `translations` tree keyed by locale.
 * @returns {Map<string, {key: string, isVideo: boolean, folder: string, src: string, labels: Record<string,string>}>}
 */
export function collectMedia(translations = {}) {
  const stems = new Map()

  for (const [locale, tree] of Object.entries(translations)) {
    if (!tree || typeof tree !== 'object') continue

    harvest(tree, '', (item, folder) => {
      const key = `${folder}${item.src}`

      let rec = stems.get(key)

      if (!rec) {
        rec = {
          key,
          isVideo: Boolean(item.isVideo),
          folder,
          src: item.src,
          labels: {},
        }

        stems.set(key, rec)
      }

      // isVideo is authoritative OR — one locale marking it is enough.
      if (item.isVideo) rec.isVideo = true

      if (typeof item.label === 'string' && item.label) rec.labels[locale] = item.label
    })
  }

  return stems
}

/**
 * gs:// URI + best analysis key for an inventory record — videos annotate
 * the full `.mp4`; images annotate the uncompressed mozjpeg pass when the
 * manifest lists it, else the bare `.jpg` original.
 * @param {object} rec Inventory record.
 * @param {Set<string>|null} manifest Bucket key set (relative to MEDIA_PREFIX).
 * @returns {{gsUri: string, key: string}} gs:// URI + prefix-relative key.
 */
export function analysisSource(rec, manifest) {
  if (rec.isVideo) {
    const key = `${rec.key}${MEDIA.VIDEO_EXT}`

    return { gsUri: `gs://${MEDIA_BUCKET}/${MEDIA_PREFIX}${key}`, key }
  }

  const hiKey = `${rec.key}${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.EXT}`

  const key = manifest && !manifest.has(hiKey) ? `${rec.key}${MEDIA.EXT}` : hiKey

  return { gsUri: `gs://${MEDIA_BUCKET}/${MEDIA_PREFIX}${key}`, key }
}
