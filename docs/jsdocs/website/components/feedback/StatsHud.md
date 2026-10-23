# `website\components\feedback\StatsHud.tsx`

&lt;stats-hud&gt; — the stats-for-nerds overlay: a compact HUD in

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\feedback\StatsHud.tsx`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Whether the engine feed is live — mirrors showStats, tracked so onStoreUpdate can toggle.

### `showStats`

Whether the HUD is enabled in preferences.

### (module scope)

Lifecycle: store subscription drives show/hide re-renders; the engine
subscription is a _direct_ channel — stats update every ~500ms, far
too hot for the store's full-subscriber broadcast, so _updateStatsDom
patches text nodes imperatively without re-running render(). The
engine subscription only exists while the HUD is enabled: subscribing
a hidden HUD would keep the FPS rAF loop, PerformanceObservers and
the fetch-patch sampler running on every page forever.

### (module scope)

Lifecycle: stops the engine feed so the subscription outlives no element.

### (module scope)

Store change → re-render + resync the engine feed to the toggle.

### (module scope)

Resolves the live acceleration label/class. This is intentionally read
at every stats tick: the HUD can mount before the lazy shared WebGL
accelerator creates its context, so caching the initial result would
leave capable desktop GPUs displayed as permanently off.

### (module scope)

Pushes the latest metrics snapshot into the HUD's DOM fields (called
by statsEngine at its sampling cadence). Color-class thresholds:
fps ≥55 good / ≥30 mid / below bad (60Hz budget ≈ 55 usable)
cpu <30% good / <70% mid / else bad
latency <100ms good / <400ms mid / else bad (0 = no sample → dash)
Throughput is bytes/sec → kB/s with one decimal.

### (module scope)

JSX template — a horizontal pill of label/value segments. Returns null
(renders nothing) when the preference is off, so the HUD costs zero
DOM when disabled. Threshold classes mirror _updateStatsDom's rules.
