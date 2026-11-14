#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/vtt.mjs
 * @description Pure WebVTT synthesis — converts the normalized video
 * annotation timeline into cue lists and serialized `.vtt` text.
 * Kept free of IO so the cue rules are unit-testable without GCP.
 *
 * Cue grammar (English source — localized variants translate the same
 * strings afterwards):
 *   visual line : "<Top label>, <label>…"          (sentence-cased)
 *   ocr line    : "On-screen text: <joined text>"
 * A shot window emits one cue covering [start, end); consecutive
 * identical texts merge so a static stretch isn't re-read cue-by-cue.
 */

/** Fraction of a shot a label/text must overlap to attach to the cue. */
const MIN_OVERLAP = 0.15

/** The fixed sentence prefix every OCR cue line carries. Exported so
 *  translation memory keys and tests share one literal. */
export const OCR_PREFIX = 'On-screen text: '

/** Top-N labels per window — deeper entries rarely survive confidence. */
const MAX_LABELS = 3

/** OCR segments below this confidence are too noisy to announce. */
const MIN_TEXT_CONFIDENCE = 0.5

/** Labels above this share of a shot merge into the same cue. */
const MAX_LABELS_JOIN = ', '

/**
 * `seconds` `"12.5s"`/number/`"0"` → milliseconds — the Video
 * Intelligence API serializes offsets as `"<sec>s"` strings.
 * @param {string|number|undefined|null} offset API offset field.
 * @returns {number} Milliseconds, 0 for missing/zero.
 */
export const offsetMs = (offset) => {
  if (offset === undefined || offset === null) return 0

  const raw = typeof offset === 'number' ? offset : parseFloat(String(offset).replace(/s$/, ''))

  return Number.isFinite(raw) ? Math.round(raw * 1000) : 0
}

/**
 * Milliseconds → `HH:MM:SS.mmm` WebVTT timestamp.
 * @param {number} ms Milliseconds (clamped ≥ 0).
 * @returns {string} WebVTT timestamp.
 */
export const vttTime = (ms) => {
  const t = Math.max(0, Math.round(ms))

  const h = Math.floor(t / 3600000)

  const m = Math.floor((t % 3600000) / 60000)

  const s = Math.floor((t % 60000) / 1000)

  const mm = t % 1000

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(mm).padStart(3, '0')}`
}

/** Overlap length (ms) of two [start,end) windows. */
const overlapMs = (aStart, aEnd, bStart, bEnd) =>
  Math.max(0, Math.min(aEnd, bEnd) - Math.max(aStart, bStart))

/**
 * Capitalizes the first character of a label list and joins the rest —
 * Vision entities arrive lowercase, cues read as sentences.
 * @param {string[]} labels Lowercase entity descriptions.
 * @returns {string} "Screenshot, user interface, website".
 */
const sentenceJoin = (labels) => {
  const joined = labels.join(MAX_LABELS_JOIN)

  return joined.charAt(0).toUpperCase() + joined.slice(1)
}

/**
 * One window → cue parts `{visual, ocr}`: `visual` is the sentence-cased
 * label line (translated per locale), `ocr` the verbatim on-screen text
 * (never translated — it's quoted pixels). Either may be empty.
 * @param {{labels: string[], texts: string[]}} window Normalized window.
 * @returns {{visual: string, ocr: string}}
 */
export const cueParts = ({ labels, texts }) => ({
  visual: labels.length ? `${sentenceJoin(labels)}.` : '',
  ocr: texts.join(' — '),
})

/**
 * Normalized Video Intelligence result → shot windows carrying their
 * overlapping labels + OCR texts.
 *
 * Shot boundaries come from `shotAnnotations`; when absent (static
 * videos sometimes report a single implicit shot) one window spans the
 * furthest observed offset. Label/text segments attach when they
 * overlap ≥ MIN_OVERLAP of the window — shot-mode label segments align
 * to shot bounds anyway, so this mainly guards OCR drift at cuts.
 * @param {object} ann `annotationResults[0]` of a finished operation.
 * @returns {{windows: Array<{start:number,end:number,labels:string[],texts:string[]}>, durationMs:number}}
 */
export function normalizeAnnotation(ann = {}) {
  const shots = (ann.shotAnnotations || [])
    .map((s) => ({ start: offsetMs(s.startTimeOffset), end: offsetMs(s.endTimeOffset) }))
    .filter((s) => s.end > s.start)

  const labelSegs = (ann.shotLabelAnnotations || []).flatMap((l) =>
    (l.segments || []).map((seg) => ({
      start: offsetMs(seg.segment?.startTimeOffset),
      end: offsetMs(seg.segment?.endTimeOffset),
      text: l.entity?.description || '',
      confidence: seg.confidence ?? 0,
    }))
  )

  const textSegs = (ann.textAnnotations || []).flatMap((t) =>
    (t.segments || []).map((seg) => ({
      start: offsetMs(seg.segment?.startTimeOffset),
      end: offsetMs(seg.segment?.endTimeOffset),
      text: String(t.text || '')
        .replace(/\s+/g, ' ')
        .trim(),
      confidence: seg.confidence ?? 1,
    }))
  )

  const durationMs = Math.max(
    0,
    ...shots.map((s) => s.end),
    ...labelSegs.map((s) => s.end),
    ...textSegs.map((s) => s.end)
  )

  // A video with no detected shots collapses to one full-span window —
  // the cue still needs a carrier for labels/texts/duration.
  const windows = shots.length ? shots : durationMs > 0 ? [{ start: 0, end: durationMs }] : []

  return {
    durationMs,
    windows: windows.map((w) => {
      const span = Math.max(1, w.end - w.start)

      const labels = labelSegs
        .filter((s) => s.text && overlapMs(w.start, w.end, s.start, s.end) / span >= MIN_OVERLAP)
        .sort((a, b) => b.confidence - a.confidence)
        .map((s) => s.text)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, MAX_LABELS)

      const texts = textSegs
        .filter(
          (s) =>
            s.text &&
            s.confidence >= MIN_TEXT_CONFIDENCE &&
            overlapMs(w.start, w.end, s.start, s.end) / span >= MIN_OVERLAP
        )
        .map((s) => s.text)
        .filter((v, i, a) => a.indexOf(v) === i)

      return { start: w.start, end: w.end, labels, texts }
    }),
  }
}

/**
 * Normalized windows → cue parts. Empty windows produce no cue; adjacent
 * identical `{visual, ocr}` pairs merge into one span (a screen reader
 * shouldn't re-read the same description shot after shot).
 * @param {Array<{start:number,end:number,labels:string[],texts:string[]}>} windows
 * @returns {Array<{start:number,end:number,visual:string,ocr:string}>}
 */
export function synthCues(windows) {
  const cues = []

  for (const w of windows) {
    const { visual, ocr } = cueParts(w)

    if (!visual && !ocr) continue

    const prev = cues[cues.length - 1]

    if (prev && prev.visual === visual && prev.ocr === ocr) {
      prev.end = Math.max(prev.end, w.end)

      continue
    }

    cues.push({ start: w.start, end: w.end, visual, ocr })
  }

  return cues
}

/**
 * Composes one cue's display text from localized parts — the translated
 * visual line, then the localized OCR scaffold + verbatim text.
 * @param {{visual:string, ocr:string}} cue Cue parts.
 * @param {string} ocrScaffold Localized "On-screen text:" prefix.
 * @returns {string} Cue text ('' when both parts are empty).
 */
export const renderCue = ({ visual, ocr }, ocrScaffold = OCR_PREFIX) =>
  [visual, ocr ? `${ocrScaffold.trimEnd()} ${ocr}` : ''].filter(Boolean).join('\n')

/**
 * Cue list → serialized WebVTT payload. A `NOTE` header carries the
 * human asset label + generation marker (spec's context requirement);
 * cue payload text is escaped for `-->` so OCR arrows can't corrupt it.
 * @param {Array<{start:number,end:number,text:string}>} cues
 * @param {string} [note] Optional NOTE header line (asset label).
 * @returns {string} Complete `.vtt` file body.
 */
export function cuesToVtt(cues, note = '') {
  const head = note ? `WEBVTT\n\nNOTE\n${note}\n\n` : 'WEBVTT\n\n'

  return (
    head +
    cues
      .map(
        (c) => `${vttTime(c.start)} --> ${vttTime(c.end)}\n${String(c.text).replace(/-->/g, '→')}\n`
      )
      .join('\n')
  )
}
