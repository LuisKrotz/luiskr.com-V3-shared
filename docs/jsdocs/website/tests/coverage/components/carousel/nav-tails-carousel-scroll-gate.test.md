# `website\tests\coverage\components\carousel\nav-tails-carousel-scroll-gate.test.js`

Coverage tails for the scroll-gate paths: observer entries

|                |                                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\carousel\nav-tails-carousel-scroll-gate.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                 |

## Members

### `SLIDES`

Slide fixture — minimal src/size/label rows the carousel renders.

### `rect`

DOMRect factory — the scroll-gate math only reads the box fields.

### `makeCarousel`

Mounts a <custom-carousel> with stubbed track rects so scroll math runs.

### `cleanup`

Detaches a mounted element — afterEach cleanup for stray mounts.
