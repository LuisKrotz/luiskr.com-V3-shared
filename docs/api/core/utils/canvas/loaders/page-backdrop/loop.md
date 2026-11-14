# `core\utils\canvas\loaders\page-backdrop\loop.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\page-backdrop\loop.ts`     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `start`

Begins rendering: samples the palette (an unparseable surface colour
falls back to CSS), sizes the buffer, stamps the document marker that
pins the CSS glow layers to `none`, and either starts the pooled loop
or — under reduced motion — draws one static dithered frame.
High contrast keeps the flat surface: nothing starts while it is on.

- `@param` host - the backdrop instance to start

### `stop`

Stops the pooled loop and clears the document marker so the CSS glow
layers paint again while the canvas is idle/hidden.

- `@param` host - the backdrop instance to stop

### `handleResize`

Syncs the backing store with the viewport. The canvas is fixed and
fullscreen, so the viewport IS its box — no layout read needed. DPR is
capped (the dither only needs device pixels, not supersampling) and
each axis is capped so a 4K×2 display never allocates a giant buffer.

- `@param` host - the backdrop instance to resize

### `loop`

Pooled rAF callback — re-arms itself and draws one frame. Bails when
the loop was stopped, the context is gone, or the path fell back.

- `@param` host - the backdrop instance ticking

### `renderFrame`

Draws the lobe field. `staticTime` renders one settled pose (reduced
motion); otherwise the field clock advances by the clamped frame
delta so a backgrounded tab resumes without a jump. A theme flip
mid-loop resamples the palette; dirty flags gate the uploads.

- `@param` host - the backdrop instance to draw
- `@param` staticTime - fixed field time for a single static frame
