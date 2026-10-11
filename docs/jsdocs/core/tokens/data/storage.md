# `core/tokens/data/storage.ts`

localStorage/sessionStorage key tokens split by scope —

| | |
|---|---|
| **Source** | `src/core/tokens/data/storage.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CACHE_STORAGE_KEYS`

Caches storage keys.

### `DOCS_SCENE_STATE`

Docs 3D-scene camera pose + rotation-off flag (session-scoped).

### `INTRO_SHOWN`

Boot loader shown-once flag (session-scoped).

### `CMS_AUTH_REDIRECT`

CMS OAuth-redirect marker (session-scoped) — set just before the
signInWithRedirect navigation; still present when the login mounts
means the return leg couldn't restore a session (blocked storage),
so the login surfaces the failure instead of silently re-prompting.

### `CMS_AUTH_ERROR`

CMS OAuth-return error code (session-scoped) — written when
getRedirectResult rejects after the redirect leg, so the login view
can show the real Firebase code (auth/unauthorized-domain,
auth/network-request-failed, …) instead of only guessing "browser
blocked storage".
