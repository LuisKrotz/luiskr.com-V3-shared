# `website\components\media\expanded\genie-canvas.ts`

2D-canvas backend for the expand-modal genie warp — the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\expanded\genie-canvas.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `GHOST_ALPHA`

Ghost-band alpha for the undecoded-media silhouette (subtle by design).

### `easeInOutCubic`

easeInOutCubic — the row clock for the horizontal pinch. Zero slope
at both ends so the walls ease into the funnel and land softly.

- `@param` t Progress 0..1.
- `@returns` Eased progress 0..1.

### `GenieCanvas2D`

The 2D genie renderer. Owns the ctx, the baked sheet and the strip
scratch buffers; `frame(dt, p)` draws one animation frame and
reports false only when the context is dead.

### (module scope)

The overlay canvas — removed from the shadow on dispose.

### (module scope)

2D context — the caller owns the canvas element + its dpr transform.

### (module scope)

The composited modal sheet — one canvas baked at measure time that
carries the ENTIRE modal surface (dark panel, chrome text, media
figure). `src`/`srcW`/`srcH` are its texture-space dims; a null
sheet paints the soft accent silhouette (the untextured ghost).

### (module scope)

The sheet's texture canvas — the strip sampler's source.

### (module scope)

Texture pixel size — the baked sheet's canvas dims.

### (module scope)

Live restamp slot — the modal's media item. A <video> restamps
every frame (frames move inside the warp); an undecoded <img>
drops itself after its first successful stamp.

### (module scope)

Standby restamp slot — the primed poster Image standing in while
the video decodes; drops after its first stamp.

### (module scope)

Origin rect (CSS px, viewport space).

### (module scope)

Destination rect (CSS px, viewport space).

### (module scope)

True while opening (origin → modal); false on the collapse.

### (module scope)

Ghost-silhouette fill — the rgba() string composed once in the
ctor; a per-frame template string would allocate at 240Hz.

### (module scope)

Dock-flash gradient — the white radial bloom painted at the
figure's center for the last quarter of the run (the reference's
suck punctuation). Built once in the ctor: the figure rect never
moves mid-session, and a per-frame createRadialGradient would
violate the zero-allocation frame budget. Null when the ctx lacks
gradient support — the flash is decorative, never load-bearing.

### (module scope)

Strip-boundary scratch — the field evaluated at each strip edge
(STRIPS+1 boundaries): viewport-space y, left-corner x and
right-corner x. Neighbouring bands share a boundary corner, so the
parallelogram quads stay airtight along the funnel's S-walls;
allocating per frame would violate the zero-allocation frame
budget.

### (module scope)

Per-boundary left-corner x — same scratch discipline as bdY.

### (module scope)

Per-boundary right-corner x — same scratch discipline as bdY.

### (module scope)

The caller-installed ctx transform (the dpr scale) captured as six
scalars — each strip's parallelogram composes under it via
setTransform, then the pass restores it. Read once in the ctor:
a per-frame getTransform() allocates a DOMMatrix at 240Hz.

### (module scope)

Overlay size in CSS px — the dock flash's full-surface stamp.

### (module scope)

Restamp-fit scratch rect — zero-allocation frame discipline.

### `constructor`

Builds the renderer around the composited sheet. The sheet's media
slot re-stamps live sources each frame — the <video> keeps playing
inside the warp and a late decode upgrades the texture mid-flight —
so the funnel never shows a flat ghost rectangle. A null sheet (or
one without a texture) paints the soft accent silhouette.

- `@param` canvas The overlay canvas (device-px sized already).
- `@param` ctx Its 2D context — caller validated non-null.
- `@param` sheet The composited modal sheet from `buildGenieSheet`.
- `@param` from Origin rect in viewport CSS px.
- `@param` to Destination rect in viewport CSS px.
- `@param` opening True on open (from→to), false on close.
- `@param` host Element used to resolve theme CSS vars.

### (module scope)

Re-stamps the sheet's media slot before the strip pass. The media
item leads while it reports pixels (a <video> stamps every frame —
its frames keep playing inside the warp; an <img> drops the slot
after its first stamp since the bitmap is static). The primed
poster fills in while the video is still decoding, then drops.
Nothing allocates: the contain-fit writes into the scratch `fit`
rect and the draw runs inside the figure's saved clip.

### `frame`

`frame` — one animation tick: clear, strip-warp the sheet texture,
stamp the dock flash in the run's last quarter, restore composite
state.

- `@param` _dt Frame delta seconds — unused by the field (progress is
- `@param` p Eased funnel progress 0..1 (0 = modal sheet, 1 = figure funnel).
- `@returns` False when the context is gone (caller force-settles).

### (module scope)

Draws the sheet as STRIPS horizontal bands under the genie field —
the per-row staggered eased lerp the ui-layouts mac-genie
reference implements. The field always warps the MODAL rect (S)
toward the FIGURE rect (D) — on open `S=to`/`D=from`, on close
`S=from`/`D=to`; `p` arrives already flipped (see genie.ts).

Strip math (viewport CSS px — the ctx transform maps to device
px): rows index in "down-space" — ty runs 0 at the sheet's far
edge to 1 at the figure-facing edge — and each row owns two
staggered clocks:
xs = (1−ty)·STAGGER_X xe = easeInOutCubic(clamp((p−xs)/(1−xs)))
ys = (1−ty)·STAGGER_Y ye = easeInQuad( clamp((p−ys)/(1−ys)))
The leading edge's rows start at p=0 while the far edge waits out
its stagger — the funnel's S-walls and the "window flows through
the neck" look emerge from the stagger alone (no sine bow, no
shear term). Each row lands on its proportional row inside the
card rect at p=1 — the canonical point-collapse mouth suits a dock
icon, not a half-viewport card. Rows stay horizontal (y depends
only on ty), so bands tile exactly — the shared boundary corners
keep neighbouring parallelograms airtight through the funnel.

- `@param` p Eased funnel progress 0..1 (0 = modal, 1 = figure).

### `dispose`

Removes the overlay canvas — the sheet ctx dies with the session.
