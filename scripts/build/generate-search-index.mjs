/**
 * @file generate-search-index.mjs — emits website/public/meta/
 * search-index-<loc>.json for every locale in LANG_SLUGS: the full
 * route catalog the <route-search> autocomplete scores at runtime
 * (statics, portfolio projects, media-modal deep links, star-field
 * bodies). Docs-portal entries ship once in the shared, English-only
 * search-index-docs.json — the manifest corpus is locale-independent,
 * so duplicating ~6.5k file rows across 16 locale files only bought
 * 16× the bytes.
 *
 * Route enumeration reuses the generated sitemap-<loc>.xml files so
 * the index can never drift from the canonical URL set; each entry is
 * enriched with that locale's title, description and keywords from
 * database.json (pages/projects nodes) and the star-field body files.
 *
 * Entry shape (compact — the file ships to the browser):
 *   { p: path, t: title, d: description, k: [keywords], c: kind }
 *
 * `c` is the ROUTE_SEARCH_KINDS discriminant — the runtime groups hits
 * into kind buckets ordered by each bucket's best hit before paging
 * them. Docs entries additionally carry
 * a content blob in `k`: unique words pulled from the file itself
 * (markdown headings + body, code comments, stripped report text), so
 * a term inside a document — not just its filename — reaches a hit.
 *
 * Run standalone (`node shared/scripts/build/generate-search-index.mjs`)
 * after generate-sitemap.js so the XML sources exist.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'
import { ROUTE_SEARCH_KINDS } from '../../../core/tokens/routes/search.ts'
import { mediaRowsOf } from './route-media.mjs'
import { scanManifest, resolveFileId } from '../../build/docs/scan.mjs'
import { redactSource } from '../../build/docs/redact.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const META_DIR = path.join(REPO_ROOT, 'website', 'public', 'meta')
const DB = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'database.json'), 'utf8'))
const ORIGIN = 'https://luiskr.com'
const STAR_DATA = path.join(REPO_ROOT, 'experiments', 'star-field', 'public', 'data')

/** stripHtml — CMS descriptions carry markup; previews are plain text. */
const stripHtml = (s) =>
  String(s || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** `firstText` — first plain-text paragraph inside a project's sections. */
const firstText = (project) => {
  for (const section of project?.sections || []) {
    for (const group of Array.isArray(section) ? section : [section]) {
      if (typeof group === 'string') return stripHtml(group)

      if (Array.isArray(group) && typeof group[0] === 'string') return stripHtml(group[0])
    }
  }

  return ''
}

/** `truncate` — previews cap at 160 chars on a word boundary. */
const truncate = (s, n = 160) => {
  const t = stripHtml(s)

  return t.length <= n ? t : `${t.slice(0, n).replace(/\s+\S*$/, '')}…`
}

/** `titleCase` — a slug segment becomes a display title fallback. */
const titleCase = (slug) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

/** Load a locale's sitemap paths (relative, decoded). */
const sitemapPaths = (loc) => {
  const file = path.join(META_DIR, `sitemap-${loc}.xml`)

  if (!fs.existsSync(file)) return []

  const xml = fs.readFileSync(file, 'utf8')
  const paths = []

  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = m[1].replace(/&amp;/g, '&')

    if (url.startsWith(ORIGIN)) paths.push(decodeURIComponent(url.slice(ORIGIN.length)) || '/')
  }

  return paths
}

/** Star-body display data — `name`/`tagline` per body file (en fallback). */
const starBody = (loc, body) => {
  for (const l of [loc, 'en']) {
    const f = path.join(STAR_DATA, l, `${body}.json`)

    if (fs.existsSync(f)) {
      const j = JSON.parse(fs.readFileSync(f, 'utf8'))

      return { name: j.name || titleCase(body), tagline: stripHtml(j.tagline || '') }
    }
  }

  return { name: titleCase(body), tagline: '' }
}

/**
 * `classify` — resolves a sitemap path into {t,d,k,c} for `loc`:
 * home, static pages (slugs), portfolio project, media deep link,
 * star-field body, docs path. `c` carries the ROUTE_SEARCH_KINDS
 * bucket the runtime groups the hit under.
 */
const classify = (loc, urlPath) => {
  const slugs = LANG_SLUGS[loc] || LANG_SLUGS.en
  const pages = DB.translations[loc]?.pages || {}
  const projects = DB.translations[loc]?.projects || {}
  const segs = urlPath.split('/').filter(Boolean)
  const isLoc = segs[0] === loc && loc !== 'en'
  const rest = isLoc ? segs.slice(1) : segs
  const first = rest[0] || ''
  const keywords = (k) => [...(pages[k]?.searchThemes || []), first, urlPath]

  const K = ROUTE_SEARCH_KINDS

  // Home — `/` or `/<loc>`.
  if (!rest.length) {
    const home = pages.home || {}

    return { t: home.title || 'Luis Krötz', d: home.message || '', k: keywords('home'), c: K.PAGE }
  }

  // Search — the search page itself.
  if (first === slugs.search) {
    return {
      t: pages.search?.title || 'Search',
      d: pages.search?.description || '',
      k: keywords('search'),
      c: K.PAGE,
    }
  }

  // Static pages by localized slug — [slug, page-key, result kind].
  const pageMap = [
    [slugs.about, 'about', K.PAGE],
    [slugs.contact, 'contact', K.PAGE],
    [slugs.privacy, 'privacy-policy', K.LEGAL],
    [slugs.gdpr, 'GDPR', K.LEGAL],
    [slugs.terms, 'terms-of-use', K.LEGAL],
    [slugs.license, 'license', K.LEGAL],
    [slugs.earthPlayground, 'earth-playground', K.EXPERIMENT],
    [slugs.animations, 'animations', K.EXPERIMENT],
  ]

  for (const [slug, key, kind] of pageMap) {
    if (first === slug && rest.length === 1) {
      const cover = pages[key]?.cover

      return {
        t: pages[key]?.title || titleCase(first),
        d: truncate(pages[key]?.description || firstText(pages[key])),
        k: keywords(key),
        c: kind,
        // Cover media path (folder+src) + video flag — the runtime builds
        // the blur-up thumb variant from these (undefined drops from JSON).
        i: cover?.src ? `${pages[key]?.folder || ''}${cover.src}` : undefined,
        v: cover?.isVideo ? 1 : undefined,
      }
    }
  }

  // Docs — English-only manifest pages.
  if (first === 'docs') {
    const last = rest[rest.length - 1] || 'docs'

    return {
      t: titleCase(last),
      d: pages['docs-portal']?.description || '',
      k: [first, last, urlPath],
      c: K.DOCS,
    }
  }

  // Star field — page and body deep links.
  if (first === slugs.starField || first === 'star-field-experiment') {
    const body = rest[1]

    if (!body) {
      return {
        t: pages['star-field']?.title || 'Star Field',
        d: truncate(pages['star-field']?.description),
        k: keywords('star-field'),
        c: K.EXPERIMENT,
      }
    }

    const b = starBody(loc, body)

    return { t: b.name, d: b.tagline, k: [body, first, urlPath], c: K.EXPERIMENT }
  }

  // Portfolio — project page or media deep link.
  if (first === 'portfolio' && rest.length >= 2) {
    const slug = rest[1]
    const node = projects[slug] || DB.translations.en?.projects?.[slug] || {}

    if (rest.length === 2) {
      return {
        t: node.title || titleCase(slug),
        d: truncate(node.description || firstText(node)),
        k: [...(node.searchThemes || []), slug, urlPath],
        c: K.PROJECT,
        i: node.cover?.src ? `${node.folder || ''}${node.cover.src}` : undefined,
        v: node.cover?.isVideo ? 1 : undefined,
      }
    }

    const mediaSlug = rest.slice(2).join('/')
    const row = mediaRowsOf(node).find((r) => r.slug === mediaSlug)
    const label = row?.label || titleCase(mediaSlug)

    // The row's thumb is the deep link's own asset — the project cover
    // only backstops an unresolvable slug (sitemap/index drift).
    const visual = row?.media || node.cover

    return {
      t: label,
      d: `${node.title || titleCase(slug)} — ${label}`,
      k: [...(node.searchThemes || []), slug, mediaSlug, urlPath],
      c: K.PROJECT,
      i: visual?.src ? `${node.folder || ''}${visual.src}` : undefined,
      v: visual?.isVideo ? 1 : undefined,
    }
  }

  // Anything else (llm mirrors excluded — sitemap never lists them).
  return { t: titleCase(first), d: '', k: [first, urlPath], c: K.PAGE }
}

/** `/docs/…` route test — shared by the per-locale filter + the docs artifact. */
const isDocsPath = (p) => p === '/docs' || p.startsWith('/docs/')

/** Largest file read for keyword extraction — past it the row keeps path words only. */
const DOC_READ_CAP = 512 * 1024

/** Keyword blob budget per file — bounds the shipped docs artifact. */
const DOC_KW_CAP = 240

/** Extensions whose `#` lines are real comments (shell/config families). */
const HASH_COMMENT_EXTS = new Set([
  'sh',
  'zsh',
  'bash',
  'fish',
  'ps1',
  'yml',
  'yaml',
  'toml',
  'py',
  'rb',
  'ini',
  'cfg',
  'conf',
  'properties',
  'env',
])

/** Code extensions whose `<!-- -->` blocks are real comments. */
const MARKUP_COMMENT_EXTS = new Set(['xml', 'svg'])

/**
 * Comment-only text pull for code files — the searchable surface the
 * "comment" requirement names. Which comment syntax applies follows the
 * extension family: `//`/`/*…*‌/` cover the C-style languages (and
 * incidentally SCSS line comments), `#` the shell/config families,
 * `<!-- -->` the markup files.
 */
const codeComments = (raw, ext) => {
  const parts = []

  for (const m of raw.matchAll(/\/\*[\s\S]*?\*\//g)) parts.push(m[0])
  for (const m of raw.matchAll(/\/\/[^\n]*/g)) parts.push(m[0])

  if (MARKUP_COMMENT_EXTS.has(ext)) {
    for (const m of raw.matchAll(/<!--[\s\S]*?-->/g)) parts.push(m[0])
  }

  if (HASH_COMMENT_EXTS.has(ext)) {
    for (const m of raw.matchAll(/^[ \t]*#[^\n]*/gm)) parts.push(m[0])
  }

  return parts.join('\n')
}

/**
 * Format-aware text pull per file — markdown front-loads its headings
 * (they carry the topical words before the cap bites), html strips tags,
 * json keeps key names, code keeps comments (redacted first, same
 * scrubbing the portal payload gets). Media files contribute nothing —
 * their stem/path keywords already cover the "diagram" match.
 */
const extractText = (raw, ext, format) => {
  if (format === 'media') return ''

  if (format === 'markdown') {
    const heads = [...raw.matchAll(/^[ \t]{0,3}#{1,6}[ \t]+(.+)$/gm)].map((m) => m[1]).join(' ')

    return `${heads}\n${raw}`
  }

  if (format === 'text') return raw

  if (format === 'html') return raw.replace(/<[^>]*>/g, ' ')

  if (format === 'json') return (raw.match(/"[A-Za-z_][\w-]{1,}"\s*:/g) || []).join(' ')

  return codeComments(redactSource(raw), ext)
}

/**
 * File → normalized keyword blob: unique word tokens (3–48 chars)
 * joined until the DOC_KW_CAP budget runs out. Shipped as ONE keyword
 * string — the scorer's `kw.includes(term)` turns it into a substring
 * match against the document's own vocabulary.
 */
const docBlob = (node) => {
  if (node.format === 'media' || node.size > DOC_READ_CAP) return ''

  const abs = resolveFileId(REPO_ROOT, node.id)

  if (!abs) return ''

  try {
    const raw = fs.readFileSync(abs, 'utf8')
    const text = extractText(raw, path.extname(node.name).slice(1).toLowerCase(), node.format)
    const seen = new Set()
    const words = []

    let size = 0

    for (const m of text.toLowerCase().matchAll(/[a-z0-9_]{3,48}/g)) {
      const w = m[0]

      if (seen.has(w)) continue

      seen.add(w)
      size += w.length + 1

      if (size > DOC_KW_CAP) break

      words.push(w)
    }

    return words.join(' ')
  } catch {
    return ''
  }
}

/**
 * Docs-portal routes — every manifest file leaf becomes a `/docs/<root>/<rel>`
 * entry, enriched with the file's own keyword blob so content terms
 * (text, comments, diagram code) reach the matcher in every locale.
 */
const docsEntries = () => {
  const { roots } = scanManifest(REPO_ROOT)
  const out = []

  const walk = (node, rootMeta, trail) => {
    if (node.type === 'file') {
      const stem = node.name.replace(/\.[^.]+$/, '')
      const GENERIC = new Set(['readme', 'index', 'changelog', 'license'])
      const title = GENERIC.has(stem.toLowerCase())
        ? titleCase(trail[trail.length - 1] || rootMeta.label)
        : titleCase(stem)
      const keywords = [rootMeta.root, rootMeta.kind, stem.toLowerCase(), ...trail]
      const blob = docBlob(node)

      if (blob) keywords.push(blob)

      out.push({
        p: `/docs/${node.path}`,
        t: title,
        d: `${rootMeta.label} — ${title}`,
        k: keywords,
        c: ROUTE_SEARCH_KINDS.DOCS,
      })

      return
    }

    for (const c of node.children || []) walk(c, rootMeta, [...trail, node.name])
  }

  for (const r of roots) {
    for (const c of r.children) walk(c, r, [])
  }

  return out
}

/**
 * The shared docs artifact — every `/docs/*` route the sitemap lists
 * (portal root + dir pages) unioned with the enriched manifest file
 * leaves. Dedupe is by path with the manifest row winning: it carries
 * the better title (generic stems fold to their parent folder) and the
 * content blob. One file serves all 16 locales — the corpus is
 * English-only, so it never joins the per-locale indexes.
 */
const docsIndex = () => {
  const byPath = new Map()

  for (const p of sitemapPaths('en')) {
    if (!isDocsPath(p)) continue

    const c = classify('en', p)

    byPath.set(p, { p, t: c.t, d: c.d, k: c.k, c: ROUTE_SEARCH_KINDS.DOCS })
  }

  for (const e of docsEntries()) byPath.set(e.p, e)

  return [...byPath.values()]
}

const DOCS_INDEX = docsIndex()

fs.writeFileSync(path.join(META_DIR, 'search-index-docs.json'), JSON.stringify(DOCS_INDEX))

let total = 0

for (const loc of Object.keys(LANG_SLUGS)) {
  const paths = sitemapPaths(loc).filter((p) => !isDocsPath(p))
  const entries = paths.map((p) => {
    const c = classify(loc, p)

    return { p, t: c.t, d: c.d, k: c.k, c: c.c, i: c.i, v: c.v }
  })

  // The search page itself must always be searchable — sitemaps generated
  // before this script shipped lack the /search route.
  const slugs = LANG_SLUGS[loc]
  const searchPath = loc === 'en' ? `/${slugs.search}` : `/${loc}/${slugs.search}`

  if (!entries.some((e) => e.p === searchPath)) {
    const c = classify(loc, searchPath)

    entries.push({ p: searchPath, t: c.t, d: c.d, k: c.k, c: c.c, i: c.i, v: c.v })
  }

  const out = path.join(META_DIR, `search-index-${loc}.json`)

  fs.writeFileSync(out, JSON.stringify(entries))
  total += entries.length
  console.log(`${loc}: ${entries.length} routes → ${path.relative(REPO_ROOT, out)}`)
}

console.log(
  `search index: ${total} routes across ${Object.keys(LANG_SLUGS).length} locales ` +
    `+ ${DOCS_INDEX.length} shared docs routes`
)
