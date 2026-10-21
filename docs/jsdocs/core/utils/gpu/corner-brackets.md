# `core\utils\gpu\corner-brackets.ts`

| | |
|---|---|
| **Source** | `src/core\utils\gpu\corner-brackets.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Per-surface parameters for `mountCornerBrackets` — the pieces the
button styles differ in.

### `canvasClass`

Overlay canvas class (the `:has()` gate keys on it).

### `insetVar`

CSS var the hover inset resolves from — `calc(100% − var)`.

### `ease`

Cubic-bezier control points of the surface's CSS transition.

### `ms`

Expansion ramp duration (ms) — ANIMATION_DURATIONS.BRACKET* tokens.

### (module scope)

Element whose hover/focus drives the ramp — defaults to `button`.
`.expand-modal-open-1` animates on `.internal-expand:hover &`
(the parent), so callers pass that ancestor here.

### (module scope)

Ancestor selector alternative to `hoverOn` — resolved per button
(`button.closest(...)`) so batch mounts each watch their own parent.

### (module scope)

Kind-specific wasm surface for the corner-brackets crate — typed on
top of the generic WasmWidget so calls stay checked.

### `set_hover`

Eased hover progress 0..1 — arm length + tint lerp.

### `set_arms`

Stub/full arm lengths + hairline half-width (device px).

### `set_colors`

Resting + hover bracket colors (rgba 0-1).

### `bezierEase`

`bezierEase` — evaluate cubic-bezier(x1,y1,x2,y2) at progress `p`.
CSS resolves y at the parameter t where x(t)=p — Newton's method on
the x polynomial, four iterations like the WGSL `bez` (the two must
agree pixel-for-pixel or the GPU arm grows on a different clock than
the CSS one it replaces).
- `@param` p Linear progress 0..1.
- `@param` x1 @param y1 @param x2 @param y2 Control-point coordinates.
- `@returns` Eased progress 0..1.

### `cssLength`

`cssLength` — resolve a CSS length (e.g. `var(--space-xs)`) to px in
the element's style scope: a probe span inherits the same custom
properties, so shadow-DOM-scoped values resolve correctly. Returns 0
when probing is impossible.
- `@param` el Element whose scope the length resolves in.
- `@param` value Any CSS width value.

### `mountCornerBrackets`

Mounts the corner-brackets widget inside `button`. The canvas is a
`position:absolute; inset:0` child — it follows the button's box for
free, so only the backing size + arm lengths need mirroring.
- `@param` button The bracketed button/link element.
- `@param` spec Per-surface parameters (canvas class, hover inset, ease).
- `@returns` Teardown function; safe to call more than once.

### `layout`

Pushes the box-dependent parameters: stub arm = the pseudo-box's
resting size (read off `::before`'s computed style), full arm =
the button's own span minus the surface's inset, hairline = the
pseudo-border's width — all converted to the canvas's device px.

### `colors`

Pushes the resting + hover bracket colors — re-run on every ramp
retarget so `currentColor` borders (which resolve against the
button's transitioning text color) paint the correct hover tint
while `:hover` applies.

### `tick`

One ramp tick — ease the hover scalar toward its target and paint.

### `watched`

Element whose hover/focus state the CSS brackets key on.

### `retarget`

Retargets the ramp — hover/focus state changed on the watched element.

### `mountCornerBracketsAll`

Batch mount — one `mountCornerBrackets` per matching element under
`root` (a component shadow root or any parent). Returns a single
teardown that destroys them all; surfaces that re-render call it
then re-query (the helper tolerates re-mounting on new nodes).
- `@param` root The subtree to query.
- `@param` selector Class selector for the bracketed elements.
- `@param` spec Shared surface parameters.
- `@returns` Teardown for every mounted bracket.
