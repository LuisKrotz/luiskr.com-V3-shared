# `core\tokens\playground\textures.ts`

CDN URLs for the Earth Playground texture set — every map

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\playground\textures.ts`                  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_CDN`

CDN root this module's assets upload under.

### `EARTH_TEXTURES`

CDN URLs for the Earth Playground texture set. Sole declaration site —
consumers import members from this frozen map rather than
re-declaring the literals (zero-hardcoding rule).
