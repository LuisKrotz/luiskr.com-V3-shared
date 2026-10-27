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
import { Buffer } from 'node:buffer'
import { fileURLToPath } from 'node:url'

import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'
import { PROJECT_ALIASES } from '../../../core/tokens/routes/aliases.ts'
import { slugify, capSlug, mediaRowsOf, llmTreePaths } from './route-media.mjs'
import { GENERIC_DIMENSIONS } from '../../../core/tokens/media/dimensions.ts'
import { MEDIA } from '../../../core/tokens/media/suffixes.ts'
import { MEDIA_ATTRS } from '../../../core/tokens/attrs/media.ts'
import { LOCALE_TAGS } from '../../../core/tokens/locales.ts'
import { SP_CONTROL_GROUPS } from '../../../core/tokens/playground/control-groups.ts'
import {
  SF_REGISTRY_INDEX_DIR,
  SF_REGISTRY_MANIFEST,
  SF_REGISTRY_KINDS,
} from '../../../core/tokens/starfield/registry.ts'
import { SF_STAR_CLOUD } from '../../../core/tokens/starfield/params/worker.ts'
import {
  SP_CAMERA_PARAMS,
  SP_SCENE_PARAMS,
  SP_POST_PARAMS,
  SP_GRADE_PARAMS,
  SP_DEBUG_PARAMS,
} from '../../../core/tokens/playground/params.ts'
import { SP_ACTIONS } from '../../../core/tokens/playground/actions.ts'
import {
  SP_MOON_DEFAULTS,
  SP_ATMOSPHERE_DEFAULTS,
  SP_CLOUD_SHADOW_DEFAULTS,
  SP_OCEAN_DEFAULTS,
  SP_EARTH_DEFAULTS,
  SP_CAMERA_DEFAULTS,
  SP_ENVIRONMENT_DEFAULTS,
  SP_SUN_DEFAULTS,
} from '../../../core/tokens/playground/gui-scene.ts'
import {
  SP_COLOR_GRADING_DEFAULTS,
  SP_LENS_FLARE_DEFAULTS,
  SP_ANAMORPHIC_DEFAULTS,
  SP_BLOOM_DEFAULTS,
  SP_VIGNETTE_DEFAULTS,
  SP_CHROMATIC_DEFAULTS,
  SP_FILM_GRAIN_DEFAULTS,
  SP_DEBUG_DEFAULTS,
} from '../../../core/tokens/playground/gui-post.ts'
import { loadMediaManifest, resolveMediaUrls, resolveCoverKey } from './media-manifest.mjs'
import { STAR_SHARE } from '../../../core/tokens/playground/share.ts'
import { shareImageUrls, shuffled } from './playground-share.mjs'
import { withFsRetry } from './fs-retry.mjs'
import { queueCompressedWrite, drainCompressedWrites } from './compress-queue.mjs'
import { scanManifest } from '../../build/docs/scan.mjs'

const VALID_LANGS = Object.keys(LANG_SLUGS)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const SITE_URL = 'https://luiskr.com'
const BASE_TITLE = 'Luis Krötz'
const CDN_BASE = 'https://storage.googleapis.com/luiskr.com/public/_v3/'
const FIREBASE_DB = 'https://luiskr-com.firebaseio.com'
const SCHEMA_CONTEXT = 'https://schema.org'
const SHARE_IMAGE = `${SITE_URL}/assets/icons/share.png`

/** Mirrors SF_DATA_BASE (core/tokens/starfield/textures.ts — alias chain
 *  makes it non-importable here) — public root of the star-field data
 *  surface: `…/index/` registry shards, `…/deep-field.bin`, `…/<loc>/*.json` dossiers. */
const STAR_DATA_BASE = '/experiments/star-field/data'

/** SP_*_PARAMS wire strings keyed by member name — resolves each
 *  SP_CONTROL_GROUPS row `key` to its data-param value. */
const SP_PARAM_WIRES = {
  ...SP_CAMERA_PARAMS,
  ...SP_SCENE_PARAMS,
  ...SP_POST_PARAMS,
  ...SP_GRADE_PARAMS,
  ...SP_DEBUG_PARAMS,
}

/** DEFAULT_SP_GUI composition — mirrors core/tokens/playground.ts (its
 *  relative `.js` imports don't resolve under plain-node type stripping,
 *  so the leaf maps are composed here in the same subsystem order). */
const SP_ENGINE_DEFAULTS = {
  COLOR_GRADING: SP_COLOR_GRADING_DEFAULTS,
  MOON: SP_MOON_DEFAULTS,
  LENS_FLARE: SP_LENS_FLARE_DEFAULTS,
  ANAMORPHIC: SP_ANAMORPHIC_DEFAULTS,
  BLOOM: SP_BLOOM_DEFAULTS,
  VIGNETTE: SP_VIGNETTE_DEFAULTS,
  CHROMATIC_ABERRATION: SP_CHROMATIC_DEFAULTS,
  FILM_GRAIN: SP_FILM_GRAIN_DEFAULTS,
  ATMOSPHERE: SP_ATMOSPHERE_DEFAULTS,
  CLOUD_SHADOWS: SP_CLOUD_SHADOW_DEFAULTS,
  OCEAN: SP_OCEAN_DEFAULTS,
  EARTH: SP_EARTH_DEFAULTS,
  CAMERA: SP_CAMERA_DEFAULTS,
  ENVIRONMENT: SP_ENVIRONMENT_DEFAULTS,
  DEBUG: SP_DEBUG_DEFAULTS,
  SUN: SP_SUN_DEFAULTS,
}

/**
 * Star-field deep-catalog manifest — record totals + per-kind shard
 * lists. Drives the index page's catalog section and the DataCatalog
 * JSON-LD so the 139,563-object registry is enumerable without WebGL.
 */
const starCatalogManifest = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(
        path.join(
          ROOT,
          'experiments',
          'star-field',
          'public',
          'data',
          SF_REGISTRY_INDEX_DIR,
          SF_REGISTRY_MANIFEST
        ),
        'utf8'
      )
    )
  } catch {
    return null
  }
})()

/**
 * `/llm/` mirror-tree paths for a canonical page URL — thin wrapper over
 * route-media.mjs's llmTreePaths so emitted <link rel="alternate"> tags
 * and generate-llm-pages.mjs always agree on the replica location.
 * @param {string} pageUrl absolute canonical URL (`https://luiskr.com/…`)
 * @returns {{md: string, json: string} | null} replica paths, null on bad input
 */
const llmPathsFor = (pageUrl) => {
  try {
    return llmTreePaths(new URL(pageUrl).pathname)
  } catch {
    return null
  }
}

/**
 * The match below tolerates a legacy .boot-veil emitted inside #app by an
 * earlier template revision so re-runs normalize older documents back to
 * the clean article shape.
 */

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

// Mobile-viewport media condition — MUST stay byte-identical to
// MOBILE_MEDIA in core/tokens/primitives.ts (primitives re-imports
// `./strings/chars.js`, which the standalone Node loader can't
// resolve, so the query is mirrored, not imported).
const MOBILE_MEDIA = '(max-width: 768px)'

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

/**
 * Brotli + gzip siblings next to each emitted index.html (Firebase serves
 * them). The plain file lands synchronously; the compressed siblings go
 * through the shared queue so the emit loop never blocks on a ~30-60ms
 * brotli-11 pass per page — drainCompressedWrites() runs them across the
 * libuv threadpool at the end of the fan-out.
 */
const writeCompressed = (file, html) => queueCompressedWrite(file, html)

/**
 * Largest fetched thumb payload worth inlining as a data URI. The old
 * 16 KB cap assumed the veil image shared the preloaded hero's fetch —
 * it doesn't (the veil binds the smallest proven variant, a different
 * object), so on media-heavy routes the thumb queues behind megabytes
 * of boot-graph media and the simulated LCP lands at ~8 s even though
 * the request is discoverable and high-priority. Inlining keeps the
 * candidate at zero network wait; ~96 KB pays ~+0.4 s on the HTML
 * fetch to buy back ~6 s of LCP under simulated 4G.
 */
const LCP_THUMB_MAX = 98304

/**
 * Smallest fetched payload trusted to keep its LCP candidacy at
 * near-full-viewport coverage. Paint-timing drops viewport-dominating
 * images with too few bytes behind the painted area (measured live: an
 * 846-byte webp never produced a candidate at 80–99% coverage while an
 * ~8KB payload still reported at 99%), so prefetchLcpThumbs() walks the
 * variant ladder until a payload clears this floor — only those LQIPs
 * get the 96%-coverage box that out-sizes every mounted hero media.
 */
const LCP_THUMB_MIN = 8192

/**
 * Minimum intrinsic video width (px) for the `-scaledown-2x` poster to be
 * the runtime pick on a ≤768px viewport. The runtime rule is
 * `box × dpr ≤ mediaWidth / 2` (prefersScaledVideo): a 3072px source at
 * the widest mobile box (768 × 2dpr) exactly halves, so anything wider is
 * guaranteed scaled on mobile while narrower videos keep the full poster —
 * emitting the scaled source/preload for them warms a URL the <video>
 * never requests.
 */
const SCALED_POSTER_MIN_WIDTH = 3072

/**
 * Resolved media URL → `{ src, url, bytes }` LQIP record for the
 * injected early-LCP image — `src` is the data URI when the fetched
 * variant fit the inline cap (else null), `url` is the resolved variant
 * for the URL fallback, `bytes` drives the 70%-vs-96% coverage tier
 * (LCP_THUMB_MIN). `null` entries mean every candidate failed or was
 * oversized. localize() stays synchronous so the map is populated by
 * prefetchLcpThumbs() ahead of each emit batch; URLs repeat across 15
 * locales so the cache collapses the network work to one fetch chain
 * per unique asset.
 */
const LCP_THUMBS = new Map()

/**
 * Last bucket manifest handed to prefetchLcpThumbs() — localize() runs
 * after it in every build path, so stashing the set here keeps the
 * localize signature unchanged while still letting the veil <img> bind
 * the smallest proven variant via lcpThumbUrlOf.
 */
let lcpManifest = null

/**
 * First parked <figure> that carries paintable media — link-only
 * attachment figures (a bare <a> + figcaption) are skipped so LCP
 * detection binds the figure the browser will actually paint.
 */
const mediaFigureOf = (content) =>
  ((content && content.match(/<figure[\s\S]*?<\/figure>/g)) || []).find((figure) =>
    /<img|<source|<video/.test(figure)
  )

/**
 * The painted-under-veil article's early LCP media — first media figure's
 * <source srcset> (what the browser actually selects), then <img src>,
 * then a <video> poster — falling back to the route's hero for pages
 * whose emitter puts no media first. Link-only figures (bare <a> video
 * attachments with a figcaption) carry no paintable media and are skipped.
 */
const lcpImageOf = (content, image) => {
  const firstFigure = mediaFigureOf(content)

  return (
    firstFigure?.match(/<source srcset="([^"]+)"/)?.[1] ||
    firstFigure?.match(/<img[^>]* src="([^"]+)"/)?.[1] ||
    firstFigure?.match(/poster="([^"]+)"/)?.[1] ||
    image
  )
}

/**
 * Streams a resolved CDN media URL's sibling variants smallest-first —
 * the q3 kodak blur pass for images (mobile derivative first), the
 * -scaledown-4x poster frame for video. Manifest membership decides;
 * the generator yields only proven keys so prefetchLcpThumbs() can keep
 * climbing when the smallest payload is too small to survive Chrome's
 * viewport-entropy LCP check. Non-CDN URLs yield the URL unchanged.
 */
const lcpThumbCandidatesOf = function* (url, manifest) {
  if (!url.startsWith(CDN_BASE)) {
    yield url

    return
  }

  const key = dec(url.slice(CDN_BASE.length))
  const at = key.indexOf(MEDIA.VIDEO_EXT)

  const stem = at >= 0 ? key.slice(0, at) : key

  // Image stem without any existing quality/mobile marker, so variant
  // spellings compose from the base object name.
  const imgStem = key.replace(
    /(-mobile)?(-mozjpg(3-MSSIM-tuned-kodak|-uncompressed|-75|-50))?\.(jpg|webp)$/i,
    ''
  )

  const candidates =
    at >= 0
      ? [
          // Both bucket generations: newer keys keep the .mp4 marker before
          // -scaledown-Nx, older ones drop it — cover each spelling, webp
          // first (the webp thumb form is .jpg-thumb.webp — it replaces the
          // trailing .jpg, it is never .jpg-thumb.jpg.webp).
          `${stem}${MEDIA.VIDEO_SCALE_4X}${MEDIA.VIDEO_THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE_4X}${MEDIA.VIDEO_THUMB_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE_BARE_4X}${MEDIA.VIDEO_THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE_BARE_4X}${MEDIA.VIDEO_THUMB_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_THUMB_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE_BARE}${MEDIA.VIDEO_THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.VIDEO_SCALE_BARE}${MEDIA.VIDEO_THUMB_EXT}`,
          `${stem}${MEDIA.VIDEO_THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.VIDEO_THUMB_EXT}`,
          `${stem}${MEDIA.THUMB_WEBP_EXT}`,
          `${stem}${MEDIA.THUMB_EXT}`,
        ]
      : [
          `${imgStem}${MEDIA.MOBILE_SUFFIX}${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.WEBP_EXT}`,
          `${imgStem}${MEDIA.MOBILE_SUFFIX}${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
          `${imgStem}${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.WEBP_EXT}`,
          `${imgStem}${MEDIA.MOZ}${MEDIA.THUMB_SUFFIX}${MEDIA.EXT}`,
          // Veil-fallback rungs: when no kodak blur pass exists the q50
          // derivative is still a fraction of the original — the veil's
          // eager <img> binds it by URL (no inline cap applies), so an
          // LCP candidate lands sooner than the full-size hero.
          `${imgStem}${MEDIA.MOBILE_SUFFIX}${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.WEBP_EXT}`,
          `${imgStem}${MEDIA.MOBILE_SUFFIX}${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
          `${imgStem}${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.WEBP_EXT}`,
          `${imgStem}${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
        ]

  for (const candidate of candidates) {
    if (manifest?.has(candidate)) yield `${CDN_BASE}${candidate}`
  }

  yield url
}

/**
 * Maps a resolved CDN media URL to its smallest proven sibling variant —
 * the generator's first yield; the original URL when nothing is listed.
 */
const lcpThumbUrlOf = (url, manifest) => lcpThumbCandidatesOf(url, manifest).next().value || url

/**
 * Downloads each URL's smallest *entropy-qualified* variant into
 * LCP_THUMBS. The ladder yields variants smallest-first; a payload
 * below LCP_THUMB_MIN can't hold an LCP candidacy at 96% coverage, so
 * the walk keeps climbing — the first ≥MIN payload wins, otherwise the
 * largest undersized fetch is kept as a last resort (still eligible at
 * the 70% box). Payloads over LCP_THUMB_MAX stay URL-bound. Failed
 * candidates are skipped; all-failed caches `null` so localize() falls
 * back to the ladder's smallest URL or no LQIP. Mirrors
 * prefetchStarMediaDims(): build-time fetches, silent failures.
 * @param {Iterable<string>} urls - resolved media URLs (CDN or not)
 * @param {Set<string>|null} manifest - bucket listing for variant checks
 */
export async function prefetchLcpThumbs(urls, manifest) {
  lcpManifest = manifest || lcpManifest

  await Promise.all(
    [...new Set(urls)]
      .filter((u) => u && !LCP_THUMBS.has(u))
      .map(async (url) => {
        // Recursion over the lazy candidate stream: each level fetches
        // the next proven variant, returning it when ≥MIN (or the best
        // undersized fetch once the ladder runs out / a payload oversizes).
        const fetchThumb = async (gen, undersized) => {
          const { value: thumb, done } = gen.next()

          if (done) return undersized

          try {
            const res = await fetch(thumb, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })

            const buf = res.ok ? Buffer.from(await res.arrayBuffer()) : null

            if (buf && buf.length > LCP_THUMB_MAX) {
              // Variants only grow deeper in the ladder — stop climbing;
              // an undersized inliner still beats an oversized URL.
              return undersized || { thumb, buf }
            }

            if (buf && buf.length >= LCP_THUMB_MIN) return { thumb, buf }

            return fetchThumb(gen, buf ? { thumb, buf } : undersized)
          } catch {
            return fetchThumb(gen, undersized)
          }
        }

        const pick = await fetchThumb(lcpThumbCandidatesOf(url, manifest), null)

        LCP_THUMBS.set(
          url,
          pick
            ? {
                src:
                  pick.buf.length <= LCP_THUMB_MAX
                    ? `data:${pick.thumb.endsWith(MEDIA.WEBP_EXT) ? MEDIA_ATTRS.IMAGE_WEBP : MEDIA_ATTRS.IMAGE_JPEG};base64,${pick.buf.toString('base64')}`
                    : null,
                url: pick.thumb,
                bytes: pick.buf.length,
              }
            : null
        )
      })
  )
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
 * @param {Array<string>} [o.extraImages] - additional og:image candidates
 *   emitted as repeated tags after the primary — every share capture of a
 *   set stays associated with the page so image crawlers index all of
 *   them, not just the card pick
 * @param {{w:number,h:number}} [o.imageDims] - intrinsic dims of `image`;
 *   when present og:image:width/height keep their tags with real values
 *   instead of being dropped
 * @param {string} [o.keywords] - localized comma-joined search themes for
 *   the <meta name="keywords"> tag (Yandex/Bing still read it)
 * @param {boolean} [o.noLcp] - the route's media (heavyweight CDN
 *   captures, WebGL-rendered pages) is never the painted LCP element —
 *   skips the preload hint + veil LQIP + prefetch entirely instead of
 *   eagerly fetching a multi-MB PNG on every view; the parked article
 *   keeps the --painted modifier like media-less routes
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
 * @param {string} [o.skip] - per-locale APP.skip text for the light-DOM
 *   skip link — localized like the veil copy so the bypass affordance
 *   reads in the page's own language before (and without) JS.
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
    extraImages,
    imageDims,
    keywords,
    noLcp,
    entities,
    content,
    loader,
    skip,
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

  // Route-specific search themes — Yandex/Bing still consume
  // <meta name="keywords">; Google ignores it but the JSON-LD keywords
  // carry the same terms for it.
  if (keywords) {
    out = out.replace(/(<meta name="keywords" content=")[^"]*(")/, `$1${esc(keywords)}$2`)
  }

  // Route-specific share image — the three image metas swap together so
  // card crawlers never mix a project cover with share.png. The shell's
  // fixed og:image:width/height describe share.png; they are rewritten
  // to the picked image's probed dims when known, dropped otherwise —
  // wrong dimensions are worse than none. extraImages emit as repeated
  // og:image tags after the primary so the whole capture set stays
  // associated with the page for image crawlers.
  if (image) {
    for (const re of [
      /(<meta itemprop="image" content=")[^"]*(")/,
      /(<meta property="og:image" content=")[^"]*(")/,
      /(<meta name="twitter:image:src" content=")[^"]*(")/,
    ]) {
      out = out.replace(re, `$1${esc(image)}$2`)
    }

    if (imageDims) {
      out = out.replace(/(<meta property="og:image:width" content=")[^"]*(")/, `$1${imageDims.w}$2`)
      out = out.replace(
        /(<meta property="og:image:height" content=")[^"]*(")/,
        `$1${imageDims.h}$2`
      )
    } else {
      out = out.replace(/\s*<meta property="og:image:(?:width|height)"[^>]*>/g, '')
    }

    if (extraImages?.length) {
      const extra = extraImages
        .map((u) => `<meta property="og:image" content="${esc(u)}" />`)
        .join('\n    ')

      out = out.replace(/(<meta property="og:image" content="[^"]*"[^>]*>)/, `$1\n    ${extra}`)
    }
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

  // The preload must land BEFORE the modulepreload fan-out: Lantern
  // queues same-priority requests in document order, so a mid-body
  // image loses ~6s behind the boot graph. noLcp routes (the playground's
  // heavyweight share captures) opt out — their images are card/parked
  // surfaces, never the painted element.
  const lcpImage = noLcp ? '' : lcpImageOf(content, image)

  // The early-LCP paint itself is an LQIP: prefetchLcpThumbs() inlined
  // a bucket variant as a data URI, so the candidate paints in the
  // first frame with zero network wait while the real hero (the preload
  // above + the runtime mount) still streams in. It lands inside the
  // statically-emitted intro veil (classes mirror LOADER_CLASSES
  // .INTRO_LOADER_LQIP/.INTRO_LOADER_LQIP_FULL) — the veil paints with
  // the first frame so the image's paint time coincides with FCP, and
  // the veil's retirement parks the painted candidate offscreen so the
  // record survives mount. The --full modifier (96% viewport coverage)
  // only ships for ≥LCP_THUMB_MIN payloads: paint-timing disqualifies
  // viewport-dominating images with too few bytes behind their painted
  // area, and the mounted hero can paint ~130–200k px² — bigger than
  // the 113k the 70% box reports — so undersized thumbs stay on the
  // entropy-safe box while qualified ones out-size every hero. The
  // figure media and the route cover were both prefetched — pick the
  // heavier record so video posters whose ladder tops out below the
  // floor (a ~3KB thumb can't hold candidacy anywhere near full-viewport
  // coverage) fall back to the cover's richer variant instead.
  const lcpThumb = (noLcp ? [] : [lcpImage, image])
    .map((u) => (u ? LCP_THUMBS.get(u) : null))
    .filter(Boolean)
    .sort((a, b) => b.bytes - a.bytes)[0]

  // A media-scoped <source> in the first figure means ≤768px viewports
  // paint the mobile tier, not lcpImage — each preload is gated by the
  // complementary media query so a viewport preloads exactly the
  // resource its <picture> will select (a cross-scoped preload is a
  // wasted fetch and flags preload-not-used in Lighthouse). For video
  // figures the runtime hero is a <video poster>: on desktop it fetches
  // the .jpg (poster[0]), but prefersScaledVideo() switches small boxes
  // to the `-scaledown-2x` tier (poster[1]) — box × dpr ≤ width ÷ 2 —
  // so the mobile preload must warm the scaled key or the runtime LCP
  // resource stays cold until mount.
  const firstFigure = mediaFigureOf(content) || ''

  const posterImg = firstFigure.match(/<img[^>]* src="([^"]+\.mp4\.jpg-thumb\.jpg)"/)?.[1] || ''

  const lcpPreload = posterImg || lcpImage

  // Mobile preload for the figure's own media-scoped <source> — parked
  // video pictures carry none, so the runtime's scaled poster tier is
  // bound separately below.
  const lcpMobile = lcpPreload
    ? firstFigure.match(/<source media="[^"]*" srcset="([^"]+)"/)?.[1] || ''
    : ''

  // Runtime video-poster mirror of prefersScaledVideo(): the scaled tier
  // wins when `box × dpr ≤ mediaWidth ÷ 2`. The media query spells that
  // out in dpr buckets — ≤w/2 @≤1dppx, ≤w/3 @≤1.5, ≤w/4 @≤2, ≤w/6 above —
  // each clamped to the mobile band — so only viewports whose runtime
  // poster really is the scaled variant fetch this preload; the parked
  // figure's img width carries the intrinsic video width.
  const posterWidth = Number(firstFigure.match(/<img[^>]* width="(\d+)"/)?.[1]) || 0

  const scaledPoster = (() => {
    if (!posterImg || !posterImg.startsWith(CDN_BASE) || !posterWidth) return ''

    const stem = dec(posterImg.slice(CDN_BASE.length)).slice(0, -MEDIA.VIDEO_THUMB_EXT.length)

    const key = [
      `${stem}${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_THUMB_EXT}`,
      `${stem}${MEDIA.VIDEO_SCALE_BARE}${MEDIA.VIDEO_THUMB_EXT}`,
    ].find((k) => lcpManifest?.has(k))

    return key ? enc(`${CDN_BASE}${key}`) : ''
  })()

  const scaledMedia = scaledPoster
    ? [
        `(max-width: ${Math.min(768, Math.floor(posterWidth / 2))}px) and (max-resolution: 1dppx)`,
        `(max-width: ${Math.min(768, Math.floor(posterWidth / 3))}px) and (min-resolution: 1.01dppx) and (max-resolution: 1.5dppx)`,
        `(max-width: ${Math.min(768, Math.floor(posterWidth / 4))}px) and (min-resolution: 1.51dppx) and (max-resolution: 2dppx)`,
        `(max-width: ${Math.min(768, Math.floor(posterWidth / 6))}px) and (min-resolution: 2.01dppx)`,
      ].join(', ')
    : ''

  // Veil LQIP source: the inlined thumb data-URI, else the resolved
  // variant URL when the payload oversizes the inline cap (bytes >MAX
  // still lands while the boot graph streams), else the ladder's
  // smallest proven derivative (kodak blur, then q50 — lcpThumbUrlOf
  // yields them smallest-first and the URL unchanged when nothing is
  // proven). A shell without the intro veil can't host the image —
  // resolving a source anyway would park the article without --painted
  // while its own figure stays lazy and nothing paints the candidate.
  const hasVeil = /<div class="intro-loader"/.test(out)

  const lcpPaint = hasVeil
    ? lcpThumb?.src || lcpThumb?.url || (firstFigure ? lcpThumbUrlOf(lcpPreload, lcpManifest) : '')
    : ''

  // ≥MIN payloads pass the viewport-entropy check at 96% coverage;
  // undersized ones (or the unmeasured ladder fallback) keep the 70%
  // box that preserves their candidacy (mirrors
  // LOADER_CLASSES.INTRO_LOADER_LQIP + _FULL).
  const lqipClass =
    (lcpThumb?.bytes || 0) >= LCP_THUMB_MIN
      ? 'intro-loader-lqip intro-loader-lqip--full'
      : 'intro-loader-lqip'

  // Idempotent injection: the standalone pass feeds the previous
  // dist/index.html — en-home's LQIP img and preload hints included —
  // back through localize(), so without this sweep every document would
  // stack the home route's early-LCP artifacts on top of its own (or, on
  // media-less routes, inherit an LQIP the --painted contract forbids).
  out = out
    .replace(/<img class="intro-loader-lqip[^"]*"[^>]*>/g, '')
    .replace(/^[ \t]*<link rel="preload" as="image"[^>]*>\n?/gm, '')

  if (lcpPaint) {
    out = out.replace(
      /(<div class="intro-loader"[^>]*>)/,
      `$1<img class="${lqipClass}" src="${esc(lcpPaint)}" fetchpriority="high" alt="" aria-hidden="true">`
    )
  }

  if (lcpPreload) {
    // ≥3072px videos already carry the scaled key in their parked
    // media-scoped <source> (picked up as lcpMobile) — no second hint.
    const scaledHint = scaledPoster && scaledPoster !== lcpMobile

    // The unscaled poster/jpg stays ungated when a separate scaled hint
    // exists — on non-scaled phones (high-dpr boxes) poster[0] is still
    // the runtime pick, and desktop media selection is identical.
    const preloads = [
      `  <link rel="preload" as="image" href="${esc(lcpPreload)}"${lcpMobile && !scaledHint ? ` media="not ${MOBILE_MEDIA}"` : ''} fetchpriority="high">`,
      ...(lcpMobile
        ? [
            `  <link rel="preload" as="image" href="${esc(lcpMobile)}" media="${MOBILE_MEDIA}" fetchpriority="high">`,
          ]
        : []),
      ...(scaledHint
        ? [
            `  <link rel="preload" as="image" href="${esc(scaledPoster)}" media="${scaledMedia}" fetchpriority="high">`,
          ]
        : []),
    ]

    out = out.replace(/(<link rel="modulepreload")/, `${preloads.join('\n  ')}\n  $1`)
  }

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
    // The parked article's first figure is the painted LCP element on
    // media-less routes — the same image the <link rel="preload"> above
    // already races for. A lazy attr on it defers its fetch past parse
    // (and flags lcp-lazy-loaded), so it goes eager + high-priority,
    // matching the runtime hero contract in media/figure/render.tsx.
    // Media routes park the article --offscreen: its media never paints,
    // so the img+webp-source pair must stay lazy (c-v:hidden + lazy =
    // zero fetches) — an eager upgrade would burn two boot-graph fetches
    // on bytes nothing ever displays.
    if (lcpImage && !lcpPaint) {
      const lcpFigure = mediaFigureOf(content)

      if (lcpFigure) {
        content = content.replace(
          lcpFigure,
          lcpFigure.replace(/ loading="lazy"/, ' loading="eager" fetchpriority="high"')
        )
      }
    }

    // Emitters return a <main> wrapper (meaningful for a standalone
    // document), but parked inside #app it would be a second landmark
    // competing with the shell's <main id="main-content"> — demote it to
    // a plain div; the <article> wrapper already carries the
    // reader-mode document signal.
    const parked = content.replace(/^<main>/, '<div>').replace(/<\/main>$/, '</div>')

    // Media-less routes get no veil LQIP, so the article carries the
    // reader-content--painted modifier (mirrors READER_CLASSES.PAINTED)
    // and stays painted under the opaque veil — its own text becomes the
    // early LCP candidate instead of a late runtime <draw-text>.
    const articleClass = lcpPaint ? 'reader-content' : 'reader-content reader-content--painted'

    out = out.replace(
      /<div id="app">\s*(?:<div class="boot-veil"[^>]*>[\s\S]*?<\/div>\s*)?(?:<article[^>]*class="reader-content"[^>]*>[\s\S]*?<\/article>|<main>[\s\S]*?<\/main>)?\s*<\/div>/,
      // The parked copy is a labelled region landmark (IBM's DOM-level
      // aria_content_in_landmark counts <article> children as un-landmarked
      // content) while aria-hidden + inert keep the mirror out of the AT
      // tree and focus order — screen readers hear the live app instead.
      `<div id="app"><article id="reader-content" class="${articleClass}" role="region" aria-label="Static page copy" aria-hidden="true" inert>${parked}</article></div>`
    )
  }

  // Localize the statically-emitted intro-loader copy — mirrors
  // LOADER_CLASSES.INTRO_LOADER_TITLE / _MSG in the body markup; the
  // named-region aria-label follows the title so the landmark stays
  // localized too.
  if (loader?.title) {
    out = out.replace(/(<div class="intro-loader-title">)[^<]*/, `$1${esc(loader.title)}`)

    out = out.replace(
      /(<div class="intro-loader"[^>]*aria-label=")[^"]*(")/,
      `$1${esc(loader.title)}$2`
    )
  }

  if (loader?.msg)
    out = out.replace(/(<div class="intro-loader-msg">)[^<]*/, `$1${esc(loader.msg)}`)

  // Localize the light-DOM skip link — same copy contract as the veil:
  // English ships in the shell, each locale page swaps APP.skip text.
  if (skip)
    out = out.replace(/(<a class="skip-link" href="#reader-content">)[^<]*/, `$1${esc(skip)}`)

  // LLM replica links — every prerendered page advertises its build-time
  // .md/.json twins (generate-llm-pages.mjs emits the /llm/ mirror tree)
  // so agents can swap the HTML document for the canonical replica. The
  // canonical URL (never an alias) decides the replica path so deep links
  // and locale pages resolve to the same files the tree holds.
  const llmPaths = llmPathsFor(canon)

  if (llmPaths) {
    out = out.replace(
      '</head>',
      `  <link rel="alternate" type="text/markdown" href="${SITE_URL}${llmPaths.md}" title="Markdown replica">\n` +
        `  <link rel="alternate" type="application/json" href="${SITE_URL}${llmPaths.json}" title="JSON replica">\n</head>`
    )
  }

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
 * Per-request ceiling for every build-time prefetch (translations, dims
 * probes, LCP thumbs). Without a signal a stalled CDN connection hangs
 * the whole locale pass silently — every caller already degrades
 * gracefully on fetch failure, so a timeout just takes the fallback.
 */
const FETCH_TIMEOUT_MS = 20 * 1000

/**
 * ` width="W" height="H"` attribute fragment for emitted media — every
 * lazy <img>/<video> must carry explicit dims or Lighthouse flags the
 * bare tag and the pre-load box collapses to 0x0 (CLS). Missing source
 * metadata falls back to the runtime's own GENERIC_DIMENSIONS defaults
 * (the same 800×450 attr box <media-figure> declares when `size` is absent).
 * @param {number} [w] - intrinsic width when known
 * @param {number} [h] - intrinsic height when known
 */
const dimsAttr = (w, h) =>
  ` width="${w || GENERIC_DIMENSIONS.DEFAULT_WIDTH}" height="${h || GENERIC_DIMENSIONS.DEFAULT_HEIGHT}"`

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
/**
 * Playground share-capture dims — image URL → `[w, h]` pair, seeded
 * by prefetchShareDims (the captures live on the bucket, so each is
 * probed once via a 64 KB range request — PNG IHDR/JPEG SOF headers sit
 * in the head — and shared across every emitted page). Feeds the real
 * og:image:width/height, gallery <img> attrs and ImageObject sizes.
 */
const shareMediaDims = new Map()

/**
 * Probes every share capture once for its intrinsic dims. Failures are
 * silent: a missing probe emits attr-less dims, same as before.
 * @param {string[]} urls - absolute CDN share-image URLs
 */
export async function prefetchShareDims(urls) {
  await Promise.all(
    [...new Set(urls)].map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { Range: `bytes=0-${DIMS_PROBE_BYTES - 1}` },
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        })

        if (!res.ok) return

        const dims = scanImageDims(Buffer.from(await res.arrayBuffer()))

        if (dims) shareMediaDims.set(url, dims)
      } catch {
        /* unreachable host → attr-less dims, same as before */
      }
    })
  )
}

export async function prefetchTranslations() {
  try {
    const res = await fetch(`${FIREBASE_DB}/translations.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })

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
 * Resolves the translations map for build-time generators — the live
 * RTDB payload when prefetchTranslations() succeeded this run, else the
 * committed database.json snapshot, else an empty map (English fallbacks
 * only). Shared with generate-llm-pages.mjs so replicas and prerendered
 * pages always render the same per-locale copy.
 * @returns {object} locale → translations map
 */
export function loadTranslations() {
  if (liveTranslations) return liveTranslations

  const dbPath = path.join(ROOT, 'database.json')

  if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, 'utf8')).translations || {}

  console.warn('[locale-pages] database.json missing — emitting English fallbacks only')

  return {}
}

/**
 * Probes every unique star-field dossier image once (64 KB range request
 * each) so emitted <img> tags carry real width/height attrs — the
 * lazy-media CLS budget flagged the bare imgs. Failures are silent:
 * a missing probe falls back to the GENERIC_DIMENSIONS default box.
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
        const res = await fetch(url, {
          headers: { Range: `bytes=0-${DIMS_PROBE_BYTES - 1}` },
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        })

        if (!res.ok) return

        const dims = scanImageDims(Buffer.from(await res.arrayBuffer()))

        if (dims) starMediaDims.set(url, dimsAttr(dims[0], dims[1]))
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
export async function buildLocalePages(distDir = path.join(ROOT, 'dist'), template) {
  const indexPath = path.join(distDir, 'index.html')

  if (!template) {
    if (!fs.existsSync(indexPath)) throw new Error(`build-locale-pages: ${indexPath} not found`)

    template = fs.readFileSync(indexPath, 'utf8')
  }

  // Live RTDB translations win when prefetchTranslations() succeeded;
  // the committed database.json snapshot is the offline fallback.
  const translations = loadTranslations()

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

  /** Per-locale APP.skip text for the light-DOM skip link. */
  const skipCopyFor = (loc) => t(loc, (x) => x.APP?.skip)

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

    // A media deep link (exclude set) is a watch page — it declares
    // only its own VideoObject (emitted by the caller), never the
    // project's cover or sibling clips, so the single-video purpose
    // stays unambiguous to Google's classifier.
    if (!exclude && project.cover?.isVideo && project.cover.src) {
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

    if (!exclude) {
      for (const m of media.filter((x) => x.isVideo && x.src)) {
        entities.push(videoEntity(folder, m, title, description, mediaManifest))
      }
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
   * rendered as headings. The share-vocabulary keys (searchThemes,
   * shareGallery, shareCapture) feed the gallery section + keywords
   * surfaces instead — emitting them as bare paragraphs would read as
   * keyword stuffing.
   */
  const LEAF_SKIP = new Set(['title', 'searchThemes', 'shareGallery', 'shareCapture'])

  const leafParagraphs = (obj, skip = LEAF_SKIP) => {
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

  // <picture><source> does not retry the next entry on 404 — webp is
  // emitted only when the bucket manifest confirms the sibling was
  // generated, otherwise the unconverted source is a doomed request.
  const webpSibling = (u) =>
    u.endsWith('.jpg') && mediaManifest?.has(`${dec(u.slice(CDN_BASE.length, -4))}.webp`)
      ? `${u.slice(0, -4)}.webp`
      : ''

  // Manifest-proven `{stem}-mobile` derivative (the 768px ladder —
  // mirrors mediaRungs(`${stem}-mobile`) in core/utils/media/manifest.ts)
  // for a media-scoped <source>: ≤768px viewports fetch the mobile tier
  // instead of the full-width original — the LCP img is often a 3840px
  // uncompressed pass rendered at a few hundred CSS px. jpg carries the
  // rung; webp is its proven sibling ('' when unproven).
  const mobileTier = (u) => {
    if (!u.startsWith(CDN_BASE) || !mediaManifest) return { jpg: '', webp: '' }

    const stem = dec(u.slice(CDN_BASE.length)).replace(
      /(-mobile)?(-mozjpg(3-MSSIM-tuned-kodak|-uncompressed|-75|-50))?\.(jpg|webp)$/i,
      ''
    )

    for (const suffix of [
      `${MEDIA.MOZ}${MEDIA.Q100}${MEDIA.EXT}`,
      MEDIA.EXT,
      `${MEDIA.MOZ}${MEDIA.Q75}${MEDIA.EXT}`,
      `${MEDIA.MOZ}${MEDIA.Q50}${MEDIA.EXT}`,
    ]) {
      const key = `${stem}${MEDIA.MOBILE_SUFFIX}${suffix}`

      if (mediaManifest.has(key)) {
        const url = `${CDN_BASE}${key}`

        return { jpg: enc(url), webp: webpSibling(enc(url)) }
      }
    }

    return { jpg: '', webp: '' }
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
    const wh = dimsAttr(m.size?.[0], m.size?.[1])

    // Video figures mirror as the poster <img>, not a <video>: the parked
    // article is inert (controls could never run anyway), a poster attr
    // fetches at parse even inside a content-visibility:hidden subtree —
    // ~100+ eager thumbs per media-heavy page — while the lazy offscreen
    // img costs zero requests and still shows the same still to no-JS
    // readers, AI agents, and print. The playable URL stays discoverable
    // through the figcaption link + deep-link target.
    const mobileSrc = !isVideo ? mobileTier(source) : { jpg: '', webp: '' }

    // Scaled-poster tier for video figures — the runtime <video> picks
    // the `-scaledown-2x` poster when prefersScaledVideo holds (figure
    // box × dpr ≤ half the media width — always true for ≥1440px-wide
    // sources under the 768px media condition). Emitting it as a
    // media-scoped <source> lets localize() bind a matching mobile
    // preload so the poster fetch starts at parse, not at mount; it is
    // also the byte-cheaper still for no-JS readers on small viewports.
    // Manifest-gated: a <source> never retries on 404.
    const scaledPoster = (() => {
      const key = thumb.startsWith(CDN_BASE) ? dec(thumb.slice(CDN_BASE.length)) : ''

      if (!key.endsWith(MEDIA.VIDEO_THUMB_EXT) || (m.size?.[0] || 0) < SCALED_POSTER_MIN_WIDTH)
        return ''

      const scaled = `${key.slice(0, -MEDIA.VIDEO_THUMB_EXT.length)}${MEDIA.VIDEO_SCALE}${MEDIA.VIDEO_THUMB_EXT}`

      return mediaManifest?.has(scaled) ? enc(`${CDN_BASE}${scaled}`) : ''
    })()

    const media = isVideo
      ? thumb
        ? `<picture>${scaledPoster ? `<source media="${MOBILE_MEDIA}" srcset="${esc(scaledPoster)}">` : ''}${webpSibling(thumb) ? `<source srcset="${esc(webpSibling(thumb))}" type="image/webp">` : ''}<img src="${esc(thumb)}" alt="${esc(deepHref ? '' : label)}" loading="lazy" decoding="async"${wh}></picture>`
        : ''
      : // Inside the labelled deep-link the image is decorative — the
        // anchor's aria-label + figcaption already carry the name, so a
        // repeated alt is redundant verbosity for screen readers.
        // <source> order matters: the media-scoped mobile tier leads so
        // ≤768px viewports pick it before the unscoped webp/original.
        `<picture>${mobileSrc.webp ? `<source media="${MOBILE_MEDIA}" srcset="${esc(mobileSrc.webp)}" type="image/webp">` : ''}${mobileSrc.jpg ? `<source media="${MOBILE_MEDIA}" srcset="${esc(mobileSrc.jpg)}">` : ''}${webpSibling(source) ? `<source srcset="${esc(webpSibling(source))}" type="image/webp">` : ''}<img src="${esc(source)}" alt="${esc(deepHref ? '' : label)}" loading="lazy" decoding="async"${wh}></picture>`

    // The deep-link anchor wraps bare media — no text content — so it
    // carries the caption as its accessible name (axe link-name).
    const linkLabel = label ? ` aria-label="${label}"` : ''

    return `<figure>${deepHref ? `<a href="${esc(deepHref)}"${linkLabel}>` : ''}${media}${deepHref ? '</a>' : ''}<figcaption><a href="${esc(source)}">${label || esc(m.src)}</a></figcaption></figure>`
  }

  /**
   * Watch-page figure for a media deep link — on the asset's own
   * /portfolio/<p>/<media> URL the media IS the page's main content, so
   * video items emit a real playable <video controls> (mp4 source +
   * poster still), not the inert poster <img> the parked project
   * figures carry. One player per page is exactly the watch-page
   * contract Google's video indexing requires; stills keep
   * mediaFigure's <img> markup.
   */
  const mediaWatchFigure = (folder, m) => {
    const { source, thumb, isVideo } = mediaUrls(folder, m, mediaManifest)

    if (!isVideo) return mediaFigure(folder, m, '')

    if (!source) return ''

    const label = esc(m.label || '')
    const wh = dimsAttr(m.size?.[0], m.size?.[1])
    const poster = thumb ? ` poster="${esc(thumb)}"` : ''

    // preload="none" — the parked mirror is inert and the runtime mounts
    // its own player, so the page never buffers a stream nobody started;
    // the poster still paints the box and stays the LCP candidate.
    return `<figure><video controls preload="none"${poster}${wh}><source src="${esc(source)}" type="${MEDIA_ATTRS.VIDEO_MP4}"></video><figcaption><a href="${esc(source)}">${label || esc(m.src)}</a></figcaption></figure>`
  }

  /** One portfolio card as crawlable markup — cover figure, title, and
   *  the description the app reveals on hover/expand. Reader mode and
   *  crawlers cannot trigger the hover, so the desc is emitted inline. */
  const cardTile = (i, href) => {
    const coverKey = i.image ? resolveCoverKey(i.image, mediaManifest) : ''
    const coverSrc = coverKey ? enc(`${CDN_BASE}${coverKey}`) : ''
    const coverWebp = mediaManifest?.has(`${coverKey.slice(0, -4)}.webp`)
      ? enc(`${CDN_BASE}${coverKey.slice(0, -4)}.webp`)
      : ''
    const coverWh = dimsAttr(i.width?.[0], i.height?.[0])
    // The card link's own text (h3 + caption) already names the image —
    // a duplicate alt inside the anchor is redundant for screen readers.
    const coverMobile = coverSrc ? mobileTier(coverSrc) : { jpg: '', webp: '' }
    const img = coverSrc
      ? `<figure><picture>${coverMobile.webp ? `<source media="${MOBILE_MEDIA}" srcset="${esc(coverMobile.webp)}" type="image/webp">` : ''}${coverMobile.jpg ? `<source media="${MOBILE_MEDIA}" srcset="${esc(coverMobile.jpg)}">` : ''}${coverWebp ? `<source srcset="${esc(coverWebp)}" type="image/webp">` : ''}<img src="${esc(coverSrc)}" alt="" loading="lazy" decoding="async"${coverWh}></picture><figcaption>${esc(i.label || '')}</figcaption></figure>`
      : ''
    const desc = i.description ? `<p>${i.description}</p>` : ''

    return `<li><a href="${href}">${img}<h3>${esc(i.label || '')}</h3>${desc}</a></li>`
  }

  /**
   * Related-projects footer — the crawlable mirror of the app's
   * <portfolio-related> strip. Mirrors related/match.ts: the related
   * node's {link,page,featured} rows join home.portfoliolist (the
   * image/description join table) via normalized link/image/label
   * matching. Card descriptions ride along even though the app only
   * reveals them on hover — reader mode can't hover, so the content
   * must already be in the emitted markup.
   * @param {string} loc - locale code
   */
  const relatedContent = (loc) => {
    const rel = t(loc, (x) => x.components?.related) || {}
    const home = t(loc, (x) => x.pages?.HOME) || {}
    const rawHome = home.portfoliolist || []
    const homeList = Array.isArray(rawHome) ? rawHome : Object.values(rawHome)
    const rawProjects = rel.projects || []
    const projects = Array.isArray(rawProjects) ? rawProjects : Object.values(rawProjects)

    if (!rel.title || !projects.length) return ''

    const prefix = locPrefixOf(loc)

    const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
    const cleanLink = (l) =>
      (l || '').replace(/^(\/projects\/|\/portfolio\/|\/)/, '').replace(/\/$/, '')

    const findHome = (link, page) => {
      const c = norm(link)
      const p = norm(page)

      return (
        homeList.find((h) => {
          const hl = norm(h.link)
          const hi = norm(h.image)

          return (hl && c && hl === c) || (hi && hi === c)
        }) ??
        homeList.find((h) => {
          const hl = norm(h.link)
          const hi = norm(h.image)
          const hb = norm(h.label || h.title)

          return (
            (hl && (c.includes(hl) || hl.includes(c))) ||
            (hi && (c.includes(hi) || hi.includes(c))) ||
            (hb && p && (hb.includes(p) || p.includes(hb)))
          )
        })
      )
    }

    const items = projects
      .map((p) => {
        const link = cleanLink(p.link)
        const hm = findHome(link, p.page)
        const image = hm?.image || p.image || link
        const card = { ...hm, image, label: p.page || hm?.label || hm?.title || link }

        card.description = hm?.description || p.description || ''

        return link ? cardTile(card, `${prefix}/portfolio/${link}`) : ''
      })
      .join('')

    return `<section><h2>${esc(rel.title)}</h2><ul>${items}</ul></section>`
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
      .map((i) => cardTile(i, `${prefix}/portfolio/${i.link || i.slug}`))
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

    return `<main><h1>${esc(page.title || BASE_TITLE)}</h1>${sections}</main>`
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

    parts.push(relatedContent(loc))

    parts.push('</main>')

    return parts.join('')
  }

  /** Media-modal deep link — the asset's own watch page: its label as
   *  the <h1>, the playable/paintable figure as the page's main content,
   *  then the back-link into the parent project for context. The media
   *  leads so the rendered page reads as single-asset-first — Google's
   *  video watch-page contract — not as a project page with a modal. */
  const mediaContent = (loc, slug, label, figure) => {
    const project = t(loc, (x) => x.projects?.[slug]) || {}

    return `<main><h1>${esc(label || slug)}</h1>${figure || ''}<p><a href="${locPrefixOf(loc)}/portfolio/${slug}">${esc(project.title || slug)}</a></p></main>`
  }

  /**
   * Earth Playground page — title + authored copy + the full control
   * surface as structured markup. The panel is a WebGL canvas at
   * runtime, so this static mirror (every control group's localized
   * label, resolved data-param, input kind, range geometry and
   * effective default, expanded from SP_CONTROL_GROUPS — the same
   * schema the runtime panel consumes) is what crawlers/agents read;
   * the engine's DEFAULT_SP_GUI start state follows as a nested
   * definition list so the whole tunable scene is in the DOM.
   */
  const earthContent = (loc) => {
    const page = t(loc, (x) => x.pages?.['earth-playground']) || {}
    const defaults = page.defaults || {}

    // Keys rendered structurally below are skipped by leafParagraphs so
    // no label duplicates as a loose paragraph. The share-vocabulary keys
    // (searchThemes, shareGallery, shareCapture) feed the gallery
    // section + keywords surfaces instead — bare paragraphs of theme
    // terms would read as keyword stuffing.
    const skip = new Set(['title', 'defaults', 'searchThemes', 'shareGallery', 'shareCapture'])

    const effDefault = (c) =>
      c.label in defaults ? defaults[c.label] : 'checked' in c ? c.checked : c.def

    const groupRows = SP_CONTROL_GROUPS.map((g) => {
      skip.add(g.label)

      const rows = g.controls
        .map((c) => {
          skip.add(c.label)

          const spec =
            'checked' in c
              ? `checkbox, default ${esc(String(effDefault(c)))}`
              : `range ${c.min} – ${c.max}, step ${c.step}, default ${esc(String(effDefault(c)))}`

          return `<div><dt>${esc(page[c.label] || c.label)} <code>${esc(SP_PARAM_WIRES[c.key] || c.key)}</code></dt><dd>${spec}</dd></div>`
        })
        .join('')

      for (const a of g.actions || []) skip.add(a.label)

      const actions = (g.actions || [])
        .map(
          (a) =>
            `<li>${esc(page[a.label] || a.label)} <code>${esc(SP_ACTIONS[a.key] || a.key)}</code></li>`
        )
        .join('')

      return `<section><h3>${esc(page[g.label] || g.label)}</h3><dl>${rows}</dl>${actions ? `<ul>${actions}</ul>` : ''}</section>`
    }).join('')

    const engineRows = Object.entries(SP_ENGINE_DEFAULTS)
      .map(
        ([system, params]) =>
          `<h4>${esc(system.toLowerCase().replace(/_/g, ' '))}</h4><dl>${Object.entries(params)
            .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(String(v))}</dd></div>`)
            .join('')}</dl>`
      )
      .join('')

    return `<main><h1>${esc(page.title || BASE_TITLE)}</h1>${leafParagraphs(page, skip)}<section id="controls"><h2>${esc(page.experienceSettings || 'Experience Settings')}</h2>${groupRows}<h3>${esc(page.copyConstants || 'GUI constants')}</h3>${engineRows}</section>${shareGallerySection(loc)}</main>`
  }

  // ── Earth Playground share set ──────────────────────────────────────
  // Every capture under the bucket's share/ prefix joins the og:image
  // rotation (a shuffled deck — each emitted page draws the next pick so
  // the whole set cycles through card images build-over-build), the
  // parked-article gallery, and the JSON-LD ImageObject ItemList. Empty
  // when the manifest listing is unavailable — routes keep share.png.
  const shareImgs = shareImageUrls(mediaManifest, CDN_BASE)
  const shareDeck = shuffled(shareImgs)

  let shareDeckIdx = 0

  /** Next shuffled share pick — wraps so every capture gets card turns. */
  const nextShareImage = () =>
    shareDeck.length ? shareDeck[shareDeckIdx++ % shareDeck.length] : undefined

  // ── Star Field share set ──────────────────────────────────────────
  // Same contract as the earth set: every capture under the bucket's
  // star-field share/ prefix joins the og:image rotation (a shuffled
  // deck — each emitted star page draws the next pick), the parked
  // gallery section, and the JSON-LD ImageObject ItemList. Empty when
  // the manifest listing is unavailable — routes keep share.png.
  const starShareImgs = shareImageUrls(mediaManifest, CDN_BASE, STAR_SHARE)
  const starShareDeck = shuffled(starShareImgs)

  let starShareDeckIdx = 0

  /** Next shuffled star share pick — wraps so every capture gets card turns. */
  const nextStarShareImage = () =>
    starShareDeck.length ? starShareDeck[starShareDeckIdx++ % starShareDeck.length] : undefined

  /** ` width="W" height="H"` for a share URL — probed dims or the generic box. */
  const shareDimsAttr = (u) => {
    const d = shareMediaDims.get(u)

    return d ? dimsAttr(d[0], d[1]) : dimsAttr()
  }

  /** Localized search-theme list for one locale's playground page. */
  const epThemesOf = (loc) => {
    const page = t(loc, (x) => x.pages?.['earth-playground']) || {}

    return Array.isArray(page.searchThemes) ? page.searchThemes : []
  }

  /** Localized search-theme list for one locale's star-field page. */
  const sfThemesOf = (loc) => {
    const page = t(loc, (x) => x.pages?.['star-field']) || {}

    return Array.isArray(page.searchThemes) ? page.searchThemes : []
  }

  /** Search-theme keywords for a star body page — the locale's star-field theme list as a comma-joined meta keywords string. */
  const sfBodyShareFields = (loc) => ({
    keywords: sfThemesOf(loc).join(', ') || undefined,
  })

  /**
   * Parked-article gallery — every share capture as crawlable markup so
   * image search indexes the whole set off the page itself (the sitemap
   * image tags + JSON-LD ItemList mirror it). Anchored + captioned like
   * mediaFigure so each capture is also a first-class crawl target.
   */
  const shareGallerySection = (loc) => {
    if (!shareImgs.length) return ''

    const page = t(loc, (x) => x.pages?.['earth-playground']) || {}
    const title = page.title || 'Earth Playground'
    const capture = page.shareCapture || 'Earth render'
    const themes = epThemesOf(loc)

    const figs = shareImgs
      .map((u, i) => {
        const label = `${title} — ${capture} ${i + 1}`

        return `<figure><a href="${enc(u)}" aria-label="${esc(label)}"><img src="${enc(u)}" alt="${esc(label)}" loading="lazy" decoding="async"${shareDimsAttr(u)}></a><figcaption>${esc(`${capture} ${i + 1}`)}</figcaption></figure>`
      })
      .join('')

    return `<section id="share-gallery"><h2>${esc(page.shareGallery || 'Share captures')}</h2>${
      themes.length ? `<p>${esc(themes.join(', '))}</p>` : ''
    }${figs}</section>`
  }

  /**
   * Star-field parked-article gallery — every star share capture as
   * crawlable markup so image search indexes the whole set off the index
   * page itself (the sitemap image tags + JSON-LD ItemList mirror it).
   * Anchored + captioned like mediaFigure so each capture is also a
   * first-class crawl target.
   */
  const starShareGallerySection = (loc) => {
    if (!starShareImgs.length) return ''

    const page = t(loc, (x) => x.pages?.['star-field']) || {}
    const title = page.title || 'Star Field'
    const capture = page.shareCapture || 'Star render'
    const themes = sfThemesOf(loc)

    const figs = starShareImgs
      .map((u, i) => {
        const label = `${title} — ${capture} ${i + 1}`

        return `<figure><a href="${enc(u)}" aria-label="${esc(label)}"><img src="${enc(u)}" alt="${esc(label)}" loading="lazy" decoding="async"${shareDimsAttr(u)}></a><figcaption>${esc(`${capture} ${i + 1}`)}</figcaption></figure>`
      })
      .join('')

    return `<section id="share-gallery"><h2>${esc(page.shareGallery || 'Share captures')}</h2>${
      themes.length ? `<p>${esc(themes.join(', '))}</p>` : ''
    }${figs}</section>`
  }

  /**
   * ImageObject ItemList for the whole share set — every capture becomes
   * a named, captioned, language-tagged entity carrying the locale's
   * earth-image search themes, so image search in every language links
   * the renders to the portfolio. The deck pick is marked
   * representativeOfPage.
   */
  const earthShareEntities = (loc, pageUrl, pick) => {
    if (!shareImgs.length) return []

    const page = t(loc, (x) => x.pages?.['earth-playground']) || {}
    const bcp = LOCALE_TAGS[loc].bcp
    const title = page.title || 'Earth Playground'
    const capture = page.shareCapture || 'Earth render'
    const keywords = epThemesOf(loc).join(', ')

    return [
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'ItemList',
        '@id': `${pageUrl}#share-gallery`,
        name: page.shareGallery || 'Share captures',
        inLanguage: bcp,
        numberOfItems: shareImgs.length,
        itemListElement: shareImgs.map((u, i) => {
          const url = enc(u)
          const d = shareMediaDims.get(u)

          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'ImageObject',
              '@id': `${pageUrl}#share-${i + 1}`,
              url,
              contentUrl: url,
              name: `${title} — ${capture} ${i + 1}`,
              ...(keywords ? { caption: `${title}: ${keywords}`, keywords } : {}),
              inLanguage: bcp,
              ...(d ? { width: d[0], height: d[1] } : {}),
              author: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
              creator: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
              isPartOf: { '@id': `${pageUrl}#webpage` },
              representativeOfPage: u === pick,
            },
          }
        }),
      },
    ]
  }

  /**
   * ImageObject ItemList for the whole star share set — every capture
   * becomes a named, captioned, language-tagged entity carrying the
   * locale's star-image search themes, so star/space image searches in
   * every language link the renders to the portfolio. The deck pick is
   * marked representativeOfPage.
   */
  const starShareEntities = (loc, pageUrl, pick) => {
    if (!starShareImgs.length) return []

    const page = t(loc, (x) => x.pages?.['star-field']) || {}
    const bcp = LOCALE_TAGS[loc].bcp
    const title = page.title || 'Star Field'
    const capture = page.shareCapture || 'Star render'
    const keywords = sfThemesOf(loc).join(', ')

    return [
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'ItemList',
        '@id': `${pageUrl}#share-gallery`,
        name: page.shareGallery || 'Share captures',
        inLanguage: bcp,
        numberOfItems: starShareImgs.length,
        itemListElement: starShareImgs.map((u, i) => {
          const url = enc(u)
          const d = shareMediaDims.get(u)

          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'ImageObject',
              '@id': `${pageUrl}#share-${i + 1}`,
              url,
              contentUrl: url,
              name: `${title} — ${capture} ${i + 1}`,
              ...(keywords ? { caption: `${title}: ${keywords}`, keywords } : {}),
              inLanguage: bcp,
              ...(d ? { width: d[0], height: d[1] } : {}),
              author: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
              creator: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
              isPartOf: { '@id': `${pageUrl}#webpage` },
              representativeOfPage: u === pick,
            },
          }
        }),
      },
    ]
  }

  /** Linked-data anchors for the playground WebPage — binds the page to
   *  the Earth/Planet concepts so theme searches resolve through the
   *  knowledge graph, not just the text. */
  const EP_ABOUT = Object.freeze([
    { '@type': 'Thing', name: 'Earth', sameAs: 'https://www.wikidata.org/wiki/Q2' },
    { '@type': 'Thing', name: 'Planet', sameAs: 'https://www.wikidata.org/wiki/Q634' },
  ])

  /** Linked-data anchors for the star-field WebPage — binds the page to
   *  the Star/Galaxy concepts so star and space searches resolve through
   *  the knowledge graph, not just the text. */
  const SF_ABOUT = Object.freeze([
    { '@type': 'Thing', name: 'Star', sameAs: 'https://www.wikidata.org/wiki/Q523' },
    { '@type': 'Thing', name: 'Galaxy', sameAs: 'https://www.wikidata.org/wiki/Q321' },
  ])

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
        const wh = starMediaDims.get(img.src) || dimsAttr()

        return `<figure><img src="${esc(enc(img.src))}" alt="${esc(img.caption || '')}" loading="lazy" decoding="async"${wh}><figcaption>${esc(img.caption || '')}${img.credit ? ` — ${esc(img.credit)}` : ''}</figcaption></figure>`
      })
      .join('')

    const audio = (b.media?.audio || [])
      .map(
        (a) =>
          `<figure><audio src="${esc(enc(a.src))}" controls preload="none"></audio><figcaption>${esc(a.caption || '')}${a.credit ? ` — ${esc(a.credit)}` : ''}</figcaption></figure>`
      )
      .join('')

    // refs are provenance URLs — link them, but only when the value is
    // actually an http(s) URL (citation prose stays plain text so a
    // "Publisher · Author" string can never become a relative href that
    // crawlers chase into soft-404 URLs).
    const refs = (b.meta?.refs || [])
      .map((r) =>
        /^https?:\/\//.test(r)
          ? `<li><a href="${esc(enc(r))}" rel="noopener">${esc(r)}</a></li>`
          : `<li>${esc(r)}</li>`
      )
      .join('')

    return `<main><h1>${esc(b.name || bodyId)}</h1><p><em>${esc(b.kind || '')}</em> — ${esc(b.tagline || '')}</p>${facts ? `<dl>${facts}</dl>` : ''}<p>${esc(b.history || '')}</p>${images}${audio}${b.source ? `<p>${esc(b.source)}</p>` : ''}${refs ? `<ul>${refs}</ul>` : ''}</main>`
  }

  /** Star-field body kinds in index order — voyage-from-home ordering;
   *  any kind absent here still emits, appended after the ordered ones. */
  const STAR_KIND_ORDER = [
    'system',
    'star',
    'planet',
    'dwarfPlanet',
    'moon',
    'asteroid',
    'comet',
    'belt',
    'satellite',
    'exoplanet',
    'nebula',
    'cluster',
    'dso',
    'galaxy',
    'dwarfGalaxy',
    'blackHole',
    'structure',
  ]

  /**
   * Star-field index — description plus the full localized body catalog
   * grouped by kind: every object is a real <h3> heading with a link to
   * its dossier page and its localized tagline, so the whole chart is
   * heading-navigable and indexable without JS.
   */
  const starIndexContent = (loc, bodyIds) => {
    const page = t(loc, (x) => x.pages?.['star-field']) || {}
    const prefix = `${locPrefixOf(loc)}/${(LANG_SLUGS[loc] || enSlugs).starField}`

    // kind → dossier list — locale text comes from the dossier itself so
    // a missing locale file degrades to the English dossier, never a gap.
    const byKind = new Map()

    for (const id of bodyIds) {
      const b = readStarBody(loc, id)

      if (!b) continue

      const list = byKind.get(b.kind) ?? []

      list.push({ id, b })

      byKind.set(b.kind, list)
    }

    const kinds = [...byKind.keys()].sort(
      (a, b) =>
        (STAR_KIND_ORDER.includes(a) ? STAR_KIND_ORDER.indexOf(a) : STAR_KIND_ORDER.length) -
        (STAR_KIND_ORDER.includes(b) ? STAR_KIND_ORDER.indexOf(b) : STAR_KIND_ORDER.length)
    )

    const sections = kinds
      .map((kind) => {
        const items = byKind
          .get(kind)
          .map(
            ({ id, b }) =>
              `<article><h3><a href="${prefix}/${esc(id)}">${esc(b.name || id)}</a></h3><p><em>${esc(page[kind] || kind)}</em>${b.tagline ? ` — ${esc(b.tagline)}` : ''}</p></article>`
          )
          .join('')

        return `<section><h2>${esc(page[kind] || kind)}</h2>${items}</section>`
      })
      .join('')

    // Deep-catalog block — the 139,563-record registry behind the canvas
    // star cloud: per-kind counts, source credits, the shard-JSON field
    // dictionary and the manifest/binary/dossier URL surface, so robots
    // enumerate every object without rendering a frame.
    const pl = (k) => page[k] || k

    const catalogFields = {
      star: [
        ['n', 'name'],
        ['m', pl('magnitude')],
        ['d', `${pl('distance')} (ly)`],
        ['s', pl('spectralType')],
        ['c', pl('constellation')],
        ['x, y, z', `${pl('coordinates')} (ly)`],
        ['i', 'catalog id'],
      ],
      exoplanet: [
        ['n', 'name'],
        ['h', pl('hostStar')],
        ['d', `${pl('distance')} (ly)`],
        ['s', `${pl('spectralType')} — ${pl('hostStar')}`],
        ['y2', `${pl('discovery')} (year)`],
        ['x, y, z', `${pl('coordinates')} (ly)`],
        ['i', 'catalog id'],
      ],
      dso: [
        ['n', 'name'],
        ['c', `${pl('designation')} (NGC/IC)`],
        ['t', pl('dsoType')],
        ['m', pl('magnitude')],
        ['d', pl('distance')],
        ['r', pl('redshift')],
        ['x, y, z', pl('coordinates')],
        ['i', 'catalog id'],
      ],
    }

    const catalogRows = SF_REGISTRY_KINDS.map(({ kind, labelKey, aboutKey, credit }) => {
      const meta = starCatalogManifest?.kinds?.[kind]
      const fields = (catalogFields[kind] || [])
        .map(([k, v]) => `<code>${esc(k)}</code> ${esc(v || k)}`)
        .join('; ')

      return `<li><b>${esc(page[labelKey] || kind)}</b> — ${meta?.count ?? 0} ${esc(page.records || 'records')} (${esc(credit)}). ${esc(page[aboutKey] || '')} Fields: ${fields}. <a href="${SITE_URL}${STAR_DATA_BASE}/${SF_REGISTRY_INDEX_DIR}/${esc(meta?.shards?.[0] || '')}">${STAR_DATA_BASE}/${SF_REGISTRY_INDEX_DIR}/${kind}-NNN.json</a> — ${(meta?.shards || []).length} × ${starCatalogManifest?.shardSize || 0}-record JSON shards</li>`
    }).join('')

    const catalogBlock = starCatalogManifest
      ? `<section id="catalog"><h2>${esc(page.catalog || 'Catalog')}</h2>${page.navDesc ? `<p>${esc(page.navDesc)}</p>` : ''}<ul>${catalogRows}</ul><p>${STAR_DATA_BASE}/${SF_REGISTRY_INDEX_DIR}/${SF_REGISTRY_MANIFEST} · ${STAR_DATA_BASE}/${SF_STAR_CLOUD.FILE} (uint32 count + count × 6 float32-LE records: x, y, z ly, magnitude, B-V, kind) · ${STAR_DATA_BASE}/&lt;locale&gt;/&lt;body-id&gt;.json</p></section>`
      : ''

    return `<main><h1>${esc(page.title || BASE_TITLE)}</h1>${leafParagraphs(
      page,
      new Set([
        'title',
        'catalog',
        'navDesc',
        'records',
        'searchThemes',
        'shareGallery',
        'shareCapture',
        'magnitude',
        'distance',
        'spectralType',
        'constellation',
        'designation',
        'hostStar',
        'dsoType',
        'discovery',
        'redshift',
        'coordinates',
        'registry_star',
        'registry_star_about',
        'registry_exoplanet',
        'registry_exoplanet_about',
        'registry_dso',
        'registry_dso_about',
      ])
    )}${sections}${catalogBlock}${starShareGallerySection(loc)}</main>`
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

      // Shared share-set fields for every earth-playground surface — the
      // canonical slug and both alias segments each draw a card pick off
      // the deck, list the remaining captures as extra og:image
      // candidates, and carry the ImageObject gallery in their JSON-LD.
      const epShareFields = () => {
        const pick = nextShareImage()
        const d = pick ? shareMediaDims.get(pick) : null
        const canon = `${SITE_URL}${epCanonical}`

        return {
          image: pick ? enc(pick) : undefined,
          imageDims: d ? { w: d[0], h: d[1] } : undefined,
          extraImages: pick ? shareImgs.filter((u) => u !== pick).map((u) => enc(u)) : undefined,
          keywords: epThemesOf(loc).join(', ') || undefined,
          // Multi-MB capture set — card/parked surfaces only, never the
          // painted LCP element (the WebGL canvas owns that).
          noLcp: true,
          about: EP_ABOUT,
          mainEntity: shareImgs.length ? { '@id': `${canon}#share-gallery` } : undefined,
          entities: earthShareEntities(loc, canon, pick),
        }
      }

      const sfCanonical = slugPath('starField')(loc)

      // Shared share-set fields for every star-field surface — the
      // canonical slug and the English-segment alias each draw a card
      // pick off the star deck, list the remaining captures as extra
      // og:image candidates, and carry the ImageObject gallery in their
      // JSON-LD. Body dossier pages keep only the keywords (the runtime
      // share rotation still draws them a random card pick per visit) so
      // their dossier-figure LQIP keeps painting.
      const sfShareFields = () => {
        const pick = nextStarShareImage()
        const d = pick ? shareMediaDims.get(pick) : null
        const canon = `${SITE_URL}${sfCanonical}`

        return {
          image: pick ? enc(pick) : undefined,
          imageDims: d ? { w: d[0], h: d[1] } : undefined,
          extraImages: pick
            ? starShareImgs.filter((u) => u !== pick).map((u) => enc(u))
            : undefined,
          keywords: sfThemesOf(loc).join(', ') || undefined,
          // Multi-MB capture set — card/parked surfaces only, never the
          // painted LCP element (the WebGL canvas owns that).
          noLcp: true,
          about: SF_ABOUT,
          mainEntity: starShareImgs.length ? { '@id': `${canon}#share-gallery` } : undefined,
          entities: starShareEntities(loc, canon, pick),
        }
      }

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
        (() => {
          const share = epShareFields()

          return {
            path: `${prefix}${slugs.earthPlayground}`,
            title: pgTitle(),
            description: epDescOf(loc),
            alt: slugPath('earthPlayground'),
            content: earthContent(loc),
            ...share,
            // WebApplication — the canvas-rendered control surface
            // declared as schema so the playground's whole feature set is
            // legible to crawlers without executing a frame of WebGL —
            // plus the share-set ImageObject gallery.
            entities: [
              {
                '@context': SCHEMA_CONTEXT,
                '@type': 'WebApplication',
                '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.earthPlayground}#app`,
                name: t(loc, (x) => x.APP?.earthPlayground) || 'Earth Playground',
                url: `${SITE_URL}${locPrefixOf(loc)}/${slugs.earthPlayground}`,
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Web browser',
                browserRequirements: 'Requires WebGL; WebGPU preferred',
                inLanguage: LOCALE_TAGS[loc].bcp,
                isAccessibleForFree: true,
                isPartOf: {
                  '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.earthPlayground}#webpage`,
                },
                author: { '@type': 'Person', name: BASE_TITLE, url: SITE_URL },
                featureList: SP_CONTROL_GROUPS.flatMap((g) => [
                  t(loc, (x) => x.pages?.['earth-playground']?.[g.label]) || g.label,
                  ...g.controls.map(
                    (c) => t(loc, (x) => x.pages?.['earth-playground']?.[c.label]) || c.label
                  ),
                  ...(g.actions || []).map(
                    (a) => t(loc, (x) => x.pages?.['earth-playground']?.[a.label]) || a.label
                  ),
                ]),
              },
              ...share.entities,
            ],
          }
        })(),
        (() => {
          const share = sfShareFields()

          return {
            path: `${prefix}${slugs.starField}`,
            title: sfTitle(),
            description: sfDescOf(loc),
            alt: slugPath('starField'),
            content: starIndexContent(loc, starBodyIds),
            ...share,
            // ItemList — the whole charted catalog with deep links, so the
            // index page itself enumerates every 3D object for crawlers and
            // agents without executing a frame of WebGL — plus the
            // share-set ImageObject gallery.
            entities: [
              {
                '@context': SCHEMA_CONTEXT,
                '@type': 'ItemList',
                '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.starField}#catalog`,
                name: t(loc, (x) => x.APP?.starField) || 'Star Field',
                itemListElement: starBodyIds.map((bodyId, i) => {
                  const body = readStarBody(loc, bodyId)

                  return {
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `${SITE_URL}${locPrefixOf(loc)}/${slugs.starField}/${bodyId}`,
                    name: body?.name || bodyId,
                  }
                }),
              },
              // DataCatalog — the 139,563-record registry (HYG stars, NASA
              // exoplanets, OpenNGC DSOs) plus its packed-binary form, so
              // the canvas star cloud's underlying data is enumerable as
              // schema + fetchable JSON shards without WebGL.
              {
                '@context': SCHEMA_CONTEXT,
                '@type': 'DataCatalog',
                '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.starField}#data-catalog`,
                name: t(loc, (x) => x.pages?.['star-field']?.catalog) || 'Deep Catalog',
                inLanguage: LOCALE_TAGS[loc].bcp,
                dataset: [
                  ...SF_REGISTRY_KINDS.map(({ kind, labelKey, aboutKey, credit }) => {
                    const meta = starCatalogManifest?.kinds?.[kind]

                    return {
                      '@type': 'Dataset',
                      '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.starField}#dataset-${kind}`,
                      name: t(loc, (x) => x.pages?.['star-field']?.[labelKey]) || kind,
                      description: t(loc, (x) => x.pages?.['star-field']?.[aboutKey]) || '',
                      creditText: credit,
                      isAccessibleForFree: true,
                      distribution: [
                        {
                          '@type': 'DataDownload',
                          encodingFormat: 'application/json',
                          contentUrl: `${SITE_URL}${STAR_DATA_BASE}/${SF_REGISTRY_INDEX_DIR}/${SF_REGISTRY_MANIFEST}`,
                        },
                        ...(meta?.shards || []).map((shard) => ({
                          '@type': 'DataDownload',
                          encodingFormat: 'application/json',
                          contentUrl: `${SITE_URL}${STAR_DATA_BASE}/${SF_REGISTRY_INDEX_DIR}/${shard}`,
                        })),
                      ],
                    }
                  }),
                  {
                    '@type': 'Dataset',
                    '@id': `${SITE_URL}${locPrefixOf(loc)}/${slugs.starField}#dataset-deep-field`,
                    name: 'Deep field — packed binary',
                    description:
                      'Every registry record packed little-endian Float32 (x, y, z heliocentric light-years, apparent magnitude, B-V colour index, kind: 0 star / 1 exoplanet / 2 deep-sky object) behind a uint32 record-count header — the renderer-side form of the same catalog.',
                    isAccessibleForFree: true,
                    distribution: [
                      {
                        '@type': 'DataDownload',
                        encodingFormat: 'application/octet-stream',
                        contentUrl: `${SITE_URL}${STAR_DATA_BASE}/${SF_STAR_CLOUD.FILE}`,
                      },
                    ],
                  },
                ],
              },
              ...share.entities,
            ],
          }
        })(),
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
          ...epShareFields(),
        })
      }

      routes.push({
        path: `${prefix}space-playground`,
        title: pgTitle(),
        description: epDescOf(loc),
        alt: slugPath('earthPlayground'),
        canonical: epCanonical,
        ...epShareFields(),
      })

      if (loc !== 'en' || slugs.starField !== 'star-field-experiment') {
        routes.push({
          path: `${prefix}star-field-experiment`,
          title: sfTitle(),
          description: sfDescOf(loc),
          alt: slugPath('starField'),
          canonical: slugPath('starField')(loc),
          content: starIndexContent(loc, starBodyIds),
          ...sfShareFields(),
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

        // Watch-page description names the asset first — without the
        // label prefix hundreds of media pages would share the project
        // description verbatim.
        const mediaDesc = toDescription(`${label} — ${description}`)

        routes.push({
          path: `${prefix}portfolio/${slug}/${mediaSlug}`,
          emitAtPublicPath: loc !== 'en',
          // Watch-page title names the asset, not just the project.
          title: titleOf(`${pageName} | ${label}`),
          pageName: label,
          description: mediaDesc,
          image: source ? (isVideo ? thumb : source) : undefined,
          content: mediaContent(loc, slug, label, mediaWatchFigure(project?.folder || '', media)),
          // The media page carries the whole project graph plus its own
          // media entity (ImageObject for stills, VideoObject for clips)
          // so Google can index the specific asset at this URL.
          entities: [
            ...(isVideo
              ? [videoEntity(project?.folder || '', media, pageName, mediaDesc, mediaManifest)]
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
          ...sfBodyShareFields(loc),
          entities: [
            {
              '@context': SCHEMA_CONTEXT,
              '@type': 'Article',
              '@id': `${bodyUrl}#article`,
              headline: bodyName,
              description: body?.tagline || '',
              about: {
                '@type': 'Thing',
                '@id': `${bodyUrl}#object`,
                name: bodyName,
                description: body?.tagline || '',
                // Technical dossier facts as structured property values —
                // the machine-readable tech description for each object.
                additionalProperty: (body?.facts || []).map((f) => ({
                  '@type': 'PropertyValue',
                  name: f.label,
                  value: f.value,
                })),
              },
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

  const webPageEntity = ({
    url,
    name,
    description,
    bcp,
    image,
    crumbs,
    keywords,
    about,
    mainEntity,
  }) => ({
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
    ...(keywords ? { keywords } : {}),
    ...(about ? { about } : {}),
    ...(mainEntity ? { mainEntity } : {}),
  })

  // Prime the LQIP cache for the root document's early-LCP image.
  const enHome = homeContent('en')

  await prefetchLcpThumbs([lcpImageOf(enHome)], mediaManifest)

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
    content: enHome,
    loader: loaderCopyFor('en'),
    skip: skipCopyFor('en'),
  })

  // Probe the whole share sets once — the dims feed every emitted
  // page's og:image:width/height, gallery <img> attrs and ImageObject
  // sizes, so it runs before the locale fan-out, not per-locale.
  await prefetchShareDims([...shareImgs, ...starShareImgs])

  // ── Per-route documents ───────────────────────────────────────────────────
  // English emits straight to dist/<route>/index.html — exact-match static
  // files win over the `**` SPA rewrite, so no firebase.json entry is
  // needed. Other locales live under dist/langs/<loc>/… with rewrites.
  for (const loc of VALID_LANGS) {
    if (!LOCALE_TAGS[loc]) continue

    const tags = LOCALE_TAGS[loc]

    // Prime the LQIP cache once per locale — media URLs are identical
    // across locales so only the first locale's pass hits the network.
    const routes = routesFor(loc)

    // Prime each route's figure media AND its cover — video-hero posters
    // sometimes top out at ~2–3KB variants (no entropy-qualified LQIP
    // exists along their ladder), where the cover's kodak blur pass is
    // far larger. localize() then binds whichever prefetched record
    // clears the coverage-entropy floor.
    await prefetchLcpThumbs(
      routes.flatMap((route) =>
        route.noLcp ? [] : [lcpImageOf(route.content, route.image), route.image]
      ),
      mediaManifest
    )

    for (const route of routes) {
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
          keywords: route.keywords,
          about: route.about,
          mainEntity: route.mainEntity,
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
        extraImages: route.extraImages,
        imageDims: route.imageDims,
        keywords: route.keywords,
        noLcp: route.noLcp,
        entities,
        content: route.content,
        loader: loaderCopyFor(loc),
        skip: skipCopyFor(loc),
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

  const emitDocsPages = async () => {
    const { roots } = scanManifest(ROOT)

    // /docs/<root> — index page per manifest root, then every child node.
    const writeDocsPage = async ({ urlPath, name, description, body, crumbs }) => {
      // Docs bodies rarely carry figures, but when they do the first
      // image is the same early-LCP candidate as the route pages.
      await prefetchLcpThumbs([lcpImageOf(body)], mediaManifest)

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
        skip: skipCopyFor('en'),
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

    const emit = async (node, trail) => {
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

      await writeDocsPage({
        urlPath,
        name: node.name,
        description,
        body,
        crumbs: crumbItems,
      })

      if (isDir) {
        for (const child of node.children || []) {
          await emit(child, [...trail, { name: node.name, url: `${SITE_URL}${urlPath}` }])
        }
      }
    }

    // /docs itself — index over every manifest root.
    await writeDocsPage({
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

      await writeDocsPage({
        urlPath: `/docs/${root.root}`,
        name: root.label || root.root,
        description: `${root.label || root.root} — documentation index`,
        body: `<main><h1>${esc(root.label || root.root)}</h1>${dirList(root.children)}</main>`,
        crumbs: rootTrail,
      })

      for (const child of root.children || []) {
        await emit(child, rootTrail.slice(1))
      }
    }
  }

  try {
    await emitDocsPages()
  } catch (err) {
    console.warn('[locale-pages] docs emit skipped:', err?.message || err)
  }

  syncFirebaseRewrites()

  // Every queued .br/.gz sibling resolves across the libuv threadpool here
  // — ~19k brotli-11 passes previously ran serially on this thread.
  const compressed = await drainCompressedWrites()

  return { html: rootHtml, written, locales: VALID_LANGS.length - 1, compressed }
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

  const { html, written, locales } = await buildLocalePages(DIST)

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

  // Root/sw siblings queue after buildLocalePages' internal drain — flush
  // the remainder before reporting.
  await drainCompressedWrites()

  console.log(`[locale-pages] wrote ${written + 1} documents across ${locales} locales`)
}
