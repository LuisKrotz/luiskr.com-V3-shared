# `experiments\star-field\engine\bodies\comet.ts`

Comet builder — a `SF_KINDS.COMET` body is a dark

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\bodies\comet.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_USER_GAS`

userData key each tail `InstancedMesh` node uses to stash its particle
simulation record: the live position/color `Float32Array`s, the
instance-buffer handles (`aMat` = `instanceMatrix`, `aCol` =
`instanceColor` — so updateFx can flag `needsUpdate`), the seeded
per-grain vectors (emission phase, lateral offset, stream rate,
wobble, size jitter), and the layer's base dimensions (tail length,
root spread, fan growth, grain size, tint, opacity). Storing the
arrays here — rather than reading them back out of buffers — keeps
the frame loop allocation-free AND makes the record inspectable
without a live three.js renderer.

### `tailLayer`

Builds ONE comet-tail particle layer: an `InstancedMesh` of `n`
billboarded glow quads plus the simulation record updateFx animates.
Each grain i cycles `d = frac(phase[i] + t·rate[i])` — d=0 is fresh
emission hugging the nucleus, d=1 is fully dispersed — and updateFx
maps it to `x = d·len` anti-sunward with a lateral offset
`lat[i]·spread·(1+grow·d)` (the tail widens downstream as solar-wind
pressure disperses it) plus a seeded sinusoidal wobble (plasma
turbulence) and a z-offset (real depth — the sheet reads volumetric,
not painted). Per-grain brightness `dim[i]·envelope(d)` rides in the
instance-color channel: the `ramp` smoothstep keeps the root from
popping in as a wall, and the `(1−d)^fade` decay makes every grain
die at its own distance — the aggregate tip is a ragged dissolve,
never a straight line.

Why instanced quads and not `THREE.Points`: under the WebGPU node
pipeline `PointsMaterial.size` is not honored the way WebGL's
`gl_PointSize` is — grains rasterize at a pixel or two regardless of
the requested world size, so a real volumetric tail renders as
confetti. An InstancedMesh of unit quads — one draw call for the
whole cloud, each instance matrix billboarded onto the camera
orientation per frame — keeps real world-space size, the soft glow
texture, and per-grain HDR color on every renderer.

- `@param` THREE The three.js module.
- `@param` rand Seeded RNG stream (per-tail, so ion and dust churn on
- `@param` glowTex Shared radial-glow texture — each grain sprites a soft
- `@param` color Tail tint (ion blue-white / warm dust) as a hex number —
- `@param` len Resting tail length (world units — × nucleus radius).
- `@param` spread Resting half-width at the root; grows by `grow × d`
- `@param` n Grain count.
- `@param` size Grain diameter (world units — the quad's instance scale;
- `@param` opacity Base layer opacity — updateFx multiplies it by the
- `@param` rateLo Per-grain emission-cycle rate range (cycles/scene
- `@param` rateHi Upper bound of that range.
- `@param` tilt Lag angle (rad) — the whole node rotates about z so the
- `@returns` An `InstancedMesh` node carrying `SF_USER_GAS`.

### (module scope)

Pseudo-normal lateral offset — the mean of three uniforms
concentrates density on the spine while still filling a diffuse
sheath, so the column is denser down its axis like a real tail
(a flat [-1,1] draw would smear the brightness evenly).

### `quad`

Unit quad instanced per grain — instance color carries the
grain's brightness (`MeshBasicMaterial` multiplies the map by
`instanceColor`, and additive blending turns dim color into
transparency, so per-grain fade needs no shader). The buffers are
DynamicDraw — updateFx rewrites both every frame.

### (module scope)

`rgb` is the layer tint decomposed to floats — updateFx writes
`col[i] = rgb·env(i,d)` per frame without allocating a `Color`;
`aMat`/`aCol` alias the instance buffers so `needsUpdate` reaches
the GPU side without touching geometry internals.

### `makeComet`

Builds the comet composite: an irregular, nearly-black nucleus (the
real Halley albedo is ~0.04 — one of the darkest known bodies), a
soft additive coma sprite hugging it, and the ion + dust particle
tails. The nucleus mesh becomes the node's `mesh`/`spinner` so it
tumbles normally; coma rides inside it (a symmetric billboard is
indifferent to spin); the tails mount on `center` where local +x is
permanently anti-sunward. Each tail is two particle layers — a tight
bright core stream and a wide dim sheath — so the column reads as a
volume of gas with a dense spine, not a painted band.

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `radius` sizes the nucleus AND every tail
- `@param` texMap Loaded texture map (a comet with a real nucleus map
- `@param` glowTex Shared radial-glow texture — used for the coma sprite
- `@returns` `{ mesh, coma, ion, dust, ionGas, dustGas }` — the pickable

### `ion`

Ion tail — long, narrow, fast-streaming plasma column. Two layers:
the core grains are small/bright (the dense spine) and the sheath
grains are large/dim (the diffuse gas envelope the spine rides in).

### `dust`

Dust tail — shorter, broader, slower: grains retain orbital
momentum so the fan trails the radius vector (the `DUST_TILT` lag)
and disperses wider than the magnetically-locked ion stream.
