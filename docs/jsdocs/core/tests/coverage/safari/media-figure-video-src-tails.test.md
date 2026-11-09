# `core\tests\coverage\safari\media-figure-video-src-tails.test.js`

Coverage tails for safari/patches/media-figure/video.ts —

|                |                                                                       |
| -------------- | --------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\safari\media-figure-video-src-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.             |

## Members

### `makeVid`

Bare <video> with a resolving play() — the src-set path only needs this.

### `mobileViewport`

Runs `fn` with a mobile-width innerWidth, then restores it.
