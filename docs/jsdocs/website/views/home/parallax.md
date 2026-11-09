# `website\views\home\parallax.ts`

Scroll-driven parallax for &lt;view-home&gt; — desktop-only

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\home\parallax.ts`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One CSS-var write a layer performs per scroll tick.

### `prop`

Custom property set inline on the layer element.

### `amp`

Signed translateY amplitude (px) at progress ±1.

### `last`

Last value actually written — dedupe + self-measure correction.

### (module scope)

A moving layer: `el` receives inline vars whose translate3d consumers
live INSIDE the element's shadow tree (its own box never transforms),
and `measureEl` supplies the document-space geometry. Because only
inner content moves, every measured rect is always untransformed —
no painted-position correction is ever needed.

### `el`

Element receiving the inline CSS vars.

### `measureEl`

Element measured for document-space position.

### `top`

Cached untransformed document-space top (px).

### `height`

Cached border-box height (px).

### `writes`

Per-var writes applied each tick.

### (module scope)

Session slot names — the four moving layers of the home page.

### (module scope)

Live parallax session parked on the view (`view._parallax`). Created
by attachParallax, dropped by detachParallax; syncParallax re-resolves
the layer nodes and re-evaluates the gates on every render pass and
store push.

### `hero`

<card-stack> inside the #home anchor — deck var + foot var.

### `about`

<about-section> inside the #about anchor — the two column vars
consumed inside the component's own shadow sheet.

### `contact`

<contact-section> inside the #contact anchor — copy-block var.

### `awards`

<awards-mentions> band — self-measuring (no wrapper anchor).

### `ro`

Geometry watcher — content landing/reflowing shifts layer tops.

### `mql`

≥1280 gate (the `desktop` width class) — its change re-evaluates.

### `motionMql`

Live OS reduced-motion flag — consulted only when the user holds
no explicit pref (the site contract: localStorage wins).

### `raf`

Armed rAF coalescing scroll bursts into one paint per frame.

### `vh`

Viewport height cached on each measure pass (px).

### `armed`

Whether the scroll loop currently paints (gates open).

### (module scope)

Static layer spec — the selectors a slot resolves inside the view's
shadow root plus the (prop, amplitude) pairs written per tick. A null
`measure` self-measures the moved element.

### `el`

Selector for the element that receives the inline vars.

### `measure`

Selector for the untransformed measure anchor — null self-measures.

### `slot`

Session slot the resolved layer parks on.

### `props`

CSS vars written per tick — parallel to `amps`.

### `amps`

px amplitudes at progress ±1 — parallel to `props`.

### `_LAYER_SPECS`

The home layer table. `el` is the section host — the inline vars
inherit into its shadow where the component's own sheet consumes
them on inner content; the hosts themselves never transform, so the
anchors' (and hosts') rects stay clean. The awards band has no
anchor div and self-measures.

### `reducedMotionActive`

Reduced-motion check honoring the site contract: an explicit
localStorage pref always wins; without one the live OS flag rules —
the store's merged flag only seeds the OS value at boot and follows
the in-app toggle, so mid-session OS flips come from the mql.

- `@param` s The parallax session holding the motion mql.
- `@returns` true when the parallax must stay disarmed.

### `gatesOpen`

Both runtime gates: the ≥1280 media query matches AND motion is allowed.

### `syncLayer`

Re-resolves one layer's elements, preserving the parked layer (and
its write dedupe state) when the same nodes still serve the spec —
the identity shortcut keeps store-push syncs allocation-free.

- `@param` prev The layer parked on the session slot (or null).
- `@param` view The view whose shadow root supplies the elements.
- `@param` spec The layer spec to satisfy.
- `@returns` The parked layer, a rebuilt layer, or null when the spec's

### `syncLayers`

Re-resolves every layer against the live shadow DOM — re-renders swap
nodes, so parked layers re-bind instead of writing to dead elements.

- `@param` view The home view.
- `@param` s The parallax session parked on it.
- `@returns` true when any slot changed hands (fresh measure required).

### `measure`

Caches every layer's untransformed geometry + the viewport height —
one batched read pass inside the sanctioned flush window
(measureLayout marks the deliberate post-write read for the reflow
gate). Only inner content translates, so every measured rect already
IS the element's natural position — no offset correction needed.

- `@param` view The home view holding the session.
- `@param` s The parallax session parked on it.

### `layerProgress`

Maps a layer's centre-vs-viewport-centre distance to progress ∈
[-1, 1]: 0 at centre, +1 when the element's centre sits one transit
range below (entering from the bottom), -1 above (leaving top). The
transit range (vh + layer height) / 2 is the scroll distance over
which the element crosses the viewport edge-to-edge.

- `@param` layer The measured layer.
- `@param` y Current window.scrollY (px).
- `@param` vh Viewport height (px).
- `@returns` Clamped progress.

### `paint`

One scroll-frame paint: writes `progress × amplitude` to each layer's
var(s), deadbanded by WRITE_EPSILON so sub-pixel deltas don't churn
style recalcs. Reads only cached geometry + scrollY — never layout.

- `@param` view The home view holding the session.
- `@param` s The parallax session parked on it.

### `tick`

rAF callback — clears the armed handle then paints; one is scheduled
per scroll-event burst.

- `@param` view The home view holding the session.

### `onScroll`

Scroll listener — coalesces bursts into one rAF paint; subsequent
events inside the same frame see `raf` set and drop out (the boot.ts
convention). Cheap enough to stay bound while disarmed — the armed
check makes it a no-op.

- `@param` view The home view holding the session.

### `remeasure`

Geometry refresh (ResizeObserver / resize): caches the new
tops/heights immediately — RO fires post-layout so the reads are
free — then coalesces the repaint through the shared rAF so the
observer callback stays write-free.

- `@param` view The home view holding the session.

### `clearVars`

Clears every layer var — with the property gone each stylesheet's
translate3d falls back to its seed and the elements sit at their
natural position (no transition: a gate drop is a mode switch, not
an animation moment).

- `@param` s The parallax session.

### `applyGate`

Single gate-evaluation path every trigger calls: re-resolves the
layer nodes, then either disarms (clearing the vars) or arms —
rebinding the geometry watcher to the live measure elements and
running a measure+paint so fresh nodes carry the correct offsets
before the next paint. Store-push syncs hit the armed/unchanged
early-out and cost a handful of selector queries only.

- `@param` view The home view holding the session.

### `attachParallax`

Arms the session: builds the media-query gates, binds the passive
scroll + resize listeners (auto-cleaned on disconnect through
addScopedListener) and the ResizeObserver, then runs the first gate
evaluation.

- `@param` view The home view.

### `syncParallax`

Public sync — the view calls this from onUpdated (fresh render →
re-resolve + re-gate) and onStoreUpdate (locale/reduced-motion pushes
re-evaluate the motion gate). Cheap when nothing changed: the
identity-parked layers skip straight to the gate compare.

- `@param` view The home view.

### `detachParallax`

Tears the session down — observer, pending rAF and the session
reference. Scoped listeners self-clean on disconnect; the elements
die with the view so vars need no clearing.

- `@param` view The home view.
