# `website\components\carousel\custom-carousel\lifecycle.ts`

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\custom-carousel\lifecycle.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.        |

## Members

### `onMounted`

Mount: first render pass, resize binding, fit observer, store sub.
`_markAdjacentLoaded(0)` pre-flags the first neighborhood before the
observer's first callback so slide media starts loading immediately.

### `onUnmounted`

Disconnects the ResizeObserver tracking the host width.

### `onStoreUpdate`

Store change → propagate reduced-motion to both arrows and gate
autoplay on reduced-motion / any open overlay (expand modal, nav
menu, preferences or language dialog). The resume arm requires BOTH
`isActive` (carousel mode, not side-by-side) and `isFullyVisible` —
an overlay closing must not revive a carousel that's offscreen.

### `onDestroy`

Teardown: autoplay clock, WebGL arrows, observers, timers — every async handle released so nothing fires after disconnect.
