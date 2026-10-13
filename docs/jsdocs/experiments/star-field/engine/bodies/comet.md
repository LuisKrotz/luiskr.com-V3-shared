# `experiments/star-field/engine/bodies/comet.ts`

Comet builder — a `SF_KINDS.COMET` body is a dark

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/comet.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `TAIL_W`

Tail gradient canvas — long narrow streak, alpha fades along +x.

### `gasFor`

Paints the streaming-gas layer texture: a horizontally TILEABLE
filament field (`wrapS = RepeatWrapping`) so updateFx can roll
`map.offset.x` and the gas visibly streams anti-sunward like plasma
riding the solar wind. Seamlessness is guaranteed analytically —
every wisp follows `y(x) = mid + sin(2π·cycles·x/W + φ)·amp` with an
INTEGER cycle count, so the path's phase at the left edge equals the
right edge; knot clumps are each drawn twice at `x` and `x − W` to
wrap blobs that straddle the seam. A faint envelope gradient keeps
the layer brightest near the nucleus root without breaking the wrap
(the envelope is applied by the OTHER static tail sprite — this layer
stays uniform so scrolling never smears a ramp).

- `@param` THREE The three.js module.
- `@param` seed Deterministic RNG stream (seeded per tail so the ion and
- `@returns` A tileable CanvasTexture, or undefined without a 2d context.

### `for`

Filaments — thin sinuous rays running the tail's length. Integer
`cycles` keeps the sine periodic across the canvas width (the wrap
seam is invisible); each streak's alpha jitters so the sheet reads
as braided streamers, not one uniform smear.

### `for`

Knots — denser gas clumps the outgassing vents throw. Painted at
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

### `gasLayer`

Gas layers — a second filament sprite over each tail whose texture
wraps horizontally: updateFx streams `map.offset.x` so the gas
visibly flows anti-sunward (the ion wind is the faster, plasma is
field-entrained while dust drifts). Each layer gets its own
CanvasTexture so the scroll offsets don't fight.
