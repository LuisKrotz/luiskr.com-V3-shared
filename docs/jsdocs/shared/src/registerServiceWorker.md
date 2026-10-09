# `shared/src/registerServiceWorker.ts`

Registers the Workbox-generated service worker in production

| | |
|---|---|
| **Source** | `src/shared/src/registerServiceWorker.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `unregisterStaleWorkers`

Drops every service worker registered for this origin outside production.
A registration left behind by an earlier production visit (or a preview
served on the same port) keeps intercepting dev requests and replays
stale precached chunk URLs — dynamic imports then reject on every load
and the global handler surfaces the generic failure notification.

### `registerServiceWorker`

Registers `<base>service-worker.js` on window load when `env.PROD` is set.
Exported (and env-injected) so the prod-only branch is exercisable in
tests — `import.meta.env` does not exist outside Vite.
- `@param` {object} env - Vite env object ({PROD, BASE_URL})
