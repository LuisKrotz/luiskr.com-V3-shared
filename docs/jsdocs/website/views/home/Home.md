# `website\views\home\Home.tsx`

&lt;view-home&gt; — the home page route: the selected-work

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\home\Home.tsx`                       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ViewHome`

The ViewHome — home class.

### `_parallax`

Live scroll-parallax session — see home/parallax.ts.

### `storage`

CDN base URL for project media.

### `hasTouch`

Whether the session is touch-input.

### `processedItems`

Projects list reshaped for the mosaic (see home/data.ts).

### `isFeatured`

Featured detection (item flag or featuredLinks membership).

### `onRouteParamChange`

Same-view navigations re-scroll instead of remounting (see home/scroll.ts).

### (module scope)

Lifecycle: kicks off data loading, subscribes to the store, and
arms the desktop scroll-parallax session.

### (module scope)

Lifecycle: tears down the parallax session when the view leaves.

### (module scope)

Re-pushes data when locale/state changes.

### `loadData`

Loads the three home data sources in parallel via SWR (see home/data.ts).

### `_passDataToChildren`

Distributes loaded translations/items to the mosaic, about and contact children.

### (module scope)

JSX template for the view's shadow DOM.

### (module scope)

Lifecycle: re-syncs children after each re-render, then re-gates
the parallax session so freshly rendered layer nodes re-bind.
