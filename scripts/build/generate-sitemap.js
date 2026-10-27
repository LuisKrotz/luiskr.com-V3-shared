/**
 * @file scripts/build/generate-sitemap.js
 * @description Emits the whole crawl surface under `website/public/meta/`:
 * `sitemap.xml` (an index over the per-locale `sitemap-<loc>.xml` files),
 * the global `urllist.txt`, and localized `robots.txt` / `urllist.txt` /
 * `llms.txt` / `ai-catalog.json` files per locale.
 * `LK_OFFLINE=1` uses `database.json` and the cached media manifest
 * instead of requesting Firebase and Storage listings.
 *
 * Route inventory mirrors `core/router/parse-path.ts` + `LANG_SLUGS`:
 * - English unprefixed surface — `/`, `/about`, `/contact`, the legal
 *   routes, `/earth-playground`, `/star-field-experiment`,
 *   `/portfolio/<slug>` plus a media-modal deep link for every labelled
 *   media item (matching `website/views/project/modal.ts`), every
 *   `/star-field-experiment/<body>` catalog deep link. The `/docs/**`
 *   surface is deliberately absent — it carries X-Robots-Tag: noindex
 *   (generated typedoc/coverage/source mirrors are agent/human docs,
 *   not indexable content), and a sitemap may only name indexable URLs.
 * - Per locale `/<loc>/…` — the locale's localized slugs for
 *   about/contact/legal/earthPlayground/starField, `/<loc>/portfolio/<slug>`
 *   project routes AND localized media-modal deep links, and localized
 *   star-field body deep links `/<loc>/<starField>/<body>`.
 * - Docs are English-only by design — `/<loc>/docs/…` never appears.
 * - Noncanonical aliases (legacy project slugs, `/space-playground`,
 *   English-segment routes under a locale prefix) are served as 301
 *   redirects by firebase.json — they never appear in a sitemap.
 *
 * Every sitemap lists its locale surface PLUS the shared unprefixed
 * surface so each file discovers ≥ the full English URL count.
 *
 * Image/video sitemap extensions (`xmlns:image` / `xmlns:video`) expose
 * every CDN asset at its best available quality — variant resolution runs
 * through `media-manifest.mjs` so only keys that exist on the bucket are
 * emitted (uncompressed passes preferred, per-item availability respected).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { LANG_SLUGS } from '../../../core/locale/lang-slugs.ts'
import { LOCALE_TAGS } from '../../../core/tokens/locales.ts'
import { SEARCH_THEMES_KEY } from '../../../core/tokens/data/search-themes.js'
import { EARTH_SHARE, STAR_SHARE } from '../../../core/tokens/playground/share.ts'
import { mediaItemsOf, mediaRowsOf } from './route-media.mjs'
import {
  fetchMediaManifest,
  loadMediaManifest,
  persistMediaManifest,
  resolveMediaUrls,
  resolveCoverKey,
} from './media-manifest.mjs'
import { shareImageKeys, shareImageUrls, shareManifestDoc } from './playground-share.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const VALID_LANGS = Object.keys(LANG_SLUGS)

const CDN_BASE = 'https://storage.googleapis.com/luiskr.com/public/_v3/'

/** XML namespaces emitted on every <urlset>. */
const URLSET_XMLNS =
  'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ' +
  'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'

// Locale-prefixed path detector — built from the actual locale codes so
// single-word routes like /docs/* or /gdpr are never mistaken for a
// locale prefix and dropped from the English sitemap.
const LOCALE_PREFIX_RE = new RegExp(`^/(${VALID_LANGS.join('|')})(/|$)`)

// Experience path segments (canonical + every localized slug) — used for
// sitemap <priority> so immersive pages rank just under home roots.
const EXPERIENCE_SEGMENTS = new Set()
for (const slugs of Object.values(LANG_SLUGS)) {
  EXPERIENCE_SEGMENTS.add(slugs.earthPlayground)
  EXPERIENCE_SEGMENTS.add(slugs.starField)
}

/** Escapes text for XML element bodies (media titles/descriptions). */
const escXml = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/**
 * Percent-encodes a URL for sitemap loc emission — bucket keys can carry
 * literal spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-
 * first keeps it idempotent (encodeURI escapes '%' itself).
 */
const encLoc = (u) => {
  try {
    return encodeURI(decodeURI(u))
  } catch {
    return encodeURI(u)
  }
}

/** Truncates a media title to Google's 100-char video-title bound. */
const titleOf = (label, max = 100) => {
  const t = String(label || '').trim()

  return t.length <= max ? t : `${t.slice(0, max - 1).trimEnd()}…`
}

/** Localized search-theme list for one CMS node — every page/project
 *  carries `searchThemes` (patch-all-pages-search-themes.js); the list
 *  feeds <image:caption> and <video:tag> so image/video search indexes
 *  the asset under the page's own query vocabulary. */
const themesOf = (node) => (Array.isArray(node?.[SEARCH_THEMES_KEY]) ? node[SEARCH_THEMES_KEY] : [])

/** `<image:caption>` element for a theme list — '' when empty. */
const themeCaption = (themes) =>
  themes.length
    ? `\n      <image:caption>${escXml(titleOf(themes.join(' — '), 500))}</image:caption>`
    : ''

/** `<video:tag>` elements for a theme list — Google accepts ≤32 tags. */
const videoThemeTags = (themes) =>
  themes
    .slice(0, 32)
    .map((t) => `\n      <video:tag>${escXml(titleOf(t, 255))}</video:tag>`)
    .join('')

async function run() {
  const base = 'https://luiskr.com'
  const META_DIR = 'website/public/meta'

  // Bucket manifest — variant resolution guarantees every emitted media
  // URL exists; on failure the historic suffix convention is emitted.
  const cachedManifest = loadMediaManifest(META_DIR)
  const remoteManifest = process.env.LK_OFFLINE === '1' ? null : await fetchMediaManifest()
  const manifest = remoteManifest || cachedManifest

  if (manifest) {
    if (remoteManifest) persistMediaManifest(META_DIR, remoteManifest)

    console.log(`Media manifest: ${manifest.size} ${remoteManifest ? 'bucket' : 'cached'} objects`)
  } else {
    console.error('Media manifest listing failed — emitting suffix-convention URLs')
  }

  // urlSet holds the whole crawl surface (all locales); sharedTags holds
  // path → media-tag XML so every sitemap variant of a URL carries its
  // assets.
  const urlSet = new Set()
  const mediaTags = new Map()

  const tagFor = (u) => {
    const tags = mediaTags.get(u)

    return tags?.length ? `\n${tags.join('\n')}` : ''
  }

  const addTags = (u, tags) => {
    if (!tags.length) return

    mediaTags.set(u, tags)
  }

  // Root + English home-section anchors (about/contact are localized slugs
  // for en too — /about, /contact scroll the home view).
  urlSet.add('/')

  const enSlugs = LANG_SLUGS.en || {}

  for (const key of ['about', 'contact', 'privacy', 'gdpr', 'terms', 'license', 'animations']) {
    if (enSlugs[key]) urlSet.add(`/${enSlugs[key]}`)
  }

  // Earth / Space Playground + Star Field — canonical English segments only;
  // `/space-playground` is a 301 alias and stays unlisted.
  urlSet.add('/earth-playground')
  urlSet.add('/star-field-experiment')

  // Localized routes from LANG_SLUGS — each locale's real slug values.
  // English-segment aliases under a locale (`/br/privacy-policy`,
  // `/br/earth-playground`) 301 to these canonical slugs and stay unlisted.
  for (const lang of VALID_LANGS) {
    if (lang === 'en') continue

    urlSet.add(`/${lang}`)

    const slugs = LANG_SLUGS[lang]

    if (slugs) {
      for (const key of [
        'privacy',
        'gdpr',
        'terms',
        'license',
        'about',
        'contact',
        'earthPlayground',
        'starField',
        'animations',
      ]) {
        if (slugs[key]) urlSet.add(`/${lang}/${slugs[key]}`)
      }
    }
  }

  // Fetch projects data + home portfolio covers in parallel; both fall
  // back to the local database.json snapshot when the remote read fails.
  const [projectsRes, homeRes] =
    process.env.LK_OFFLINE === '1'
      ? [null, null]
      : await Promise.all([
          fetch('https://luiskr-com.firebaseio.com/translations/en/projects.json').catch(
            () => null
          ),
          fetch(
            'https://luiskr-com.firebaseio.com/translations/en/pages/HOME/portfoliolist.json'
          ).catch(() => null),
        ])

  const translations = fs.existsSync('database.json')
    ? JSON.parse(fs.readFileSync('database.json', 'utf-8')).translations || {}
    : {}

  let data = null

  try {
    data = await projectsRes?.json()
  } catch {
    data = null
  }

  if (!data || !Object.keys(data).length) data = translations.en?.projects || {}

  let homeList = null

  try {
    homeList = await homeRes?.json()
  } catch {
    homeList = null
  }

  if (!Array.isArray(homeList) || !homeList.length)
    homeList = translations.en?.pages?.HOME?.portfoliolist || []

  // ── Home cover images ────────────────────────────────────────────────────
  // The mosaic's `<img src>` points at `covers/<image>.jpg`; indexing gets
  // the best available variant (uncompressed pass when it exists on the
  // bucket — the covers themselves are already the raw originals). Labels
  // are localized per sitemap so image titles carry the locale's own text.
  const coverTagsFor = (loc) => {
    const list = loc === 'en' ? homeList : translations[loc]?.pages?.HOME?.portfoliolist || homeList
    const caption = themeCaption(themesOf(translations[loc]?.pages?.HOME))

    const tags = []

    for (const item of list || []) {
      if (!item || !item.image) continue

      const key = resolveCoverKey(item.image, manifest)

      // Bucket keys can carry literal spaces/non-ASCII — loc values must
      // be RFC-3986-encoded or the sitemap URLs are invalid.
      tags.push(
        `    <image:image>\n      <image:loc>${escXml(encLoc(`${CDN_BASE}${key}`))}</image:loc>` +
          `\n      <image:title>${escXml(titleOf(item.label || item.image))}</image:title>${caption}\n    </image:image>`
      )
    }

    return tags
  }

  addTags('/', coverTagsFor('en'))

  for (const lang of VALID_LANGS) {
    if (lang !== 'en') addTags(`/${lang}`, coverTagsFor(lang))
  }

  // ── Earth Playground share captures ──────────────────────────────────
  // Every screenshot under the bucket's share/ prefix is a social-card
  // candidate AND a Google-Images index target: each earth-playground URL
  // (canonical English segment + every localized slug) lists the whole
  // set with locale-localized titles + search-theme captions, so earth-
  // image searches in every language resolve to the portfolio.
  const shareKeys = shareImageKeys(manifest)

  if (shareKeys.length) {
    fs.writeFileSync(
      path.join(META_DIR, EARTH_SHARE.MANIFEST_URL.split('/').pop()),
      `${JSON.stringify(shareManifestDoc(shareImageUrls(manifest, CDN_BASE), CDN_BASE), null, 2)}\n`,
      'utf-8'
    )
  }

  /** Localized <image:image> tags for the whole share set — titles and
   *  captions carry the locale's own earth-image search themes. */
  const epShareTagsFor = (loc) => {
    const page =
      translations[loc]?.pages?.['earth-playground'] ||
      translations.en?.pages?.['earth-playground'] ||
      {}

    const pageTitle = page.title || 'Earth Playground'
    const capture = page.shareCapture || 'Earth render'
    const caption = escXml(
      titleOf(
        [
          pageTitle,
          ...(Array.isArray(page[SEARCH_THEMES_KEY]) ? page[SEARCH_THEMES_KEY] : []),
        ].join(' — '),
        500
      )
    )

    return shareKeys.map(
      (key, i) =>
        `    <image:image>\n      <image:loc>${escXml(encLoc(`${CDN_BASE}${key}`))}</image:loc>` +
        `\n      <image:title>${escXml(titleOf(`${pageTitle} — ${capture} ${i + 1}`))}</image:title>` +
        `\n      <image:caption>${caption}</image:caption>\n    </image:image>`
    )
  }

  if (shareKeys.length) {
    addTags('/earth-playground', epShareTagsFor('en'))

    for (const lang of VALID_LANGS) {
      if (lang === 'en') continue

      const epSlug = LANG_SLUGS[lang]?.earthPlayground

      if (epSlug) addTags(`/${lang}/${epSlug}`, epShareTagsFor(lang))
    }
  }

  // ── Star Field share captures ──────────────────────────────────────
  // Same contract as the earth set: every screenshot under the bucket's
  // star-field share/ prefix is a social-card candidate AND a Google-
  // Images index target — each star-field index URL (canonical English
  // segment + every localized slug) lists the whole set with locale-
  // localized titles + search-theme captions, so star/space searches in
  // every language resolve to the portfolio.
  const starShareKeys = shareImageKeys(manifest, STAR_SHARE)

  if (starShareKeys.length) {
    fs.writeFileSync(
      path.join(META_DIR, STAR_SHARE.MANIFEST_URL.split('/').pop()),
      `${JSON.stringify(shareManifestDoc(shareImageUrls(manifest, CDN_BASE, STAR_SHARE), CDN_BASE, STAR_SHARE), null, 2)}\n`,
      'utf-8'
    )
  }

  /** Localized <image:image> tags for the whole star share set — titles
   *  and captions carry the locale's own star-image search themes. */
  const sfShareTagsFor = (loc) => {
    const page =
      translations[loc]?.pages?.['star-field'] || translations.en?.pages?.['star-field'] || {}

    const pageTitle = page.title || 'Star Field'
    const capture = page.shareCapture || 'Star render'
    const caption = escXml(
      titleOf(
        [
          pageTitle,
          ...(Array.isArray(page[SEARCH_THEMES_KEY]) ? page[SEARCH_THEMES_KEY] : []),
        ].join(' — '),
        500
      )
    )

    return starShareKeys.map(
      (key, i) =>
        `    <image:image>\n      <image:loc>${escXml(encLoc(`${CDN_BASE}${key}`))}</image:loc>` +
        `\n      <image:title>${escXml(titleOf(`${pageTitle} — ${capture} ${i + 1}`))}</image:title>` +
        `\n      <image:caption>${caption}</image:caption>\n    </image:image>`
    )
  }

  if (starShareKeys.length) {
    addTags('/star-field-experiment', sfShareTagsFor('en'))

    for (const lang of VALID_LANGS) {
      if (lang === 'en') continue

      const sfSlug = LANG_SLUGS[lang]?.starField

      if (sfSlug) addTags(`/${lang}/${sfSlug}`, sfShareTagsFor(lang))
    }
  }

  // ── Portfolio routes, media deep links + per-URL media tags ─────────────
  /** XML media tags for one media item — image:image or video:video.
   *  `themes` is the parent page's localized searchThemes list: images
   *  get it as <image:caption>, videos as <video:tag> elements. */
  const mediaTagXml = (folder, m, label, projectTitle, themes = []) => {
    const { source, thumb, isVideo } = resolveMediaUrls(folder, m, manifest)

    if (!source || (isVideo && !thumb)) return []

    const title = escXml(titleOf(label || projectTitle))

    if (isVideo) {
      return [
        `    <video:video>\n      <video:thumbnail_loc>${escXml(encLoc(`${CDN_BASE}${thumb}`))}</video:thumbnail_loc>` +
          `\n      <video:title>${title}</video:title>\n      <video:description>${escXml(
            titleOf(`${projectTitle} — ${label || projectTitle}`, 2048)
          )}</video:description>` +
          `\n      <video:content_loc>${escXml(encLoc(`${CDN_BASE}${source}`))}</video:content_loc>${videoThemeTags(themes)}\n    </video:video>`,
      ]
    }

    return [
      `    <image:image>\n      <image:loc>${escXml(encLoc(`${CDN_BASE}${source}`))}</image:loc>` +
        `\n      <image:title>${title}</image:title>${themeCaption(themes)}\n    </image:image>`,
    ]
  }

  /** Aggregated media tags for a project page — cover + every item,
   * deduped by resolved asset URL. */
  const projectPageTags = (folder, projectData, projectTitle) => {
    const tags = []
    const seenSources = new Set()
    const themes = themesOf(projectData)

    const pushMediaTag = (m, label) => {
      const { source } = resolveMediaUrls(folder, m, manifest)

      if (!source || seenSources.has(source)) return

      seenSources.add(source)
      tags.push(...mediaTagXml(folder, m, label || m?.label, projectTitle, themes))
    }

    if (projectData?.cover) pushMediaTag(projectData.cover)

    for (const m of mediaItemsOf(projectData)) pushMediaTag(m)

    return tags
  }

  const projectSlugs = []

  for (const [projectSlug, projectData] of Object.entries(data || {})) {
    urlSet.add(`/portfolio/${projectSlug}`)
    projectSlugs.push(projectSlug)

    const folder = projectData?.folder || ''
    const projectTitle = projectData?.title || projectSlug

    // Live Firebase may lag the database.json snapshot — fall back to the
    // snapshot's searchThemes so the captions/tags never drop.
    const themes = themesOf(projectData).length
      ? themesOf(projectData)
      : themesOf(translations.en?.projects?.[projectSlug])
    const themed = { ...projectData, [SEARCH_THEMES_KEY]: themes }

    addTags(`/portfolio/${projectSlug}`, projectPageTags(folder, themed, projectTitle))

    // Deep links — every labelled item addressable through the media modal,
    // en + every locale prefix. Each deep link carries its own asset tag.
    for (const { slug: mediaSlug, media: m } of mediaRowsOf(projectData)) {
      const mediaPath = `/portfolio/${projectSlug}/${mediaSlug}`

      urlSet.add(mediaPath)
      addTags(mediaPath, mediaTagXml(folder, m, m.label, projectTitle, themes))
    }
  }

  // Localized portfolio — /<loc>/portfolio/<slug>[/<media>] renders the
  // project view translated; labels (and therefore media slugs and titles)
  // are translated, so the localized slug IS the canonical deep link.
  for (const lang of VALID_LANGS) {
    if (lang === 'en') continue

    for (const projectSlug of projectSlugs) {
      urlSet.add(`/${lang}/portfolio/${projectSlug}`)

      const locProject = translations[lang]?.projects?.[projectSlug]
      const folder = data?.[projectSlug]?.folder || locProject?.folder || ''
      const projectTitle = locProject?.title || data?.[projectSlug]?.title || projectSlug
      const locNode = locProject || data?.[projectSlug]
      const locThemes = themesOf(locNode)

      addTags(
        `/${lang}/portfolio/${projectSlug}`,
        projectPageTags(folder, { ...locNode, [SEARCH_THEMES_KEY]: locThemes }, projectTitle)
      )

      for (const { slug: mediaSlug, media: m } of mediaRowsOf(locNode)) {
        const locMedia = `/${lang}/portfolio/${projectSlug}/${mediaSlug}`

        urlSet.add(locMedia)
        addTags(locMedia, mediaTagXml(folder, m, m.label, projectTitle, locThemes))
      }
    }
  }

  // Star Field catalog deep links — every authored body is addressable at
  // /star-field-experiment/<body> and at the locale's translated
  // /<loc>/<starField>/<body> (the routes are translated — the localized
  // slug IS the canonical for that locale).
  const starBodiesDir = path.join(REPO_ROOT, 'experiments', 'star-field', 'public', 'data', 'en')
  const starBodies = []

  if (fs.existsSync(starBodiesDir)) {
    for (const file of fs.readdirSync(starBodiesDir)) {
      if (file.endsWith('.json')) starBodies.push(file.replace(/\.json$/, ''))
    }
  }

  for (const body of starBodies) {
    urlSet.add(`/star-field-experiment/${body}`)

    for (const lang of VALID_LANGS) {
      if (lang === 'en') continue

      const sf = LANG_SLUGS[lang]?.starField

      if (sf) urlSet.add(`/${lang}/${sf}/${body}`)
    }
  }

  // Docs portal — deliberately EXCLUDED from the crawl surface: the docs
  // tree mirrors generated artifacts (typedoc, coverage reports, source
  // viewers) whose only audience is humans/agents, not search indexes.
  // /docs** carries X-Robots-Tag: noindex in firebase.json, so listing it
  // here would advertise pages we explicitly do not want indexed — a
  // sitemap must only ever name indexable canonical 200 routes.

  const allUrls = Array.from(urlSet).sort()
  console.log('Total unique URLs:', allUrls.length)

  const now = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00'
  const priorityOf = (u) => {
    const segs = u.split('/').filter(Boolean)

    if (u === '/' || (segs.length === 1 && VALID_LANGS.includes(segs[0]))) return '1.0'

    if (EXPERIENCE_SEGMENTS.has(segs[segs.length - 1])) return '0.9'

    if (u.includes('/portfolio/') && segs.length > 3) return '0.6'

    if (segs.length > 2) return '0.7'

    return '0.8'
  }

  /** Emits one `<urlset>` document for `urls`, media tags included. */
  const sitemapDoc = (urls) => {
    const items = urls
      .map(
        (u) =>
          `  <url>\n    <loc>${base}${u === '/' ? '/' : u}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>${priorityOf(u)}</priority>${tagFor(u)}\n  </url>`
      )
      .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${URLSET_XMLNS}>\n${items}\n</urlset>\n`
  }

  /** URLs owned by one locale — `/<loc>` plus its localized routes, portfolio
   * deep links and star-field bodies. */
  const localeUrlsOf = (loc) => {
    const slugs = LANG_SLUGS[loc] || {}
    const own = [`/${loc}`]

    for (const key of [
      'privacy',
      'gdpr',
      'terms',
      'license',
      'about',
      'contact',
      'earthPlayground',
      'starField',
      'animations',
    ]) {
      if (slugs[key]) own.push(`/${loc}/${slugs[key]}`)
    }

    for (const u of allUrls) {
      if (u.startsWith(`/${loc}/`)) own.push(u)
    }

    return [...new Set(own)].sort()
  }

  // ── Per-locale sitemaps + sitemap index ──────────────────────────────────
  // English gets the unprefixed surface (/, /portfolio/*, /docs/* — the docs
  // portal is English-only by design). Every other locale sitemap lists its
  // own /<loc>/… routes PLUS the shared unprefixed surface, so every sitemap
  // discovers ≥ the full English URL count.
  const enUrls = allUrls.filter((u) => u === '/' || !LOCALE_PREFIX_RE.test(u))
  const llmsTemplate = fs.readFileSync(path.join(META_DIR, 'llms.txt'), 'utf-8')

  /** Localized llms.txt — swaps the intro line for the locale's about text. */
  const localizedLlms = (loc) => {
    const raw = translations[loc]?.pages?.about?.col1?.[0]
    const bio = String(raw || '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()

    if (!bio) return llmsTemplate

    return llmsTemplate.replace(/>\s*Luis Krötz is[^\n]*/, `> ${bio}`)
  }

  /** Localized ai-catalog — entry URLs get the /<loc> prefix (docs stay EN). */
  const localizedCatalog = (loc) => {
    const catalog = JSON.parse(fs.readFileSync(path.join(META_DIR, 'ai-catalog.json'), 'utf-8'))

    return {
      ...catalog,
      entries: (catalog.entries || []).map((e) => ({
        ...e,
        url: e.url && !e.url.includes('/docs') ? e.url.replace(base, `${base}/${loc}`) : e.url,
      })),
    }
  }

  /** Emits root or localized crawl policy with its sitemap discovery URL. */
  const robotsDoc = (sitemapUrl) =>
    `User-agent: *\nDisallow: /cms\nDisallow: /admin\nDisallow: /langs/\nDisallow: /docs-content/\nDisallow: /deploy-info/\nDisallow: /meta/\n\nSitemap: ${sitemapUrl}\n`

  fs.writeFileSync(path.join(META_DIR, 'sitemap-en.xml'), sitemapDoc(enUrls), 'utf-8')

  const indexEntries = [
    `  <sitemap>\n    <loc>${base}/sitemap-en.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
  ]

  for (const loc of VALID_LANGS) {
    if (loc === 'en') continue

    const locUrls = [...enUrls, ...localeUrlsOf(loc)].sort()

    fs.writeFileSync(path.join(META_DIR, `sitemap-${loc}.xml`), sitemapDoc(locUrls), 'utf-8')

    indexEntries.push(
      `  <sitemap>\n    <loc>${base}/sitemap-${loc}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
    )

    // Localized agent/agent-readable files — firebase maps /<loc>/x → /meta/<loc>/x.
    const locDir = path.join(META_DIR, loc)

    fs.mkdirSync(locDir, { recursive: true })
    fs.writeFileSync(
      path.join(locDir, 'robots.txt'),
      robotsDoc(`${base}/sitemap-${loc}.xml`),
      'utf-8'
    )
    fs.writeFileSync(
      path.join(locDir, 'urllist.txt'),
      locUrls.map((u) => `${base}${u === '/' ? '/' : u}`).join('\n') + '\n',
      'utf-8'
    )
    fs.writeFileSync(path.join(locDir, 'llms.txt'), localizedLlms(loc), 'utf-8')
    fs.writeFileSync(
      path.join(locDir, 'ai-catalog.json'),
      `${JSON.stringify(localizedCatalog(loc), null, 2)}\n`,
      'utf-8'
    )
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries.join('\n')}\n</sitemapindex>\n`

  fs.writeFileSync(path.join(META_DIR, 'sitemap.xml'), sitemapIndex, 'utf-8')
  fs.writeFileSync(path.join(META_DIR, 'robots.txt'), robotsDoc(`${base}/sitemap.xml`), 'utf-8')
  fs.writeFileSync(
    path.join(META_DIR, 'urllist.txt'),
    allUrls.map((u) => `${base}${u === '/' ? '' : u}`).join('\n') + '\n',
    'utf-8'
  )

  // ── RSS 2.0 + Media RSS feeds — one per locale ──────────────────────────
  // /<loc>/feed.xml (and /feed.xml + /rss.xml for English) give RSS/Atom
  // consumers — readers, aggregators, Bing/Brave feed crawlers — the
  // localized surface with each project's cover attached as media:content.
  const plain = (s) =>
    String(s || '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()

  const firstSectionText = (node) => {
    if (typeof node === 'string') return node

    if (Array.isArray(node)) {
      for (const item of node) {
        const found = firstSectionText(item)

        if (found) return found
      }
    }

    return ''
  }

  /** Localized channel description — the locale's about bio, else en. */
  const bioOf = (loc) =>
    plain(translations[loc]?.pages?.about?.col1?.[0]) ||
    plain(translations.en?.pages?.about?.col1?.[0])

  /** One RSS item with a valid image enclosure or video plus optional poster. */
  const rssItem = ({ title, link, desc, media }) => {
    // Some videos have no bucket-backed poster; omitting it avoids an
    // empty media URL while preserving the source video enclosure.
    const m = media
      ? media.isVideo
        ? `${media.thumb ? `\n    <media:thumbnail url="${escXml(encLoc(media.thumb))}"/>` : ''}` +
          `\n    <media:content url="${escXml(encLoc(media.source))}" medium="video"/>`
        : `\n    <media:content url="${escXml(encLoc(media.source))}" medium="image"/>`
      : ''

    return (
      `  <item>\n    <title>${escXml(title)}</title>\n    <link>${escXml(link)}</link>` +
      `\n    <guid>${escXml(link)}</guid>` +
      `\n    <description>${escXml(titleOf(desc, 500))}</description>${m}\n  </item>`
    )
  }

  /** Full RSS 2.0 document for one locale — pages first, then every
   *  project with its cover media. */
  const rssDoc = (loc) => {
    const prefix = loc === 'en' ? '' : `/${loc}`
    const feedUrl = `${base}${prefix}/feed.xml`
    const slugs = LANG_SLUGS[loc] || LANG_SLUGS.en || {}
    const tr = translations[loc] || translations.en || {}
    const legal = tr.components?.['legal-footer']?.links || []
    const bio = bioOf(loc)
    const desc = (v) => plain(v) || bio

    const items = [
      rssItem({
        title: 'Luis Krötz — Portfolio',
        link: `${base}${prefix}/`,
        desc: bio,
      }),
    ]

    // Localized content pages — same title sources build-locale-pages uses.
    /** First authored paragraph of a legal page — falls back to its title. */
    const legalDesc = (key) =>
      tr.pages?.[key]?.sections?.[0]?.content?.[0] || tr.pages?.[key]?.title

    const pageItems = [
      [slugs.about, tr.APP?.about?.description, bio],
      [slugs.contact, tr.APP?.contact, tr.components?.contact?.title],
      [slugs.privacy, legal?.[1]?.page, legalDesc('privacy-policy')],
      [slugs.gdpr, legal?.[2]?.page, legalDesc('GDPR')],
      [slugs.terms, legal?.[3]?.page, legalDesc('terms-of-use')],
      [slugs.license, tr.pages?.license?.title, legalDesc('license')],
      [slugs.animations, tr.pages?.animations?.title, tr.pages?.animations?.description],
      [slugs.earthPlayground, tr.APP?.earthPlayground, tr.pages?.['earth-playground']?.description],
      [slugs.starField, tr.APP?.starField, tr.pages?.['star-field']?.overview],
    ]

    for (const [seg, name, d] of pageItems) {
      if (!seg) continue

      items.push(rssItem({ title: name || seg, link: `${base}${prefix}/${seg}`, desc: desc(d) }))
    }

    // Projects — localized title + first text paragraph + cover media.
    for (const projectSlug of projectSlugs) {
      const locProject = tr.projects?.[projectSlug] || translations.en?.projects?.[projectSlug]
      const title = locProject?.title || data?.[projectSlug]?.title || projectSlug
      const folder = data?.[projectSlug]?.folder || locProject?.folder || ''

      let media = null

      if (locProject?.cover || data?.[projectSlug]?.cover) {
        const { source, thumb, isVideo } = resolveMediaUrls(
          folder,
          locProject?.cover || data?.[projectSlug]?.cover,
          manifest
        )

        if (source)
          media = { source: `${CDN_BASE}${source}`, thumb: thumb && `${CDN_BASE}${thumb}`, isVideo }
      }

      items.push(
        rssItem({
          title,
          link: `${base}${prefix}/portfolio/${projectSlug}`,
          desc: desc(
            firstSectionText(locProject?.sections) ||
              firstSectionText(data?.[projectSlug]?.sections)
          ),
          media,
        })
      )
    }

    const lastBuild = new Date().toUTCString()

    return (
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n` +
      `<channel>\n  <title>Luis Krötz</title>\n  <link>${base}${prefix}/</link>` +
      `\n  <atom:link href="${escXml(feedUrl)}" rel="self" type="application/rss+xml"/>` +
      `\n  <description>${escXml(bio)}</description>\n  <language>${LOCALE_TAGS[loc]?.bcp || loc}</language>` +
      `\n  <lastBuildDate>${lastBuild}</lastBuildDate>` +
      `\n  <image><url>${base}/assets/icons/share.png</url><title>Luis Krötz</title><link>${base}${prefix}/</link></image>` +
      `\n${items.join('\n')}\n</channel>\n</rss>\n`
    )
  }

  fs.writeFileSync(path.join(META_DIR, 'feed.xml'), rssDoc('en'), 'utf-8')

  for (const loc of VALID_LANGS) {
    if (loc === 'en') continue

    fs.writeFileSync(path.join(META_DIR, loc, 'feed.xml'), rssDoc(loc), 'utf-8')
  }

  console.log(
    `Generated sitemap index + ${VALID_LANGS.length} locale sitemaps and localized meta files under ${META_DIR}/`
  )
}

run()
