# `shared\scripts\build\fs-retry.mjs`

Bounded retry for fs operations that race Windows file locks.

| | |
|---|---|
| **Source** | `src/shared\scripts\build\fs-retry.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MAX_ATTEMPTS`

Attempts before rethrowing — ~60s of capped backoff. Signature updates and
indexer sweeps hold share locks for tens of seconds, and a deleted file
stays open-blocked until the stale handle closes.

### `BACKOFF_STEP_MS`

Backoff step in ms — multiplied by the attempt index, capped below.

### `BACKOFF_CAP_MS`

Per-attempt backoff ceiling — linear growth stops here.

### `SLEEP_SLOT`

Notification slot for Atomics.wait — Node permits waiting on the main
thread (browsers forbid it), giving a true synchronous sleep.

### `sleepSync`

Blocks the thread for `ms` via Atomics.wait; nothing ever notifies the
slot so the call returns 'timed-out' after the full delay.
- `@param` {number} ms milliseconds to block
- `@returns` {string} Atomics.wait result — always 'timed-out'

### `retryable`

Tells whether an fs error is a transient lock worth retrying.
- `@param` {unknown} err caught error
- `@returns` {boolean} true when the error code is retryable

### `backoffMs`

Capped linear backoff for an attempt index — 50ms, 100ms, … up to the cap.
- `@param` {number} attempt 1-based attempt number
- `@returns` {number} milliseconds to wait before the next attempt

### `withFsRetry`

Runs a synchronous fs operation, retrying transient lock errors with
capped linear backoff. Non-lock errors and exhausted retries rethrow.
- `@param` {() => T} op synchronous fs call to attempt
- `@returns` {T} the operation's result once it succeeds

### `withFsRetryAsync`

Async variant for fs-adjacent promises (rolldown bundle writes) — same
retry policy, setTimeout backoff so the event loop stays free.
- `@param` {() => Promise<T>} op async fs call to attempt
- `@returns` {Promise<T>} the operation's result once it succeeds
