/**
 * @file seo-indexation.test.js
 * @description Governance gate for the indexation contract — the invariants
 * that keep Google's crawl surface consistent end-to-end:
 *
 *  - URL form: canonicals and sitemap <loc>s are slashless, so
 *    firebase.json MUST pin `trailingSlash: false` (directory indexes then
 *    200 at the slashless URL; the slash variant 301s onto it — never the
 *    reverse, which would make every canonical a redirect).
 *  - Internal/agent surfaces (/docs, /docs-content, /deploy-info, /langs,
 *    /cms, /admin) carry `X-Robots-Tag: noindex` — they are excluded from
 *    every sitemap and from urllist.txt, and robots.txt never Disallows
 *    /docs itself (a Disallow would hide the noindex header from crawlers).
 *  - Every sitemap <loc> is a final canonical URL — no trailing slash
 *    (except the root), no redirect sources, no noindex surface.
 *  - Static emit never turns citation/provenance text into an <a href> —
 *    only http(s) values may be linked (the star-body `source` field is
 *    prose; `meta.refs` are the URLs).
 *  - Unresolvable routes must noindex at runtime: the not-found route,
 *    a missing project snapshot, a media deep-link slug that fails to
 *    resolve in the active locale, and a star-field body segment that
 *    matches no catalog id.
 *  - Indexable routes ship an explicit robots meta with
 *    `max-image-preview:large` + unlimited snippet/video previews — the
 *    opt-in Google/Bing require for large image cards and Discover
 *    previews; the runtime authority re-arms it on every indexable
 *    navigation instead of leaving the meta absent.
 */

import { describe, test, expect } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { LANG_SLUGS } from '@core/i18n.js'
import { PROJECT_ALIASES } from '@core/tokens/routes/aliases.js'
import { SCHEMA_STRINGS } from '@core/tokens/strings/schema.js'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'

const META_DIR = path.join(ROOT_DIR, 'website', 'public', 'meta')
const SITE = 'https://luiskr.com'
const NON_EN = Object.keys(LANG_SLUGS).filter((loc) => loc !== 'en')

const read = (p) => fs.readFileSync(p, 'utf-8')
const locsOf = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

/** Header blocks of firebase.json as source → key/value map. */
const headersBySource = (cfg) => {
  const out = new Map()

  for (const block of cfg.hosting?.headers || []) {
    const kv = {}

    for (const h of block.headers || []) kv[h.key] = h.value

    out.set(block.source, { ...kv, ...(out.get(block.source) || {}) })
  }

  return out
}

describe('SEO indexation contract', () => {
  const firebase = JSON.parse(read(path.join(ROOT_DIR, 'firebase.json')))
  const headerMap = headersBySource(firebase)
  const robots = read(path.join(META_DIR, 'robots.txt'))

  test('hosting pins the slashless canonical form', () => {
    // Directory indexes must 200 at the slashless URL — every emitted
    // canonical and sitemap <loc> is slashless, so the alternative
    // (default: /<dir> 301s to /<dir>/) turns each canonical into a
    // redirect and loops the indexation signal.
    expect(firebase.hosting?.trailingSlash).toBe(false)
  })

  test('internal and agent surfaces carry X-Robots-Tag: noindex', () => {
    for (const source of [
      '/docs',
      '/docs/**',
      '/docs-content/**',
      '/deploy-info/**',
      '/langs/**',
      '/cms/**',
      '/admin/**',
      '/llm',
      '/llm/**',
      '/**/*.md',
      '/**/*.json',
    ]) {
      expect(headerMap.get(source)?.['X-Robots-Tag'] || '').toContain('noindex')
    }
  })

  test('robots.txt disallows private payloads but keeps /docs crawlable', () => {
    for (const d of ['/cms', '/admin', '/langs/', '/docs-content/', '/deploy-info/', '/meta/']) {
      expect(robots).toContain(`Disallow: ${d}`)
    }

    // /docs must stay crawlable: its deindexation rides the X-Robots-Tag
    // header, which a Disallow would hide from the crawler. Line-exact
    // check — /docs-content/ is a legitimate disallow that shares the
    // prefix.
    const lines = robots.split('\n').map((l) => l.trim())

    expect(lines).not.toContain('Disallow: /docs')
    expect(lines).not.toContain('Disallow: /docs/')
  })

  test('every sitemap <loc> is a final canonical URL', () => {
    const bannedPrefixes = [`${SITE}/docs`, `${SITE}/langs`, `${SITE}/cms`, `${SITE}/admin`]
    const aliases = Object.keys(PROJECT_ALIASES).map((a) => `/portfolio/${a}`)

    for (const loc of ['en', ...NON_EN]) {
      const locs = locsOf(read(path.join(META_DIR, `sitemap-${loc}.xml`)))

      for (const u of locs) {
        const p = u.slice(SITE.length)

        // Slashless form — the root is the only URL that ends in '/'.
        expect(p === '/' || !p.endsWith('/')).toBe(true)

        for (const banned of bannedPrefixes) {
          expect(p === banned || p.startsWith(`${banned}/`)).toBe(false)
        }

        for (const alias of aliases) {
          expect(p === alias || p.startsWith(`${alias}/`)).toBe(false)
        }
      }
    }
  })

  test('urllist.txt mirrors the same clean surface', () => {
    const urls = read(path.join(META_DIR, 'urllist.txt')).split('\n').filter(Boolean)

    for (const u of urls) {
      const p = u.slice(SITE.length)

      expect(p === '/' || p === '' || !p.endsWith('/')).toBe(true)
      expect(p === '/docs' || p.startsWith('/docs/')).toBe(false)
    }
  })

  test('static emit never links citation/provenance text as an href', () => {
    const src = read(path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'build-locale-pages.mjs'))

    // `b.source` is prose like "Hatzes et al. (2000) · Hubble astrometry
    // (2019)" — emitting it as <a href> manufactures garbage relative URLs
    // that crawlers chase into soft-404s.
    expect(src).not.toMatch(/href="\$\{esc\(enc\(b\.source\)\)\}"/)

    // meta.refs are the provenance URLs — they may only link when the
    // value is actually http(s).
    expect(src).toContain('/^https?:\\/\\//.test(r)')
  })

  test('unresolvable routes noindex at runtime', () => {
    const navigate = read(path.join(ROOT_DIR, 'core', 'router', 'navigate.ts'))
    const data = read(path.join(ROOT_DIR, 'website', 'views', 'project', 'data.ts'))
    const modal = read(path.join(ROOT_DIR, 'website', 'views', 'project', 'modal.ts'))
    const starfield = read(path.join(ROOT_DIR, 'experiments', 'star-field', 'StarField.tsx'))

    // not-found route → noindex through the shared head authority.
    expect(navigate).toContain('setRobotsMeta(to.name === ROUTE_NAMES.NOT_FOUND)')

    // missing project snapshot + unresolved media slug → noindex.
    expect(data).toContain('view.updateRobotsMeta(true)')
    expect(modal).toContain('c.updateRobotsMeta(true)')

    // unresolvable star-field body segment → noindex.
    expect(starfield).toContain('setRobotsMeta(true)')
  })

  test('indexable pages ship index-rich robots directives', () => {
    const indexHtml = read(path.join(ROOT_DIR, 'index.html'))
    const schema = read(path.join(ROOT_DIR, 'core', 'utils', 'schema.ts'))

    // Large image cards and Discover previews require the explicit
    // max-image-preview:large opt-in — an absent meta only grants
    // standard-size image previews.
    expect(indexHtml).toContain(`content="${SCHEMA_STRINGS.INDEX_RICH_DIRECTIVES}"`)

    // The runtime head authority must re-arm the same directive on
    // indexable routes rather than remove the meta — otherwise every
    // client-side navigation would silently downgrade back to
    // standard-size previews.
    expect(schema).toContain('SCHEMA_STRINGS.INDEX_RICH_DIRECTIVES')
    expect(schema).toContain('SCHEMA_STRINGS.NOINDEX_NOFOLLOW')
  })
})
