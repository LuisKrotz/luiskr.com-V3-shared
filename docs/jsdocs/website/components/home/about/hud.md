# `website\components\home\about\hud.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\hud.ts`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One coordinate entry of the pages/about `locations` array.

### (module scope)

Place label — e.g. 'UFSM Frederico Westphalen'.

### (module scope)

DMS-formatted latitude readout — e.g. `27° 23' 50" S`.

### (module scope)

DMS-formatted longitude readout — e.g. `53° 25' 39" W`.

### (module scope)

Optional altitude readout — e.g. '480 m'.

### (module scope)

The four readout lines rendered into the two HUD clusters.

### (module scope)

Live HUD session parked on the host — index + timers.

### `index`

Index into host.aboutLocations currently displayed.

### `timer`

The cycle interval — null when the HUD is static.

### `pending`

Pending mid-fade text swap — cleared on disarm.

### `HUD_TICK_MS`

Cycle cadence — one location every ~5s keeps the HUD readable.

### `HUD_FADE_MS`

Fade trough before the text swap — matches the CSS opacity transition.

### `_HUD_SEL`

Selector for the HUD container inside the host's shadow root.

### `hudLines`

Formats one location into the four readout lines. The detail line prefers
the altitude record and falls back to the latitude — always a real
coordinate, never chrome filler.

- `@param` loc the location entry
- `@returns` the four HUD line strings

### `syncHud`

Writes the session's current-index lines into the live HUD spans. Safe on
every render pass: re-resolves the nodes each call so a detached HUD (or
a session that predates the spans) just no-ops.

- `@param` host The <about-section> component the session parks on.

### `cycleHud`

Advances the HUD one location: flags the clusters out, then swaps the
text at the opacity trough and lets the transition carry them back in.

- `@param` host The <about-section> component the session parks on.

### `attachHud`

Seeds the HUD session and, when the CMS carries more than one location
and motion is allowed, starts the cycle interval. Idempotent.

- `@param` host The <about-section> component the session parks on.

### `disarmHud`

Stops the cycle and clears the pending swap — the session object itself
stays parked so the index survives a re-arm.

- `@param` host The <about-section> component the session parks on.
