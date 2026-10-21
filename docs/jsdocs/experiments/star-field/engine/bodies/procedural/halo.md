# `experiments\star-field\engine\bodies\procedural\halo.ts`

Additive star-glow annulus texture — the halo sprite is

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\bodies\procedural\halo.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_HALO_TEX_PX`

Annulus halo recipe — the additive star-glow sprite is centered on
 the disc, so a plain radial gradient piles its brightest ring onto
 the photosphere and saturates the face to white. The annulus stays
 transparent where the ball sits (its half-width is 2/HALO_SCALE of
 the sprite half — identical for every star because the sprite scales
 with the radius) and peaks just past the limb so the glow still
 reads as light escaping into space. The body's own tint is baked
 into the texture — a SpriteMaterial's `color` channel doesn't
 multiply the map under the node pipeline.

### `_HALO_CUT`

Annulus geometry vs HALO_SCALE (3.6): the photosphere occupies
 1/3.6 ≈ 0.28 of the sprite half-extent, so the transparent cut
 ends just inside the limb (0.24) and the glow peaks right AT the
 limb (0.32) — a peak farther out leaves a dark ring gap between
 the ball and its glow that reads as a hollow sphere boundary.

### `_HALO_T1`

Eased tail stops — a linear fade keeps enough alpha near the
 texture rim for the sprite to read as a bounded ball; stepped
 stops approximate the steep physical glow curve (roughly 1/r²)
 so the tail is essentially invisible long before the edge.

### `_POINT_CORE`

Point-glow geometry — a galactic star at honest chart distances is an
 unresolvable point of light, so its halo is a filled radial glow: a
 white-hot core (~diffraction point) that hands off to the star's
 tint and dies through the same eased tail as the annulus.

### `_haloRings`

Memoized annulus textures — one per body id (the tint is baked in).

### `_pointGlows`

Memoized point-glow textures — one per body id.

### `haloFor`

Generates the additive halo sprite texture for a luminous body — a
tinted annulus whose transparent center keeps the photosphere crisp
while the limb bleeds warm light into space.
- `@param` THREE The three.js module.
- `@param` def Star def (color tints the ring, id keys the cache).
- `@returns` Tinted annulus texture, or undefined.

### `pointGlowFor`

Generates the additive halo texture for a point star — a filled
radial glow with a white-hot core and the body's tint in the tail.
Galactic stars never resolve a photosphere at chart distances, so
their whole luminous body is this sprite (no sphere mesh); the
annulus would leave a hollow center with nothing inside it.
- `@param` THREE The three.js module.
- `@param` def Star def (color tints the tail, id keys the cache).
- `@returns` Tinted point-glow texture, or undefined.
