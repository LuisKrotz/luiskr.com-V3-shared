# `core/tokens/routes/aliases.ts`

Legacy project slug aliases — maps old URL slugs to canonical

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/routes/aliases.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MEDIA_SLUG_MAX_LENGTH`

Cap on the media deep-link slug (`/portfolio/<project>/<media>`) so
prerendered dist paths keep wide headroom under the Windows MAX_PATH
(260) bound even inside deep clone prefixes — truncation lands on a
hyphen boundary, never mid-word.
