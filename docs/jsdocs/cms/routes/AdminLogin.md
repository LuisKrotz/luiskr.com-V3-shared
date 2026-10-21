# `cms\routes\AdminLogin.tsx`

&lt;view-admin-login&gt; — the CMS gate: a single Google OAuth

| | |
|---|---|
| **Source** | `src/cms\routes\AdminLogin.tsx` |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `unwrapAuthMessage`

Unwraps a Firebase error's real cause: auth/internal-error embeds the
backend rejection as a JSON string inside `message` (the App-Check 401
from createAuthUri), so the inner `error.message` is what actually
names the failure. Returns the raw text when it isn't wrapped JSON.
- `@param` raw The SDK error message (possibly a JSON-encoded API error).
- `@returns` The innermost human-readable message.

### `ViewAdminLogin`

The ViewAdminLogin — admin login class.

### (module scope)

Surfaces a broken OAuth round-trip: signInWithGoogle marks the
session before the redirect navigation and preserves the popup-leg
code; still seeing the marker when this view mounts means the
return leg restored no session. The relay stores the event in the
helper iframe's web storage, so browsers that partition or block
third-party site data drop it — even with first-party cookies
allowed. Without this the flow loops silently:
click → Google → back → login → repeat.

### `handleGoogleLogin`

Runs the Firebase Google OAuth popup flow; errors surface in the UI.
The button's JSX `onClick` is the single handler — the render pass
re-attaches it on every fresh node, so no manual rebind step exists
(a second listener would double-fire the popup request).

### (module scope)

JSX template for the login card.
