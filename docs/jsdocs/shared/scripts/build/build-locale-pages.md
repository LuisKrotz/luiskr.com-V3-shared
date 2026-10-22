# `shared\scripts\build\build-locale-pages.mjs`

Emits per-locale, per-route static index.html files into

| | |
|---|---|
| **Source** | `src/shared\scripts\build\build-locale-pages.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

The match below tolerates a legacy .boot-veil emitted inside #app by an
earlier template revision so re-runs normalize older documents back to
the clean article shape.

### `slugify`

Media-slug transform — MUST match generate-sitemap.js's slugify byte for
byte: emitted /portfolio/<slug>/<media> file names have to line up with
the URLs the sitemap already lists (diacritics fold to ASCII).

### `capSlug`

Caps a media deep-link slug at MEDIA_SLUG_MAX_LENGTH so
prerendered dist paths stay under Windows MAX_PATH — the cut drops the
trailing partial word (and a dangling hyphen) so the slug always ends
on a hyphen boundary. Byte-identical to the cap in mediaSlugSeq
(core/utils/string.ts) so emitted file names, sitemap <loc>s and the
runtime resolver agree.

### `esc`

Escape a string for use inside an HTML attribute or text node.

### `enc`

Percent-encodes a URL for markup/JSON-LD emission — bucket keys can
carry literal spaces ('brazilian leather/…', '…PARIS FASHION-WEEK…') and
non-ASCII, which break srcset candidate parsing (whitespace-separated
grammar) and RFC-3986-strict contexts (JSON-LD, sitemap locs). Mirrors
core/utils/media.ts encodeMediaUrl — that module uses @core aliases so
this standalone Node path can't import it. decodeURI-first keeps it
idempotent on already-encoded input (encodeURI escapes '%' itself).

### `dec`

Reverses enc() for manifest-key lookups — bucket keys are stored raw,
so a '%XX'-encoded URL must decode before `manifest.has`. Malformed
escapes (a '%' not followed by two hex digits) make decodeURI throw, so
those short-circuit to the raw form.

### `toDescription`

Strips markup from a translated rich-text string and compacts it into a
meta-description-sized plain-text snippet (≤160 chars, cut at a word
boundary). &nbsp; entities decode to regular spaces so the tag can sit
in a content attribute.

### `breadcrumbEntity`

Ordered crumbs → BreadcrumbList entity (positions are 1-based per spec).

### `videoEntity`

VideoObject for one media descriptor — mp4 contentUrl + poster thumb.

### (module scope)

Recursively yields every sections node that carries a `src`.

### `writeCompressed`

Brotli + gzip siblings next to each emitted index.html (Firebase serves
them). The plain file lands synchronously; the compressed siblings go
through the shared queue so the emit loop never blocks on a ~30-60ms
brotli-11 pass per page — drainCompressedWrites() runs them across the
libuv threadpool at the end of the fan-out.

### `localize`

Rewrites the English shell into a localized document.
- `@param` {string} html - post-loader dist/index.html source
- `@param` {object} o
- `@param` {string} o.bcpLang - BCP-47 tag for <html lang> + og:locale alt
- `@param` {string} o.ogLocale - og:locale value (xx_YY)
- `@param` {string} o.title - document + social title
- `@param` {string} o.description - meta description text
- `@param` {string} o.url - this page's absolute URL
- `@param` {string} [o.canonicalUrl] - canonical/og:url override for alias pages
- `@param` {Array<{bcp:string,url:string}>} o.alternates - hreflang rows
- `@param` {string} [o.image] - route-specific share image (project cover /
- `@param` {Array<object>} [o.entities] - extra JSON-LD entities appended to
- `@param` {string} [o.content] - prerendered body markup injected into
- `@param` {{title:string,msg:string}} [o.loader] - per-locale APP.loader copy

### `starMediaDims`

Star-field dossier image dims cache — image URL → ` width="W" height="H"`
attribute fragment, seeded by `prefetchStarMediaDims` (dossier JSONs store
no intrinsic size, so each unique CDN image is probed once via a small
range request and shared across all 15 locales).

### `DIMS_PROBE_BYTES`

Bytes fetched per image-dims probe — SOF/IHDR headers live in the head.

### `dimsAttr`

` width="W" height="H"` attribute fragment for emitted media — every
lazy <img>/<video> must carry explicit dims or Lighthouse flags the
bare tag and the pre-load box collapses to 0x0 (CLS). Missing source
metadata falls back to the runtime's own GENERIC_DIMENSIONS defaults
(the same 800×450 attr box <media-figure> declares when `size` is absent).
- `@param` {number} [w] - intrinsic width when known
- `@param` {number} [h] - intrinsic height when known

### `scanImageDims`

Scans an image header for intrinsic dims — PNG IHDR (8-byte signature)
or JPEG SOFn marker walk (FFD8 + length-prefixed segments; SOF markers
are C0–CF except DHT/DAC/RST: C4, C8, CC). Returns [w, h] or null.
- `@param` {Buffer} buf - head bytes of the image

### `liveTranslations`

Live `translations` node pulled from the RTDB by prefetchTranslations().
When set, buildLocalePages emits current per-locale CMS text instead of
the committed database.json snapshot (which lags behind content edits —
the exact gap that made localized pages render English/fallback text).

### (module scope)

Fetches the live `translations` node once per build so every prerendered
page carries the per-locale text authors actually published. Offline or
unreachable host → warn and keep the database.json snapshot as the source.

### (module scope)

Probes every unique star-field dossier image once (64 KB range request
each) so emitted <img> tags carry real width/height attrs — the
lazy-media CLS budget flagged the bare imgs. Failures are silent:
a missing probe falls back to the GENERIC_DIMENSIONS default box.

### (module scope)

Generates all localized pages under `distDir`. When `template` is omitted
the post-loader dist/index.html is read from disk; when provided (the
build orchestrator's in-memory copy) the localized root document is
returned so the caller can run its own compress/SW-stamp pass.
- `@param` {string} distDir - absolute dist path
- `@param` {string} [template] - shell HTML; defaults to dist/index.html on disk
- `@returns` {{html: string, written: number, locales: number}} localized root html + counts

### `t`

Per-locale lookup with English fallback (mirrors runtime appText).

### `loaderCopyFor`

Per-locale APP.loader copy for the statically-emitted intro-loader
 veil — title + first stage line (mirrors runtime loaderCopy).

### `firstPara`

Recursively finds the first paragraph string inside a nested sections payload.

### `projectEntities`

Full rich-media graph for one project page — Article + media
ItemList (entries deep-link to the emitted /portfolio/<p>/<media>
URLs; the SPA serves every labelled media slug) + one VideoObject
per video. Mirrors runtime generateProjectSchema.

### `projectImageOf`

Cover share-image for a project — uncompressed jpg or video poster.

### `homeEntities`

Carousel ItemList for locale home pages — portfolio tiles → covers.

### `richParagraphs`

Authored rich-text array → <p> markup (trusted CMS html).

### `leafParagraphs`

Every authored leaf string under a CMS node → <p> markup (trusted CMS
html). Experience pages carry their copy as UI labels rather than a
single description field — walking the whole object guarantees none of
the authored text is left JavaScript-only. `skip` drops keys already
rendered as headings.

### `contactBlock`

Contact block — channel links + legal links from components.contact.

### `mediaFigure`

One media item as crawlable markup — the figure's <img> carries the
best-quality source itself (uncompressed pass preferred) so crawlers
and no-JS viewers index the full-resolution asset, not the thumb;
the caption links to the same source as a first-class crawl target.
`deepHref` wraps the media in the /portfolio/<p>/<media> deep link.

### `cardTile`

One portfolio card as crawlable markup — cover figure, title, and
 the description the app reveals on hover/expand. Reader mode and
 crawlers cannot trigger the hover, so the desc is emitted inline.

### `relatedContent`

Related-projects footer — the crawlable mirror of the app's
<portfolio-related> strip. Mirrors related/match.ts: the related
node's {link,page,featured} rows join home.portfoliolist (the
image/description join table) via normalized link/image/label
matching. Card descriptions ride along even though the app only
reveals them on hover — reader mode can't hover, so the content
must already be in the emitted markup.
- `@param` {string} loc - locale code

### `homeContent`

Home page content — about bio + mentions + portfolio mosaic + contact.

### `legalContent`

Legal page content — title + every authored section.

### `projectContent`

Project interna — title, hero cover, all section text + every figure.

### `mediaContent`

Media-modal deep link — the single asset + its caption + project context.

### `experienceContent`

Experience page content — title + every authored label/copy leaf.

### `animationsContent`

Animations-reference hub — title + intro + every animation record's
 alt/longdesc as a definition list. The static mirror of the runtime
 <view-animations> listing: crawlers, AI agents and reader mode read the
 same components.animations records without running JavaScript.

### `readStarBody`

Star-field body dossier JSON — locale file with English fallback.

### `starBodyContent`

Star-field body page — dossier text, facts table, credited media.

### `starIndexContent`

Star-field index — description + the full localized body catalog.

### `pageNameFromTitle`

/** Strips the `Luis Krötz | ` prefix / ` | Luis Krötz` suffix for crumb names.

### `mediaRowsOf`

Labelled-media {slug,label,media} rows of a project — mirrors
generate-sitemap's walk and the runtime modal: every labelled item with
a src is addressable through /portfolio/<slug>/<media>.

### `routesFor`

Route table: relative path → title, localized description,
canonical-equivalent alternates path, optional canonical override.
`path` is the emitted file path relative to its base (en → dist/,
others → dist/langs/); en home yields '' — dist/index.html is
already written by the root pass.

### `syncFirebaseRewrites`

Regenerates the `hosting.rewrites` + `hosting.redirects` blocks in
firebase.json. Rewrites keep the public locale URLs (`/br`, `/br/sobre`,
…) serving the pages emitted under `dist/langs/<loc>/…` — destinations
are single files (no glob capture), so the table enumerates every route
the same way `routesFor` does. Redirects 301 every noncanonical alias the
router accepts — legacy project slugs (PROJECT_ALIASES incl. media deep
links), English-segment routes under a locale prefix, `/space-playground`
and `/<loc>/docs` — onto their canonical paths so crawlers consolidate
onto the sitemap surface instead of indexing alias URLs. Preserves every
non-rewrite/non-redirect hosting key and the meta/CMS/SPA-catch-all
entries declared in `STATIC_REWRITES`/`SPA_REWRITES`.

### `META_FILE_REWRITES`

`, `/portfolio/${canonical}/:splat`)

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
public/meta/ keep their root URLs through these entries. Per-locale
sitemap files and localized agent-readable files (robots/urllist/llms/
ai-catalog under /meta/<loc>/) keep their `/<loc>/<file>` URLs.

### `SPA_REWRITES`

CMS + SPA catch-all — always last.
