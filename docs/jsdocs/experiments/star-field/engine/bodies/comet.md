# `experiments/star-field/engine/bodies/comet.ts`

Comet builder — a `SF_KINDS.COMET` body is a dark

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/comet.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_USER_GAS_TILT`

userData key stashing a gas plane's fixed z-tilt — updateFx reads it
to un-rotate the camera vector back into the frame where the streak
axis is local +x before solving the cylindrical-billboard roll.

### `TAIL_W`

Tail gradient canvas — long narrow streak, alpha fades along +x.

### `gasFor`

Paints the streaming-gas layer texture: a horizontally TILEABLE
filament field (`wrapS = RepeatWrapping`) so updateFx can roll
`map.offset.x` and the gas visibly streams anti-sunward like plasma
riding the solar wind. The tail silhouette is NOT painted here —
it lives in the plane's vertex colors (scroll-invariant), so this
texture must stay seamless: every wisp follows
`y(x) = mid + sin(2π·cycles·x/W + φ)·amp` with an INTEGER cycle
count, so the path's phase at the left edge equals the right edge;
knot clumps are each drawn at `x ± W` to wrap blobs that straddle
the seam.

- `@param` THREE The three.js module.
- `@param` seed Deterministic RNG stream (seeded per tail so the ion and
- `@returns` A tileable CanvasTexture, or undefined without a 2d context.

### `for`

Filaments — thin sinuous rays running the tail's length. Integer
`cycles` keeps the sine periodic across the canvas width (the wrap
seam is invisible); each streak's alpha jitters so the sheet reads
as braided streamers, not one uniform smear.

### `for`

Knots — denser gas clumps the outgassing vents throw, biased toward
the root (real comae are thickest at the nucleus). Painted at
both `x` and `x ± W` so a blob crossing the wrap seam shows its
continuation on the far edge.

### `tailFor`

Paints the shared tail sprite texture: a horizontal gradient that is
brightest at the left edge (the end rooted at the nucleus) and fades
smoothly to nothing on the right (the tip dissolving into space),
with a vertical cosine falloff so the streak is a soft spindle, not
a hard-edged ribbon. White-only — the SpriteMaterial `color` supplies
the ion/dust tint so one texture serves both tails.

- `@param` THREE The three.js module.
- `@returns` A CanvasTexture, or undefined without a 2d context.

### `makeComet`

Builds the comet composite: an irregular, nearly-black nucleus (the
real Halley albedo is ~0.04 — one of the darkest known bodies), a
soft additive coma sprite hugging it, and the ion + dust tail
sprites. The nucleus mesh becomes the node's `mesh`/`spinner` so it
tumbles normally; coma rides inside it (a symmetric billboard is
indifferent to spin); the tails mount on `center` where local +x is
permanently anti-sunward.

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `radius` sizes the nucleus; `ecc`/`orbit`
- `@param` texMap Loaded texture map (a comet with a real nucleus map
- `@param` glowTex Shared radial-glow texture for the coma sprite.
- `@returns` `{ mesh, coma, ion, dust, ionGas, dustGas }` — the pickable

### `tailSprite`

One tail sprite — camera-facing, so the streak reads from every
angle. Its center sits at `len/2` along +x so the texture's bright
root edge lands on the nucleus and the fade runs anti-sunward.
`tilt` swings the sprite's origin off the ecliptic plane so the
dust fan visibly lags the ion streak.

### `gasPlane`

Gas layer — a highly tessellated PLANE that updateFx rolls around
the tail axis to face the camera (a cylindrical billboard): unlike
a camera-facing sprite it has true spatial extent (it is a real
streak of gas sitting in the scene, not a postcard), and unlike a
cone it can never expose a polygonal silhouette. The silhouette is
carried by PER-VERTEX COLORS, not the texture: `b = ramp(t)·(1−w²)^p`
fades axial position t (0 root → 1 tip) AND transverse offset w
(−1…1), so every quad edge lands at black — which additive
blending renders as fully transparent. Because the envelope is
geometry-side, the seamless filament map can scroll `offset.x`
forever without dragging the fade with it — gas genuinely streams
anti-sunward through a static soft envelope.
