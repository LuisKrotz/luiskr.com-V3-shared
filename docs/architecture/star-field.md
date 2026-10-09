# Star Field (experiments/star-field)

A WebGPU-first space-exploration scene — the full Solar System plus
notable Milky Way and Local-Group objects — rendered as an orbiting chart
with raycast selection, camera fly-to, lazy per-body dossiers and PNG
screenshot download. Route: `/star-field-experiment` (canonical) plus a
localized slug per supported locale; listed in the hamburger menu.

## Files

| File                                                        | Role                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `StarField.tsx`                                             | Custom element facade — mounts canvas, owns loader/drawer/panel, keydown |
| `starfield-engine.ts`                                       | `StarFieldEngine` — owns `SFState`, exposes init/select/fly/screenshot   |
| `star/boot.ts`                                              | Component↔engine lifecycle: progress → loader, ready → dismiss           |
| `star/render.tsx`                                           | View JSX — loader overlay, CSS fallback, nav drawer, dossier panel, HUD  |
| `star/i18n.ts`                                              | `pages/star-field` locale node via SWR + English fallback                |
| `star/dossier.ts`                                           | Lazy dossier JSON load — shared in-flight/resolved cache                 |
| `engine/bootstrap.ts`                                       | Lazy three import, texture load, scene assembly, warmup, first tick      |
| `engine/renderer-setup.ts`                                  | `webglAllowed()` gate, WebGPU adapter probe, canvas-clone WebGL retry    |
| `engine/scene.ts` · `engine/bodies-scene.ts`                | Scene/camera/skybox/controls · catalog→node graph + material recipes     |
| `engine/frame.ts`                                           | RAF tick — orbits/spins/satellites, fly tween, approach prefetch         |
| `engine/fly.ts` · `engine/picking.ts`                       | Camera tween · pointer raycast (click-vs-drag threshold)                 |
| `engine/screenshot.ts`                                      | `toDataURL` → `toBlob` PNG download                                      |
| `engine/catalog.ts` · `engine/state.ts` · `engine/types.ts` | Body catalog · state factory · type-only declarations                    |
| `star-field.scss`                                           | View stylesheet (loader, HUD, drawer, panel, fallback)                   |

## Catalog + dossier data model

`engine/catalog.ts` declares every body once: id, kind, group (`solar`,
`milkyWay`, `nebulae`, `galaxies`), radius, orbit/parent or fixed position,
material recipe (texture key, emissive, shell, ring, satellites, tilt) and
approach radius. Groups drive the navigator drawer sections.

Display copy lives outside the bundle: `public/data/<id>.json` per body —
`{id, name, kind, tagline, facts[], history, source}` — fetched by
`star/dossier.ts` (a) on selection and (b) when `checkApproach` sees the
camera inside `SF_APPROACH.PAD + radius·SCALE`, once per body per session.
Both paths share one cache keyed by id, so approach-prefetched dossiers
open instantly. Facts/history are paraphrased from NASA/JPL, ESA, ESO and
IAU publications; each JSON names its source inline.

## Renderer contract

Same gate as the earth playground: `webglAllowed()` first (honours
`?debug=webGLMode:fallback` and real WebGL absence), WebGPU adapter probe,
WebGL retry on a **cloned** canvas after a failed init (a poisoned context
never recovers). Failure at any stage — gate, adapter, init, shader
warmup — resolves `init()` with `failed` so the host swaps in the CSS
starfield surface; a dead canvas is never presented.

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

- Navigator drawer: one semantic `<button>` per catalog body — the
  complete keyboard path that canvas picking can't provide.
- Escape precedence: dossier panel first, drawer second.
- `aria-live="polite"` HUD announces hover and selection names.
- Pointer events cover mouse/touch/pen; click-vs-drag threshold keeps
  orbit drags from selecting.
- `prefers-reduced-motion` → single static frame, no RAF loop.

## Translations

`translations/<loc>/pages/star-field` (seeded in `database.json` for all
16 locales): `title`, `systemBoot`, `hint`, `explore`, group headings
(`solar`, `milkyWay`, `nebulae`, `galaxies`), `screenshot`, `overview`,
`loading`, `source`, plus kind labels (`star`, `planet`, `dwarfPlanet`,
`moon`, `blackHole`, `system`, `nebula`, `galaxy`). `APP.starField`
carries the nav label; `slugs.starField` the localized route; English
ships in `FALLBACK_PAGES` for the pre-fetch window. Body dossier JSONs
are English-only (source-credited scientific prose).

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
