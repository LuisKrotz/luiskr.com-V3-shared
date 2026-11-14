#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/video-annotate.mjs
 * @description Video Intelligence client — submits `videos:annotate`
 * long-running operations for bucket-hosted mp4s (shot detection +
 * shot-mode labels + on-screen-text OCR) and polls them to completion.
 * The API reads `gs://` inputs directly, so no video bytes ever move
 * through this script.
 */

import { gcpJson } from './gcp.mjs'

const API = 'https://videointelligence.googleapis.com/v1'

/** Poll interval — annotate ops run ~30–90s on minute-scale videos. */
const POLL_MS = 15000

/** Operations older than this are abandoned rather than polled forever. */
const POLL_TIMEOUT_MS = 20 * 60 * 1000

/**
 * Submits an annotate operation for one video.
 * @param {string} gsUri `gs://bucket/key` input URI.
 * @returns {Promise<string>} Operation name for polling.
 */
export async function submitVideoAnnotate(gsUri) {
  const body = await gcpJson(`${API}/videos:annotate`, {
    method: 'POST',
    body: {
      inputUri: gsUri,
      features: ['LABEL_DETECTION', 'TEXT_DETECTION', 'SHOT_CHANGE_DETECTION'],
      videoContext: {
        labelDetectionConfig: {
          labelDetectionMode: 'SHOT_MODE',
          stationaryCamera: false,
        },
        textDetectionConfig: {
          languageHints: ['en', 'pt', 'es', 'de', 'fr', 'it', 'nl'],
        },
      },
    },
  })

  if (!body.name) throw new Error(`annotate returned no operation for ${gsUri}`)

  return body.name
}

/**
 * Polls one operation until `done`, returning `response` (or throwing on
 * `error`/timeout).
 * @param {string} opName Operation name from submitVideoAnnotate.
 * @param {(msg: string) => void} [log] Optional progress sink.
 * @returns {Promise<object>} The operation's `response` payload.
 */
export async function pollOperation(opName, log = () => {}) {
  const deadline = Date.now() + POLL_TIMEOUT_MS

  for (;;) {
    const op = await gcpJson(`${API}/${opName}`)

    if (op.done) {
      if (op.error)
        throw new Error(`annotate failed: ${op.error.message || JSON.stringify(op.error)}`)

      return op.response || {}
    }

    if (Date.now() > deadline) throw new Error(`annotate timed out: ${opName}`)

    const pct = (op.metadata?.annotationProgress || [])
      .map((p) => `${p.feature}:${p.progressPercent ?? 0}%`)
      .join(' ')

    if (pct) log(pct)

    await new Promise((resolve) => setTimeout(resolve, POLL_MS))
  }
}

/**
 * Full annotate round-trip for one video → `annotationResults[0]`.
 * @param {string} gsUri `gs://bucket/key` input URI.
 * @param {(msg: string) => void} [log] Progress sink.
 * @returns {Promise<object>} Annotation result for the video.
 */
export async function annotateVideo(gsUri, log) {
  const opName = await submitVideoAnnotate(gsUri)

  const response = await pollOperation(opName, log)

  return (response.annotationResults || [])[0] || {}
}
