# `website\components\media\figure\mount.ts`

Mount lifecycle for MediaFigure — GPU-layer promotion, store subscription, expand-click binding, hover-to-play video wiring with IntersectionObserver gating, and the img-observer that triggers lazy loadHighRes.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\figure\mount.ts`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `handleVideoError`

Releases the loading shimmer and removes a broken video poster.

- `@param` c Media figure whose loading state changes.
- `@param` event Error event from the video element.
- `@returns` Nothing; the failed poster is removed when present.

### `handleVideoKeydown`

Applies the video's keyboard toggle contract when autoplay is disabled
by preference but the viewer deliberately activates the control.

- `@param` c Media figure that owns the video.
- `@param` vid Video element whose source and playback state change.
- `@param` event Keyboard event from the video control.
- `@returns` Nothing; handled keys update playback and cancel their default.

### `mountMediaFigure`

Mounts media figure.

- `@param` c — the component
