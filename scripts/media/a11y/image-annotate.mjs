#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/image-annotate.mjs
 * @description Cloud Vision client + longdesc composer for static images.
 * `annotateImage` calls `images:annotate` on a `gs://` object (labels,
 * on-screen text, localized objects, dominant colors, web entities);
 * `composeLongdesc` is the pure, unit-testable text builder that weaves
 * those signals — plus the CMS's own human-written `label` — into the
 * detailed extended description the `longdesc` contract requires.
 */

import { gcpJson } from './gcp.mjs'

const API = 'https://vision.googleapis.com/v1/images:annotate'

/** Feature bundle — every signal the longdesc text consumes, one call. */
const FEATURES = Object.freeze([
  { type: 'LABEL_DETECTION', maxResults: 15 },
  { type: 'TEXT_DETECTION' },
  { type: 'OBJECT_LOCALIZATION', maxResults: 15 },
  { type: 'IMAGE_PROPERTIES' },
  { type: 'WEB_DETECTION', maxResults: 10 },
])

/** Top-N entities each signal contributes to the prose. */
const MAX_LABELS = 12

const MAX_OBJECTS = 10

const MAX_COLORS = 3

const MAX_ENTITIES = 5

/**
 * One image annotation call.
 * @param {string} gsUri `gs://bucket/key` input URI.
 * @returns {Promise<object>} `responses[0]` of the annotate batch.
 */
export async function annotateImage(gsUri) {
  const body = await gcpJson(API, {
    method: 'POST',
    body: {
      requests: [{ image: { source: { imageUri: gsUri } }, features: [...FEATURES] }],
    },
  })

  const res = (body.responses || [])[0] || {}

  if (res.error) throw new Error(`vision annotate failed: ${res.error.message}`)

  return res
}

/**
 * Same annotate, inline `image.content` bytes — the escape hatch for
 * encodings the gs:// path can't open (arithmetic-coded mozjpeg).
 * @param {Buffer} bytes Decodable image payload (standard JPEG/PNG).
 * @returns {Promise<object>} `responses[0]` of the annotate batch.
 */
export async function annotateImageContent(bytes) {
  const body = await gcpJson(API, {
    method: 'POST',
    body: {
      requests: [{ image: { content: bytes.toString('base64') }, features: [...FEATURES] }],
    },
  })

  const res = (body.responses || [])[0] || {}

  if (res.error) throw new Error(`vision annotate failed: ${res.error.message}`)

  return res
}

/**
 * Curated RGB→name vocabulary for dominant-color prose — the Vision API
 * returns raw channels; a fixed naming table keeps descriptions honest
 * (no "rgb(12,34,56)" noise). Nearest-euclidean pick over ~24 centroids.
 */
const COLOR_NAMES = Object.freeze([
  ['black', 0x1c1c1e],
  ['white', 0xf5f5f7],
  ['gray', 0x8e8e93],
  ['silver', 0xc7c7cc],
  ['red', 0xd32f2f],
  ['crimson', 0xb3261e],
  ['orange', 0xf57c00],
  ['amber', 0xffc107],
  ['yellow', 0xf9e04b],
  ['olive', 0x808000],
  ['lime', 0x9ccc65],
  ['green', 0x388e3c],
  ['teal', 0x009688],
  ['cyan', 0x00bcd4],
  ['sky blue', 0x64b5f6],
  ['blue', 0x1976d2],
  ['navy', 0x1a237e],
  ['indigo', 0x3949ab],
  ['purple', 0x7b1fa2],
  ['violet', 0x8e24aa],
  ['magenta', 0xc2185b],
  ['pink', 0xf48fb1],
  ['brown', 0x6d4c41],
  ['beige', 0xd7ccc8],
])

/** Nearest named color for an RGB triple (squared-euclidean over centroids). */
const colorName = (r, g, b) => {
  let best = 'gray'

  let bestD = Infinity

  for (const [name, hex] of COLOR_NAMES) {
    const dr = r - ((hex >> 16) & 0xff)

    const dg = g - ((hex >> 8) & 0xff)

    const db = b - (hex & 0xff)

    const d = dr * dr + dg * dg + db * db

    if (d < bestD) {
      bestD = d
      best = name
    }
  }

  return best
}

/** Uppercases the first letter of a sentence fragment. */
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Scaffold sentences of the longdesc — quoted OCR content stays verbatim
 * (the literal pixels), while these carrier sentences are what each
 * locale's file actually translates.
 */
export const LONGDESC_SCAFFOLDS = Object.freeze({
  ALSO: 'the image also depicts',
  ELEMENTS: 'Visible elements include',
  OCR: 'On-screen text in the image reads:',
  PALETTE: 'The palette is dominated by',
  CONTEXT: 'This asset is associated with',
})

/**
 * Vision `responses[0]` → structured longdesc parts. Each field is one
 * paragraph of the final document; `ocrText` is the raw on-screen text
 * (verbatim — never machine-translated) while every other field is an
 * English scaffold the locale pass localizes. Any signal the API
 * withheld simply leaves its field empty — no filler.
 * @param {object} ann `responses[0]` payload.
 * @returns {{scene:string, elements:string, ocr:string, palette:string, context:string}}
 */
export function composeLongdescParts(ann = {}) {
  const labels = (ann.labelAnnotations || [])
    .map((l) => l.description)
    .filter(Boolean)
    .slice(0, MAX_LABELS)

  const objects = (ann.localizedObjectAnnotations || [])
    .map((o) => o.name)
    .filter(Boolean)
    .slice(0, MAX_OBJECTS)

  const colors = (ann.imagePropertiesAnnotation?.dominantColors?.colors || [])
    .slice(0, MAX_COLORS)
    .map((c) =>
      colorName(
        Math.round(c.color?.red ?? 0),
        Math.round(c.color?.green ?? 0),
        Math.round(c.color?.blue ?? 0)
      )
    )
    .filter((v, i, a) => a.indexOf(v) === i)

  const entities = (ann.webDetection?.webEntities || [])
    .map((e) => e.description)
    .filter(Boolean)
    .slice(0, MAX_ENTITIES)

  const text = (ann.textAnnotations?.[0]?.description || '').replace(/\s+/g, ' ').trim()

  return {
    scene: labels.length
      ? `${cap(labels.slice(0, 3).join(', '))}${labels.length > 3 ? `; ${LONGDESC_SCAFFOLDS.ALSO} ${labels.slice(3).join(', ')}` : ''}.`
      : '',
    elements: objects.length ? `${LONGDESC_SCAFFOLDS.ELEMENTS} ${objects.join(', ')}.` : '',
    ocr: text,
    palette: colors.length ? `${LONGDESC_SCAFFOLDS.PALETTE} ${colors.join(', ')}.` : '',
    context: entities.length ? `${LONGDESC_SCAFFOLDS.CONTEXT} ${entities.join(', ')}.` : '',
  }
}

/**
 * Renders the parts into the final plain-text longdesc body — label
 * line first (already in the file's own locale), then every non-empty
 * paragraph separated by blank lines, OCR wrapped in quotes last-third.
 * @param {{label?: string, parts: {scene:string,elements:string,ocr:string,palette:string,context:string}, ocrScaffold?: string}} args
 * @returns {string} Multi-line plain-text long description.
 */
export function renderLongdesc({ label = '', parts, ocrScaffold = LONGDESC_SCAFFOLDS.OCR }) {
  const lines = [label, parts.scene, parts.elements].filter(Boolean)

  if (parts.ocr) lines.push(`${ocrScaffold} "${parts.ocr}"`)

  lines.push(...[parts.palette, parts.context].filter(Boolean))

  return lines.join('\n\n')
}
