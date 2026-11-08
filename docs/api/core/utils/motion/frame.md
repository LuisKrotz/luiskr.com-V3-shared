# `core\utils\motion\frame.ts`

Shared frame scheduler — one requestAnimationFrame pump

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\motion\frame.ts`                          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A per-frame callback — receives the pump's DOMHighResTimeStamp.

### `rethrowAsync`

Reports a frame-callback failure the way native rAF would — as an
uncaught error — but asynchronously, from a fresh task, so the throw
cannot abort the pump's own drain. Native rAF invokes every callback
in isolation: one failing loop kills only itself, never the frame or
its siblings. The pool must preserve that contract: a pooled
scheduler that lets an exception escape its drain would leak the
whole queue (the thrower's slot is never compacted, every revival
re-runs and re-dies on it, and re-arming widgets pile up behind it —
observed in production as rhythmic second-long main-thread stalls).

- `@param` err The failure the callback raised.

### `seq`

Virtual id sequence — monotonic so a stale id can never alias a live slot.

### `ids`

Parallel arrays: virtual ids and their callbacks (null = cancelled, pending compaction).

### `rafId`

The single armed rAF handle — 0 when the pump is idle or mid-drain.

### `arm`

Arms the single underlying requestAnimationFrame if the pump is not
already scheduled. Called from `request` and from the drain when
callbacks remain for the next frame.

### `pump`

One pump: invokes every callback queued for this frame with the same
timestamp, then compacts. The drain snapshots the length — callbacks
pushed during the pass (self-rearming loops) land in the tail and
survive to the next pump, never re-entering this frame. The consumed
head slice is dropped wholesale: cancel-marks inside it are already
irrelevant (the slot either ran or was skipped), so the only
compaction needed is the tail copy — which also drops tail entries
cancelled mid-drain.

- `@param` now The rAF timestamp shared by every callback this frame.

### `framePool`

Shared frame scheduler — the single rAF pump every animation loop
registers with. Mirrors the requestAnimationFrame/cancelAnimationFrame
contract so call sites migrate one-for-one (`animId` stays a number).

### `request`

Queues `cb` to run on the next frame pump, arming the underlying
rAF if the pool was idle.

- `@param` cb The frame callback — receives the shared pump timestamp.
- `@returns` A virtual frame id usable with `framePool.cancel`.

### `cancel`

Cancels a queued callback by its virtual id. Null-marks the slot so
cancellation is safe from inside a running pump; the compactor
reclaims it on the next pass. Cancelling a stale or already-run id
is a no-op.

- `@param` id The id returned by `framePool.request`.

### `size`

Current queue depth — live plus null-marked slots awaiting
compaction. Exported for scheduler diagnostics/tests; the number of
armed rAFs is always 0 or 1 regardless of this value.

- `@returns` Pending callback count.

### `flush`

Runs one pump pass synchronously when the pool is armed or callbacks
are queued — a test hook for environments whose rAF never ticks, or
where a fake rAF queue must take over a pump armed before the fake
installed. Harmless when the real pump fires later: draining an
empty queue is a no-op.

- `@param` now The frame timestamp handed to the drained callbacks.
