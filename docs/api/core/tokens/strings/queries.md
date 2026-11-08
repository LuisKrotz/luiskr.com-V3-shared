# `core\tokens\strings\queries.ts`

Selector/media-query/rootMargin string tokens — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\queries.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SEARCH_QUERY`

`?q=` — the search query parameter (deep links, SearchAction target).

### `META_DESCRIPTION`

Head-sync selectors — the meta tags syncDocumentHead/setMetaDescription rewrite per route.

### `META_OG_IMAGE`

Image-meta selectors — the share-gallery rotation rewrites the card
image trio per navigation. og:image matches only the primary tag:
attribute selectors are exact-match, so og:image:alt/width/height
and repeated extra candidates are never selected.

### `META_OG_TYPE`

og:type — rewritten per route class (website/article/profile/video.other).

### `META_TW_IMAGE_ALT`

twitter:image alt text — mirrors og:image:alt in setMetaDescription.
