# `experiments\earth-playground\space\print.tsx`

Print composition for the Earth playground — on

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\space\print.tsx`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `readoutText`

Reads one live readout's current text — the HUD nodes update on a
rAF loop, so textContent is the freshest value the print can carry.

- `@param` el The cached readout node (or null before first sync).
- `@returns` Trimmed readout text, or '' when unreadable.

### `infoPlate`

Composes the scene's identity sheet — magazine masthead pattern:
name, description standfirst, a compact facts block with the live
camera state at prepare time, and the route QR anchored to the
sheet's bottom-right like every plate's scan code.

- `@param` host The live SpacePlayground.
- `@param` t Merged locale label map.
- `@returns` The plate element (hidden until print media applies).

### `bindSpacePrint`

Binds the playground's print composition — a `printprepare` listener
that seats the info plate. Returns the unbinder for the view's
teardown.

- `@param` host The live SpacePlayground component.
- `@returns` Cleanup that removes the listener.
