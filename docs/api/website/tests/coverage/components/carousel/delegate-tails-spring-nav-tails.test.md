# `website\tests\coverage\components\carousel\delegate-tails-spring-nav-tails.test.js`

Coverage tails for the scroll-spring navigation paths in

|                |                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\carousel\delegate-tails-spring-nav-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                  |

## Members

### `SLIDES`

Three-slide fixture — expandable, video, and no-size entries cover the delegate arms.

### `rect`

DOMRect factory — the scroll/spring math only reads left/top/width/height/right/bottom.

### `mockRaf`

Installs a manual rAF queue; returns a pump that drains `n` frames at `dt` ms each.

### `makeCarousel`

Mounts a <custom-carousel> with stubbed track rects so scroll math runs.

### `makeAwards`

Mounts an <awards-carousel> with the shared SLIDES fixture.

### `cleanup`

Detaches a mounted element — afterEach cleanup for stray mounts.
