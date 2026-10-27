# `website\components\home\about\glitch.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\glitch.ts`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `disarmGlitch`

Stops the loop and removes the overlay.

### `attachGlitch`

Binds the always-on glitch: starts the arm poll immediately (the effect
runs ambient interference as soon as the portrait decodes — no hover
needed) and the delegated hover handlers that only flip the intensity
flag. Listeners live on the shadow root, so they survive _updateDom
re-renders.
