/**
 * @file seo-route-parity.test.js
 * @description Governance gate for the SEO/discoverability surface — keeps the
 * committed crawl artifacts (sitemap index, per-locale sitemaps, urllist,
 * robots, agent-readable files), firebase rewrites, and the index.html
 * JSON-LD in lockstep with the router's real route surface:
 *
 *  - every locale's canonical slugs (LANG_SLUGS) appear in its sitemap +
 *    firebase rewrites — including earthPlayground and starField;
 *  - the English sitemap lists the full unprefixed indexable surface —
 *    the /docs tree is excluded (noindex agent surface, not a crawl
 *    target) and locale prefixes never leak in;
 *  - every localized sitemap carries the shared unprefixed surface plus
 *    its own /<loc>/… routes so each discovers ≥ the English URL count;
 *  - noncanonical aliases (legacy project slugs, /space-playground,
 *    English-segment routes under a locale) never appear in a sitemap —
 *    firebase redirects 301 them onto the canonical paths instead;
 *  - media deep links (/portfolio/<slug>/<media>) exist for every
 *    labelled project media item, in every locale;
 *  - image/video sitemap extensions point at real bucket keys;
 *  - searchThemes captions and localized RSS feeds stay attached to the
 *    canonical content routes without empty Media RSS URLs;
 *  - urllist.txt covers every sitemap <loc>;
 *  - index.html carries exactly one JSON-LD graph with stable entity ids
 *    matching the runtime schema builders.
 */

import { describe, test, expect } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { LANG_SLUGS } from '@core/i18n.js'
import { CMS_KEYS } from '@core/tokens/data/cms-keys.js'
import { PROJECT_ALIASES, MEDIA_SLUG_MAX_LENGTH } from '@core/tokens/routes/aliases.js'
import { READER_CLASSES } from '@core/tokens/classes/reader.js'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'
import { localize } from '../../scripts/build/build-locale-pages.mjs'

const META_DIR = path.join(ROOT_DIR, 'website', 'public', 'meta')

/** Absolute site origin every generated artifact is built against. */
const SITE = 'https://luiskr.com'

/** Minimum discovered-page count every locale sitemap must expose —
 * the en surface shrank to ~690 when the noindex /docs tree left the
 * crawl surface; the floor guards accidental mass-drops, not volume. */
const MIN_SITEMAP_URLS = 500

const NON_EN = Object.keys(LANG_SLUGS).filter((loc) => loc !== 'en')

const read = (p) => fs.readFileSync(p, 'utf-8')

/** Extracts every `<loc>` URL (absolute) from a sitemap document. */
const locsOf = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

/**
 * Russian Cyrillic → Latin transliteration — byte-for-byte the CYRILLIC_SLUG
 * map in core/utils/string.ts so Cyrillic-labelled media keeps a deep link.
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
 * Media-slug transform — byte-for-byte the slugify in generate-sitemap.js /
 * build-locale-pages.mjs so the asserted deep links match the emitted ones.
 */
const slugify = (text) =>
  (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => CYRILLIC_SLUG[ch])
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Media-slug length cap — byte-for-byte the capSlug in generate-sitemap.js /
 * build-locale-pages.mjs (mediaSlugSeq in core/utils/string.ts): cuts at
 * MEDIA_SLUG_MAX_LENGTH then drops the trailing partial word so
 * prerendered paths stay under Windows MAX_PATH.
 */
const capSlug = (base) =>
  base.length > MEDIA_SLUG_MAX_LENGTH
    ? base.slice(0, MEDIA_SLUG_MAX_LENGTH).replace(/-[^-]*$/u, '')
    : base

/** Every {slug,label} media deep link addressable under /<loc>/portfolio/<p>/ —
 * labels (and so slugs) are translated, so each locale yields its own set;
 * project slugs iterate the English table exactly like the generator. */
const mediaDeepLinks = (loc = 'en') => {
  const db = JSON.parse(read(path.join(ROOT_DIR, 'database.json')))
  const out = []
  const enProjects = db.translations?.en?.projects || {}

  for (const slug of Object.keys(enProjects)) {
    const project = db.translations?.[loc]?.projects?.[slug] || enProjects[slug]
    const seen = new Map()

    for (const section of project.sections || []) {
      for (const item of Array.isArray(section) ? section : [section]) {
        for (const m of Array.isArray(item) ? item : [item]) {
          if (m && typeof m === 'object' && m.label && m.src) {
            const base = capSlug(slugify(m.label))

            if (!base) continue

            const ordinal = seen.get(base) ?? 0

            seen.set(base, ordinal + 1)

            const media = ordinal ? `${base}-${ordinal + 1}` : base

            out.push(`/portfolio/${slug}/${media}`)
          }
        }
      }
    }
  }

  return out
}

/** Star-field body ids — the en catalog directory is the canonical list. */
const starBodyIds = () =>
  fs
    .readdirSync(path.join(ROOT_DIR, 'experiments', 'star-field', 'public', 'data', 'en'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))

describe('SEO route parity', () => {
  const enSitemap = read(path.join(META_DIR, 'sitemap-en.xml'))
  const enLocs = locsOf(enSitemap)
  const urllist = new Set(read(path.join(META_DIR, 'urllist.txt')).split('\n').filter(Boolean))
  const firebase = JSON.parse(read(path.join(ROOT_DIR, 'firebase.json')))
  const rewriteSources = new Set((firebase.hosting?.rewrites || []).map((r) => r.source))
  const redirects = firebase.hosting?.redirects || []

  test('English sitemap lists the canonical unprefixed routes', () => {
    const expected = [
      '/',
      `/${LANG_SLUGS.en.about}`,
      `/${LANG_SLUGS.en.contact}`,
      `/${LANG_SLUGS.en.privacy}`,
      `/${LANG_SLUGS.en.gdpr}`,
      `/${LANG_SLUGS.en.terms}`,
      `/${LANG_SLUGS.en.license}`,
      `/${LANG_SLUGS.en.earthPlayground}`,
      `/${LANG_SLUGS.en.starField}`,
    ]

    for (const route of expected) {
      expect(enLocs).toContain(`${SITE}${route === '/' ? '/' : route}`)
    }
  })

  test('English sitemap excludes the noindex docs surface', () => {
    expect(enLocs.some((u) => u === `${SITE}/docs` || u.startsWith(`${SITE}/docs/`))).toBe(false)
  })

  test('English sitemap contains no locale-prefixed URLs', () => {
    const prefixed = enLocs.filter((u) =>
      NON_EN.some((loc) => u.startsWith(`${SITE}/${loc}/`) || u === `${SITE}/${loc}`)
    )

    expect(prefixed).toEqual([])
  })

  test('each localized sitemap lists its canonical routes — aliases stay unlisted', () => {
    for (const loc of NON_EN) {
      const xml = read(path.join(META_DIR, `sitemap-${loc}.xml`))
      const locs = locsOf(xml)
      const slugs = LANG_SLUGS[loc]

      for (const route of [
        `/${loc}`,
        `/${loc}/${slugs.about}`,
        `/${loc}/${slugs.contact}`,
        `/${loc}/${slugs.privacy}`,
        `/${loc}/${slugs.gdpr}`,
        `/${loc}/${slugs.terms}`,
        `/${loc}/${slugs.license}`,
        `/${loc}/${slugs.earthPlayground}`,
        `/${loc}/${slugs.starField}`,
      ]) {
        expect(locs).toContain(`${SITE}${route}`)
      }
    }
  })

  test('each localized sitemap carries the shared surface plus its own routes', () => {
    const enSet = new Set(enLocs)

    for (const loc of NON_EN) {
      const locs = locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))
      const locSet = new Set(locs)

      // Shared unprefixed surface is fully present — every sitemap
      // discovers ≥ the whole English URL count.
      for (const u of enLocs) expect(locSet.has(u)).toBe(true)

      // …plus this locale's own /<loc>/… routes (portfolio + star-field
      // deep links are translated canonical routes).
      expect(locs.some((u) => u.startsWith(`${SITE}/${loc}/portfolio/`))).toBe(true)
      expect(locs.some((u) => u.startsWith(`${SITE}/${loc}/${LANG_SLUGS[loc].starField}/`))).toBe(
        true
      )

      expect(locs.length).toBeGreaterThan(enSet.size)
    }
  })

  test('every locale sitemap discovers at least the full shared surface', () => {
    for (const loc of ['en', ...NON_EN]) {
      const locs = locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))

      expect(locs.length).toBeGreaterThanOrEqual(MIN_SITEMAP_URLS)
    }
  })

  test('every labelled media item has a deep link in every locale sitemap', () => {
    const enLinks = mediaDeepLinks('en')

    expect(enLinks.length).toBeGreaterThan(0)

    const enSet = new Set(enLocs)

    for (const link of enLinks) {
      expect(enSet.has(`${SITE}${link}`)).toBe(true)
    }

    for (const loc of NON_EN) {
      const locSet = new Set(locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`))))
      const links = mediaDeepLinks(loc)

      for (const link of links) {
        expect(locSet.has(`${SITE}/${loc}${link}`)).toBe(true)
      }
    }
  })

  test('every star-field body has a translated route in every locale sitemap', () => {
    const bodies = starBodyIds()

    expect(bodies.length).toBeGreaterThan(0)

    for (const loc of ['en', ...NON_EN]) {
      const locSet = new Set(locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`))))
      const sf = LANG_SLUGS[loc].starField
      const prefix = loc === 'en' ? `/${sf}` : `/${loc}/${sf}`

      for (const body of bodies) {
        expect(locSet.has(`${SITE}${prefix}/${body}`)).toBe(true)
      }
    }
  })

  test('no sitemap advertises a /docs route in any locale', () => {
    for (const loc of ['en', ...NON_EN]) {
      const locs = locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))

      for (const u of locs) {
        expect(u === `${SITE}/docs` || u.startsWith(`${SITE}/docs/`)).toBe(false)
      }
    }
  })

  test('noncanonical aliases never appear in any sitemap', () => {
    const banned = new Set([
      '/space-playground',
      ...Object.keys(PROJECT_ALIASES).map((a) => `/portfolio/${a}`),
    ])

    for (const loc of ['en', ...NON_EN]) {
      const locs = locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))

      for (const u of locs) {
        const pathOnly = u.slice(SITE.length)

        for (const alias of banned) {
          expect(pathOnly === alias || pathOnly.startsWith(`${alias}/`)).toBe(false)
        }

        if (loc !== 'en') {
          // English-segment aliases under a locale prefix are redirects.
          expect(pathOnly).not.toBe(`/${loc}/earth-playground`)
          expect(pathOnly).not.toBe(`/${loc}/space-playground`)
          expect(pathOnly).not.toBe(`/${loc}/star-field-experiment`)
          expect(pathOnly.startsWith(`/${loc}/docs`)).toBe(false)
        }
      }
    }
  })

  test('firebase redirects 301 the alias surface onto canonical routes', () => {
    const dest = Object.fromEntries(redirects.map((r) => [r.source, r.destination]))

    for (const [alias, canonical] of Object.entries(PROJECT_ALIASES)) {
      expect(dest[`/portfolio/${alias}`]).toBe(`/portfolio/${canonical}`)
    }

    expect(dest['/space-playground']).toBe(`/${LANG_SLUGS.en.earthPlayground}`)
    expect(dest['/privacy']).toBe(`/${LANG_SLUGS.en.privacy}`)
    expect(dest['/terms']).toBe(`/${LANG_SLUGS.en.terms}`)

    for (const loc of NON_EN) {
      const slugs = LANG_SLUGS[loc]

      expect(dest[`/${loc}/space-playground`]).toBe(`/${loc}/${slugs.earthPlayground}`)
      expect(dest[`/${loc}/star-field-experiment`]).toBe(`/${loc}/${slugs.starField}`)
      expect(dest[`/${loc}/privacy-policy`]).toBe(`/${loc}/${slugs.privacy}`)
      expect(dest[`/${loc}/terms-of-use`]).toBe(`/${loc}/${slugs.terms}`)
      expect(dest[`/${loc}/docs`]).toBe('/docs')
    }

    for (const r of redirects) expect(r.type).toBe(301)
  })

  test('image/video sitemap extensions index real media at best quality', () => {
    const imageLocs = [...enSitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1])
    const videoTags = enSitemap.match(/<video:video>/g) || []
    const database = JSON.parse(read(path.join(ROOT_DIR, 'database.json')))
    const homeThemes = database.translations.en.pages.HOME[CMS_KEYS.SEARCH_THEMES]

    expect(imageLocs.length).toBeGreaterThan(0)
    expect(videoTags.length).toBeGreaterThan(0)
    expect(enSitemap).toContain(`<image:caption>${homeThemes[0]}`)

    const manifest = JSON.parse(read(path.join(META_DIR, 'media-manifest.json')))
    const keys = new Set(manifest)
    const prefix = 'https://storage.googleapis.com/luiskr.com/public/_v3/'

    // <loc> URLs are RFC-3986-encoded (bucket keys can carry literal
    // spaces) while the manifest stores raw keys — decode before lookup.
    const keyOf = (u) => {
      let k = u.slice(prefix.length)

      if (k.includes('%') && !/%(?![0-9a-fA-F]{2})/.test(k)) k = decodeURI(k)

      return k
    }

    for (const u of imageLocs) {
      expect(keys.has(keyOf(u))).toBe(true)
    }

    for (const m of enSitemap.matchAll(/<video:(?:content_loc|thumbnail_loc)>([^<]+)<\//g)) {
      expect(keys.has(keyOf(m[1]))).toBe(true)
    }
  })

  test('RSS routes serve localized feeds with valid media URLs', () => {
    const feedRewrites = firebase.hosting.rewrites.filter(({ source }) =>
      /(?:feed|rss)\.xml$/.test(source)
    )

    expect(feedRewrites).toHaveLength(Object.keys(LANG_SLUGS).length + 1)

    for (const rule of feedRewrites) {
      const feedFile = path.join(
        ROOT_DIR,
        'website',
        'public',
        ...rule.destination.split('/').slice(1)
      )
      const feed = read(feedFile)
      const canonicalRoute = rule.source.replace(/rss\.xml$/, 'feed.xml')
      const selfLinks = [...feed.matchAll(/<atom:link href="([^"]+)" rel="self"/g)].map(
        (match) => match[1]
      )
      const itemCount = (feed.match(/<item>/g) || []).length

      expect(selfLinks).toHaveLength(1)
      expect(selfLinks[0]).toBe(`${SITE}${canonicalRoute}`)
      expect(itemCount).toBeGreaterThan(0)
      expect(feed).not.toMatch(/(?:media:content|media:thumbnail)\s+url=""/)
    }

    const englishFeed = read(path.join(META_DIR, 'feed.xml'))
    const mediaUrls = [
      ...englishFeed.matchAll(/<(?:media:content|media:thumbnail)\s+url="([^"]+)"/g),
    ].map((match) => match[1])

    expect(mediaUrls.length).toBeGreaterThan(0)
    expect(englishFeed).toMatch(/<media:thumbnail url="[^"]+"\/>/)
    expect(englishFeed).toMatch(/<media:content url="[^"]+" medium="video"\/>/)
    expect(englishFeed).toMatch(/<media:content url="[^"]+" medium="image"\/>/)

    for (const mediaUrl of mediaUrls) {
      expect(() => new URL(mediaUrl)).not.toThrow()
    }
  })

  test('urllist.txt covers every sitemap <loc>', () => {
    for (const loc of ['en', ...NON_EN]) {
      for (const u of locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))) {
        expect(urllist.has(u) || urllist.has(u === `${SITE}/` ? SITE : u)).toBe(true)
      }
    }
  })

  test('firebase rewrites serve every localized canonical + alias route', () => {
    for (const loc of NON_EN) {
      const slugs = LANG_SLUGS[loc]

      for (const source of [
        `/${loc}`,
        `/${loc}/${slugs.earthPlayground}`,
        `/${loc}/${slugs.starField}`,
        `/${loc}/star-field-experiment`,
        `/${loc}/space-playground`,
      ]) {
        expect(rewriteSources.has(source)).toBe(true)
      }

      expect([...rewriteSources].some((s) => s.startsWith(`/${loc}/portfolio/`))).toBe(true)
    }
  })

  test('sitemap generators reference the canonical slug table', () => {
    const sitemapSrc = read(
      path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'generate-sitemap.js')
    )
    const pagesSrc = read(
      path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'build-locale-pages.mjs')
    )

    for (const key of ['starField', 'earthPlayground']) {
      expect(sitemapSrc).toContain(`slugs.${key}`)
      expect(pagesSrc).toContain(`slugs.${key}`)
    }
  })

  test('index.html ships one JSON-LD graph with stable entity ids', () => {
    const html = read(path.join(ROOT_DIR, 'index.html'))
    const scripts = html.match(/<script type="application\/ld\+json"[^>]*>/g) || []

    expect(scripts).toHaveLength(1)
    expect(scripts[0]).toContain(`id="${'jsonld-graph'}"`)
    expect(html).toContain('"@type": "WebSite"')
    expect(html).toContain('https://schema.org')
    expect(html).toContain(`${SITE}#organization`)
    expect(html).toContain(`${SITE}#website`)
    expect(html).not.toContain('"@id": "Page"')
    expect(html).not.toContain('http://schema.org')
  })

  test('index.html in-DOM microdata is scoped', () => {
    const html = read(path.join(ROOT_DIR, 'index.html'))

    expect(html).toMatch(/<html[^>]*itemscope[^>]*itemtype="https:\/\/schema\.org\/WebSite"/)
    expect(html).toContain('itemprop="image"')
  })

  test('robots.txt disallows private surfaces and declares the sitemap index', () => {
    const robots = read(path.join(META_DIR, 'robots.txt'))

    expect(robots).toContain('Disallow: /cms')
    expect(robots).toContain('Disallow: /admin')
    // /docs stays crawlable so its X-Robots-Tag: noindex is seen — a
    // Disallow would hide the header and strand already-indexed URLs.
    // Line-exact: /docs-content/ legitimately shares the prefix.
    const lines = robots.split('\n').map((l) => l.trim())

    expect(lines).not.toContain('Disallow: /docs')
    expect(lines).not.toContain('Disallow: /docs/')
    expect(robots).toContain('Disallow: /docs-content/')
    expect(robots).toContain('Disallow: /langs/')
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })

  test('agent-readable catalog lists experiences and stays parseable', () => {
    const catalog = JSON.parse(read(path.join(META_DIR, 'ai-catalog.json')))
    const urls = (catalog.entries || []).map((e) => e.url)

    expect(urls).toContain(`${SITE}/docs`)
    expect(urls).toContain(`${SITE}/earth-playground`)
    expect(urls).toContain(`${SITE}/star-field-experiment`)

    const llms = read(path.join(META_DIR, 'llms.txt'))

    expect(llms).toContain('/star-field-experiment')
    expect(llms).toContain('/docs')
  })

  test('localize() injects reader content over every prior #app state', () => {
    // A standalone re-run feeds an already-emitted index.html back through
    // localize() — the injection must overwrite whatever the previous emit
    // left inside #app, never skip and leave stale home markup behind.
    const shell = (app) => `<!doctype html>
<html lang="en" class=""><head>
<title>shell</title>
<link rel="canonical" href="${SITE}/">
<meta property="og:url" content="${SITE}/">
<meta name="twitter:url" content="${SITE}/">
<meta name="description" content="d">
<meta property="og:description" content="d">
<meta name="twitter:description" content="d">
<meta name="DC.Description" content="d">
<meta name="DC.Language" content="en-us">
<meta property="og:image:alt" content="d">
<meta property="og:title" content="t"><meta name="twitter:title" content="t">
<meta name="DC.Title" content="t">
<script type="application/ld+json" id="jsonld-graph">{}</script>
</head><body><div id="app">${app}</div></body></html>`

    const args = {
      bcpLang: 'en',
      ogLocale: 'en_US',
      title: 'Privacy Policy',
      description: 'privacy',
      url: `${SITE}/privacy-policy`,
      alternates: [{ bcp: 'en', og: 'en_US', url: `${SITE}/privacy-policy` }],
      content: '<main><h1>Privacy Policy</h1></main>',
    }

    for (const prior of [
      '',
      '<article class="reader-content"><main><h1>Stale</h1></main></article>',
      '<main><h1>Stale</h1></main>',
      '<div class="boot-veil" aria-hidden="true"><span>Luis&nbsp;Krötz</span></div><article class="reader-content"><main><h1>Stale</h1></main></article>',
    ]) {
      const out = localize(shell(prior), args)

      // No lcpThumb → media-less route → the article emits the painted
      // modifier so its own text stays the early LCP candidate.
      expect(out).toContain(
        `<div id="app"><article id="reader-content" class="${READER_CLASSES.CONTENT} ${READER_CLASSES.PAINTED}" role="region" aria-label="Static page copy" aria-hidden="true" inert><div><h1>Privacy Policy</h1></div></article></div>`
      )
      expect(out).not.toContain('boot-veil')
      expect(out).not.toContain('Stale')
    }

    // Content omitted (e.g. non-route emits) must not touch the container.
    const untouched = localize(shell('<article class="reader-content">keep</article>'), {
      ...args,
      content: undefined,
    })

    expect(untouched).toContain('<article class="reader-content">keep</article>')
  })

  test('localize() promotes the parked article’s first figure to the eager LCP fetch', () => {
    // The parked reader article paints under the intro veil — its first
    // figure's <img> is the LCP element, so a lazy attr would defer the
    // fetch past parse. The first figure goes eager + high-priority;
    // later figures stay lazy.
    const shell = `<!doctype html>
<html lang="en"><head><title>s</title>
<link rel="canonical" href="${SITE}/">
<meta property="og:url" content="${SITE}/">
<meta name="twitter:url" content="${SITE}/">
<meta name="description" content="d">
<meta property="og:description" content="d">
<meta name="twitter:description" content="d">
<meta name="DC.Description" content="d">
<meta name="DC.Language" content="en-us">
<meta property="og:image:alt" content="d">
<meta property="og:title" content="t"><meta name="twitter:title" content="t">
<meta name="DC.Title" content="t">
<link rel="modulepreload" href="/x.js">
<script type="application/ld+json" id="jsonld-graph">{}</script>
</head><body><div id="app"></div></body></html>`

    const out = localize(shell, {
      bcpLang: 'en',
      ogLocale: 'en_US',
      title: 'Project',
      description: 'd',
      url: `${SITE}/portfolio/x/`,
      alternates: [{ bcp: 'en', og: 'en_US', url: `${SITE}/portfolio/x/` }],
      content:
        '<main><figure><a href="/x"><picture><img src="https://cdn.test/hero.jpg" alt="" loading="lazy" decoding="async"></picture></a></figure><figure><img src="https://cdn.test/later.jpg" alt="" loading="lazy" decoding="async"></figure></main>',
    })

    // First figure — the LCP candidate — upgraded to an eager,
    // high-priority fetch; the preload link is emitted for it. (No
    // intro veil in this shell → the article stays --painted and owns
    // its own early fetch.)
    expect(out).toContain('loading="eager" fetchpriority="high"')
    expect(out).toContain('<link rel="preload" as="image"')

    // Later figures keep lazy loading — only the LCP candidate upgrades.
    expect(out).toContain('src="https://cdn.test/later.jpg" alt="" loading="lazy"')
  })

  test('localize() skips link-only figures when picking the LCP candidate', () => {
    // Video attachments emit a bare <a>+figcaption figure with no paintable
    // media. The eager promotion + preload must bind the first figure that
    // actually carries an image — otherwise the real LCP img stays lazy and
    // no preload lands (observed on video-first project pages).
    const shell = `<!doctype html>
<html lang="en"><head><title>s</title>
<link rel="canonical" href="${SITE}/">
<meta property="og:url" content="${SITE}/">
<meta name="twitter:url" content="${SITE}/">
<meta name="description" content="d">
<meta property="og:description" content="d">
<meta name="twitter:description" content="d">
<meta name="DC.Description" content="d">
<meta name="DC.Language" content="en-us">
<meta property="og:image:alt" content="d">
<meta property="og:title" content="t"><meta name="twitter:title" content="t">
<meta name="DC.Title" content="t">
<link rel="modulepreload" href="/x.js">
<script type="application/ld+json" id="jsonld-graph">{}</script>
</head><body><div id="app"></div></body></html>`

    const out = localize(shell, {
      bcpLang: 'en',
      ogLocale: 'en_US',
      title: 'Project',
      description: 'd',
      url: `${SITE}/portfolio/x/`,
      alternates: [{ bcp: 'en', og: 'en_US', url: `${SITE}/portfolio/x/` }],
      content:
        '<main><figure><figcaption><a href="https://cdn.test/tour.mp4">tour</a></figcaption></figure><figure><a href="/x"><picture><img src="https://cdn.test/hero.jpg" alt="" loading="lazy" decoding="async"></picture></a></figure></main>',
    })

    // The link-only video figure stays untouched; the second figure — the
    // first with real media — is promoted and preloaded.
    expect(out).toContain(
      'src="https://cdn.test/hero.jpg" alt="" loading="eager" fetchpriority="high"'
    )
    expect(out).toContain('href="https://cdn.test/hero.jpg"')
  })
})
