# `core/tokens/data/wasm.ts`

WASM worker action tokens — message `type` values understood

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/data/wasm.ts`                            |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `WASM_ACTIONS`

Frozen `{ NAME: 'NAME' }` action map built from `_WASM_ACTION_LIST` —
workers dispatch on `type`, and self-keyed entries make typos
compile-checkable while the wire value stays the plain string.

### `WASM_POOL`

Frozen worker-pool sizing + asset tokens. Sole declaration site for the
worker script path and the pool-size caps — mobile SoCs thermal-throttle
under wide pools so the cap is tighter than desktop; the cores fallback
covers engines without navigator.hardwareConcurrency.

### `GPU_WORKER_URL`

The GPU render worker — owns every widget's OffscreenCanvas, wasm
artifact, shared device, and per-frame draw submissions so the
main thread never runs a widget draw call.

### `DESKTOP_MAX`

Desktop pool ceiling — `hardwareConcurrency - RESERVED` cores are
the real width (below): the browser allows one dedicated worker
per core, but oversubscribing past that only costs context
switches, so the cap keeps huge-core-count boxes sane.

### `RESERVED_CORES`

Cores left for the main thread + the GPU render worker +
compositor — the pool never takes the last RESERVED cores.

### `REPLY_TIMEOUT_MS`

Dispatch reply deadline — a worker that never posts back (broken
script, uncaught handler throw, wedged wasm) drops the whole worker
after this so callers land on their JS fallback instead of hanging.

### `RESPAWN_COOLDOWN_MS`

Pool respawn cooldown after a full wipeout (every worker dropped
by errors/timeouts). Without it, a persistently failing worker
script re-spawns the whole pool on every dispatch — a spawn storm
that leaves thousands of zombie worker processes in the browser.

### `MAX_WIPEOUTS`

Consecutive full-pool wipeouts tolerated before the pool stops
respawning for the session — a script that can't stay alive is a
permanent failure, not a transient one.

### `WASM_CSS`

Dynamic-CSS injector tokens — the managed <style> node's sole rule is
the GPU compositor-promotion utility class; skeleton defaults cover the
analytics-sizing helper's CSS fallbacks.
