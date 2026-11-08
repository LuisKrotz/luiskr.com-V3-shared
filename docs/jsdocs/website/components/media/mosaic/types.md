# `website\components\media\mosaic\types.ts`

Shared shapes for &lt;media-mosaic&gt;: the media item contract

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\mosaic\types.ts`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Style objects emitted per placed tile.

### `tile`

Absolutely-positioned tile shell box (top/left/width/height).

### (module scope)

Structural contract for the fallback <custom-carousel> — the mosaic
calls `configure()` after rendering it on ≤640px viewports, mirroring
the project binder's call exactly (the element is registered by the
importing view, so only the method surface is typed here).
