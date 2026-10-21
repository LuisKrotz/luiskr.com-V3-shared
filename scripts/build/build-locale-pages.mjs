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
 * project pages. Every route emits at its public path — English under
 * dist/<route>/, other locales under dist/<loc>/<slug>/ — so exact-match
 * static files resolve under any static server (firebase, vite preview,
 * crawlers) without relying on rewrites; rewrite-covered locale base
 * routes additionally write the dist/langs/<loc>/… copy the firebase
 * rewrites point at. English also emits legacy portfolio aliases
 * (canonical → real slug) and the media-modal deep links the sitemap
 * lists. Each document gets a per-route localized title + description,
 * per-route hreflang alternates pointing at the equivalent route in
 * every locale — never back to the locale roots — plus a localized
 * WebSite JSON-LD url + inLanguage. Docs stay English-only (no
 * /<loc>/docs pages) and dist/cms/ is never touched — the CMS stays
 * unindexed.
 *
 * Translations come from the live RTDB `translations` node fetched by
 * prefetchTranslations() (build-targets / standalone main call it first);
 * the committed database.json snapshot is the offline fallback.
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
import { PROJECT_ALIASES, MEDIA_SLUG_MAX_LENGTH } from '../../../core/tokens/routes/aliases.ts'
import { LOCALE_TAGS } from '../../../core/tokens/locales.ts'
import { loadMediaManifest, resolveMediaUrls, resolveCoverKey } from './media-manifest.mjs'
import { withFsRetry } from './fs-retry.mjs'
import { scanManifest } from '../../build/docs/scan.mjs'

const VALID_LANGS = Object.keys(LANG_SLUGS)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const SITE_URL = 'https://luiskr.com'
const BASE_TITLE = 'Luis Krötz'
const CDN_BASE = 'https://storage.googleapis.com/luiskr.com/public/_v3/'
const FIREBASE_DB = 'https://luiskr-com.firebaseio.com'
const SCHEMA_CONTEXT = 'https://schema.org'
const SHARE_IMAGE = `${SITE_URL}/assets/icons/share.png`

/**
 * The match below tolerates a legacy .boot-veil emitted inside #app by an
 * earlier template revision so re-runs normalize older documents back to
 * the clean article shape.
 */

/**
 * Russian Cyrillic → Latin transliteration — Cyrillic media labels would
 * otherwise slugify to '' and lose their deep-link URL. MUST stay
 * byte-identical to CYRILLIC_SLUG in core/utils/string.ts.
 */
const CYRILLIC_SLUG = {
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
    .replace(/[а-яё]/g, (ch) => CYRILLIC_SLUG[ch])
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Caps a media deep-link slug at MEDIA_SLUG_MAX_LENGTH so
 * prerendered dist paths stay under Windows MAX_PATH — the cut drops the
 * trailing partial word (and a dangling hyphen) so the slug always ends
 * on a hyphen boundary. Byte-identical to the cap in mediaSlugSeq
 * (core/utils/string.ts) so emitted file names, sitemap <loc>s and the
 * runtime resolver agree.
 */
const capSlug = (base) =>
  base.length > MEDIA_SLUG_MAX_LENGTH
    ? base.slice(0, MEDIA_SLUG_MAX_LENGTH).replace(/-[^-]*$/u, '')
    : base

/** Escape a string for use inside an HTML attribute or text node. */
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Percent-encodes a URL for markup/JSON-LD emission — bucket keys can
 * carry literal spaces ('brazilian leather/…', '…PARIS FASHION-WEEK…') and
 * non-ASCII, which break srcset candidate parsing (whitespace-separated
 * grammar) and RFC-3986-strict contexts (JSON-LD, sitemap locs). Mirrors
 * core/utils/media.ts encodeMediaUrl — that module uses @core aliases so
 * this standalone Node path can't import it. decodeURI-first keeps it
 * idempotent on already-encoded input (encodeURI escapes '%' itself).
 */
const enc = (u) => {
  if (!u) return u

  try {
    return encodeURI(decodeURI(u))
  } catch {
    return encodeURI(u)
  }
}

/**
 * Reverses enc() for manifest-key lookups — bucket keys are stored raw,
 * so a '%XX'-encoded URL must decode before `manifest.has`. Malformed
 * escapes (a '%' not followed by two hex digits) make decodeURI throw, so
 * those short-circuit to the raw form.
 */
const dec = (u) => (u.includes('%') && !/%(?![0-9a-fA-F]{2})/.test(u) ? decodeURI(u) : u)

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
// Derivative availability is per-object, so variant resolution runs against
// the bucket manifest generate-sitemap persists at
// website/public/meta/media-manifest.json (uncompressed pass preferred,
// raw originals for legacy items). Without a manifest the historic
// convention is emitted. Unsuffixed-hypothetical variants (-16x9/-4x3)
// DO NOT exist on the bucket — never emit them: Google drops image
// candidates that 404.
const mediaUrls = (folder, m, manifest) => {
  const { source, thumb, isVideo } = resolveMediaUrls(folder, m, manifest)

  return {
    source: source ? enc(`${CDN_BASE}${source}`) : '',
    thumb: thumb ? enc(`${CDN_BASE}${thumb}`) : '',
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
const videoEntity = (folder, m, title, description, manifest) => {
  const { source, thumb } = mediaUrls(folder, m, manifest)

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

  withFsRetry(() => fs.writeFileSync(file, html))
  withFsRetry(() =>
    fs.writeFileSync(
      `${file}.br`,
      zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } })
    )
  )
  withFsRetry(() => fs.writeFileSync(`${file}.gz`, zlib.gzipSync(buf, { level: 9 })))
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
 * @param {string} [o.content] - prerendered body markup injected into
 *   `<div id="app">` so crawlers and AI agents that never run JavaScript
 *   still read the full page content — the SPA replaces it on mount via
 *   `replaceChildren`.
 * @param {{title:string,msg:string}} [o.loader] - per-locale APP.loader copy
 *   for the statically-emitted intro-loader veil (class names mirror
 *   LOADER_CLASSES) — title + first stage line, retexted by the runtime
 *   the instant JS adopts the node.
 */
export function localize(
  html,
  {
    bcpLang,
    ogLocale,
    title,
    description,
    url,
    canonicalUrl,
    alternates,
    image,
    entities,
    content,
    loader,
  }
) {
  const canon = canonicalUrl || url
  let out = html

  // Strip any previously injected og:locale + hreflang block — the standalone
  // path feeds an already-localized dist/index.html back through localize(),
  // and without this each run appends a duplicate alternates set.
  out = out.replace(/\s*<link rel="alternate"[^>]*>/g, '')
  out = out.replace(/\s*<meta property="og:locale(?::alternate)?"[^>]*>/g, '')

  // <html lang> + document title — Russian documents also carry the
  // cyrillic-font state class at markup level so --font-primary flips to
  // Fira Sans even before the head script runs.
  out = out.replace(/<html lang="[^"]*"/, `<html lang="${bcpLang}"`)

  if (bcpLang === 'ru') {
    out = out.replace(/<html([^>]*)class="([^"]*)"/, '<html$1class="$2 cyrillic-font"')
  }

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

  // Prerendered route content — the app container ships populated so the
  // page is fully readable without JavaScript; mount() hoists it offscreen
  // (reader modes + AI agents keep reading it) instead of deleting it.
  // The <article class="reader-content"> mirrors READER_CLASSES.CONTENT.
  // The match covers every prior emission state — clean template
  // (<div id="app"></div>), a previous article-wrapped run, and the legacy
  // bare-<main> shape — so standalone re-runs never keep stale content.
  // The match tolerates a legacy .boot-veil inside #app (emitted by an
  // earlier template revision) so re-runs strip it instead of leaving
  // stale markup.
  if (content) {
    out = out.replace(
      /<div id="app">\s*(?:<div class="boot-veil"[^>]*>[\s\S]*?<\/div>\s*)?(?:<article class="reader-content">[\s\S]*?<\/article>|<main>[\s\S]*?<\/main>)?\s*<\/div>/,
      `<div id="app"><article class="reader-content">${content}</article></div>`
    )
  }

  // Localize the statically-emitted intro-loader copy — mirrors
  // LOADER_CLASSES.INTRO_LOADER_TITLE / _MSG in the body markup.
  if (loader?.title)
    out = out.replace(/(<div class="intro-loader-title">)[^<]*/, `$1${esc(loader.title)}`)

  if (loader?.msg)
    out = out.replace(/(<div class="intro-loader-msg">)[^<]*/, `$1${esc(loader.msg)}`)

  return out
}

/**
 * Star-field dossier image dims cache — image URL → ` width="W" height="H"`
 * attribute fragment, seeded by `prefetchStarMediaDims` (dossier JSONs store
 * no intrinsic size, so each unique CDN image is probed once via a small
 * range request and shared across all 15 locales).
 */
const starMediaDims = new Map()

/** Bytes fetched per image-dims probe — SOF/IHDR headers live in the head. */
const DIMS_PROBE_BYTES = 64 * 1024

/**
 * Scans an image header for intrinsic dims — PNG IHDR (8-byte signature)
 * or JPEG SOFn marker walk (FFD8 + length-prefixed segments; SOF markers
 * are C0–CF except DHT/DAC/RST: C4, C8, CC). Returns [w, h] or null.
 * @param {Buffer} buf - head bytes of the image
 */
const scanImageDims = (buf) => {
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  }

  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null

  let off = 2

  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) {
      off += 1

      continue
    }

    const marker = buf[off + 1]

    if (marker >= 0xd0 && marker <= 0xd9) {
      off += 2

      continue
    }

    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [buf.readUInt16BE(off + 7), buf.readUInt16BE(off + 5)]
    }

    off += 2 + buf.readUInt16BE(off + 2)
  }

  return null
}

/**
 * Live `translations` node pulled from the RTDB by prefetchTranslations().
 * When set, buildLocalePages emits current per-locale CMS text instead of
 * the committed database.json snapshot (which lags behind content edits —
 * the exact gap that made localized pages render English/fallback text).
 */
let liveTranslations = null

/**
 * Fetches the live `translations` node once per build so every prerendered
 * page carries the per-locale text authors actually published. Offline or
 * unreachable host → warn and keep the database.json snapshot as the source.
 */
export async function prefetchTranslations() {
  try {
    const res = await fetch(`${FIREBASE_DB}/translations.json`)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    if (!data?.en || typeof data.en !== 'object') throw new Error('payload missing `en` root')

    liveTranslations = data
    console.log(`[locale-pages] live translations: ${Object.keys(data).length} locales`)
  } catch (e) {
    console.warn(
      `[locale-pages] live translations unavailable (${e.message}) — using database.json snapshot`
    )
  }
}

/**
 * Probes every unique star-field dossier image once (64 KB range request
 * each) so emitted <img> tags carry real width/height attrs — the
 * lazy-media CLS budget flagged the bare imgs. Failures are silent:
 * a missing probe just emits the attr-less tag it always did.
 */
export async function prefetchStarMediaDims() {
  const srcs = new Set()

  try {
    const dataRoot = path.join(ROOT, 'experiments', 'star-field', 'public', 'data')

    for (const loc of fs.readdirSync(dataRoot)) {
      const locDir = path.join(dataRoot, loc)

      if (!fs.statSync(locDir).isDirectory()) continue

      for (const file of fs.readdirSync(locDir)) {
        if (!file.endsWith('.json')) continue

        try {
          const dossier = JSON.parse(fs.readFileSync(path.join(locDir, file), 'utf8'))

          for (const img of dossier?.media?.images || []) {
            if (img?.src) srcs.add(img.src)
          }
        } catch {
          /* one malformed dossier must not kill the fan-out */
        }
      }
    }
  } catch {
    return
  }

  await Promise.all(
    [...srcs].map(async (url) => {
      try {
        const res = await fetch(url, { headers: { Range: `bytes=0-${DIMS_PROBE_BYTES - 1}` } })

        if (!res.ok) return

        const dims = scanImageDims(Buffer.from(await res.arrayBuffer()))

        if (dims) starMediaDims.set(url, ` width="${dims[0]}" height="${dims[1]}"`)
      } catch {
        /* unreachable host → attr-less img, same as before */
      }
    })
  )
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

  // Live RTDB translations win when prefetchTranslations() succeeded;
  // the committed database.json snapshot is the offline fallback.
  let translations = liveTranslations || {}

  if (!liveTranslations) {
    const dbPath = path.join(ROOT, 'database.json')

    if (fs.existsSync(dbPath))
      translations = JSON.parse(fs.readFileSync(dbPath, 'utf8')).translations || {}
    else console.warn('[locale-pages] database.json missing — emitting English fallbacks only')
  }

  const en = translations.en || {}
  const legalEn = en.components?.['legal-footer']?.links || []

  // CDN media manifest — resolveMediaUrls picks per-item best variants when
  // the generate-sitemap pass persisted one; falls back to the suffix
  // convention otherwise.
  const mediaManifest = loadMediaManifest(path.join(ROOT, 'website', 'public', 'meta'))

  /** Per-locale lookup with English fallback (mirrors runtime appText). */
  const t = (loc, get) => {
    const v = get(translations[loc] || {})
    return v === undefined || v === null || v === '' ? get(en) : v
  }

  /** Per-locale APP.loader copy for the statically-emitted intro-loader
   *  veil — title + first stage line (mirrors runtime loaderCopy). */
  const loaderCopyFor = (loc) => {
    const node = t(loc, (x) => x.APP?.loader)
    return node ? { title: node.title, msg: node.stages?.[0] } : undefined
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
    VALID_LANGS.filter((loc) => LOCALE_TAGS[loc])
      .map((loc) => {
        const path = pathOf(loc)

        return path === null
          ? null
          : { bcp: LOCALE_TAGS[loc].bcp, og: LOCALE_TAGS[loc].og, url: `${SITE_URL}${path}` }
      })
      .filter(Boolean)

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
    const cover = mediaUrls(folder, project.cover, mediaManifest)

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
      entities.push(videoEntity(folder, project.cover, title, description, mediaManifest))
    }

    const media = [...walkMedia(project.sections)]
    const slugSeen = new Map()

    const listItems = media
      .map((m) => {
        let deepSlug = ''

        if (m.src && m.label) {
          const b = capSlug(slugify(m.label))
          const ordinal = slugSeen.get(b) ?? 0

          slugSeen.set(b, ordinal + 1)

          deepSlug = ordinal ? `${b}-${ordinal + 1}` : b
        }

        return { m, deepSlug }
      })
      .filter((e) => e.deepSlug)
      .map((e, i) => {
        const { source, thumb, isVideo } = mediaUrls(folder, e.m, mediaManifest)

        return {
          '@type': 'ListItem',
          position: i + 1,
          url: `${base}/${e.deepSlug}`,
          name: e.m.label,
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
      entities.push(videoEntity(folder, m, title, description, mediaManifest))
    }

    return entities
  }

  /** Cover share-image for a project — uncompressed jpg or video poster. */
  const projectImageOf = (loc, slug) => {
    const project = t(loc, (x) => x.projects?.[slug])
    const cover = mediaUrls(project?.folder || '', project?.cover, mediaManifest)

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
        ...(i.image ? { image: enc(`${CDN_BASE}covers/${i.image}.jpg`) } : {}),
      }))

    return element.length
      ? [{ '@context': SCHEMA_CONTEXT, '@type': 'ItemList', itemListElement: element }]
      : []
  }

  // ── Prerendered body content — everything a no-JS crawler/AI agent reads ──
  // The markup lands inside <div id="app">; mount() swaps it for the live
  // <app-root>. Authored CMS rich text embeds as-is (it already carries the
  // site's own <br>/<a> markup); plain strings escape through esc().

  const locPrefixOf = (loc) => (loc === 'en' ? '' : `/${loc}`)

  /** Authored rich-text array → <p> markup (trusted CMS html). */
  const richParagraphs = (arr) =>
    (Array.isArray(arr) ? arr : arr ? [arr] : []).map((p) => `<p>${p}</p>`).join('')

  /**
   * Every authored leaf string under a CMS node → <p> markup (trusted CMS
   * html). Experience pages carry their copy as UI labels rather than a
   * single description field — walking the whole object guarantees none of
   * the authored text is left JavaScript-only. `skip` drops keys already
   * rendered as headings.
   */
  const leafParagraphs = (obj, skip = new Set(['title'])) => {
    const out = []

    const walk = (o) => {
      if (Array.isArray(o)) {
        for (const item of o) walk(item)

        return
      }

      for (const [k, v] of Object.entries(o || {})) {
        if (typeof v === 'string') {
          if (v.trim() && !skip.has(k)) out.push(`<p>${v}</p>`)
        } else if (v && typeof v === 'object') {
          walk(v)
        }
      }
    }

    walk(obj)

    return out.join('')
  }

  /** Contact block — channel links + legal links from components.contact. */
  const contactBlock = (loc) => {
    const c = t(loc, (x) => x.components?.contact) || {}
    const heading = t(loc, (x) => x.APP?.contact) || ''
    const links = (arr) =>
      (arr || [])
        .map((i) => `<li><a href="${esc(i.link || '#')}">${i.description || ''}</a></li>`)
        .join('')

    return `<section id="contact"><h2>${esc(heading)}</h2><ul>${links(c.line1)}</ul><ul>${links(c.line2)}</ul></section>`
  }

  /**
   * One media item as crawlable markup — the figure's <img> carries the
   * best-quality source itself (uncompressed pass preferred) so crawlers
   * and no-JS viewers index the full-resolution asset, not the thumb;
   * the caption links to the same source as a first-class crawl target.
   * `deepHref` wraps the media in the /portfolio/<p>/<media> deep link.
   */
  const mediaFigure = (folder, m, deepHref) => {
    const { source, thumb, isVideo } = mediaUrls(folder, m, mediaManifest)

    if (!source) return ''

    const label = esc(m.label || '')
    const wh = m.size?.[0] ? ` width="${m.size[0]}" height="${m.size[1]}"` : ''

    // <video><source> retries the next entry on 404, but <picture><source>
    // does not — a missing webp renders as broken. webp is emitted only
    // when the bucket manifest confirms the sibling was generated. webm
    // gets the same gate: video falls back gracefully, but an unconverted
    // <source> is still a doomed request on every page view.
    const webm =
      source.endsWith('.mp4') &&
      mediaManifest?.has(`${dec(source.slice(CDN_BASE.length, -4))}.webm`)
        ? `${source.slice(0, -4)}.webm`
        : ''
    const webp = (u) =>
      u.endsWith('.jpg') && mediaManifest?.has(`${dec(u.slice(CDN_BASE.length, -4))}.webp`)
        ? `${u.slice(0, -4)}.webp`
        : ''

    const media = isVideo
      ? `<video${thumb ? ` poster="${esc(thumb)}"` : ''} controls muted playsinline preload="none"${wh}>${webm ? `<source src="${esc(webm)}" type="video/webm">` : ''}<source src="${esc(source)}" type="video/mp4"></video>`
      : `<picture>${webp(source) ? `<source srcset="${esc(webp(source))}" type="image/webp">` : ''}<img src="${esc(source)}" alt="${esc(label)}" loading="lazy" decoding="async"${wh}></picture>`

    // The deep-link anchor wraps bare media — no text content — so it
    // carries the caption as its accessible name (axe link-name).
    const linkLabel = label ? ` aria-label="${label}"` : ''

    return `<figure>${deepHref ? `<a href="${esc(deepHref)}"${linkLabel}>` : ''}${media}${deepHref ? '</a>' : ''}<figcaption><a href="${esc(source)}">${label || esc(m.src)}</a></figcaption></figure>`
  }

  /** Home page content — about bio + mentions + portfolio mosaic + contact. */
  const homeContent = (loc) => {
    const about = t(loc, (x) => x.pages?.about) || {}
    const home = t(loc, (x) => x.pages?.HOME) || {}
    const raw = home.portfoliolist || []
    const items = Array.isArray(raw) ? raw : Object.values(raw)
    const prefix = locPrefixOf(loc)

    const tiles = items
      .filter((i) => i && (i.link || i.slug))
      .map((i) => {
        const href = `${prefix}/portfolio/${i.link || i.slug}`
        const coverKey = i.image ? resolveCoverKey(i.image, mediaManifest) : ''
        const coverSrc = coverKey ? enc(`${CDN_BASE}${coverKey}`) : ''
        const coverWebp = mediaManifest?.has(`${coverKey.slice(0, -4)}.webp`)
          ? enc(`${CDN_BASE}${coverKey.slice(0, -4)}.webp`)
          : ''
        const coverWh =
          i.width?.[0] && i.height?.[0] ? ` width="${i.width[0]}" height="${i.height[0]}"` : ''
        const img = coverSrc
          ? `<figure><picture>${coverWebp ? `<source srcset="${esc(coverWebp)}" type="image/webp">` : ''}<img src="${esc(coverSrc)}" alt="${esc(i.label || '')}" loading="lazy" decoding="async"${coverWh}></picture><figcaption>${esc(i.label || '')}</figcaption></figure>`
          : ''
        const desc = i.description ? `<p>${i.description}</p>` : ''

        return `<li><a href="${href}">${img}<h3>${esc(i.label || '')}</h3>${desc}</a></li>`
      })
      .join('')

    const mentions = (about.mention_items || [])
      .map((m) => `<li><a href="${esc(m.link || '#')}">${m.description || ''}</a></li>`)
      .join('')

    const mentionsBlock = about.mentions
      ? `<section><h2>${esc(about.mentions)}</h2><ul>${mentions}</ul></section>`
      : ''

    return `<main><h1>${esc(BASE_TITLE)}</h1><section id="about"><h2>${esc(about.title || '')}</h2>${richParagraphs(about.col1)}${richParagraphs(about.col2)}${mentionsBlock}</section><section id="portfolio"><h2>${esc(home.featured || home.message || '')}</h2><ul>${tiles}</ul></section>${contactBlock(loc)}</main>`
  }

  /** Legal page content — title + every authored section. */
  const legalContent = (loc, pageKey) => {
    const page = t(loc, (x) => x.pages?.[pageKey]) || {}

    const sections = (page.sections || [])
      .map(
        (s) =>
          `<section>${s.title ? `<h2>${esc(s.title)}</h2>` : ''}${richParagraphs(s.content)}</section>`
      )
      .join('')

    return `<main><h1>${esc(page.title || '')}</h1>${sections}</main>`
  }

  /** Project interna — title, hero cover, all section text + every figure. */
  const projectContent = (loc, slug) => {
    const project = t(loc, (x) => x.projects?.[slug]) || {}
    const folder = project.folder || ''
    const prefix = locPrefixOf(loc)
    const parts = [`<main><h1>${esc(project.title || slug)}</h1>`]

    if (project.cover?.src) parts.push(mediaFigure(folder, project.cover, ''))

    const slugSeen = new Map()

    for (const section of project.sections || []) {
      for (const group of section) {
        if (!Array.isArray(group)) continue

        if (typeof group[0] === 'string') {
          parts.push(group.map((g) => `<p>${esc(g)}</p>`).join(''))

          continue
        }

        for (const m of group) {
          if (!m || typeof m !== 'object' || !m.src) continue

          let deep = ''

          if (m.label) {
            const base = capSlug(slugify(m.label))
            const ordinal = slugSeen.get(base) ?? 0

            slugSeen.set(base, ordinal + 1)

            const mediaSlug = ordinal ? `${base}-${ordinal + 1}` : base

            if (base) deep = `${prefix}/portfolio/${slug}/${mediaSlug}`
          }

          parts.push(mediaFigure(folder, m, deep))
        }
      }
    }

    parts.push('</main>')

    return parts.join('')
  }

  /** Media-modal deep link — the single asset + its caption + project context. */
  const mediaContent = (loc, slug, label) => {
    const project = t(loc, (x) => x.projects?.[slug]) || {}

    return `<main><p><a href="${locPrefixOf(loc)}/portfolio/${slug}">${esc(project.title || slug)}</a></p><h1>${esc(label || slug)}</h1></main>`
  }

  /** Experience page content — title + every authored label/copy leaf. */
  const experienceContent = (loc, pageKey) => {
    const page = t(loc, (x) => x.pages?.[pageKey]) || {}

    return `<main><h1>${esc(page.title || '')}</h1>${leafParagraphs(page)}</main>`
  }

  /** Animations-reference hub — title + intro + every animation record's
   *  alt/longdesc as a definition list. The static mirror of the runtime
   *  <view-animations> listing: crawlers, AI agents and reader mode read the
   *  same components.animations records without running JavaScript. */
  const animationsContent = (loc) => {
    const page = t(loc, (x) => x.pages?.animations) || {}

    const records = t(loc, (x) => x.components?.animations) || {}

    const rows = Object.entries(records)
      .map(
        ([id, r]) =>
          `<div id="${esc(id)}"><dt>${esc(r?.alt || id)}</dt><dd>${esc(r?.longdesc || '')}</dd></div>`
      )
      .join('')

    return `<main><h1>${esc(page.title || 'Animations Reference')}</h1>${page.description ? `<p>${esc(page.description)}</p>` : ''}<dl>${rows}</dl></main>`
  }

  /** Star-field body dossier JSON — locale file with English fallback. */
  const readStarBody = (loc, bodyId) => {
    for (const l of [loc, 'en']) {
      try {
        return JSON.parse(
          fs.readFileSync(
            path.join(ROOT, 'experiments', 'star-field', 'public', 'data', l, `${bodyId}.json`),
            'utf8'
          )
        )
      } catch {
        // locale file missing → try the English dossier
      }
    }

    return null
  }

  /** Star-field body page — dossier text, facts table, credited media. */
  const starBodyContent = (loc, bodyId) => {
    const b = readStarBody(loc, bodyId)

    if (!b) return `<main><h1>${esc(bodyId)}</h1></main>`

    const facts = (b.facts || [])
      .map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`)
      .join('')

    const images = (b.media?.images || [])
      .map((img) => {
        const wh = starMediaDims.get(img.src) || ''

        return `<figure><img src="${esc(enc(img.src))}" alt="${esc(img.caption || '')}" loading="lazy" decoding="async"${wh}><figcaption>${esc(img.caption || '')}${img.credit ? ` — ${esc(img.credit)}` : ''}</figcaption></figure>`
      })
      .join('')

    const audio = (b.media?.audio || [])
      .map(
        (a) =>
          `<figure><audio src="${esc(enc(a.src))}" controls preload="none"></audio><figcaption>${esc(a.caption || '')}${a.credit ? ` — ${esc(a.credit)}` : ''}</figcaption></figure>`
      )
      .join('')

    const refs = (b.meta?.refs || []).map((r) => `<li>${esc(r)}</li>`).join('')

    return `<main><h1>${esc(b.name || bodyId)}</h1><p><em>${esc(b.kind || '')}</em> — ${esc(b.tagline || '')}</p>${facts ? `<dl>${facts}</dl>` : ''}<p>${esc(b.history || '')}</p>${images}${audio}${b.source ? `<p><a href="${esc(enc(b.source))}">${esc(b.source)}</a></p>` : ''}${refs ? `<ul>${refs}</ul>` : ''}</main>`
  }

  /** Star-field index — description + the full localized body catalog. */
  const starIndexContent = (loc, bodyIds) => {
    const page = t(loc, (x) => x.pages?.['star-field']) || {}
    const prefix = `${locPrefixOf(loc)}/${(LANG_SLUGS[loc] || enSlugs).starField}`

    const links = bodyIds
      .map((id) => {
        const b = readStarBody(loc, id)

        return `<li><a href="${prefix}/${esc(id)}">${esc(b?.name || id)}</a></li>`
      })
      .join('')

    return `<main><h1>${esc(page.title || '')}</h1>${leafParagraphs(page)}<ul>${links}</ul></main>`
  }

  /**  /** Strips the `Luis Krötz | ` prefix / ` | Luis Krötz` suffix for crumb names. */
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

  const animDescOf = (loc) =>
    toDescription(t(loc, (x) => x.pages?.animations?.description)) || aboutDescOf(loc)

  /** Labelled-media {slug,label,media} rows of a project — mirrors
   * generate-sitemap's walk and the runtime modal: every labelled item with
   * a src is addressable through /portfolio/<slug>/<media>. */
  const mediaRowsOf = (project) => {
    const out = []
    const seen = new Map()

    for (const section of project?.sections || []) {
      const items = Array.isArray(section) ? section : [section]

      for (const item of items) {
        const media = Array.isArray(item) ? item : [item]

        for (const m of media) {
          if (m && typeof m === 'object' && m.label && m.src) {
            const base = capSlug(slugify(m.label))

            if (!base) continue

            // Distinct captions can collapse to the same slug — later
            // occurrences gain -2, -3… in document order (mediaSlugSeq's
            // convention) so every item keeps an indexable URL.
            const ordinal = seen.get(base) ?? 0

            seen.set(base, ordinal + 1)

            const slug = ordinal ? `${base}-${ordinal + 1}` : base

            out.push({ slug, label: m.label, media: m })
          }
        }
      }
    }

    return out
  }

  // Labelled-media rows per (loc, project) — cached; media identity across
  // locales is aligned by `src`, which is locale-invariant while labels
  // (and therefore slugs) are translated.
  const locRowsCache = new Map()

  const locMediaSlug = (loc2, slug, src) => {
    const key = `${loc2}:${slug}`

    if (!locRowsCache.has(key)) {
      locRowsCache.set(key, mediaRowsOf(t(loc2, (x) => x.projects?.[slug])))
    }

    return locRowsCache.get(key).find((r) => r.media.src === src)?.slug || null
  }

  const portfolioAlt = (slug) => (loc2) => `${loc2 === 'en' ? '' : `/${loc2}`}/portfolio/${slug}`

  // Star-field body ids — the en catalog is the canonical id list;
  // localized dossier JSONs (data/<loc>/<id>.json) fall back to it.
  const starBodyIds = (() => {
    try {
      return fs
        .readdirSync(path.join(ROOT, 'experiments', 'star-field', 'public', 'data', 'en'))
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.replace(/\.json$/, ''))
        .sort()
    } catch {
      return []
    }
  })()

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
        content: homeContent(loc),
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
          content: homeContent(loc),
        },
        {
          path: `${prefix}${slugs.contact}`,
          title: titleOf(t(loc, (x) => x.APP?.contact)),
          description: contactDescOf(loc),
          alt: slugPath('contact'),
          content: homeContent(loc),
        },
        {
          path: `${prefix}${slugs.privacy}`,
          title: titleOf(pageName(1)),
          description: legalDescOf(loc, 'privacy-policy'),
          alt: slugPath('privacy'),
          content: legalContent(loc, 'privacy-policy'),
        },
        {
          path: `${prefix}${slugs.gdpr}`,
          title: titleOf(pageName(2)),
          description: legalDescOf(loc, 'GDPR'),
          alt: slugPath('gdpr'),
          content: legalContent(loc, 'GDPR'),
        },
        {
          path: `${prefix}${slugs.terms}`,
          title: titleOf(pageName(3)),
          description: legalDescOf(loc, 'terms-of-use'),
          alt: slugPath('terms'),
          content: legalContent(loc, 'terms-of-use'),
        },
        {
          path: `${prefix}${slugs.license}`,
          // The footer nav has no license link — legal[4] never exists.
          // Fall back to the page doc's title, then a literal so the route
          // doesn't emit the bare BASE_TITLE.
          title: titleOf(pageName(4) || t(loc, (x) => x.pages?.license?.title) || 'License'),
          description: legalDescOf(loc, 'license'),
          alt: slugPath('license'),
          content: legalContent(loc, 'license'),
        },
        {
          path: `${prefix}${slugs.earthPlayground}`,
          title: pgTitle(),
          description: epDescOf(loc),
          alt: slugPath('earthPlayground'),
          content: experienceContent(loc, 'earth-playground'),
        },
        {
          path: `${prefix}${slugs.starField}`,
          title: sfTitle(),
          description: sfDescOf(loc),
          alt: slugPath('starField'),
          content: starIndexContent(loc, starBodyIds),
        },
        {
          path: `${prefix}${slugs.animations}`,
          title: titleOf(t(loc, (x) => x.pages?.animations?.title)),
          description: animDescOf(loc),
          alt: slugPath('animations'),
          content: animationsContent(loc),
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
    // translated; every labelled media item gets its own deep-link page in
    // EVERY locale (/<loc>/portfolio/<slug>/<media>, canonical to itself).
    // English additionally emits the legacy alias slugs (canonical → real
    // slug; firebase 301s them ahead of these files anyway).
    const locPrefix = loc === 'en' ? '' : `/${loc}`

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
        content: projectContent(loc, slug),
      })

      if (loc === 'en') {
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
              content: projectContent(loc, slug),
            })
          }
        }
      }

      const project = t(loc, (x) => x.projects?.[slug])
      const projectUrl = `${SITE_URL}${locPrefix}/portfolio/${slug}`

      for (const { slug: mediaSlug, label, media } of mediaRowsOf(project)) {
        const mediaUrl = `${projectUrl}/${mediaSlug}`
        // hreflang alternates must carry each locale's OWN media slug —
        // labels are translated, so the same asset's deep link differs
        // per locale (null → locale dropped from alternates).
        const mediaPath = (l2) => {
          const slug2 = locMediaSlug(l2, slug, media.src)

          return slug2 ? `${l2 === 'en' ? '' : `/${l2}`}/portfolio/${slug}/${slug2}` : null
        }
        const { source, thumb, isVideo } = mediaUrls(project?.folder || '', media, mediaManifest)

        routes.push({
          path: `${prefix}portfolio/${slug}/${mediaSlug}`,
          emitAtPublicPath: loc !== 'en',
          title,
          pageName: label,
          description,
          image: source ? (isVideo ? thumb : source) : undefined,
          content: `${mediaContent(loc, slug, label)}${mediaFigure(project?.folder || '', media, '')}`,
          // The media page carries the whole project graph plus its own
          // media entity (ImageObject for stills, VideoObject for clips)
          // so Google can index the specific asset at this URL.
          entities: [
            ...(isVideo
              ? [videoEntity(project?.folder || '', media, pageName, description, mediaManifest)]
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
          alternates: alternatesFor(mediaPath),
        })
      }
    }

    // Star-field bodies — every catalog dossier deep-links at
    // /<loc>/<starField>/<body>, canonical to itself (the routes are
    // translated; the localized slug is the canonical form).
    if (slugs) {
      const sfIndexUrl = `${SITE_URL}${locPrefix}/${slugs.starField}`

      for (const bodyId of starBodyIds) {
        const body = readStarBody(loc, bodyId)
        const bodyPath = (l2) =>
          `${l2 === 'en' ? '' : `/${l2}`}/${(LANG_SLUGS[l2] || enSlugs).starField}/${bodyId}`
        const bodyUrl = `${SITE_URL}${bodyPath(loc)}`
        const bodyName = body?.name || bodyId

        routes.push({
          path: `${prefix}${slugs.starField}/${bodyId}`,
          emitAtPublicPath: loc !== 'en',
          title: titleOf(`${bodyName} | ${t(loc, (x) => x.APP?.starField) || 'Star Field'}`),
          pageName: bodyName,
          description: toDescription(body?.tagline || '') || sfDescOf(loc),
          content: starBodyContent(loc, bodyId),
          entities: [
            {
              '@context': SCHEMA_CONTEXT,
              '@type': 'Article',
              '@id': `${bodyUrl}#article`,
              headline: bodyName,
              description: body?.tagline || '',
              about: body?.kind || '',
              inLanguage: LOCALE_TAGS[loc].bcp,
              mainEntityOfPage: bodyUrl,
              isPartOf: { '@id': `${sfIndexUrl}#webpage` },
              author: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
            },
          ],
          crumbs: [
            {
              name: t(loc, (x) => x.APP?.starField) || 'Star Field',
              url: sfIndexUrl,
            },
          ],
          canonical: bodyUrl,
          alternates: alternatesFor(bodyPath),
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
    content: homeContent('en'),
    loader: loaderCopyFor('en'),
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
        content: route.content,
        loader: loaderCopyFor(loc),
      })

      // en → dist/<route>/; every other locale emits at its PUBLIC path
      // dist/<loc>/… too — exact static files resolve under plain static
      // serving (vite preview, no rewrites) instead of falling back to the
      // English shell. Rewrite-covered base routes additionally emit the
      // dist/langs/<loc>/… copy those rewrites point at (identical bytes;
      // the static file simply wins in production).
      const publicFile = path.join(distDir, route.path, 'index.html')

      withFsRetry(() => fs.mkdirSync(path.dirname(publicFile), { recursive: true }))
      writeCompressed(publicFile, out)
      written++

      if (loc !== 'en' && !route.emitAtPublicPath) {
        const langsFile = path.join(distDir, 'langs', route.path, 'index.html')

        withFsRetry(() => fs.mkdirSync(path.dirname(langsFile), { recursive: true }))
        writeCompressed(langsFile, out)
        written++
      }
    }
  }

  // ── Docs portal pages — English-only; every manifest node emits a fully
  // rendered document (files embed their docs-content payload, directories
  // emit child listings) so the whole docs surface reads without JS.
  const docsContentDir = path.join(distDir, 'docs-content')

  const emitDocsPages = () => {
    const { roots } = scanManifest(ROOT)

    // /docs/<root> — index page per manifest root, then every child node.
    const writeDocsPage = ({ urlPath, name, description, body, crumbs }) => {
      const pageUrl = `${SITE_URL}${urlPath}`

      const entities = [
        webPageEntity({
          url: pageUrl,
          name,
          description,
          bcp: 'en',
          crumbs,
        }),
        ...(crumbs ? [breadcrumbEntity(crumbs, `${pageUrl}#breadcrumbs`)] : []),
        {
          '@context': SCHEMA_CONTEXT,
          '@type': 'TechArticle',
          '@id': `${pageUrl}#article`,
          headline: name,
          description,
          inLanguage: 'en',
          mainEntityOfPage: pageUrl,
          isPartOf: { '@id': `${SITE_URL}/docs#webpage` },
        },
      ]

      const out = localize(template, {
        bcpLang: 'en',
        ogLocale: 'en_US',
        title: `${name} | ${BASE_TITLE}`,
        description,
        url: pageUrl,
        alternates: [{ bcp: 'en', og: 'en_US', url: pageUrl }],
        entities,
        content: body,
        loader: loaderCopyFor('en'),
      })

      // `.html` file nodes (generated sassdoc/jsdoc pages) emit AT their
      // own path — the URL already maps to that file, and their content
      // rightly shadows the parent dir's index page (children write after
      // parents, so the real document wins the shared path).
      const rel = urlPath.slice('/docs/'.length)
      const file = rel.endsWith('.html')
        ? path.join(distDir, 'docs', rel)
        : path.join(distDir, 'docs', rel, 'index.html')

      try {
        withFsRetry(() => fs.mkdirSync(path.dirname(file), { recursive: true }))
        writeCompressed(file, out)
        written++
      } catch (err) {
        console.warn(`[locale-pages] docs page skipped ${urlPath}:`, err?.message || err)
      }
    }

    const dirList = (children) =>
      `<ul>${(children || [])
        .map(
          (c) =>
            `<li><a href="/docs/${esc(c.path)}">${esc(c.name)}${c.type === 'dir' ? '/' : ''}</a></li>`
        )
        .join('')}</ul>`

    const emit = (node, trail) => {
      const urlPath = `/docs/${node.path}`
      const isDir = node.type === 'dir'
      let body
      let description

      if (isDir) {
        body = `<main><h1>${esc(node.name)}</h1>${dirList(node.children)}</main>`
        description = `${node.name} — docs directory`
      } else {
        let doc = {}

        try {
          doc = JSON.parse(fs.readFileSync(path.join(docsContentDir, `${node.path}.json`), 'utf8'))
        } catch {
          // payload missing → name-only fallback body
        }

        body = `<main>${doc.html || `<h1>${esc(node.name)}</h1>`}</main>`
        description =
          toDescription(String(doc.html || '').replace(/<[^>]+>/g, ' ')) ||
          `${node.name} — documentation`
      }

      const crumbItems = [
        { name: BASE_TITLE, url: `${SITE_URL}/` },
        { name: 'Docs', url: `${SITE_URL}/docs` },
        ...trail,
        { name: node.name, url: `${SITE_URL}${urlPath}` },
      ]

      writeDocsPage({
        urlPath,
        name: node.name,
        description,
        body,
        crumbs: crumbItems,
      })

      if (isDir) {
        for (const child of node.children || []) {
          emit(child, [...trail, { name: node.name, url: `${SITE_URL}${urlPath}` }])
        }
      }
    }

    // /docs itself — index over every manifest root.
    writeDocsPage({
      urlPath: '/docs',
      name: 'Docs',
      description: 'Documentation portal — source, reports, coverage and module docs.',
      body: `<main><h1>Docs</h1><ul>${roots
        .map((r) => `<li><a href="/docs/${esc(r.root)}">${esc(r.label || r.root)}</a></li>`)
        .join('')}</ul></main>`,
      crumbs: [
        { name: BASE_TITLE, url: `${SITE_URL}/` },
        { name: 'Docs', url: `${SITE_URL}/docs` },
      ],
    })

    for (const root of roots) {
      const rootTrail = [
        { name: BASE_TITLE, url: `${SITE_URL}/` },
        { name: 'Docs', url: `${SITE_URL}/docs` },
        { name: root.label || root.root, url: `${SITE_URL}/docs/${root.root}` },
      ]

      writeDocsPage({
        urlPath: `/docs/${root.root}`,
        name: root.label || root.root,
        description: `${root.label || root.root} — documentation index`,
        body: `<main><h1>${esc(root.label || root.root)}</h1>${dirList(root.children)}</main>`,
        crumbs: rootTrail,
      })

      for (const child of root.children || []) {
        emit(child, rootTrail.slice(1))
      }
    }
  }

  try {
    emitDocsPages()
  } catch (err) {
    console.warn('[locale-pages] docs emit skipped:', err?.message || err)
  }

  syncFirebaseRewrites()

  return { html: rootHtml, written, locales: VALID_LANGS.length - 1 }
}

/**
 * Regenerates the `hosting.rewrites` + `hosting.redirects` blocks in
 * firebase.json. Rewrites keep the public locale URLs (`/br`, `/br/sobre`,
 * …) serving the pages emitted under `dist/langs/<loc>/…` — destinations
 * are single files (no glob capture), so the table enumerates every route
 * the same way `routesFor` does. Redirects 301 every noncanonical alias the
 * router accepts — legacy project slugs (PROJECT_ALIASES incl. media deep
 * links), English-segment routes under a locale prefix, `/space-playground`
 * and `/<loc>/docs` — onto their canonical paths so crawlers consolidate
 * onto the sitemap surface instead of indexing alias URLs. Preserves every
 * non-rewrite/non-redirect hosting key and the meta/CMS/SPA-catch-all
 * entries declared in `STATIC_REWRITES`/`SPA_REWRITES`.
 */
export function syncFirebaseRewrites() {
  const firebasePath = path.join(ROOT, 'firebase.json')
  const cfg = JSON.parse(fs.readFileSync(firebasePath, 'utf8'))

  // Localized portfolio slugs — the /<loc>/portfolio/<slug> pages emitted by
  // buildLocalePages need explicit rewrites (the `**` catch-all would serve
  // the English shell instead). Live translations win when prefetched.
  const dbPath = path.join(ROOT, 'database.json')
  const projectSlugs = liveTranslations?.en?.projects
    ? Object.keys(liveTranslations.en.projects)
    : fs.existsSync(dbPath)
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
      slugs.animations,
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

  // ── 301 redirects for every noncanonical alias the router resolves ────────
  // Firebase evaluates redirects before static files and rewrites, so these
  // win over both the prerendered alias pages and the `**` SPA catch-all.
  const enSlugs = LANG_SLUGS.en || {}
  const redirects = []
  const addRedirect = (source, destination) => {
    if (source !== destination) redirects.push({ source, destination, type: 301 })
  }

  // Legacy project slugs — page and media-modal deep links, en + locales.
  for (const [alias, canonical] of Object.entries(PROJECT_ALIASES)) {
    addRedirect(`/portfolio/${alias}`, `/portfolio/${canonical}`)
    addRedirect(`/portfolio/${alias}/**`, `/portfolio/${canonical}/:splat`)

    for (const loc of VALID_LANGS) {
      if (loc === 'en') continue

      addRedirect(`/${loc}/portfolio/${alias}`, `/${loc}/portfolio/${canonical}`)
      addRedirect(`/${loc}/portfolio/${alias}/**`, `/${loc}/portfolio/${canonical}/:splat`)
    }
  }

  // English legacy legal segments → canonical English slugs.
  addRedirect('/privacy', `/${enSlugs.privacy}`)
  addRedirect('/terms', `/${enSlugs.terms}`)

  // `/space-playground` → the locale's earthPlayground slug (en included).
  addRedirect('/space-playground', `/${enSlugs.earthPlayground}`)

  for (const loc of VALID_LANGS) {
    if (loc === 'en') continue

    const slugs = LANG_SLUGS[loc] || {}

    // English-segment + legacy legal aliases under the locale prefix.
    for (const [aliases, key] of [
      [['privacy', 'privacy-policy'], 'privacy'],
      [['gdpr'], 'gdpr'],
      [['terms', 'terms-of-use'], 'terms'],
      [['license'], 'license'],
      [['about'], 'about'],
      [['contact'], 'contact'],
    ]) {
      for (const alias of aliases) {
        addRedirect(`/${loc}/${alias}`, `/${loc}/${slugs[key] || enSlugs[key]}`)
      }
    }

    // English-segment experience aliases → localized canonical slugs.
    for (const alias of ['earth-playground', 'space-playground']) {
      addRedirect(`/${loc}/${alias}`, `/${loc}/${slugs.earthPlayground || enSlugs.earthPlayground}`)
    }

    const sfTarget = `/${loc}/${slugs.starField || enSlugs.starField}`

    addRedirect(`/${loc}/star-field-experiment`, sfTarget)
    addRedirect(`/${loc}/star-field-experiment/**`, `${sfTarget}/:splat`)

    // English-segment animations alias → localized canonical slug.
    addRedirect(
      `/${loc}/${enSlugs.animations}`,
      `/${loc}/${slugs.animations || enSlugs.animations}`
    )

    // Docs are English-only — a locale-prefixed docs URL canonicalizes to
    // the unprefixed route, so it redirects rather than rendering.
    addRedirect(`/${loc}/docs`, '/docs')
    addRedirect(`/${loc}/docs/**`, '/docs/:splat')
  }

  cfg.hosting.redirects = redirects

  withFsRetry(() => fs.writeFileSync(firebasePath, `${JSON.stringify(cfg, null, 2)}\n`))
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
    destination: '/meta/.well-known/oauth-authorization-server.json',
  },
  {
    source: '/.well-known/oauth-protected-resource',
    destination: '/meta/.well-known/oauth-protected-resource.json',
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
    destination: '/meta/.well-known/http-message-signatures-directory.json',
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

  await Promise.all([prefetchStarMediaDims(), prefetchTranslations()])

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
