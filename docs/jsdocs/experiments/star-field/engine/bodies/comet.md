# `experiments/star-field/engine/bodies/comet.ts`

Comet builder — a `SF_KINDS.COMET` body is a dark

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/comet.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `TAIL_W`

Tail gradient canvas — long narrow streak, alpha fades along +x.

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
- `@returns` `{ mesh, coma, ion, dust }` — the pickable nucleus group

### `tailSprite`

One tail sprite — camera-facing, so the streak reads from every
angle. Its center sits at `len/2` along +x so the texture's bright
root edge lands on the nucleus and the fade runs anti-sunward.
`tilt` swings the sprite's origin off the ecliptic plane so the
dust fan visibly lags the ion streak.
