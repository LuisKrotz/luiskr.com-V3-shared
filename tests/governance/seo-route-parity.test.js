/**
 * @file seo-route-parity.test.js
 * @description Governance gate for the SEO/discoverability surface — keeps the
 * committed crawl artifacts (sitemap index, per-locale sitemaps, urllist,
 * robots, agent-readable files), firebase rewrites, and the index.html
 * JSON-LD in lockstep with the router's real route surface:
 *
 *  - every locale's canonical slugs (LANG_SLUGS) appear in its sitemap +
 *    firebase rewrites — including earthPlayground and starField;
 *  - the English sitemap lists the full unprefixed surface, docs included —
 *    locale prefixes never leak in (docs are English-only by design);
 *  - no localized sitemap contains /docs routes;
 *  - urllist.txt covers every sitemap <loc>;
 *  - index.html carries exactly one JSON-LD graph with stable entity ids
 *    matching the runtime schema builders.
 */

import { describe, test, expect } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { LANG_SLUGS } from '@core/i18n.js'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'

const META_DIR = path.join(ROOT_DIR, 'website', 'public', 'meta')

/** Absolute site origin every generated artifact is built against. */
const SITE = 'https://luiskr.com'

const NON_EN = Object.keys(LANG_SLUGS).filter((loc) => loc !== 'en')

const read = (p) => fs.readFileSync(p, 'utf-8')

/** Extracts every `<loc>` URL (absolute) from a sitemap document. */
const locsOf = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

describe('SEO route parity', () => {
  const enSitemap = read(path.join(META_DIR, 'sitemap-en.xml'))
  const enLocs = locsOf(enSitemap)
  const urllist = new Set(read(path.join(META_DIR, 'urllist.txt')).split('\n').filter(Boolean))
  const firebase = JSON.parse(read(path.join(ROOT_DIR, 'firebase.json')))
  const rewriteSources = new Set((firebase.hosting?.rewrites || []).map((r) => r.source))

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
      '/docs',
    ]

    for (const route of expected) {
      expect(enLocs).toContain(`${SITE}${route === '/' ? '/' : route}`)
    }
  })

  test('English sitemap keeps the English-only docs portal', () => {
    expect(enLocs.some((u) => u.startsWith(`${SITE}/docs/`))).toBe(true)
  })

  test('English sitemap contains no locale-prefixed URLs', () => {
    const prefixed = enLocs.filter((u) =>
      NON_EN.some((loc) => u.startsWith(`${SITE}/${loc}/`) || u === `${SITE}/${loc}`)
    )

    expect(prefixed).toEqual([])
  })

  test('each localized sitemap lists its canonical + alias routes, never docs', () => {
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
        `/${loc}/earth-playground`,
        `/${loc}/space-playground`,
        `/${loc}/star-field-experiment`,
      ]) {
        expect(locs).toContain(`${SITE}${route}`)
      }

      expect(locs.some((u) => u.includes('/docs'))).toBe(false)
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
    expect(robots).not.toContain('Disallow: /docs')
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
})
