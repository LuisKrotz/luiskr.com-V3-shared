# `core/tokens/classes/modal.ts`

Generic modal + media expand-modal class tokens — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/classes/modal.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MODAL_CLASSES`

Frozen modal class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `EXPAND_MODAL_CLASSES`

expands modal classes.

### `EXPAND_MODAL_CONTENT_GLASS`

Staged glass — mounts post-paint so the backdrop-blur snapshot never delays the first frame.

### `EXPAND_MODAL_MEDIA_FIGURE_LOADED`

Terminal media state — releases the figure's skeleton shimmer.

### `EXPAND_MODAL_BRACKET_CANVAS`

WebGPU overlay canvas shared by the modal's corner-bracket buttons.

### `EXPAND_MODAL_GENIE_CANVAS`

Fullscreen genie-warp transition overlay — the strip-warp/particle canvas.

### `EXPAND_MODAL_GENIE_VEIL`

Veiled content while the genie overlay runs — hidden paint, layout kept.

### `EXPAND_MODAL_CSS_ZOOM`

Legacy CSS zoom fallback — applied only when the genie cannot run.
