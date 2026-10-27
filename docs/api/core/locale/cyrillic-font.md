# `core\locale\cyrillic-font.ts`

Cyrillic font plumbing — Russian (`ru`) renders in Fira

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\locale\cyrillic-font.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `FIRA_STYLESHEET`

Google Fonts css2 endpoint — Fira Sans in the weights the site sets.

### `FIRA_LINK_ID`

Marker id so the stylesheet injects at most once per document.

### `syncCyrillicFont`

Syncs the cyrillic font surface to the active locale: on `ru` the
`cyrillic-font` class flips `--font-primary` to Fira Sans and its
stylesheet is appended to <head>; off `ru` the class is removed so
Fira Sans is never requested. `<html lang>` follows the locale's
BCP-47 tag so assistive tech + crawlers see the real document language.

- `@param` lang Active locale code (`en`, `br`, `ru`, …).
