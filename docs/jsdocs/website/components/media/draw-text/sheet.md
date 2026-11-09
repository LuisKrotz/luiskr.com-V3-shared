# `website\components\media\draw-text\sheet.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\draw-text\sheet.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `sharedSheet`

Lazily-built shared stylesheet — all draw-text instances adopt the one
compiled sheet instead of re-parsing the SCSS per mount.

### `getSharedSheet`

Gets shared sheet.

- `@returns` CSSStyleSheet | null
