# `core\tokens\playground\music.ts`

Ambient soundtrack for the Earth Playground — OGG first

| | |
|---|---|
| **Source** | `src/core\tokens\playground\music.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_CDN`

CDN root this module's assets upload under.

### `SP_MUSIC`

Ambient soundtrack for the Earth Playground. Sole declaration site —
consumers import members from this frozen map rather than
re-declaring the literals (zero-hardcoding rule).
