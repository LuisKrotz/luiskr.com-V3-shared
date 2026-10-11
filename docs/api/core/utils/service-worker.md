# `core/utils/service-worker.ts`

| | |
|---|---|
| **Source** | `src/core/utils/service-worker.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `dropStaleServiceWorkers`

Unregisters every service worker bound to the current origin. No-op
outside browsers and where `getRegistrations` is unavailable; failures
are swallowed — this is best-effort cleanup, never a boot blocker.
