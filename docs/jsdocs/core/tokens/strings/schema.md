# `core\tokens\strings\schema.ts`

Schema.org / SEO JSON-LD string tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\schema.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SCHEMA_PERSON_ALT_NAME`

Person entity facts — the sole author's knowledge-graph record.

### `SCHEMA_PERSON_KNOWS_ABOUT`

Comma-separated expertise list — split(', ') where the entity wants an array.

### `SCHEMA_OG_WEBSITE`

og:type values per route class.

### `SCHEMA_PROFILE_FIRST_NAME`

profile:* meta values for the about route's og:type=profile card.

### `SCHEMA_ARTICLE_SECTION`

Article.articleSection + article:section for every portfolio page.

### `SCHEMA_ARTICLE_PUBLISHED_TIME`

Open Graph article timestamp metadata keys (used only with verified dates).
