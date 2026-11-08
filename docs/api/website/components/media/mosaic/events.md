# `website\components\media\mosaic\events.ts`

Scoped listener bindings for &lt;media-mosaic&gt; — the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\mosaic\events.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `bindMediaMosaicEvents`

Binds the mosaic's runtime listeners: (1) the ≤1024px media query whose
flips re-render between the carousel and the packed wall (repack forced
on re-entry so a changed width can't reuse stale tile geometry), and
(2) a ResizeObserver on the host that repacks on real width changes —
sub-pixel reports under FIT_EPS_PX are dropped to avoid a re-fit storm.

- `@param` host The MediaMosaic element.
