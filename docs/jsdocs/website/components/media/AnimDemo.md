# `website\components\media\AnimDemo.tsx`

&lt;anim-demo&gt; — the live preview stage mounted beside every

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\AnimDemo.tsx`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `AnimDemo`

The <anim-demo> host element — one live preview stage per record.

### `_teardown`

Live driver teardown — widget destroy / mount teardown / loop stop.

### `_mounted`

Mounted flag — set even for teardown-less drivers (pure-CSS stages),
so repeated intersection entries never re-fire a mount.

### `_io`

Viewport-proximity watcher — drivers mount on approach, die on exit.

### `attributeChangedCallback`

`animation` attr swaps re-render the stage and re-mount the matching
driver — the teardown always precedes the swap so the previous id's
loops + contexts die with its stage DOM. Only ANIMATION is observed,
so the callback never fires for any other name.

- `@param` _name Changed attribute (unused — only ANIMATION is observed).
- `@param` _oldVal Previous value (unused).
- `@param` _newVal New value (unused).

### (module scope)

JSX template — the framed stage root plus the id's staged content.

- `@returns` The stage wrapper node.

### (module scope)

Post-mount — resolves + mounts the driver for the attr's id.

### (module scope)

Disconnect — runs the driver's teardown (widgets, GPU, loops).

### `_mountDemo`

Mounts the demo for the current `animation` id — gated on viewport
proximity rather than mounted unconditionally: a page-wide record
list instantiating every driver at once spikes the live WebGL
context count past the browser's ~16 budget, and Chrome force-loses
the excess (widgets flip to is-fallback and stay dead until a
recovery action). Mounting on intersection + tearing down on exit
keeps the simultaneous-context count at a handful — the same
budget discipline webglPool enforces on its registered canvases.
Without IntersectionObserver the mount runs eagerly (old engines).

### `_runMount`

Runs the resolved driver for the id — idempotent against repeated
intersection entries (a still-live mount is not re-run).

- `@param` id The animation id (registry key).
- `@param` stage The stage root element.

### `_stopDriver`

Runs + clears the live driver teardown — idempotent.

### `_destroyDemo`

Disconnects the observer and runs the live teardown — idempotent
(destroy can land before mount finished, or twice across attr swap

- disconnect).
