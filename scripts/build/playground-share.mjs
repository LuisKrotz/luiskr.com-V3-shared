#!/usr/bin/env node

/**
 * @file shared/scripts/build/playground-share.mjs
 * @description Playground share-capture helpers shared by the build-time
 * generators (generate-sitemap.js, build-locale-pages.mjs,
 * generate-llm-pages.mjs) for every experiment share set (Earth
 * Playground, Star Field).
 *
 * Every screenshot uploaded to the bucket under a set's share/ prefix
 * (`public/_v3/experiments/<experiment>/share/`) joins that set's
 * social-share rotation automatically: `shareImageKeys()` filters the
 * live bucket manifest by the token prefix + image extension so no
 * filename list has to be maintained — dropping a new capture into the
 * folder is the only step.
 *
 * `shuffled()` produces a fresh Fisher–Yates permutation per build; the
 * locale-page emitter pops picks off the queue so every emitted document
 * card-images a random capture while the whole set still appears on the
 * page (extra og:image candidates, the parked gallery section, the
 * JSON-LD ImageObject ItemList and the sitemap image tags).
 */

import { EARTH_SHARE } from '../../../core/tokens/playground/share.ts'

/**
 * Every share-capture key on the bucket manifest, sorted — keys are
 * relative to the media manifest root (`experiments/…`), matching
 * media-manifest.mjs's convention. Returns [] when the manifest listing
 * is absent so callers keep their pre-share-set behaviour.
 * @param {Set<string>|null} manifest bucket key set (or null)
 * @param {object} [share] share-set token map (EARTH_SHARE default)
 * @returns {string[]} sorted share-capture keys
 */
export const shareImageKeys = (manifest, share = EARTH_SHARE) => {
  if (!manifest) return []

  return [...manifest]
    .filter(
      (k) =>
        typeof k === 'string' &&
        k.startsWith(share.PREFIX) &&
        share.IMAGE_EXTS.some((ext) => k.toLowerCase().endsWith(ext))
    )
    .sort()
}

/**
 * Manifest → CDN-absolute share URLs (unencoded — callers encode at
 * emission time through their own `enc`/`encLoc` helpers).
 * @param {Set<string>|null} manifest bucket key set (or null)
 * @param {string} cdnBase CDN base URL the keys resolve against
 * @param {object} [share] share-set token map (EARTH_SHARE default)
 * @returns {string[]} absolute share-image URLs
 */
export const shareImageUrls = (manifest, cdnBase, share = EARTH_SHARE) =>
  shareImageKeys(manifest, share).map((k) => `${cdnBase}${k}`)

/**
 * The runtime share manifest payload — emitted to the set's
 * `MANIFEST_URL` under `website/public/meta/` so the SPA can rotate
 * og:image through the whole set without knowing the bucket listing.
 * @param {string[]} urls absolute share-image URLs
 * @param {string} cdnBase CDN base URL
 * @param {object} [share] share-set token map (EARTH_SHARE default)
 * @returns {object} serializable manifest document
 */
export const shareManifestDoc = (urls, cdnBase, share = EARTH_SHARE) => ({
  generated: new Date().toISOString(),
  prefix: `${cdnBase}${share.PREFIX}`,
  count: urls.length,
  images: urls,
  files: urls.map((u) => u.slice(`${cdnBase}${share.PREFIX}`.length)),
})

/**
 * Fisher–Yates copy — a fresh permutation per build so consecutive
 * emitted pages draw different share images while every capture stays in
 * the rotation. The input array is never mutated.
 * @param {Array} arr source array
 * @returns {Array} shuffled copy
 */
export const shuffled = (arr) => {
  const out = [...arr]

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[out[i], out[j]] = [out[j], out[i]]
  }

  return out
}
