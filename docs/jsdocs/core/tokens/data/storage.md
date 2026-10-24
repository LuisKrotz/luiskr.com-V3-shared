# `core\tokens\data\storage.ts`

localStorage/sessionStorage key tokens split by scope —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\data\storage.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CACHE_STORAGE_KEYS`

Caches storage keys.

### `DOCS_SCENE_STATE`

Docs 3D-scene camera pose + rotation-off flag (session-scoped).

### `INTRO_SHOWN`

Boot loader shown-once flag (session-scoped).

### `INTRO_T0`

Boot-loader animation start stamp — a `window` field (not storage)
written by the index.html head script at parse time so the veil's
duration budget measures the whole boot, not just post-mount.

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

### `CMS_AUTH_POPUP_ERROR`

CMS popup-leg error code (session-scoped) — the real Firebase code
that made signInWithPopup fail and triggered the redirect fallback
(e.g. auth/web-storage-unsupported). Persisted across the redirect
navigation so the login view can name the ORIGINAL failure instead
of only the synthetic no-redirect-event inference.

### `CMS_AUTH_POPUP_DETAIL`

CMS popup-leg error detail (session-scoped) — the full error message
that accompanied CMS_AUTH_POPUP_ERROR. Firebase wraps backend
rejections inside auth/internal-error (e.g. the 401 "Firebase App
Check token is invalid" from createAuthUri), so the message carries
the real cause that the bare code hides.
