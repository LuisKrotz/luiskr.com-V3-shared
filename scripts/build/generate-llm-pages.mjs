#!/usr/bin/env node

/**
 * @file shared/scripts/build/generate-llm-pages.mjs
 * @description LLM/agent replica surface — emits a full-content Markdown
 * replica and a structured JSON replica for EVERY public route, in every
 * locale, into `dist/` at build time.
 *
 * Route inventory mirrors `core/router/parse-path.ts` +
 * `generate-sitemap.js` + `build-locale-pages.mjs` exactly:
 *
 *   - English unprefixed surface — `/`, `/about`, `/contact`, the legal
 *     routes, `/animations`, `/earth-playground`, `/star-field-experiment`,
 *     every `/portfolio/<slug>` project plus every labelled media deep link
 *     `/portfolio/<slug>/<media>`, every `/star-field-experiment/<body>`
 *     dossier, and the whole English-only `/docs/<root>/<path>` surface.
 *   - Per locale `/<loc>/…` — the locale's localized slugs, localized
 *     `/portfolio/<slug>[/<media>]` deep links and localized star-field
 *     body routes. Docs stay English-only.
 *
 * Two addressing schemes point at the same replica content:
 *
 *   - The `/llm/` mirror tree — `/<loc>/…` routes map to `/llm/<loc>/…`
 *     and unprefixed English routes map to `/llm/en/…` (`/` →
 *     `/llm/en/index.md`). This is the canonical, single-entry surface an
 *     agent can crawl wholesale; `/llm/index.md` + `/llm/index.json`
 *     index it and `/llm/<loc>/routes.json` lists each locale's routes.
 *   - Sibling files — the same replicas sit next to each page at
 *     `<route>.md` / `<route>.json` (`/portfolio/metcha` →
 *     `/portfolio/metcha.md`), the emerging "append .md" convention
 *     agents already probe. Emitted as hardlinks (copy fallback) of the
 *     canonical tree file, so the bytes are identical by construction.
 *
 * Every replica carries the page's real content: localized CMS text from
 * the live RTDB translations (prefetched by build-targets, falling back
 * to the committed database.json snapshot), every media asset resolved
 * against the bucket manifest (same variant logic as the sitemap), the
 * star-field dossier JSONs, and the docs manifest's file payloads
 * (source files redacted through redactSource, same as docs-content).
 *
 * Per-page `<link rel="alternate" type="text/markdown|application/json">`
 * tags (injected by build-locale-pages' localize()) plus the llms.txt
 * section advertise the surface; `Content-Signal: ai-train=yes,
 * search=yes, ai-input=yes` in firebase.json declares the usage policy.
 *
 * Replicas are crawler artifacts: they ship uncompressed (no .br/.gz
 * siblings — Firebase still negotiates content-encoding for text types)
 * so the ~76k extra objects don't triple the deploy payload, and they
 * are deliberately absent from sitemaps — discovery flows through
 * llms.txt, the per-page alternates and the /llm/ indexes instead.
 *
 * Runnable standalone (`node shared/scripts/build/generate-llm-pages.mjs`)
 * or imported by build-targets.mjs via buildLlmPages(distDir).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'
import { LOCALE_TAGS } from '../../../core/tokens/locales.ts'
import { mediaRowsOf, llmTreePaths, llmSiblingPaths, LLM_TREE_ROOT } from './route-media.mjs'
import { loadTranslations, prefetchTranslations } from './build-locale-pages.mjs'
import { loadMediaManifest, resolveMediaUrls, resolveCoverKey } from './media-manifest.mjs'
import { scanManifest, resolveFileId, MEDIA_INLINE_LIMIT } from '../../build/docs/scan.mjs'
import { redactSource } from '../../build/docs/redact.mjs'
import { withFsRetry } from './fs-retry.mjs'

const VALID_LANGS = Object.keys(LANG_SLUGS)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const META_DIR = path.join(ROOT, 'website', 'public', 'meta')

const SITE_URL = 'https://luiskr.com'
const BASE_TITLE = 'Luis Krötz'
const CDN_BASE = 'https://storage.googleapis.com/luiskr.com/public/_v3/'
const SCHEMA_CONTEXT = 'https://schema.org'
const REPLICA_SPEC = 'llm-replica/1.0'
const GENERATOR = 'generate-llm-pages.mjs'

/**
 * The site's declared AI-usage policy — mirrors the `Content-Signal`
 * header firebase.json emits on every response and the comment stamp
 * stamp-content-signal.mjs writes into deployed robots.txt files.
 */
const CONTENT_POLICY = Object.freeze({ 'ai-train': 'yes', search: 'yes', 'ai-input': 'yes' })

/**
 * Decodes the named/numeric entities the CMS copy actually carries.
 * @param {string} s entity-encoded text
 * @returns {string} decoded text
 */
const decodeEntities = (s) =>
  String(s)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")

/**
 * CMS HTML fragment → Markdown text — `<br>` becomes a line break,
 * anchors keep their href as `[text](url)` (relative hrefs resolve
 * against the site root so agents get absolute targets), every other
 * tag unwraps to its text.
 * @param {string} html CMS HTML fragment
 * @returns {string} markdown text
 */
const htmlToMd = (html) => {
  let out = String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, text) => {
      const label = decodeEntities(
        text
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
      )
      const url =
        href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
          ? href
          : `${SITE_URL}${href.startsWith('/') ? href : `/${href}`}`

      return `[${label}](${url})`
    })
    .replace(/<[^>]+>/g, ' ')

  out = decodeEntities(out)

  return out
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * One-line description for index/meta fields — htmlToMd collapsed to a
 * single line and capped like the meta-description convention (160).
 * @param {string} html source text/html
 * @param {number} [max] character cap
 * @returns {string} single-line description
 */
const toDescription = (html, max = 160) => {
  const t = htmlToMd(html).replace(/\n+/g, ' ').trim()

  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t
}

/**
 * Percent-encodes a replica URL — docs paths can carry literal
 * spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-first
 * keeps it idempotent (encodeURI escapes '%' itself).
 * @param {string} u url path
 * @returns {string} encoded url
 */
const encUrl = (u) => {
  try {
    return encodeURI(decodeURI(u))
  } catch {
    return encodeURI(u)
  }
}

/**
 * YAML-ish front-matter block — each replica self-describes route,
 * locale, canonical page and its JSON/MD twins so a standalone file is
 * fully interpretable without the index.
 * @param {object} o shell fields
 * @returns {string} front-matter text
 */
const frontMatter = (o) => {
  const scalar = (v) => JSON.stringify(String(v ?? ''))

  const lines = [
    `title: ${scalar(o.title)}`,
    `type: ${o.type}`,
    `route: ${scalar(o.route)}`,
    `locale: ${o.locale}`,
    `language: ${scalar(o.language)}`,
    `canonical: ${scalar(o.canonical)}`,
    `markdown: ${scalar(o.md)}`,
    `json: ${scalar(o.json)}`,
    `generated: ${o.generated}`,
    `policy: "ai-train=yes, search=yes, ai-input=yes"`,
  ]

  return `---\n${lines.join('\n')}\n---\n`
}

/**
 * Wraps a markdown body in the replica shell — front-matter, H1 and a
 * trailing alternates/usage footer.
 * @param {object} o shell fields + `body`
 * @returns {string} full markdown document
 */
const mdShell = (o) => {
  const altLines = Object.entries(o.alternates || {})
    .map(([loc, url]) => `- [${loc}](${url})`)
    .join('\n')

  return (
    `${frontMatter(o)}\n# ${o.title}\n\n${o.body}\n\n---\n` +
    `Canonical page: ${o.canonical}\n` +
    `JSON replica: ${o.json}\n` +
    (altLines ? `\n## Language alternates\n\n${altLines}\n` : '')
  )
}

/**
 * The JSON replica envelope — schema.org-flavoured shell around the
 * page-type-specific `content` payload.
 * @param {object} o shell fields + `content` + optional `media`
 * @returns {object} serializable replica document
 */
const jsonShell = (o) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'WebPage',
  specVersion: REPLICA_SPEC,
  type: o.type,
  title: o.title,
  description: o.description || undefined,
  route: o.route,
  locale: o.locale,
  language: o.language,
  canonical: o.canonical,
  alternates: o.alternates,
  replicas: {
    markdown: o.md,
    json: o.json,
  },
  content: o.content,
  media: o.media?.length ? o.media : undefined,
  policy: CONTENT_POLICY,
  generator: GENERATOR,
  generated: o.generated,
})

/**
 * Resolves a CMS media item against the bucket manifest → normalized
 * media record with the best indexable variant (same variant logic the
 * sitemap uses).
 * @param {string} folder project folder prefix
 * @param {object} m media item
 * @param {Set<string>} manifest bucket key set (or null)
 * @returns {object} normalized media record
 */
const mediaRecord = (folder, m, manifest) => {
  const { source, thumb, isVideo } = resolveMediaUrls(folder, m, manifest)

  return {
    label: m.label || undefined,
    type: isVideo ? 'video' : 'image',
    src: source ? `${CDN_BASE}${source}` : undefined,
    thumb: thumb ? `${CDN_BASE}${thumb}` : undefined,
    width: m.size?.[0] || undefined,
    height: m.size?.[1] || undefined,
    canExpand: m.canExpand || undefined,
    class: m.class || undefined,
  }
}

/** Directories already created this run — mkdir is the hot syscall at ~76k files. */
const madeDirs = new Set()

/**
 * Ensures a directory exists, once per path per run.
 * @param {string} dir absolute directory
 */
const ensureDir = (dir) => {
  if (madeDirs.has(dir)) return

  withFsRetry(() => fs.mkdirSync(dir, { recursive: true }))
  madeDirs.add(dir)
}

/**
 * Writes one replica file under distDir.
 * @param {string} distDir absolute dist root
 * @param {string} rel slash-joined path relative to distDir (`llm/en/about.md`)
 * @param {string} content file bytes
 * @returns {string} absolute written path
 */
const writeReplica = (distDir, rel, content) => {
  const abs = path.join(distDir, ...rel.split('/'))

  ensureDir(path.dirname(abs))
  withFsRetry(() => fs.writeFileSync(abs, content))

  return abs
}

/**
 * Links (or copies, when hardlinks are unavailable) a canonical replica
 * to its sibling path so both URLs serve byte-identical content.
 * @param {string} distDir absolute dist root
 * @param {string} srcAbs absolute canonical file
 * @param {string} relDest slash-joined sibling path relative to distDir
 * @returns {number} 1 (a file was emitted at dest)
 */
const linkReplica = (distDir, srcAbs, relDest) => {
  const dest = path.join(distDir, ...relDest.split('/'))

  ensureDir(path.dirname(dest))

  // A file-node's prerendered viewer page can already own this path as a
  // directory (docs/api/<dir> + docs/api/<dir>.md siblings both emit —
  // the dir's <route>.md replica and the file's <route>.md/ page collide).
  // The canonical /llm/<loc>/ replica still serves the markdown, so the
  // sibling slot is skipped rather than clobbered.
  try {
    if (fs.statSync(dest).isDirectory()) {
      console.warn(`[llm-pages] replica skipped, page dir owns the path: ${relDest}`)

      return 0
    }
  } catch {
    // ENOENT — the slot is free.
  }

  try {
    withFsRetry(() => fs.linkSync(srcAbs, dest))
  } catch {
    withFsRetry(() => fs.copyFileSync(srcAbs, dest))
  }

  return 1
}

/**
 * Per-locale lookup with English fallback — mirrors the runtime appText
 * convention and build-locale-pages' `t()`.
 * @param {object} translations locale → translations map
 * @param {string} loc locale code
 * @param {Function} get selector on one locale's translations
 * @returns {*} selected value (English fallback when empty)
 */
const localized = (translations, loc, get) => {
  const v = get(translations[loc] || {})

  return v === undefined || v === null || v === '' ? get(translations.en || {}) : v
}

/**
 * Route → hreflang-equivalent map builder — mirrors build-locale-pages'
 * alternatesFor: every replica lists the *equivalent* route in every
 * locale, keyed by locale code with absolute replica-markdown URLs.
 * @param {Function} pathOf locale → route path (or null when missing)
 * @returns {object} loc → absolute replica .md URL
 */
const replicaAlternates = (pathOf) => {
  const out = {}

  for (const loc of VALID_LANGS) {
    const p = pathOf(loc)

    if (p === null || p === undefined) continue

    out[loc] = `${SITE_URL}${encUrl(llmTreePaths(p).md)}`
  }

  return out
}

/**
 * Runs the whole replica fan-out into `distDir`.
 * @param {string} [distDir] absolute dist path
 * @returns {Promise<{written: number, routes: number, locales: number}>} emit counts
 */
export async function buildLlmPages(distDir = path.join(ROOT, 'dist')) {
  const translations = loadTranslations()
  const en = translations.en || {}

  const mediaManifest = loadMediaManifest(META_DIR)
  const generated = new Date().toISOString()
  const t = (loc, get) => localized(translations, loc, get)

  /** Per-locale index rows accumulated for routes.json + the global index. */
  const indexRows = new Map(VALID_LANGS.map((loc) => [loc, []]))

  let files = 0
  let routes = 0

  /**
   * Emits one route's md+json pair — canonical write under /llm/, then
   * hardlinked (copy fallback) siblings at <route>.md/.json — and records
   * the route in its locale index.
   * @param {object} o replica shell fields + `body`/`content`/`media`
   */
  const emit = (o) => {
    const tree = llmTreePaths(o.route)
    const sib = llmSiblingPaths(o.route)

    const md = mdShell({
      ...o,
      md: `${SITE_URL}${encUrl(tree.md)}`,
      json: `${SITE_URL}${encUrl(tree.json)}`,
      generated,
    })
    const json = `${JSON.stringify(
      jsonShell({
        ...o,
        md: `${SITE_URL}${encUrl(tree.md)}`,
        json: `${SITE_URL}${encUrl(tree.json)}`,
        generated,
      })
    )}\n`

    const mdAbs = writeReplica(distDir, tree.md.slice(1), md)
    const jsonAbs = writeReplica(distDir, tree.json.slice(1), json)

    files += 2
    files += linkReplica(distDir, mdAbs, sib.md.slice(1))
    files += linkReplica(distDir, jsonAbs, sib.json.slice(1))
    routes += 1

    indexRows.get(o.locale)?.push({
      route: o.route,
      type: o.type,
      title: o.title,
      md: encUrl(tree.md),
      json: encUrl(tree.json),
    })
  }

  const shellFor = (o) => ({
    ...o,
    language: LOCALE_TAGS[o.locale]?.bcp || o.locale,
    canonical: `${SITE_URL}${encUrl(o.route)}`,
  })

  // ── Static pages — home, about, contact, legal, animations, playgrounds ──

  const enSlugs = LANG_SLUGS.en || {}

  const slugRoute = (key) => (loc) =>
    loc === 'en' ? `/${enSlugs[key]}` : `/${loc}/${LANG_SLUGS[loc]?.[key] || enSlugs[key]}`

  const homePath = (loc) => (loc === 'en' ? '/' : `/${loc}`)

  /** Home mosaic media — the same covers the sitemap's image tags list. */
  const homeMedia = (loc) =>
    (t(loc, (x) => x.pages?.HOME?.portfoliolist) || [])
      .filter((i) => i?.image)
      .map((i) => ({
        label: i.label || i.image,
        type: 'image',
        src: `${CDN_BASE}${resolveCoverKey(i.image, mediaManifest)}`,
        width: i.width?.[0] ? Number(i.width[0]) : undefined,
        height: i.height?.[0] ? Number(i.height[0]) : undefined,
      }))

  const emitHome = (loc) => {
    const home = t(loc, (x) => x.pages?.HOME) || {}
    const list = home.portfoliolist || []
    const bio = toDescription(t(loc, (x) => x.pages?.about?.col1?.[0]) || '')

    const items = list.map((item) => {
      const projectRoute = `${loc === 'en' ? '' : `/${loc}`}/portfolio/${item.link || item.image}`
      const tree = llmTreePaths(projectRoute)

      return {
        label: item.label || item.image,
        description: htmlToMd(item.description || ''),
        route: `${SITE_URL}${projectRoute}`,
        replica: `${SITE_URL}${encUrl(tree.md)}`,
        image: item.image ? `${CDN_BASE}${resolveCoverKey(item.image, mediaManifest)}` : undefined,
        featured: item.featured || undefined,
      }
    })

    const body = [
      `> ${bio}`,
      '',
      `## ${home.featured || home.message || 'Selected work'}`,
      '',
      ...items.map(
        (i) =>
          `- [${i.label}](${i.route}) — ${i.description}\n  ![${i.label}](${i.image}) · [Markdown replica](${i.replica})`
      ),
      '',
      `- ${home.archive || 'Archive'}: ${SITE_URL}`,
      `- Machine index: ${SITE_URL}${LLM_TREE_ROOT}/index.json`,
    ].join('\n')

    const projects = items.map((i) => ({
      ...i,
      replicas: { markdown: i.replica, json: i.replica.replace(/\.md$/, '.json') },
    }))

    emit(
      shellFor({
        type: 'home',
        title: BASE_TITLE,
        description: bio,
        route: homePath(loc),
        locale: loc,
        alternates: replicaAlternates(homePath),
        body,
        content: { bio, featured: home.featured || home.message, projects },
        media: homeMedia(loc),
      })
    )
  }

  const emitAbout = (loc) => {
    const about = t(loc, (x) => x.pages?.about) || {}
    const title = `${t(loc, (x) => x.APP?.about?.description) || 'About'} | ${BASE_TITLE}`
    const paras = [...(about.col1 || []), ...(about.col2 || [])].map(htmlToMd).filter(Boolean)

    emit(
      shellFor({
        type: 'about',
        title,
        description: paras[0] || undefined,
        route: slugRoute('about')(loc),
        locale: loc,
        alternates: replicaAlternates(slugRoute('about')),
        body: paras.join('\n\n'),
        content: {
          columns: {
            col1: (about.col1 || []).map(htmlToMd),
            col2: (about.col2 || []).map(htmlToMd),
          },
        },
      })
    )
  }

  const emitContact = (loc) => {
    const contact = t(loc, (x) => x.components?.contact) || {}
    const title = `${contact.title || 'Contact'} | ${BASE_TITLE}`

    const linkLine = (i) =>
      `- [${i.description}](${i.link?.startsWith('/') ? `${SITE_URL}${i.link}` : i.link})`

    const body = [
      `## ${contact.title || 'Contact'}`,
      '',
      ...(contact.line1 || []).map(linkLine),
      '',
      ...(contact.line2 || []).map(linkLine),
    ].join('\n')

    emit(
      shellFor({
        type: 'contact',
        title,
        description:
          (contact.line1 || [])
            .map((i) => i?.description)
            .filter(Boolean)
            .join(', ') || undefined,
        route: slugRoute('contact')(loc),
        locale: loc,
        alternates: replicaAlternates(slugRoute('contact')),
        body,
        content: {
          title: contact.title,
          channels: contact.line1 || [],
          legal: contact.line2 || [],
        },
      })
    )
  }

  const LEGAL_PAGES = Object.freeze([
    { slugKey: 'privacy', pageKey: 'privacy-policy', linkIndex: 1 },
    { slugKey: 'gdpr', pageKey: 'GDPR', linkIndex: 2 },
    { slugKey: 'terms', pageKey: 'terms-of-use', linkIndex: 3 },
    { slugKey: 'license', pageKey: 'license', linkIndex: 4 },
  ])

  const emitLegal = (loc, { slugKey, pageKey, linkIndex }) => {
    const page = t(loc, (x) => x.pages?.[pageKey]) || {}
    const pageName =
      t(loc, (x) => x.components?.['legal-footer']?.links?.[linkIndex]?.page) || pageKey
    const title = `${pageName} | ${BASE_TITLE}`

    const sections = (page.sections || []).map((s) => ({
      title: s.title ? htmlToMd(s.title) : undefined,
      content: (s.content || []).map(htmlToMd),
    }))

    const body = sections
      .map((s) => [s.title ? `## ${s.title}` : '', ...s.content].filter(Boolean).join('\n\n'))
      .join('\n\n')

    emit(
      shellFor({
        type: 'legal',
        title,
        description: sections[0]?.content?.[0] || undefined,
        route: slugRoute(slugKey)(loc),
        locale: loc,
        alternates: replicaAlternates(slugRoute(slugKey)),
        body,
        content: { name: pageName, sections },
      })
    )
  }

  const emitAnimations = (loc) => {
    const page = t(loc, (x) => x.pages?.animations) || {}
    const records = t(loc, (x) => x.components?.animations) || {}
    const title = `${page.title || 'Animations'} | ${BASE_TITLE}`

    const rows = Object.entries(records).map(([key, r]) => ({
      key,
      alt: r?.alt || '',
      longdesc: r?.longdesc || '',
    }))

    const body = [
      htmlToMd(page.description || ''),
      '',
      ...rows.flatMap((r) => [`### ${r.key}`, '', r.alt, '', r.longdesc, '']),
    ].join('\n')

    emit(
      shellFor({
        type: 'animations',
        title,
        description: toDescription(page.description || ''),
        route: slugRoute('animations')(loc),
        locale: loc,
        alternates: replicaAlternates(slugRoute('animations')),
        body,
        content: { description: htmlToMd(page.description || ''), records },
      })
    )
  }

  // Star-field body ids — the en catalog is the canonical id list (same
  // convention build-locale-pages uses); localized dossiers fall back.
  const starDataDir = path.join(ROOT, 'experiments', 'star-field', 'public', 'data')

  const starBodyIds = (() => {
    try {
      return fs
        .readdirSync(path.join(starDataDir, 'en'))
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.replace(/\.json$/, ''))
        .sort()
    } catch {
      return []
    }
  })()

  const starDossier = (id, loc) => {
    for (const cand of [loc, 'en']) {
      try {
        return JSON.parse(fs.readFileSync(path.join(starDataDir, cand, `${id}.json`), 'utf8'))
      } catch {
        /* fall through to the en dossier */
      }
    }

    return null
  }

  const emitExperience = (loc, slugKey, pageKey, extra = {}) => {
    const page = t(loc, (x) => x.pages?.[pageKey]) || {}
    const title = `${page.title || pageKey} | ${BASE_TITLE}`

    const body = [
      htmlToMd(page.description || ''),
      page.hint ? `\n${htmlToMd(page.hint)}` : '',
      extra.body || '',
    ]
      .filter(Boolean)
      .join('\n\n')

    emit(
      shellFor({
        type: 'experience',
        title,
        description: toDescription(page.description || ''),
        route: slugRoute(slugKey)(loc),
        locale: loc,
        alternates: replicaAlternates(slugRoute(slugKey)),
        body,
        content: { copy: page, ...extra.content },
      })
    )
  }

  const emitStarField = (loc) => {
    const sfSlug = LANG_SLUGS[loc]?.starField || enSlugs.starField
    const prefix = loc === 'en' ? '' : `/${loc}`

    const bodies = starBodyIds.map((id) => ({
      id,
      route: `${SITE_URL}${prefix}/${sfSlug}/${id}`,
      replica: `${SITE_URL}${encUrl(llmTreePaths(`${prefix}/${sfSlug}/${id}`).md)}`,
    }))

    emitExperience(loc, 'starField', 'star-field', {
      body: `\n## Bodies\n\n${bodies.map((b) => `- [${b.id}](${b.replica})`).join('\n')}`,
      content: { bodies },
    })
  }

  // ── Portfolio — project pages + labelled-media deep links ──

  const projectSlugs = Object.keys(en.projects || {})

  const emitProject = (loc, slug) => {
    const project = t(loc, (x) => x.projects?.[slug]) || {}
    const folder = project.folder || en.projects?.[slug]?.folder || ''
    const title = `${project.title || slug} | ${BASE_TITLE}`

    const media = []
    const paragraphs = []
    const sections = []

    for (const section of project.sections || []) {
      const groups = Array.isArray(section) ? section : [section]

      for (const group of groups) {
        if (!Array.isArray(group)) continue

        if (typeof group[0] === 'string') {
          const texts = group.map(htmlToMd).filter(Boolean)

          paragraphs.push(...texts)
          sections.push({ kind: 'text', paragraphs: texts })
        } else {
          const records = group
            .filter((m) => m?.src)
            .map((m) => mediaRecord(folder, m, mediaManifest))

          media.push(...records)
          sections.push({ kind: 'media', media: records })
        }
      }
    }

    const rows = mediaRowsOf(project)
    const prefix = loc === 'en' ? '' : `/${loc}`
    const projectRoute = `${prefix}/portfolio/${slug}`

    const mediaLinks = rows.map((r) => ({
      slug: r.slug,
      label: r.label,
      route: `${SITE_URL}${projectRoute}/${r.slug}`,
      replica: `${SITE_URL}${encUrl(llmTreePaths(`${projectRoute}/${r.slug}`).md)}`,
    }))

    const cover = project.cover ? mediaRecord(folder, project.cover, mediaManifest) : null

    const body = [
      cover?.src
        ? cover.type === 'video'
          ? `[cover video](${cover.src}) — poster: ${cover.thumb}`
          : `![${cover.label || title}](${cover.src})`
        : '',
      paragraphs.join('\n\n'),
      media.length
        ? `## Media\n\n${media
            .map((m) =>
              m.type === 'video'
                ? `- [video: ${m.label || m.src}](${m.src}) — poster ${m.thumb}`
                : `- ![${m.label || ''}](${m.src})`
            )
            .join('\n')}`
        : '',
      mediaLinks.length
        ? `## Media deep links\n\n${mediaLinks.map((m) => `- [${m.label}](${m.replica})`).join('\n')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n')

    const projectAlt = (loc2) => `${loc2 === 'en' ? '' : `/${loc2}`}/portfolio/${slug}`

    emit(
      shellFor({
        type: 'project',
        title,
        description: paragraphs[0] || undefined,
        route: projectRoute,
        locale: loc,
        alternates: replicaAlternates(projectAlt),
        body,
        content: { slug, title: project.title || slug, folder, cover, sections, mediaLinks },
        media: cover ? [cover, ...media] : media,
      })
    )
  }

  // Labelled-media rows per (loc, project) — cached; media identity across
  // locales aligns by `src`, which is locale-invariant while labels (and
  // therefore deep-link slugs) are translated — same convention
  // build-locale-pages' locMediaSlug uses for alternates.
  const locRowsCache = new Map()

  const locMediaRows = (loc, slug) => {
    const key = `${loc}:${slug}`

    if (!locRowsCache.has(key)) {
      locRowsCache.set(key, mediaRowsOf(t(loc, (x) => x.projects?.[slug])))
    }

    return locRowsCache.get(key)
  }

  const emitMediaLink = (loc, slug, row) => {
    const project = t(loc, (x) => x.projects?.[slug]) || {}
    const enProject = en.projects?.[slug] || {}
    const folder = project.folder || enProject.folder || ''
    const rec = mediaRecord(folder, row.media, mediaManifest)
    const projectRoute = `${loc === 'en' ? '' : `/${loc}`}/portfolio/${slug}`
    const title = `${row.label} — ${project.title || slug} | ${BASE_TITLE}`

    // Alternates resolve each locale's OWN media slug for this asset —
    // localized labels slugify differently, and the localized deep link
    // is that locale's canonical.
    const mediaAlt = (loc2) => {
      const slug2 = locMediaRows(loc2, slug).find((r) => r.media.src === row.media.src)?.slug

      return slug2 ? `${loc2 === 'en' ? '' : `/${loc2}`}/portfolio/${slug}/${slug2}` : null
    }

    const body = [
      rec.type === 'video'
        ? `[video](${rec.src}) — poster: ${rec.thumb}`
        : `![${row.label}](${rec.src})`,
      rec.width ? `Dimensions: ${rec.width}×${rec.height}` : '',
      `Part of [${project.title || slug}](${SITE_URL}${projectRoute})`,
    ]
      .filter(Boolean)
      .join('\n\n')

    emit(
      shellFor({
        type: 'media',
        title,
        description: row.label,
        route: `${projectRoute}/${row.slug}`,
        locale: loc,
        alternates: replicaAlternates(mediaAlt),
        body,
        content: {
          ...rec,
          label: row.label,
          slug: row.slug,
          project: { slug, title: project.title || slug, route: `${SITE_URL}${projectRoute}` },
        },
        media: [rec],
      })
    )
  }

  // ── Star-field dossiers — every authored body, every locale ──

  const emitStarBody = (loc, id) => {
    const dossier = starDossier(id, loc)

    if (!dossier) return

    const sfSlug = LANG_SLUGS[loc]?.starField || enSlugs.starField
    const route = `${loc === 'en' ? '' : `/${loc}`}/${sfSlug}/${id}`
    const title = `${dossier.name || id} | ${BASE_TITLE}`

    const images = (dossier.media?.images || []).map((img) => ({
      label: img.caption || img.alt || dossier.name,
      type: 'image',
      src: img.src,
      width: img.width || undefined,
      height: img.height || undefined,
    }))

    const videos = (dossier.media?.videos || []).map((v) => ({
      label: v.caption || v.alt || dossier.name,
      type: 'video',
      src: v.src,
      thumb: v.poster || v.thumb || undefined,
    }))

    const factsTable = (dossier.facts || []).length
      ? `| Fact | Value |\n| --- | --- |\n${dossier.facts
          .map((f) => `| ${htmlToMd(f.label)} | ${htmlToMd(f.value)} |`)
          .join('\n')}`
      : ''

    const body = [
      `*${dossier.kind || 'body'} — ${dossier.tagline || ''}*`,
      factsTable,
      dossier.history ? `## History\n\n${htmlToMd(dossier.history)}` : '',
      images.length ? `## Media\n\n${images.map((i) => `![${i.label}](${i.src})`).join('\n')}` : '',
      videos.length ? videos.map((v) => `[video: ${v.label}](${v.src})`).join('\n') : '',
      dossier.source ? `Source: ${dossier.source}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')

    const bodyAlt = (loc2) =>
      `${loc2 === 'en' ? '' : `/${loc2}`}/${LANG_SLUGS[loc2]?.starField || enSlugs.starField}/${id}`

    emit(
      shellFor({
        type: 'star-body',
        title,
        description: toDescription(dossier.tagline || ''),
        route,
        locale: loc,
        alternates: replicaAlternates(bodyAlt),
        body,
        content: dossier,
        media: [...images, ...videos],
      })
    )
  }

  // ── Docs portal — English-only; manifest nodes → replicas of file payloads ──

  /**
   * Markdown for one docs file node: `.md` sources ship verbatim under
   * the shell header (the file IS the replica body); code/other formats
   * are fenced under their extension language so agents get the same
   * redacted raw text the docs-content JSON serves.
   */
  const docsFileMd = (node, raw) =>
    node.format === 'markdown' || node.format === 'text'
      ? raw
      : node.format === 'media'
        ? `Binary media payload — see the JSON replica (${REPLICA_SPEC}) or the docs-content endpoint for the inline data.`
        : `\`\`\`${node.format === 'json' || node.format === 'html' ? node.format : path.extname(node.name).slice(1).toLowerCase() || 'text'}\n${raw}\n\`\`\``

  /**
   * Raw replica content for one docs file node — mirrors docs-portal's
   * payloadFor contract: md/json/html/txt pass through verbatim, every
   * other text format is redacted through redactSource, media nodes ship
   * the base64 data-URL (or null over MEDIA_INLINE_LIMIT).
   */
  const docsFileContent = (node) => {
    const abs = resolveFileId(ROOT, node.id)

    if (!abs) return { raw: '', media: null, mtime: node.mtime }

    const stat = fs.statSync(abs)

    if (node.format === 'media') {
      const ext = path.extname(abs).slice(1).toLowerCase()
      const mime =
        ext === 'svg'
          ? 'image/svg+xml'
          : ext === 'mp4' || ext === 'webm'
            ? `video/${ext}`
            : `image/${ext === 'jpg' ? 'jpeg' : ext}`

      const media =
        stat.size > MEDIA_INLINE_LIMIT
          ? null
          : `data:${mime};base64,${fs.readFileSync(abs).toString('base64')}`

      return { raw: '', media, mtime: stat.mtime.toISOString() }
    }

    const raw = fs.readFileSync(abs, 'utf8')

    return {
      raw: ['markdown', 'html', 'json', 'text'].includes(node.format) ? raw : redactSource(raw),
      media: null,
      mtime: stat.mtime.toISOString(),
    }
  }

  const emitDocs = () => {
    const { roots } = scanManifest(ROOT)

    const emitNode = (node, trail) => {
      const route = `/docs/${node.path}`
      const isDir = node.type === 'dir'
      const docsContentUrl = `${SITE_URL}/docs-content/${node.id ? node.id.replace(':', '/') : node.path}.json`

      let title
      let description
      let body
      let content

      if (isDir) {
        title = `${node.name}/ | ${BASE_TITLE} Docs`
        description = `${node.name} — docs directory`
        body = `## Contents\n\n${(node.children || [])
          .map(
            (c) =>
              `- [${c.name}${c.type === 'dir' ? '/' : ''}](${SITE_URL}${encUrl(llmTreePaths(`/docs/${c.path}`).md)})`
          )
          .join('\n')}`
        content = {
          kind: 'dir',
          children: (node.children || []).map((c) => ({
            name: c.name,
            type: c.type,
            path: c.path,
            replica: `${SITE_URL}${encUrl(llmTreePaths(`/docs/${c.path}`).md)}`,
          })),
        }
      } else {
        const { raw, media, mtime } = docsFileContent(node)

        title = `${node.name} | ${BASE_TITLE} Docs`
        description = `${node.name} — ${node.format} (${node.size} bytes)`
        body = docsFileMd(node, raw)
        content = {
          kind: 'file',
          name: node.name,
          path: node.path,
          format: node.format,
          size: node.size,
          mtime,
          docsContent: docsContentUrl,
          ...(node.format === 'media' ? { media } : { text: raw }),
        }
      }

      emit(
        shellFor({
          type: isDir ? 'docs-dir' : 'docs-file',
          title,
          description,
          route,
          locale: 'en',
          alternates: { en: `${SITE_URL}${encUrl(llmTreePaths(route).md)}` },
          body,
          content: { ...content, breadcrumbs: trail },
          media: undefined,
        })
      )
    }

    /** Recursive manifest walk — mirrors build-locale-pages' emit(). */
    const walk = (node, trail) => {
      emitNode(node, trail)

      if (node.type === 'dir') {
        for (const child of node.children || []) {
          walk(child, [...trail, { name: node.name, path: `/docs/${node.path}` }])
        }
      }
    }

    // /docs — the portal index itself.
    emit(
      shellFor({
        type: 'docs-index',
        title: `Docs | ${BASE_TITLE}`,
        description: 'Documentation portal — source, reports, coverage and module docs.',
        route: '/docs',
        locale: 'en',
        alternates: { en: `${SITE_URL}${encUrl(llmTreePaths('/docs').md)}` },
        body: `## Roots\n\n${roots
          .map(
            (r) =>
              `- [${r.label || r.root}](${SITE_URL}${encUrl(llmTreePaths(`/docs/${r.root}`).md)})`
          )
          .join('\n')}`,
        content: { roots: roots.map((r) => ({ root: r.root, label: r.label, kind: r.kind })) },
      })
    )

    for (const root of roots) {
      // /docs/<root> — the root's own index page.
      emit(
        shellFor({
          type: 'docs-index',
          title: `${root.label || root.root} | ${BASE_TITLE} Docs`,
          description: `${root.label || root.root} — documentation index`,
          route: `/docs/${root.root}`,
          locale: 'en',
          alternates: { en: `${SITE_URL}${encUrl(llmTreePaths(`/docs/${root.root}`).md)}` },
          body: `## Contents\n\n${(root.children || [])
            .map(
              (c) =>
                `- [${c.name}${c.type === 'dir' ? '/' : ''}](${SITE_URL}${encUrl(llmTreePaths(`/docs/${c.path}`).md)})`
            )
            .join('\n')}`,
          content: {
            root: root.root,
            label: root.label,
            kind: root.kind,
            children: (root.children || []).map((c) => ({
              name: c.name,
              type: c.type,
              path: c.path,
            })),
          },
        })
      )

      for (const child of root.children || [])
        walk(child, [{ name: root.label || root.root, path: `/docs/${root.root}` }])
    }
  }

  // ── Fan-out ──

  for (const loc of VALID_LANGS) {
    emitHome(loc)
    emitAbout(loc)
    emitContact(loc)

    for (const legal of LEGAL_PAGES) emitLegal(loc, legal)

    emitAnimations(loc)
    emitExperience(loc, 'earthPlayground', 'earth-playground')
    emitStarField(loc)

    for (const slug of projectSlugs) {
      emitProject(loc, slug)

      for (const row of locMediaRows(loc, slug)) emitMediaLink(loc, slug, row)
    }

    for (const id of starBodyIds) emitStarBody(loc, id)
  }

  emitDocs()

  // ── Indexes — /llm/<loc>/routes.json, /llm/index.md, /llm/index.json ──

  for (const loc of VALID_LANGS) {
    const rows = indexRows.get(loc) || []

    writeReplica(
      distDir,
      `${LLM_TREE_ROOT.slice(1)}/${loc}/routes.json`,
      `${JSON.stringify(
        {
          specVersion: REPLICA_SPEC,
          locale: loc,
          language: LOCALE_TAGS[loc]?.bcp || loc,
          routes: rows,
          count: rows.length,
          generated,
        },
        null,
        1
      )}\n`
    )

    files += 1
  }

  const total = [...indexRows.values()].reduce((n, rows) => n + rows.length, 0)

  const indexJson = {
    specVersion: REPLICA_SPEC,
    site: SITE_URL,
    title: `${BASE_TITLE} — LLM replica index`,
    description:
      'Full-content Markdown and JSON replicas of every public route, in every locale. ' +
      'Sibling convention: append .md or .json to any page URL; the canonical mirror tree lives under /llm/<loc>/.',
    policy: CONTENT_POLICY,
    conventions: {
      tree: `${SITE_URL}${LLM_TREE_ROOT}/<locale>/<route>.{md,json} — English routes under ${LLM_TREE_ROOT}/en/, docs are English-only`,
      sibling: '<route>.md and <route>.json next to every page (/ → /index.md)',
      perLocaleIndex: `${SITE_URL}${LLM_TREE_ROOT}/<locale>/routes.json`,
      alternates:
        'each page advertises its replicas via <link rel="alternate" type="text/markdown|application/json">',
    },
    locales: VALID_LANGS.map((loc) => ({
      locale: loc,
      language: LOCALE_TAGS[loc]?.bcp || loc,
      routes: (indexRows.get(loc) || []).length,
      index: `${SITE_URL}${LLM_TREE_ROOT}/${loc}/routes.json`,
    })),
    totalRoutes: total,
    generated,
    generator: GENERATOR,
  }

  writeReplica(
    distDir,
    `${LLM_TREE_ROOT.slice(1)}/index.json`,
    `${JSON.stringify(indexJson, null, 1)}\n`
  )

  const indexMd = [
    `# ${BASE_TITLE} — LLM replica index`,
    '',
    `> Every public page of ${SITE_URL} in full-content Markdown and JSON, in all ${VALID_LANGS.length} site languages.`,
    '',
    `- Policy: \`ai-train=yes, search=yes, ai-input=yes\` (see robots.txt and the Content-Signal header)`,
    `- Machine index: ${SITE_URL}${LLM_TREE_ROOT}/index.json`,
    `- Per-locale route lists: ${VALID_LANGS.map((loc) => `[${loc}](${SITE_URL}${LLM_TREE_ROOT}/${loc}/routes.json)`).join(' · ')}`,
    `- Sibling convention: append \`.md\` or \`.json\` to any page URL — e.g. ${SITE_URL}/portfolio/metcha.md`,
    `- Canonical tree: ${SITE_URL}${LLM_TREE_ROOT}/<locale>/<route>.{md,json} — English under ${LLM_TREE_ROOT}/en/ (docs are English-only)`,
    '',
    `## Routes by locale`,
    '',
    ...VALID_LANGS.map(
      (loc) =>
        `- **${loc}** (${LOCALE_TAGS[loc]?.bcp || loc}): ${(indexRows.get(loc) || []).length} routes — ${SITE_URL}${LLM_TREE_ROOT}/${loc}/routes.json`
    ),
    '',
    `Total: ${total} routes × 2 formats (${total * 2} canonical files, plus sibling duplicates).`,
  ].join('\n')

  writeReplica(distDir, `${LLM_TREE_ROOT.slice(1)}/index.md`, `${indexMd}\n`)

  files += 2

  console.log(
    `[llm-pages] ${routes} routes → ${files} replica files under ${LLM_TREE_ROOT}/ + siblings`
  )

  return { written: files, routes, locales: VALID_LANGS.length }
}

// Standalone entry — emits into dist/ with the database.json/live-RTDB
// translations (prefetch keeps parity with a normal build when online).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await prefetchTranslations()

  await buildLlmPages()
}
