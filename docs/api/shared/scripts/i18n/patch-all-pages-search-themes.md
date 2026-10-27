# `shared\scripts\i18n\patch-all-pages-search-themes.js`

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-all-pages-search-themes.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### (module scope)

Site-wide search-theme vocabulary — extends the share-capture
`searchThemes` convention (patch-*-share-themes.js, which seeded the
earth-playground / star-field lists) to EVERY page node and EVERY
project, in all 16 locales, with terms DERIVED FROM THE CONTENT so
each list describes what the page actually contains (the queries it
should rank for), not a generic boilerplate tail:

- projects → cover/media labels (localized, content-specific
  phrases like "Bill Amberg studio Moore Giles collection"),
  first section text, title + slug words, PROJECT_TAGS proper
  nouns, PROJECT_TAIL + SHARED.
- HOME → portfoliolist labels (localized project names) +
  PAGE_TERMS + SHARED.
- about → mention_items award/press descriptions + PAGE_TERMS.
- contact → components.contact line descriptions + PAGE_TERMS.
- legal → every authored section title (localized) + PAGE_TERMS.
- animations → every components.animations alt sentence (localized
  "how it moves" phrases) + PAGE_TERMS.
- star-field → existing hand-tuned list PRESERVED + localized nav
  labels (solar/milkyWay/nebulae/galaxies/catalog…).
- earth-playground → existing hand-tuned list PRESERVED + localized
  control-group labels (camera/earth/postFx/engine…).

The lists feed <meta name="keywords"> (Yandex/Bing/DuckDuckGo still
read it), the WebPage JSON-LD `keywords` property Google reads,
image:caption sitemap tags and the /llm/ replicas'
`content.searchThemes`.

`pages.contact` is created — it previously didn't exist as a CMS
node (the contact section reads `components.contact`); the sparse
node only carries searchThemes for the /contact route.

Dialect fallbacks mirror the base patch scripts:
hrk → de, cas → es, riv → es, tln → it; gn keeps authored terms.

### `stripHtml`

Strips CMS rich-text markup to plain text — <br>, tags, entities.

### `term`

Trims one candidate to a keyword-length phrase — '' drops it.

### `firstText`

First plain-text string inside a nested sections array.

### `mediaLabels`

Every labelled media descriptor inside project sections (cover first).

### `derivedPageTerms`

Content-derived terms for one page node — what the page actually
contains, in the locale's own words.
