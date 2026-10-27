# `core\tokens\strings\queries.ts`

Selector/media-query/rootMargin string tokens — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\queries.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `META_DESCRIPTION`

Head-sync selectors — the meta tags syncDocumentHead/setMetaDescription rewrite per route.

### `META_OG_IMAGE`

Image-meta selectors — the share-gallery rotation rewrites the card
image trio per navigation. og:image matches only the primary tag:
attribute selectors are exact-match, so og:image:alt/width/height
and repeated extra candidates are never selected.
