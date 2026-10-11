# `cms/dev/firebase-mock.ts`

Dev-only offline stub for Firebase Auth + RTDB. Enabled by

| | |
|---|---|
| **Source** | `src/cms/dev/firebase-mock.ts` |
| **UX surface** | Offline dev mock — never shipped. |

## Members

### (module scope)

Fetches and caches the merged database view once per session — the
dev server merges the committed `database.json` with the gitignored
`cms/dev/mock-db.json` overlay behind `/__cms-db`, so CMS edits
persist across reloads. Falls back to the plain snapshot when the
middleware isn't mounted (e.g. a stale server without CMS_MOCK).
- `@returns` The parsed database object.

### (module scope)

Persists one write through the dev middleware — POSTs the RTDB-style
op (`set`/`update`/`remove`) to `/__cms-db`, then drops the cached
snapshot so the next read re-merges base + overlay. Silent no-op when
the middleware isn't mounted.
- `@param` op RTDB operation name.
- `@param` path Slash-separated DB path.
- `@param` value Written payload (unused for remove).

### (module scope)

Walks a `a/b/c` path down the snapshot; returns the node or undefined.
Empty segments are filtered so trailing slashes can't produce misses.
- `@param` path Slash-separated RTDB-style path.
- `@returns` The node at the path, or undefined when absent.

### (module scope)

Minimal ref stand-in — just the path the SDK would encapsulate.

### `ref`

Mock of firebase/database `ref()` — wraps a path so `child()`/`get()`
can compose it like the real SDK.
- `@param` _db Unused database handle (kept for signature parity).
- `@param` path Root path for the ref.
- `@returns` A {__path} ref stand-in.

### `child`

Mock of firebase/database `child()` — appends a segment to a ref's path.
- `@param` r Parent ref.
- `@param` path Child segment.
- `@returns` A ref for the joined path.

### `get`

Mock of firebase/database `get()` — resolves the ref's path in the
snapshot and returns the SDK-shaped {exists, val} result.
- `@param` r The ref to read.
- `@returns` A snapshot-shaped promise.

### `set`

Mock of firebase/database `set()` — persists the write to the local
overlay via the dev middleware, so CMS edits survive reloads.
- `@param` r Target ref.
- `@param` v Value that would be written.

### `remove`

Mock of firebase/database `remove()` — tombstones the key in the overlay.

### `update`

Mock of firebase/database `update()` — shallow-merges the patch into the overlay.

### `getDatabase`

Mock of firebase/database `getDatabase()` — returns a marker handle.

### `MOCK_USER`

Fixed stand-in user so CMS screens render authenticated without OAuth.

### (module scope)

The MOCK_USER shape.

### `onAuthChange`

Mock onAuthChange — immediately reports the signed-in mock user and
returns a no-op unsubscribe.
- `@param` cb The auth-state callback.

### `getDbInstance`

Mock getDbInstance — returns the marker handle (no SDK).

### `signInWithGoogle`

Mock signInWithGoogle — resolves the mock user with no popup.

### `logoutUser`

Mock logoutUser — logs; the next onAuthChange still reports MOCK_USER.

### `fetchFirebaseDb`

Mock fetchFirebaseDb — reads straight from the committed snapshot.
- `@param` path Slash-separated DB path.
