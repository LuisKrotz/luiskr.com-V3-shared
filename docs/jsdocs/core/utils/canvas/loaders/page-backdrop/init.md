# `core\utils\canvas\loaders\page-backdrop\init.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\page-backdrop\init.ts`     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `initGL`

Creates the WebGL context + lobe-field program and resolves its
uniforms; any failure (no canvas, context refused, shader/link error,
throw) routes to `_triggerFallback` so the CSS lobes stay authoritative.

- `@param` host - the backdrop instance to initialise

### `triggerFallback`

Switches to the CSS lobe path — used on context loss, init failure, or
an unparseable palette. Cancels the pending frame, releases every GL
resource, and clears the document marker so `--bg-glow*` paint again.

- `@param` host - the backdrop instance falling back
