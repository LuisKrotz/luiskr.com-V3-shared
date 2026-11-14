# `core\utils\canvas\loaders\page-backdrop-webgl.ts`

Fullscreen WebGL lobe-field backdrop behind every route — a

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\page-backdrop-webgl.ts`    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PageBackdropWebGL`

WebGL page backdrop. Construct once at app boot with the element the
canvas should mount into (the document body); `destroy()` on shell
teardown. Registers with the shared webglPool so GPU pressure can
purge/restore it and user actions retry a fallen-back instance.

### `canvas`

Fullscreen canvas — created by the constructor, parked as the container's first child.

### `container`

Element the canvas mounts into (document.body in production).

### `_frameTick`

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

### `width`

Backing-store size in device pixels.

### `_elapsed`

Field clock in seconds — accumulates clamped frame deltas.

### `_base`

Surface colour (`--bg-primary`) as an RGB float triple.

### `_colors`

Seven field hues, flat RGB — the `u_col` uniform array payload.

### `_key`

Key light — specular RGB + theme gain packed for one `uniform4fv`.

### `_shade`

Counter-shade — ink RGB + theme gain packed for one `uniform4fv`.

### `_gain`

Lobe strength multiplier — light 1, dark ember gain.

### `_paletteDirty`

Upload gates — set by sampleTheme/handleResize, cleared by the draw.

### `_rootObserver`

Watches the root class list for high-contrast flips.

### `_onResize`

Bound passive resize handler — allocated once.

### `constructor`

- `@param` container - element that receives the canvas as its first child

### `_initGL`

Creates the WebGL context + lobe program; falls back to the CSS lobes on failure.

### `_triggerFallback`

Switches to the CSS lobe path — context loss, init failure, bad palette.

### `_releaseGL`

Frees the quad program/buffer and force-loses the context (listener detached first).

### `_sampleTheme`

Samples `--field-*` + `--bg-primary` + specular/ink into the uniform buffers.

- `@returns` true when the surface colour parsed

### `_onRootClass`

Root class flip — high contrast pauses the field (the HC surface is
flat by contract); leaving it resumes. Dark/light flips are caught
per frame by renderFrame, so only the HC edge needs the observer.

### `start`

Starts the field (see page-backdrop/loop.ts).

### `stop`

Stops the loop and clears the document marker.

### `_handleResize`

Syncs the backing store with the viewport.

### `_loop`

Pooled rAF callback — draws the field each frame.

### `_renderFrame`

Draws one frame; a fixed `staticTime` renders one settled pose.

- `@param` staticTime - field time for a static frame

### `purge`

webglPool hook — GPU pressure or an offscreen canvas: tears the GL
resources down and clears the marker so the CSS lobes cover the gap.

### `restore`

webglPool hook — recreates the context + restarts after a purge.

### `destroy`

Releases everything — context, listeners, observer, the canvas itself.
