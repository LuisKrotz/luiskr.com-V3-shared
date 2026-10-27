[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/frame](../README.md) / framePool

```ts
const framePool: object
```

Defined in: core/utils/motion/frame.ts:129

Shared frame scheduler — the single rAF pump every animation loop
registers with. Mirrors the requestAnimationFrame/cancelAnimationFrame
contract so call sites migrate one-for-one (`animId` stays a number).

## Type Declaration

### request()

```ts
request(cb): number;
```

Queues `cb` to run on the next frame pump, arming the underlying
rAF if the pool was idle.

#### Parameters

##### cb

[`FrameCallback`](../type-aliases/FrameCallback.md)

The frame callback — receives the shared pump timestamp.

#### Returns

`number`

A virtual frame id usable with `framePool.cancel`.

### cancel()

```ts
cancel(id): void;
```

Cancels a queued callback by its virtual id. Null-marks the slot so
cancellation is safe from inside a running pump; the compactor
reclaims it on the next pass. Cancelling a stale or already-run id
is a no-op.

#### Parameters

##### id

`number`

The id returned by `framePool.request`.

#### Returns

`void`

### size()

```ts
size(): number;
```

Current queue depth — live plus null-marked slots awaiting
compaction. Exported for scheduler diagnostics/tests; the number of
armed rAFs is always 0 or 1 regardless of this value.

#### Returns

`number`

Pending callback count.

### flush()

```ts
flush(now): void;
```

Runs one pump pass synchronously when the pool is armed or callbacks
are queued — a test hook for environments whose rAF never ticks, or
where a fake rAF queue must take over a pump armed before the fake
installed. Harmless when the real pump fires later: draining an
empty queue is a no-op.

#### Parameters

##### now

`number`

The frame timestamp handed to the drained callbacks.

#### Returns

`void`
