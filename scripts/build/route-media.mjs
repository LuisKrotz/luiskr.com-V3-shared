/**
 * @file shared/scripts/build/route-media.mjs
 * @description Route media helpers shared by the build-time generators
 * (generate-sitemap.js, build-locale-pages.mjs, generate-llm-pages.mjs):
 * the Cyrillic-aware slugify + capped media-slug transform that mirrors
 * `mediaSlugSeq` in core/utils/string.ts byte for byte, plus the project
 * sections traversal that mirrors website/views/project/modal.ts — a
 * single implementation so sitemap <loc>s, prerendered pages, .md/.json
 * replicas and the runtime resolver always agree on the same deep links.
 */

import { MEDIA_SLUG_MAX_LENGTH } from '../../../core/tokens/routes/aliases.ts'
import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'

/** Root every build-time .md/.json replica lives under in the mirror tree. */
export const LLM_TREE_ROOT = '/llm'

/**
 * Locale-prefixed path detector — built from the actual locale codes so
 * single-word routes like /docs/* or /gdpr are never mistaken for a
 * locale prefix. Same construction generate-sitemap.js uses.
 */
export const LOCALE_PREFIX_RE = new RegExp(`^/(${Object.keys(LANG_SLUGS).join('|')})(/|$)`)

/**
 * Russian Cyrillic → Latin transliteration — Cyrillic media labels would
 * otherwise slugify to '' and lose their deep-link URL. MUST stay
 * byte-identical to CYRILLIC_SLUG in core/utils/string.ts.
 */
export const CYRILLIC_SLUG = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

/**
 * Media-slug transform — diacritics fold to ASCII, Cyrillic transliterates,
 * every non-alphanumeric run collapses to a single hyphen. MUST match the
 * slugify inside core/utils/string.ts byte for byte so emitted URLs and
 * the runtime resolver agree.
 * @param {string} text raw label text
 * @returns {string} slugified base
 */
export const slugify = (text) =>
  (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\u0430-\u044f\u0451]/g, (ch) => CYRILLIC_SLUG[ch])
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Caps a media deep-link slug at MEDIA_SLUG_MAX_LENGTH so prerendered
 * dist paths stay under Windows MAX_PATH — the cut drops the trailing
 * partial word (and a dangling hyphen) so the slug always ends on a
 * hyphen boundary. Byte-identical to the cap in mediaSlugSeq
 * (core/utils/string.ts) so sitemap <loc>s, emitted pages, .md/.json
 * replicas and the runtime resolver agree.
 * @param {string} base slugified base
 * @returns {string} capped slug
 */
export const capSlug = (base) =>
  base.length > MEDIA_SLUG_MAX_LENGTH
    ? base.slice(0, MEDIA_SLUG_MAX_LENGTH).replace(/-[^-]*$/u, '')
    : base

/**
 * Media items of a project — mirrors `website/views/project/modal.ts`'s
 * traversal exactly: sections → groups (arrays whose head is NOT a
 * string — string-head groups are text blocks) → media objects. Every
 * object with a `src` is a real asset on the page; items with a label
 * additionally get their own `/portfolio/<slug>/<media>` deep-link URL.
 * Non-array section/group entries are tolerated (defensive wrap) so a
 * malformed row cannot kill a whole build fan-out.
 * @param {object} project project record (`sections` payload)
 * @returns {object[]} flattened media objects in document order
 */
export const mediaItemsOf = (project) => {
  const items = []

  for (const section of project?.sections || []) {
    for (const group of Array.isArray(section) ? section : [section]) {
      if (!Array.isArray(group) || typeof group[0] === 'string') continue

      for (const m of group) {
        if (m && typeof m === 'object' && m.src) items.push(m)
      }
    }
  }

  return items
}

/**
 * Labelled-media deep links of a project — `[{ slug, label, media }]`.
 * Distinct captions can collapse to the same slug, so occurrences after
 * the first gain `-2`, `-3`, … in document order — byte-identical to
 * mediaSlugSeq in core/utils/string.ts so every item keeps an indexable
 * URL and emitted pages + the runtime resolver agree.
 * @param {object} project project record (`sections` payload)
 * @returns {{slug: string, label: string, media: object}[]} deep-link rows
 */
export const mediaRowsOf = (project) => {
  const rows = []
  const seen = new Map()

  for (const m of mediaItemsOf(project)) {
    if (!m.label) continue

    const base = capSlug(slugify(m.label))

    if (!base) continue

    const ordinal = seen.get(base) ?? 0

    seen.set(base, ordinal + 1)

    rows.push({ slug: ordinal ? `${base}-${ordinal + 1}` : base, label: m.label, media: m })
  }

  return rows
}

/**
 * `/llm/` mirror-tree paths for a route — the convention
 * generate-llm-pages.mjs emits: `/<loc>`-prefixed routes map to
 * `/llm/<loc>/<rest>` and unprefixed (English-only) routes map to
 * `/llm/en/<path>`, with `/` and `/<loc>` landing on `index`. Each page's
 * emitted <link rel="alternate"> tags point agents at these files.
 * @param {string} pathname canonical route path (`/br/sobre`, `/docs/src/x`)
 * @returns {{base: string, md: string, json: string}} tree path trio
 */
export const llmTreePaths = (pathname) => {
  const m = pathname.match(LOCALE_PREFIX_RE)
  const rest = m
    ? pathname.slice(m[1].length + 1) || '/index'
    : pathname === '/'
      ? '/index'
      : pathname
  const base = `${LLM_TREE_ROOT}/${m ? m[1] : 'en'}${rest}`

  return { base, md: `${base}.md`, json: `${base}.json` }
}

/**
 * Sibling replica paths — the same replica reachable next to the page's
 * own URL (`/portfolio/x` → `/portfolio/x.md` + `.json`). Locale roots
 * (`/<loc>`) land on `index` so the whole tree uses one naming rule.
 * @param {string} pathname canonical route path
 * @returns {{base: string, md: string, json: string}} sibling path trio
 */
export const llmSiblingPaths = (pathname) => {
  const m = pathname.match(LOCALE_PREFIX_RE)
  const base =
    m && pathname === `/${m[1]}` ? `${pathname}/index` : pathname === '/' ? '/index' : pathname

  return { base, md: `${base}.md`, json: `${base}.json` }
}
