# Star Field (experiments/star-field)

A WebGPU-first space-exploration scene — the full Solar System plus
notable Milky Way, Local-Group and cosmic-hierarchy objects (111 catalog
bodies) — rendered as an orbiting chart with raycast selection, camera
fly-to, a searchable 139k-record deep-field registry, lazy per-body
dossiers and PNG screenshot download. Route: `/star-field-experiment`
(canonical) plus a localized slug per supported locale; listed in the
hamburger menu.

## Files

| File                                                  | Role                                                                          |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| `StarField.tsx`                                       | Custom element facade — mounts canvas, owns loader/drawer/panel, keydown      |
| `starfield-engine.ts`                                 | `StarFieldEngine` — owns `SFState`, exposes init/select/fly/screenshot        |
| `star/boot.ts`                                        | Component↔engine lifecycle: progress → loader, ready → dismiss                |
| `star/render.tsx`                                     | View JSX — loader overlay, CSS fallback, nav drawer, dossier panel, HUD       |
| `star/i18n.ts`                                        | `pages/star-field` locale node via SWR + English fallback                     |
| `star/dossier.ts`                                     | Lazy dossier JSON load — shared in-flight/resolved cache, EN fallback         |
| `engine/bootstrap.ts`                                 | Lazy three import, TSL dep injection, texture load, scene assembly            |
| `engine/renderer-setup.ts`                            | `webglAllowed()` gate, WebGPU adapter probe, canvas-clone WebGL retry         |
| `engine/scene.ts` · `engine/bodies-scene.ts`          | Scene/camera/skybox/controls · catalog→node graph + material recipes          |
| `engine/scale.ts`                                     | Three-tier distance compression (galactic → Local Group → cosmic)             |
| `engine/catalog.ts`                                   | Body catalog + `gpos`/`nbr` galactic/neighborhood placement helpers           |
| `engine/registry.ts`                                  | 139k deep-field registry — manifest, sharded fetch, record dossiers           |
| `engine/spiral.ts` · `engine/star-cloud.ts`           | Spiral/particle galaxies · real-data 139k-star binary cloud                   |
| `engine/bodies/mask.ts` · `engine/bodies/deep-sky.ts` | Photo edge-feather · nebula sprites + galaxy discs                            |
| `engine/bodies/belt.ts`                               | Asteroid/Kuiper seeded annuli (Kirkwood lanes, puff, albedo jitter)           |
| `engine/bodies/black-hole.ts`                         | Sgr A* composite — horizon, photon ring, TSL disc, swirl, jets, glow          |
| `engine/bodies/structures.ts`                         | Hierarchy shells — fresnel-rim bubbles + member speckle clouds                |
| `engine/materials.ts` · `engine/rand.ts`              | `matParams` option strip · seeded LCG helpers                                 |
| `engine/frame.ts`                                     | RAF tick — orbits/spins/satellites, ring edge-fade, fly, approach             |
| `engine/fly.ts` · `engine/picking.ts`                 | Camera tween · pointer raycast (click-vs-drag threshold)                      |
| `engine/screenshot.ts`                                | `toDataURL` → `toBlob` PNG download                                           |
| `engine/state.ts` · `engine/types.ts`                 | State factory · type-only declarations (`SFState`, `SFBodyDef`, `SFNodeDeps`) |
| `star-field.scss`                                     | View stylesheet (loader, HUD, drawer, panel, fallback, light/dark)            |

## Catalog + dossier data model

`engine/catalog.ts` declares every body once: id, kind, group (`solar`,
`milkyWay`, `nebulae`, `galaxies`, `localGroup`, `hierarchy`), radius,
orbit/parent or fixed position, material recipe (texture key, emissive,
shell, ring, satellites, tilt, `belt`, `structure`, `jets`) and approach
radius. Groups drive the navigator drawer sections.

Placement is astronomically real: `gpos` puts deep-sky bodies on their
true galactic (l, b) direction through `engine/scale.ts`'s three-tier
compression (100 ly/unit → 800 ly/unit → 20k ly/unit, continuous at each
break); `nbr` rides solar-neighborhood stars on a legibility band so
Proxima's 4.2 ly doesn't collapse into the exaggerated solar system.

Display copy lives outside the bundle: `public/data/<locale>/<id>.json`
per body — `{id, name, kind, tagline, facts[], history, source, meta}` —
fetched by `star/dossier.ts` (a) on selection and (b) when `checkApproach`
sees the camera inside `SF_APPROACH.PAD + radius·SCALE`, once per body
per session, with a canonical English fallback per file. Registry ids
(`star-`/`exoplanet-`/`dso-NNNNNN`) skip JSON entirely — `engine/registry.ts`
streams manifest + shards and the panel is synthesized from record fields
with the locale's fact labels. Facts/history are paraphrased from NASA/JPL,
ESA, ESO and IAU publications; each JSON names its source inline.

## Renderer contract

Same gate as the earth playground: `webglAllowed()` first (honours
`?debug=webGLMode:fallback` and real WebGL absence), WebGPU adapter probe,
WebGL retry on a **cloned** canvas after a failed init (a poisoned context
never recovers). Failure at any stage — gate, adapter, init, shader
warmup — resolves `init()` with `failed` so the host swaps in the CSS
starfield surface; a dead canvas is never presented.

The renderer is `WebGPURenderer`: every custom material is a TSL **node
material** (`three/tsl` + `MeshBasicNodeMaterial`) — the fresnel-limb
luminous shader, the structure shell rim and the accretion disc live in
`bodies-scene.ts`/`bodies/structures.ts`/`bodies/black-hole.ts` and are
built from the `SFNodeDeps` bundle injected by `bootstrap.ts`. Classic
GLSL `ShaderMaterial` does not compile under the node pipeline — new
materials must be TSL.

## Loader contract

`star/boot.ts` keeps `SF_LOADER` mounted until `onReady` fires — which
happens on the first real frame **or** on a confirmed failed boot, never
earlier, never never. Progress callbacks (`onProgress(stage, pct)`)
update the same loader contract as the earth playground.

## Lifecycle

`destroy()` marks `s.disposed` first so every async bootstrap
checkpoint bails cleanly; then RAF cancel → pointer/wheel/resize
listener detach → controls dispose → renderer dispose.
`setReducedMotion(true)` pauses the loop in place
(`preserveDrawingBuffer` keeps the last frame); `false` restarts only
when no tick is pending. Per-frame work stays synchronous — no `await`
in `tickStar`.

## Accessibility contract

- Navigator drawer: one semantic `<button>` per catalog body plus a
  registry search input and per-kind "load more" paging — the complete
  keyboard path that canvas picking can't provide.
- Escape precedence: dossier panel first, drawer second.
- `aria-live="polite"` HUD announces hover and selection names.
- Pointer events cover mouse/touch/pen; click-vs-drag threshold keeps
  orbit drags from selecting.
- `prefers-reduced-motion` → single static frame, no RAF loop.

## Translations

`translations/<loc>/pages/star-field` (seeded in `database.json` for all
16 locales): `title`, `systemBoot`, `hint`, `explore`, group headings
(`solar`, `milkyWay`, `nebulae`, `galaxies`, `localGroup`, `hierarchy`),
`screenshot`, `overview`, `loading`, `source`, `catalog`, `records`,
`loadMore`, `searching`, registry fact labels (`magnitude`, `distance`,
`spectralType`, `constellation`, `designation`, `hostStar`, `dsoType`,
`discovery`, `redshift`, `coordinates`, `registry_*`/_about), plus kind
labels (`star`, `planet`, `dwarfPlanet`, `moon`, `blackHole`, `system`,
`nebula`, `galaxy`, `cluster`, `exoplanet`, `dso`, `dwarfGalaxy`,
`structure`, `belt`). `APP.starField` carries the nav label;
`slugs.starField` the localized route; English ships in `FALLBACK_PAGES`
for the pre-fetch window. Body dossier JSONs are per-locale with an
English fallback (source-credited scientific prose).

## Screenshots

`engine/screenshot.ts` re-renders the current frame, then
`canvas.toDataURL()` → anchor download; tainted-canvas path falls back
to `toBlob` + object URL. When both produce nothing, no download is
attempted.

## Tests

`tests/starfield/` — component, render, boot, dossier, i18n and engine
facade suites. `tests/coverage/starfield/{component,engine,star}/` —
tails for the arms the happy-path suites can't reach (mocked
`StarFieldEngine`, mocked `bootstrapStarField`, mocked `catalog`,
tag re-registration, zero-viewport resize, shader-warmup aborts).
Module gate: 100% statements/branches/functions/lines per file.
