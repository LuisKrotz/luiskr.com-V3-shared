#!/usr/bin/env node

/**
 * @file build-locale-pages.mjs
 * @description Emits per-locale, per-route static index.html files into
 * dist/ so crawlers and no-JS visitors get translated <title>, meta
 * description, canonical, og/twitter cards, hreflang alternates and JSON-LD
 * — instead of the English shell the catch-all Firebase rewrite serves.
 *
 * Route inventory mirrors the runtime router (core/router/parse-path.ts)
 * and public/meta/sitemap-*.xml: for every locale in LANG_SLUGS the
 * generator emits home (/<loc>), the localized about/contact/legal/
 * earthPlayground/starField slugs, the English playground + star-field
 * alias segments the sitemap also lists, and /<loc>/portfolio/<slug>
 * project pages. English routes emit straight to dist/<route>/index.html
 * (exact-match static files beat the `**` SPA catch-all, so no rewrite
 * entries are needed) — including legacy portfolio aliases (canonical →
 * real slug) and the media-modal deep links the sitemap lists. Each
 * document gets a per-route localized title + description, per-route
 * hreflang alternates pointing at the equivalent route in every locale —
 * never back to the locale roots — plus a localized WebSite JSON-LD
 * url + inLanguage. Docs stay English-only (no /<loc>/docs pages) and
 * dist/cms/ is never touched — the CMS stays unindexed.
 *
 * The template is dist/index.html *after* the multi-tier loader injection
 * (build-targets.mjs step 5), so each page boots the same capability-based
 * bundle selection as the root document.
 *
 * Runnable standalone (`node scripts/build/build-locale-pages.mjs`) or imported
 * by build-targets.mjs via buildLocalePages(distDir).
 */

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { Buffer } from 'node:buffer'
import { fileURLToPath } from 'node:url'

import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'
import { PROJECT_ALIASES } from '../../../core/tokens/routes/aliases.ts'
import { LOCALE_TAGS } from '../../../core/tokens/locales.ts'

const VALID_LANGS = Object.keys(LANG_SLUGS)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const SITE_URL = 'https://luiskr.com'
const BASE_TITLE = 'Luis Krötz'
const CDN_BASE = 'https://storage.googleapis.com/luiskr.com/public/_v3/'
const SCHEMA_CONTEXT = 'https://schema.org'
const SHARE_IMAGE = `${SITE_URL}/assets/icons/share.png`

/**
 * Media-slug transform — MUST match generate-sitemap.js's slugify byte for
 * byte: emitted /portfolio/<slug>/<media> file names have to line up with
 * the URLs the sitemap already lists (diacritics fold to ASCII).
 */
const slugify = (text) =>
  (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Escape a string for use inside an HTML attribute or text node. */
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Strips markup from a translated rich-text string and compacts it into a
 * meta-description-sized plain-text snippet (≤160 chars, cut at a word
 * boundary). &nbsp; entities decode to regular spaces so the tag can sit
 * in a content attribute.
 */
const toDescription = (html, max = 160) => {
  const text = String(html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= max) return text

  const cut = text.slice(0, max)

  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 0)).trim()
}

// ─── CDN media URL grammar — mirrors core/utils/media.ts buildMediaUrls ─────
// Images carry -mozjpg-uncompressed (full) / -mozjpg3-MSSIM-tuned-kodak (thumb)
// suffixes; videos are .mp4 with a .mp4.jpg-thumb.jpg poster. Unsuffixed or
// hypothetical -16x9/-4x3 variants DO NOT exist on the bucket — never emit
// them: Google drops image candidates that 404.
const mediaUrls = (folder, m) => {
  if (!m || !m.src) return { source: '', thumb: '', isVideo: false }

  const isVideo = m.isVideo ?? false
  const base = `${CDN_BASE}${folder || ''}${m.src}`

  return isVideo
    ? { source: `${base}.mp4`, thumb: `${base}.mp4.jpg-thumb.jpg`, isVideo }
    : {
        source: `${base}-mozjpg-uncompressed.jpg`,
        thumb: `${base}-mozjpg3-MSSIM-tuned-kodak.jpg`,
        isVideo,
      }
}

// ─── JSON-LD entity builders — mirrors core/utils/schema.ts (that module is
// aliased (@core/…) so the standalone Node path can't import it; the shapes
// below must stay in step with it). ─────────────────────────────────────────
const orgEntity = () => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  legalName: 'Jacson Luis Krötz',
  name: BASE_TITLE,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/icons/android-chrome-256x256.png`,
  image: SHARE_IMAGE,
  sameAs: [
    'https://api.whatsapp.com/send?phone=+5551982274782',
    'https://github.com/LuisKrotz',
    'https://www.linkedin.com/in/luis-kr%C3%B6tz/?locale=en_US',
    'https://www.instagram.com/j_luiskrotz',
  ],
})

const websiteEntity = (bcp) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: BASE_TITLE,
  description:
    'Front-End Software Engineer specializing in performance, design systems, and animations.',
  image: SHARE_IMAGE,
  inLanguage: bcp,
  publisher: { '@id': `${SITE_URL}#organization` },
})

/** Ordered crumbs → BreadcrumbList entity (positions are 1-based per spec). */
const breadcrumbEntity = (items, id) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'BreadcrumbList',
  '@id': id,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
})

/** VideoObject for one media descriptor — mp4 contentUrl + poster thumb. */
const videoEntity = (folder, m, title, description) => {
  const { source, thumb } = mediaUrls(folder, m)

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'VideoObject',
    name: m.label || `${title} Video`,
    description: description || `Showcase video for ${title}`,
    thumbnailUrl: [thumb],
    uploadDate: '2021-01-01T00:00:00+00:00',
    duration: 'PT1M00S',
    contentUrl: source,
    embedUrl: source,
  }
}

/** Recursively yields every sections node that carries a `src`. */
function* walkMedia(node) {
  if (Array.isArray(node)) {
    for (const child of node) yield* walkMedia(child)

    return
  }

  if (node && typeof node === 'object' && typeof node.src === 'string' && node.src) yield node
}

/** Brotil + gzip siblings next to each emitted index.html (Firebase serves them). */
const writeCompressed = (file, html) => {
  const buf = Buffer.from(html, 'utf8')

  fs.writeFileSync(file, html)
  fs.writeFileSync(
    `${file}.br`,
    zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } })
  )
  fs.writeFileSync(`${file}.gz`, zlib.gzipSync(buf, { level: 9 }))
}

/**
 * Rewrites the English shell into a localized document.
 * @param {string} html - post-loader dist/index.html source
 * @param {object} o
 * @param {string} o.bcpLang - BCP-47 tag for <html lang> + og:locale alt
 * @param {string} o.ogLocale - og:locale value (xx_YY)
 * @param {string} o.title - document + social title
 * @param {string} o.description - meta description text
 * @param {string} o.url - this page's absolute URL
 * @param {string} [o.canonicalUrl] - canonical/og:url override for alias pages
 *   (defaults to `url`); alias slugs point at their canonical project so
 *   /portfolio/brazilian-leather doesn't compete with /portfolio/cicb
 * @param {Array<{bcp:string,url:string}>} o.alternates - hreflang rows
 * @param {string} [o.image] - route-specific share image (project cover /
 *   media asset); omitted → the shell's share.png stays
 * @param {Array<object>} [o.entities] - extra JSON-LD entities appended to
 *   the @graph after Organization + WebSite (WebPage, BreadcrumbList,
 *   Article, ItemList, VideoObject…)
 */
function localize(
  html,
  { bcpLang, ogLocale, title, description, url, canonicalUrl, alternates, image, entities }
) {
  const canon = canonicalUrl || url
  let out = html

  // Strip any previously injected og:locale + hreflang block — the standalone
  // path feeds an already-localized dist/index.html back through localize(),
  // and without this each run appends a duplicate alternates set.
  out = out.replace(/\s*<link rel="alternate"[^>]*>/g, '')
  out = out.replace(/\s*<meta property="og:locale(?::alternate)?"[^>]*>/g, '')

  // <html lang> + document title
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${bcpLang}"`)
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)

  // Title-bearing metas
  for (const name of ['og:title', 'twitter:title']) {
    out = out.replace(
      new RegExp(`(<meta (?:property|name)="${name}" content=")[^"]*(")`),
      `$1${esc(title)}$2`
    )
  }
  out = out.replace(/(<meta name="DC\.Title" content=")[^"]*(")/, `$1${esc(title)}$2`)

  // Canonical + social URLs — attribute-targeted so share.png and JSON-LD
  // image/logo URLs are never rewritten.
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canon}$2`)
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canon}$2`)
  out = out.replace(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${canon}$2`)

  // Description metas
  const d = esc(description)

  out = out.replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${d}$2`)
  out = out.replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`)
  out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
  out = out.replace(/(<meta name="DC\.Description"\s+content=")[^"]*(")/, `$1${d}$2`)
  out = out.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${d}$2`)

  // Route-specific share image — the three image metas swap together so
  // card crawlers never mix a project cover with share.png. The shell's
  // fixed og:image:width/height describe share.png; they are dropped for
  // custom images since wrong dimensions are worse than none.
  if (image) {
    for (const re of [
      /(<meta itemprop="image" content=")[^"]*(")/,
      /(<meta property="og:image" content=")[^"]*(")/,
      /(<meta name="twitter:image:src" content=")[^"]*(")/,
    ]) {
      out = out.replace(re, `$1${esc(image)}$2`)
    }

    out = out.replace(/\s*<meta property="og:image:(?:width|height)"[^>]*>/g, '')
  }

  // Language declarations
  out = out.replace(
    /(<meta name="DC\.Language" content=")[^"]*(")/,
    `$1${ogLocale.toLowerCase()}$2`
  )

  // JSON-LD: the whole graph is rebuilt per route — Organization + a
  // localized WebSite plus whatever route entities the caller composed
  // (WebPage, BreadcrumbList, Article, media ItemList, VideoObjects).
  // Replacing the script body wholesale keeps re-runs idempotent.
  const graph = {
    '@context': SCHEMA_CONTEXT,
    '@graph': [orgEntity(), websiteEntity(bcpLang), ...(entities || [])],
  }

  const graphJson = JSON.stringify(graph)

  out = out.replace(
    /(<script type="application\/ld\+json" id="jsonld-graph">)[\s\S]*?(<\/script>)/,
    (match, open, close) => `${open}${graphJson}${close}`
  )

  // og:locale + hreflang alternates + x-default, inserted before </head>.
  const alt = alternates
    .map((a) => `  <link rel="alternate" hreflang="${a.bcp}" href="${a.url}">`)
    .join('\n')
  const inject = [
    `  <meta property="og:locale" content="${ogLocale}">`,
    ...alternates
      .filter((a) => a.og !== ogLocale)
      .map((a) => `  <meta property="og:locale:alternate" content="${a.og}">`),
    alt,
    `  <link rel="alternate" hreflang="x-default" href="${alternates[0].url}">`,
  ].join('\n')

  out = out.replace(/\s*<\/head>/, `${inject}\n</head>`)

  return out
}

/**
 * Generates all localized pages under `distDir`. When `template` is omitted
 * the post-loader dist/index.html is read from disk; when provided (the
 * build orchestrator's in-memory copy) the localized root document is
 * returned so the caller can run its own compress/SW-stamp pass.
 * @param {string} distDir - absolute dist path
 * @param {string} [template] - shell HTML; defaults to dist/index.html on disk
 * @returns {{html: string, written: number, locales: number}} localized root html + counts
 */
export function buildLocalePages(distDir = path.join(ROOT, 'dist'), template) {
  const indexPath = path.join(distDir, 'index.html')

  if (!template) {
    if (!fs.existsSync(indexPath)) throw new Error(`build-locale-pages: ${indexPath} not found`)

    template = fs.readFileSync(indexPath, 'utf8')
  }

  let translations = {}
  const dbPath = path.join(ROOT, 'database.json')

  if (fs.existsSync(dbPath))
    translations = JSON.parse(fs.readFileSync(dbPath, 'utf8')).translations || {}
  else console.warn('[locale-pages] database.json missing — emitting English fallbacks only')

  const en = translations.en || {}
  const legalEn = en.components?.['legal-footer']?.links || []

  /** Per-locale lookup with English fallback (mirrors runtime appText). */
  const t = (loc, get) => {
    const v = get(translations[loc] || {})
    return v === undefined || v === null || v === '' ? get(en) : v
  }

  // hreflang alternates — built per route: every emitted page points its
  // alternates at the *equivalent* route in each locale, never back to the
  // locale root. `pathOf` returns the canonical path for a locale ('en'
  // paths are unprefixed); alias pages map to their canonical equivalents
  // (e.g. /br/earth-playground alternates → /br/<localized-earth-slug>).
  const enSlugs = LANG_SLUGS.en || {}

  const slugPath = (key) => (loc) =>
    loc === 'en' ? `/${enSlugs[key]}` : `/${loc}/${LANG_SLUGS[loc]?.[key] || enSlugs[key]}`

  const homePath = (loc) => (loc === 'en' ? '/' : `/${loc}`)

  const alternatesFor = (pathOf) =>
    VALID_LANGS.filter((loc) => LOCALE_TAGS[loc]).map((loc) => ({
      bcp: LOCALE_TAGS[loc].bcp,
      og: LOCALE_TAGS[loc].og,
      url: `${SITE_URL}${pathOf(loc)}`,
    }))

  let written = 0

  // ── Per-route description resolvers — one source of truth per page type ──
  // Home/about share the bio blurb; contact composes its channels; legal
  // pages take their first paragraph; playgrounds take the authored
  // `description` field; projects take the first body paragraph. Every
  // resolver falls back to the about blurb so no page emits empty meta.
  const aboutDescOf = (loc) =>
    toDescription(
      t(loc, (x) => x.pages?.about?.col1?.[0]) ||
        'Front-End Developer focused on creating beautiful experiences.'
    )

  const contactDescOf = (loc) => {
    const c = t(loc, (x) => x.components?.contact)

    const links = (c?.line1 || [])
      .map((i) => i?.description)
      .filter(Boolean)
      .join(', ')

    return c?.title ? toDescription(`${c.title} | ${links}`) : aboutDescOf(loc)
  }

  const legalDescOf = (loc, pageKey) =>
    toDescription(t(loc, (x) => x.pages?.[pageKey]?.sections?.[0]?.content?.[0])) ||
    aboutDescOf(loc)

  /** Recursively finds the first paragraph string inside a nested sections payload. */
  const firstPara = (node) => {
    if (typeof node === 'string') return node

    if (Array.isArray(node)) {
      for (const item of node) {
        const found = firstPara(item)

        if (found) return found
      }
    }

    return ''
  }

  const projectDescOf = (loc, slug) =>
    toDescription(firstPara(t(loc, (x) => x.projects?.[slug]?.sections))) || aboutDescOf(loc)

  /**
   * Full rich-media graph for one project page — Article + media
   * ItemList (entries deep-link to the emitted /portfolio/<p>/<media>
   * URLs; the SPA serves every labelled media slug) + one VideoObject
   * per video. Mirrors runtime generateProjectSchema.
   */
  const projectEntities = (loc, slug, exclude) => {
    const project = t(loc, (x) => x.projects?.[slug])

    if (!project) return []

    const base = `${SITE_URL}${loc === 'en' ? '' : `/${loc}`}/portfolio/${slug}`
    const bcp = LOCALE_TAGS[loc].bcp
    const title = toDescription(project.title || slug, 80)
    const description = projectDescOf(loc, slug)
    const folder = project.folder || ''
    const cover = mediaUrls(folder, project.cover)

    const entities = [
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'Article',
        '@id': `${base}#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': `${base}#webpage`,
          url: base,
          name: title,
          inLanguage: bcp,
        },
        headline: title,
        inLanguage: bcp,
        mainEntityOfPage: base,
        datePublished: '2021-01-01T00:00:00+00:00',
        dateModified: '2021-01-01T00:00:00+00:00',
        author: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
        publisher: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
        image: [cover.source ? (cover.isVideo ? cover.thumb : cover.source) : SHARE_IMAGE],
        description,
      },
    ]

    if (project.cover?.isVideo && project.cover.src) {
      entities.push(videoEntity(folder, project.cover, title, description))
    }

    const media = [...walkMedia(project.sections)]

    const listItems = media
      .filter((m) => m.src && m.label)
      .map((m, i) => {
        const { source, thumb, isVideo } = mediaUrls(folder, m)

        return {
          '@type': 'ListItem',
          position: i + 1,
          url: `${base}/${slugify(m.label)}`,
          name: m.label,
          image: isVideo ? thumb : source,
        }
      })

    if (listItems.length) {
      entities.push({
        '@context': SCHEMA_CONTEXT,
        '@type': 'ItemList',
        itemListElement: listItems,
      })
    }

    for (const m of media.filter((x) => x.isVideo && x.src && x !== exclude)) {
      entities.push(videoEntity(folder, m, title, description))
    }

    return entities
  }

  /** Cover share-image for a project — uncompressed jpg or video poster. */
  const projectImageOf = (loc, slug) => {
    const project = t(loc, (x) => x.projects?.[slug])
    const cover = mediaUrls(project?.folder || '', project?.cover)

    return cover.source ? (cover.isVideo ? cover.thumb : cover.source) : undefined
  }

  /** Carousel ItemList for locale home pages — portfolio tiles → covers. */
  const homeEntities = (loc) => {
    const raw = t(loc, (x) => x.pages?.HOME?.portfoliolist) || []
    const items = Array.isArray(raw) ? raw : Object.values(raw)

    const base = `${SITE_URL}${loc === 'en' ? '' : `/${loc}`}`

    const element = items
      .filter((i) => i && (i.link || i.slug))
      .map((i, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${base}/portfolio/${i.link || i.slug}`,
        name: i.label || i.title || `Item ${idx + 1}`,
        ...(i.image ? { image: `${CDN_BASE}covers/${i.image}.jpg` } : {}),
      }))

    return element.length
      ? [{ '@context': SCHEMA_CONTEXT, '@type': 'ItemList', itemListElement: element }]
      : []
  }

  /** Strips the `Luis Krötz | ` prefix / ` | Luis Krötz` suffix for crumb names. */
  const pageNameFromTitle = (title) => {
    const prefix = `${BASE_TITLE} | `
    const suffix = ` | ${BASE_TITLE}`

    if (title.startsWith(prefix)) return title.slice(prefix.length)

    if (title.endsWith(suffix)) return title.slice(0, -suffix.length)

    return title
  }

  const epDescOf = (loc) =>
    toDescription(t(loc, (x) => x.pages?.['earth-playground']?.description)) || aboutDescOf(loc)

  const sfDescOf = (loc) =>
    toDescription(t(loc, (x) => x.pages?.['star-field']?.description)) || aboutDescOf(loc)

  /** Expandable-media {slug,label,media} rows of a project — mirrors generate-sitemap's walk. */
  const mediaRowsOf = (project) => {
    const out = []

    for (const section of project?.sections || []) {
      const items = Array.isArray(section) ? section : [section]

      for (const item of items) {
        const media = Array.isArray(item) ? item : [item]

        for (const m of media) {
          if (m && typeof m === 'object' && m.label && m.canExpand) {
            const slug = slugify(m.label)

            // PATH_MAX per segment is 255 — a few monster labels slugify
            // past it; those URLs stay on the `**` SPA fallback (same as
            // today) rather than breaking the emit.
            if (slug && slug.length <= 200) out.push({ slug, label: m.label, media: m })
          }
        }
      }
    }

    return out
  }

  const portfolioAlt = (slug) => (loc2) => `${loc2 === 'en' ? '' : `/${loc2}`}/portfolio/${slug}`

  /**
   * Route table: relative path → title, localized description,
   * canonical-equivalent alternates path, optional canonical override.
   * `path` is the emitted file path relative to its base (en → dist/,
   * others → dist/langs/); en home yields '' — dist/index.html is
   * already written by the root pass.
   */
  const routesFor = (loc) => {
    const slugs = LANG_SLUGS[loc]
    const legal = t(loc, (x) => x.components?.['legal-footer']?.links) || legalEn
    const pageName = (i) => legal?.[i]?.page
    const titleOf = (suffix) => (suffix ? `${BASE_TITLE} | ${suffix}` : BASE_TITLE)
    const pgTitle = () =>
      `${t(loc, (x) => x.APP?.earthPlayground) || 'Earth Playground'} | ${BASE_TITLE}`
    const sfTitle = () => `${t(loc, (x) => x.APP?.starField) || 'Star Field'} | ${BASE_TITLE}`
    const prefix = loc === 'en' ? '' : `${loc}/`

    const routes = [
      {
        path: loc === 'en' ? '' : loc,
        title: BASE_TITLE,
        description: aboutDescOf(loc),
        alt: homePath,
        isHome: true,
        entities: homeEntities(loc),
      },
    ]

    if (slugs) {
      const epCanonical = slugPath('earthPlayground')(loc)

      routes.push(
        {
          path: `${prefix}${slugs.about}`,
          title: titleOf(t(loc, (x) => x.APP?.about?.description)),
          description: aboutDescOf(loc),
          alt: slugPath('about'),
        },
        {
          path: `${prefix}${slugs.contact}`,
          title: titleOf(t(loc, (x) => x.APP?.contact)),
          description: contactDescOf(loc),
          alt: slugPath('contact'),
        },
        {
          path: `${prefix}${slugs.privacy}`,
          title: titleOf(pageName(1)),
          description: legalDescOf(loc, 'privacy-policy'),
          alt: slugPath('privacy'),
        },
        {
          path: `${prefix}${slugs.gdpr}`,
          title: titleOf(pageName(2)),
          description: legalDescOf(loc, 'GDPR'),
          alt: slugPath('gdpr'),
        },
        {
          path: `${prefix}${slugs.terms}`,
          title: titleOf(pageName(3)),
          description: legalDescOf(loc, 'terms-of-use'),
          alt: slugPath('terms'),
        },
        {
          path: `${prefix}${slugs.license}`,
          title: titleOf(pageName(4)),
          description: legalDescOf(loc, 'license'),
          alt: slugPath('license'),
        },
        {
          path: `${prefix}${slugs.earthPlayground}`,
          title: pgTitle(),
          description: epDescOf(loc),
          alt: slugPath('earthPlayground'),
        },
        {
          path: `${prefix}${slugs.starField}`,
          title: sfTitle(),
          description: sfDescOf(loc),
          alt: slugPath('starField'),
        }
      )

      // English playground alias segments under the locale prefix (sitemap
      // parity) — alternates resolve to the canonical localized slugs and
      // the canonical link points at the locale's canonical slug so the
      // alias URL never competes with it.
      if (loc !== 'en' || slugs.earthPlayground !== 'earth-playground') {
        routes.push({
          path: `${prefix}earth-playground`,
          title: pgTitle(),
          description: epDescOf(loc),
          alt: slugPath('earthPlayground'),
          canonical: epCanonical,
        })
      }

      routes.push({
        path: `${prefix}space-playground`,
        title: pgTitle(),
        description: epDescOf(loc),
        alt: slugPath('earthPlayground'),
        canonical: epCanonical,
      })

      if (loc !== 'en' || slugs.starField !== 'star-field-experiment') {
        routes.push({
          path: `${prefix}star-field-experiment`,
          title: sfTitle(),
          description: sfDescOf(loc),
          alt: slugPath('starField'),
          canonical: slugPath('starField')(loc),
        })
      }
    }

    // Portfolio — /<loc>/portfolio/<slug> renders the project view
    // translated; English additionally emits the legacy alias slugs
    // (canonical → real slug) and the media-modal deep links the sitemap
    // lists (English-only by design).
    for (const slug of Object.keys(en.projects || {})) {
      const pageName = toDescription(t(loc, (x) => x.projects?.[slug]?.title) || slug, 80)
      const title = titleOf(pageName)

      const description = projectDescOf(loc, slug)

      routes.push({
        path: `${prefix}portfolio/${slug}`,
        title,
        pageName,
        description,
        image: projectImageOf(loc, slug),
        entities: projectEntities(loc, slug),
        alt: portfolioAlt(slug),
      })

      if (loc !== 'en') continue

      for (const [alias, canonical] of Object.entries(PROJECT_ALIASES)) {
        if (canonical === slug) {
          routes.push({
            path: `portfolio/${alias}`,
            title,
            pageName,
            description,
            image: projectImageOf(loc, slug),
            entities: projectEntities(loc, slug),
            alt: portfolioAlt(slug),
            canonical: portfolioAlt(slug)('en'),
          })
        }
      }

      const project = t(loc, (x) => x.projects?.[slug])
      const projectUrl = `${SITE_URL}/portfolio/${slug}`

      for (const { slug: mediaSlug, label, media } of mediaRowsOf(project)) {
        const mediaUrl = `${projectUrl}/${mediaSlug}`
        const { source, thumb, isVideo } = mediaUrls(project?.folder || '', media)

        routes.push({
          path: `portfolio/${slug}/${mediaSlug}`,
          title,
          pageName: label,
          description,
          image: source ? (isVideo ? thumb : source) : undefined,
          // The media page carries the whole project graph plus its own
          // media entity (ImageObject for stills, VideoObject for clips)
          // so Google can index the specific asset at this URL.
          entities: [
            ...(isVideo
              ? [videoEntity(project?.folder || '', media, pageName, description)]
              : source
                ? [
                    {
                      '@context': SCHEMA_CONTEXT,
                      '@type': 'ImageObject',
                      '@id': `${mediaUrl}#image`,
                      url: source,
                      contentUrl: source,
                      name: label,
                    },
                  ]
                : []),
            ...projectEntities(loc, slug, media),
          ],
          crumbs: [{ name: pageName, url: projectUrl }],
          canonical: mediaUrl,
          alternates: [{ bcp: 'en', og: 'en_US', url: mediaUrl }],
        })
      }
    }

    return routes
  }

  // ── Root document: inject the alternate-language block ────────────────────
  // The English shell keeps its own metas; alternates point crawlers at the
  // localized variants.
  const rootDescription = toDescription(
    en.pages?.about?.col1?.[0] || 'Front-End Developer focused on creating beautiful experiences.'
  )

  const webPageEntity = ({ url, name, description, bcp, image, crumbs }) => ({
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: bcp,
    isPartOf: { '@id': `${SITE_URL}#website` },
    publisher: { '@id': `${SITE_URL}#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: image || SHARE_IMAGE },
    ...(crumbs ? { breadcrumb: { '@id': `${url}#breadcrumbs` } } : {}),
  })

  const rootHtml = localize(template, {
    bcpLang: 'en',
    ogLocale: 'en_US',
    title: BASE_TITLE,
    description: rootDescription,
    url: `${SITE_URL}/`,
    alternates: alternatesFor(homePath),
    entities: [
      webPageEntity({
        url: `${SITE_URL}/`,
        name: BASE_TITLE,
        description: rootDescription,
        bcp: 'en',
      }),
      ...homeEntities('en'),
    ],
  })

  // ── Per-route documents ───────────────────────────────────────────────────
  // English emits straight to dist/<route>/index.html — exact-match static
  // files win over the `**` SPA rewrite, so no firebase.json entry is
  // needed. Other locales live under dist/langs/<loc>/… with rewrites.
  for (const loc of VALID_LANGS) {
    if (!LOCALE_TAGS[loc]) continue

    const tags = LOCALE_TAGS[loc]

    for (const route of routesFor(loc)) {
      if (!route.path) continue // en home — dist/index.html written by the root pass

      const pageUrl = route.canonical
        ? route.canonical.startsWith('http')
          ? route.canonical
          : `${SITE_URL}${route.canonical}`
        : `${SITE_URL}/${route.path}`

      const description = route.description || aboutDescOf(loc)

      const pageName = route.pageName || pageNameFromTitle(route.title)

      // Home locales emit no breadcrumb (single page); every other route
      // gets Home → [project] → page.
      const crumbs = route.isHome
        ? null
        : [
            { name: BASE_TITLE, url: `${SITE_URL}${loc === 'en' ? '/' : `/${loc}`}` },
            ...(route.crumbs || []),
            { name: pageName, url: pageUrl },
          ]

      const entities = [
        webPageEntity({
          url: pageUrl,
          name: pageName,
          description,
          bcp: tags.bcp,
          image: route.image,
          crumbs,
        }),
        ...(crumbs ? [breadcrumbEntity(crumbs, `${pageUrl}#breadcrumbs`)] : []),
        ...(route.entities || []),
      ]

      const out = localize(template, {
        bcpLang: tags.bcp,
        ogLocale: tags.og,
        title: route.title,
        description,
        url: `${SITE_URL}/${route.path}`,
        canonicalUrl: route.canonical
          ? route.canonical.startsWith('http')
            ? route.canonical
            : `${SITE_URL}${route.canonical}`
          : undefined,
        alternates: route.alternates || alternatesFor(route.alt),
        image: route.image,
        entities,
      })

      const file =
        loc === 'en'
          ? path.join(distDir, route.path, 'index.html')
          : path.join(distDir, 'langs', route.path, 'index.html')

      fs.mkdirSync(path.dirname(file), { recursive: true })
      writeCompressed(file, out)
      written++
    }
  }

  syncFirebaseRewrites()

  return { html: rootHtml, written, locales: VALID_LANGS.length - 1 }
}

/**
 * Regenerates the `hosting.rewrites` block in firebase.json so the public
 * locale URLs (`/br`, `/br/sobre`, …) keep serving the pages now emitted
 * under `dist/langs/<loc>/…`. Firebase rewrite destinations are single
 * files — no glob capture — so the table enumerates every route the same
 * way `routesFor` does. Preserves every non-rewrite hosting key and the
 * meta/CMS/SPA-catch-all entries declared in `STATIC_REWRITES`.
 */
export function syncFirebaseRewrites() {
  const firebasePath = path.join(ROOT, 'firebase.json')
  const cfg = JSON.parse(fs.readFileSync(firebasePath, 'utf8'))

  // Localized portfolio slugs — the /<loc>/portfolio/<slug> pages emitted by
  // buildLocalePages need explicit rewrites (the `**` catch-all would serve
  // the English shell instead).
  const dbPath = path.join(ROOT, 'database.json')
  const projectSlugs = fs.existsSync(dbPath)
    ? Object.keys(JSON.parse(fs.readFileSync(dbPath, 'utf8')).translations?.en?.projects || {})
    : []

  const localeRoutes = []

  for (const loc of VALID_LANGS) {
    if (loc === 'en' || !LOCALE_TAGS[loc]) continue

    const slugs = LANG_SLUGS[loc] || {}
    const subRoutes = [
      slugs.about,
      slugs.contact,
      slugs.privacy,
      slugs.gdpr,
      slugs.terms,
      slugs.license,
      slugs.earthPlayground,
      slugs.starField,
      'earth-playground',
      'space-playground',
      'star-field-experiment',
      ...projectSlugs.map((slug) => `portfolio/${slug}`),
    ].filter(Boolean)

    localeRoutes.push({ source: `/${loc}`, destination: `/langs/${loc}/index.html` })

    for (const sub of subRoutes) {
      localeRoutes.push({
        source: `/${loc}/${sub}`,
        destination: `/langs/${loc}/${sub}/index.html`,
      })
    }
  }

  cfg.hosting.rewrites = [...STATIC_REWRITES, ...localeRoutes, ...SPA_REWRITES]

  fs.writeFileSync(firebasePath, `${JSON.stringify(cfg, null, 2)}\n`)
}

/** Rewrites that sit before the locale table — meta files moved into
 * public/meta/ keep their root URLs through these entries. Per-locale
 * sitemap files and localized agent-readable files (robots/urllist/llms/
 * ai-catalog under /meta/<loc>/) keep their `/<loc>/<file>` URLs. */
const META_FILE_REWRITES = Object.freeze([
  'robots.txt',
  'urllist.txt',
  'llms.txt',
  'ai-catalog.json',
])

const STATIC_REWRITES = Object.freeze([
  { source: '/robots.txt', destination: '/meta/robots.txt' },
  { source: '/sitemap.xml', destination: '/meta/sitemap.xml' },
  { source: '/urllist.txt', destination: '/meta/urllist.txt' },
  { source: '/llms.txt', destination: '/meta/llms.txt' },
  { source: '/ai-catalog.json', destination: '/meta/ai-catalog.json' },
  { source: '/.well-known/ai-catalog.json', destination: '/meta/.well-known/ai-catalog.json' },
  { source: '/.well-known/api-catalog', destination: '/meta/.well-known/api-catalog' },
  { source: '/openapi.json', destination: '/meta/openapi.json' },
  { source: '/auth.md', destination: '/meta/auth.md' },
  {
    source: '/.well-known/oauth-authorization-server',
    destination: '/meta/.well-known/oauth-authorization-server',
  },
  {
    source: '/.well-known/oauth-protected-resource',
    destination: '/meta/.well-known/oauth-protected-resource',
  },
  { source: '/.well-known/agent-card.json', destination: '/meta/.well-known/agent-card.json' },
  {
    source: '/.well-known/agent-skills/index.json',
    destination: '/meta/.well-known/agent-skills/index.json',
  },
  {
    source: '/.well-known/mcp/server-card.json',
    destination: '/meta/.well-known/mcp/server-card.json',
  },
  {
    source: '/.well-known/http-message-signatures-directory',
    destination: '/meta/.well-known/http-message-signatures-directory',
  },
  { source: '/browserconfig.xml', destination: '/meta/browserconfig.xml' },
  ...VALID_LANGS.map((loc) => ({
    source: `/sitemap-${loc}.xml`,
    destination: `/meta/sitemap-${loc}.xml`,
  })),
  ...VALID_LANGS.filter((loc) => loc !== 'en').flatMap((loc) =>
    META_FILE_REWRITES.map((file) => ({
      source: `/${loc}/${file}`,
      destination: `/meta/${loc}/${file}`,
    }))
  ),
])

/** CMS + SPA catch-all — always last. */
const SPA_REWRITES = Object.freeze([
  { source: '/admin', destination: '/cms/index.html' },
  { source: '/admin/**', destination: '/cms/index.html' },
  { source: '/cms', destination: '/cms/index.html' },
  { source: '/cms/**', destination: '/cms/index.html' },
  { source: '**', destination: '/index.html' },
])

// Standalone entry: `node scripts/build/build-locale-pages.mjs` — writes the
// localized root itself (the orchestrator does it in-memory instead) and
// re-stamps the service-worker precache revision the same way.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const DIST = path.join(ROOT, 'dist')
  const indexPath = path.join(DIST, 'index.html')
  const { html, written, locales } = buildLocalePages(DIST)

  writeCompressed(indexPath, html)

  const swPath = path.join(DIST, 'service-worker.js')

  if (fs.existsSync(swPath)) {
    const crypto = await import('node:crypto')
    const htmlHash = crypto.createHash('md5').update(html).digest('hex')
    let sw = fs.readFileSync(swPath, 'utf8')

    sw = sw.replace(
      /\{url:"index\.html",revision:"[^"]+"\}/,
      `{url:"index.html",revision:"${htmlHash}"}`
    )
    writeCompressed(swPath, sw)
  }

  console.log(`[locale-pages] wrote ${written + 1} documents across ${locales} locales`)
}
