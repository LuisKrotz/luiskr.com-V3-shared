/**
 * @file seo-indexation.test.js
 * @description Governance gate for the indexation contract — the invariants
 * that keep Google's crawl surface consistent end-to-end:
 *
 *  - URL form: canonicals and sitemap <loc>s are slashless, so
 *    firebase.json MUST pin `trailingSlash: false` (directory indexes then
 *    200 at the slashless URL; the slash variant 301s onto it — never the
 *    reverse, which would make every canonical a redirect).
 *  - Public docs pages are indexable; payload/replica surfaces
 *    (/docs-content, /deploy-info, /langs, /llm, /cms, /admin) carry
 *    `X-Robots-Tag: noindex` and stay outside sitemaps.
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
 *  - Every localized CMS page and project carries a non-empty
 *    searchThemes list so prerendered keywords and media metadata stay
 *    grounded in localized content.
 *  - IndexNow: the root key file exists and carries the declared key, and
 *    the hosting `postdeploy` chain re-submits the whole canonical
 *    surface (in both json and param forms) after each deploy makes the
 *    key file live.
 */

import { describe, test, expect } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { LANG_SLUGS } from '@core/i18n.js'
import { CMS_KEYS } from '@core/tokens/data/cms-keys.js'
import { PROJECT_ALIASES } from '@core/tokens/routes/aliases.js'
import { INDEXNOW } from '@core/tokens/indexnow.js'
import { ROUTE_PATHS } from '@core/tokens/routes/paths.js'
import { SCHEMA_STRINGS } from '@core/tokens/strings/schema.js'
import { TYPE_STRINGS } from '@core/tokens/strings/types.js'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'

// Where the prerendered sitemaps/meta live + the canonical origin and the
// non-EN locale slugs sitemap assertions expand over.
const META_DIR = path.join(ROOT_DIR, 'website', 'public', 'meta')
const SITE = 'https://luiskr.com'
const NON_EN = Object.keys(LANG_SLUGS).filter((loc) => loc !== 'en')

// File reader + <loc> extractor — sitemap URLs out of the raw XML.
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

  test('payload and replica surfaces carry X-Robots-Tag: noindex', () => {
    for (const source of [
      '/docs-content/**',
      '/deploy-info/**',
      '/langs/**',
      '/cms/**',
      '/admin/**',
      '/llm',
      '/llm/**',
      '/!(docs)/**/*.md',
      '/*.md',
      '/!(docs)/**/*.json',
      '/*.json',
    ]) {
      expect(headerMap.get(source)?.['X-Robots-Tag'] || '').toContain('noindex')
    }

    expect(headerMap.get('/**/*.md')?.['X-Robots-Tag']).toBeUndefined()
    expect(headerMap.get('/**/*.json')?.['X-Robots-Tag']).toBeUndefined()
    expect(headerMap.get('**/auth.md')).toBeUndefined()
    expect(headerMap.get('/!(docs)/**/auth.md')?.['Content-Type']).toContain('text/markdown')
    expect(headerMap.get(ROUTE_PATHS.DOCS)?.['X-Robots-Tag']).toBeUndefined()
    expect(headerMap.get(`${ROUTE_PATHS.DOCS}/**`)?.['X-Robots-Tag']).toBeUndefined()
  })

  test('robots.txt disallows private payloads but keeps /docs crawlable', () => {
    for (const d of ['/cms', '/admin', '/langs/', '/docs-content/', '/deploy-info/', '/meta/']) {
      expect(robots).toContain(`Disallow: ${d}`)
    }

    // Docs pages are indexable, so crawlers must be able to fetch them.
    // Line-exact checks — /docs-content/ is a payload path that shares the
    // prefix and remains disallowed.
    const lines = robots.split('\n').map((l) => l.trim())

    expect(lines).not.toContain('Disallow: /docs')
    expect(lines).not.toContain('Disallow: /docs/')
  })

  test('all localized page and project nodes have search-theme metadata', () => {
    const database = JSON.parse(read(path.join(ROOT_DIR, 'database.json')))

    for (const locale of Object.keys(LANG_SLUGS)) {
      const translation = database.translations?.[locale]

      expect(translation).toBeDefined()

      for (const nodesByKey of [translation?.pages, translation?.projects]) {
        const nodes = Object.values(nodesByKey || {})

        expect(nodes.length).toBeGreaterThan(0)

        for (const node of nodes) {
          const themes = node?.[CMS_KEYS.SEARCH_THEMES]

          expect(Array.isArray(themes)).toBe(true)
          expect(themes.length).toBeGreaterThan(0)
          expect(themes.every((theme) => typeof theme === TYPE_STRINGS.STRING)).toBe(true)
          expect(themes.every((theme) => theme.trim().length > 0)).toBe(true)
        }
      }
    }
  })

  test('every sitemap <loc> is a final canonical URL', () => {
    const bannedPrefixes = [
      `${SITE}/docs-content`,
      `${SITE}/deploy-info`,
      `${SITE}/langs`,
      `${SITE}/cms`,
      `${SITE}/admin`,
    ]
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
    }

    expect(urls).toContain(`${SITE}${ROUTE_PATHS.DOCS}`)
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
    const docs = read(path.join(ROOT_DIR, 'experiments', 'docs', 'Docs.tsx'))

    // not-found route → noindex through the shared head authority.
    expect(navigate).toContain('setRobotsMeta(to.name === ROUTE_NAMES.NOT_FOUND)')

    // missing project snapshot + unresolved media slug → noindex.
    expect(data).toContain('view.updateRobotsMeta(true)')
    expect(modal).toContain('c.updateRobotsMeta(true)')

    // unresolvable star-field body segment → noindex.
    expect(starfield).toContain('setRobotsMeta(true)')

    // Missing docs paths are soft-404s even though the docs root is indexable.
    expect(docs).toContain('setRobotsMeta(Boolean(docsPath && !this.node))')
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

  test('every route declares its print-optimized alternate in the head', () => {
    const indexHtml = read(path.join(ROOT_DIR, 'index.html'))
    const pageBuilder = read(
      path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'build-locale-pages.mjs')
    )
    const navigate = read(path.join(ROOT_DIR, 'core', 'router', 'navigate.ts'))

    // The shell declares the print form on the canonical URL itself —
    // rel=alternate + media="print" is the head-level signal that the
    // same URL renders an optimized paper representation (lazy rcss
    // print tier + print DOM adapter).
    expect(indexHtml).toMatch(/<link rel="alternate" media="print" href="[^"]+" \/>/)

    // Static localized documents rebind the link to their own canonical.
    expect(pageBuilder).toContain('<link rel="alternate" media="print" href="')

    // Runtime navigations keep it on the active canonical — a stale
    // href would point crawlers at the wrong route's print form.
    expect(navigate).toContain('QUERY_STRINGS.LINK_PRINT')
    expect(navigate).toContain('MEDIA_QUERIES.PRINT')
  })

  test('Google News sitemap exists, is discovered, and stays within the 48h window', () => {
    const index = read(path.join(META_DIR, 'sitemap.xml'))
    const news = read(path.join(META_DIR, 'sitemap-news.xml'))
    const generator = read(path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'generate-sitemap.js'))

    // Discovery — the sitemap index, robots.txt and the firebase rewrite
    // all surface the file so Google News can subscribe to it.
    expect(index).toContain(`${SITE}/sitemap-news.xml`)
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap-news.xml`)

    const newsRewrite = (firebase.hosting?.rewrites || []).find(
      (r) => r.source === '/sitemap-news.xml'
    )

    expect(newsRewrite?.destination).toBe('/meta/sitemap-news.xml')

    // The document speaks the news schema and only lists articles inside
    // the 48-hour window — the generator enforces the window at build
    // time, and only the git-derived date can legitimize an entry.
    expect(news).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')
    expect(generator).toContain('NEWS_WINDOW_MS')
    expect(generator).toContain('news:publication_date')

    // Every listed entry is a canonical portfolio URL in a real language.
    for (const m of news.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      expect(m[1]).toMatch(new RegExp(`^${SITE}(?:/[a-z]{2,3})?/portfolio/[^/]+$`))
    }

    for (const m of news.matchAll(/<news:language>([^<]+)<\/news:language>/g)) {
      expect(m[1].length).toBeGreaterThan(1)
      expect(m[1]).not.toContain('-')
    }
  })

  test('project articles ship verified publication dates on every surface', () => {
    const db = JSON.parse(read(path.join(ROOT_DIR, 'database.json')))
    const schema = read(path.join(ROOT_DIR, 'core', 'utils', 'schema.ts'))
    const pageBuilder = read(
      path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'build-locale-pages.mjs')
    )
    const feed = read(path.join(META_DIR, 'feed.xml'))

    // The git-derived stamp exists on every English project — the
    // verified source the NewsArticle/OG/RSS surfaces read from.
    const projects = db.translations?.en?.projects || {}

    expect(Object.keys(projects).length).toBeGreaterThan(0)

    for (const node of Object.values(projects)) {
      expect(node.date).toBeTruthy()
      expect(() => new Date(node.date)).not.toThrow()
      expect(Number.isNaN(+new Date(node.date))).toBe(false)
    }

    // NewsArticle — the dated type Google News/Discover index off —
    // wired once through the shared token in both emitters, with the
    // stamps gated on the node fields (never invented).
    expect(schema).toContain('SCHEMA_STRINGS.SCHEMA_ARTICLE_TYPE')
    expect(schema).toContain('datePublished')
    expect(schema).toContain('dateModified')
    expect(pageBuilder).toContain('SCHEMA_STRINGS.SCHEMA_ARTICLE_TYPE')
    expect(pageBuilder).toContain('SCHEMA_ARTICLE_PUBLISHED_TIME')

    // Open Graph mirror — both timestamp metas emit when the node is
    // dated, plus a visible <time> matching Google's date-trust guidance.
    expect(pageBuilder).toContain('articleMeta.published')
    expect(pageBuilder).toContain('articleMeta.modified')
    expect(pageBuilder).toContain('<time datetime=')

    // RSS items carry the publication stamp as RFC-822 pubDate.
    expect(feed).toMatch(/<pubDate>[^<]+<\/pubDate>/)
  })

  test('IndexNow key file is hosted and postdeploy submits the whole surface', () => {
    const submitScript = 'submit-indexnow.mjs'

    // The root key file is the protocol's ownership proof — it must ship
    // at /<key>.txt and carry exactly the declared key.
    const keyFile = path.join(ROOT_DIR, 'website', 'public', INDEXNOW.KEY_FILE)

    expect(fs.existsSync(keyFile)).toBe(true)
    expect(read(keyFile).trim()).toBe(INDEXNOW.KEY)
    expect(INDEXNOW.KEY_LOCATION).toBe(`${SITE}/${INDEXNOW.KEY_FILE}`)

    // Submission runs postdeploy — the key file only validates once the
    // new build (and the file itself) is live.
    expect(firebase.hosting?.postdeploy).toContain(submitScript)

    // The submitter reads the canonical inventory and speaks both
    // protocol forms — the JSON urlList body and the per-URL url param.
    const script = read(path.join(ROOT_DIR, 'shared', 'scripts', 'build', submitScript))

    expect(script).toContain('urllist.txt')
    expect(script).toContain('urlList')
    expect(script).toContain('keyLocation')
    expect(script).toContain('INDEXNOW')
  })
})
