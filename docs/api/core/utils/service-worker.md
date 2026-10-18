# `core/utils/service-worker.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/service-worker.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Lifecycle hooks for `registerSiteServiceWorker` — local replacement
for the retired `register-service-worker` package (same callback
names, same ordering). Every hook is optional.

### (module scope)

First registration resolved and the SW is controlling the page.

### (module scope)

`navigator.serviceWorker.register` resolved.

### (module scope)

First install finished — precache is warm (no prior controller).

### (module scope)

A new SW version started downloading.

### (module scope)

A new SW version installed — fresh content is ready.

### (module scope)

Window went offline.

### (module scope)

Window came back online.

### (module scope)

Registration or the localhost validity probe failed.

### `emit`

Fires a named hook when it exists — centralizes optional dispatch.

### `trackInstalling`

Wires a registration's install lifecycle to the hooks — the semantics
the retired package shipped: `updatefound` → watch `installing` → on
`installed`, `cached` when no prior controller else `updated`.

### (module scope)

Localhost probe — a dev server on the origin would serve the dev
index for `/service-worker.js`; registering that would hijack dev.
Verify the script exists and answers a JS mime before registering.

### `isLocalhost`

True on local origins — localhost names, loopback IPs, and [::1].
The original package treated these as "probably dev" and probed
before registering; preserved identically.

### (module scope)

Registers `swUrl` and reports lifecycle through `hooks`. No-ops when
`navigator.serviceWorker` is unavailable. Local hosts get the
existence/mime probe first; a bad probe unregisters rather than
installing a dev-shell SW.

### `dropStaleServiceWorkers`

Unregisters every service worker bound to the current origin. No-op
outside browsers and where `getRegistrations` is unavailable; failures
are swallowed — this is best-effort cleanup, never a boot blocker.
