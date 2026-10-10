# `cms/routes/AdminLogin.tsx`

&lt;view-admin-login&gt; — the CMS gate: a single Google OAuth

| | |
|---|---|
| **Source** | `src/cms/routes/AdminLogin.tsx` |
| **UX surface** | Login screen and the dashboard shell. |

## Members

### `ViewAdminLogin`

The ViewAdminLogin — admin login class.

### (module scope)

Surfaces a broken OAuth round-trip: signInWithGoogle marks the
session before the redirect navigation; still seeing the marker when
this view mounts means the return leg restored no session (blocked
third-party storage, strict tracking prevention). Without this the
flow loops silently — click → Google → back → login → repeat.

### `handleGoogleLogin`

Runs the Firebase Google OAuth popup flow; errors surface in the UI.
The button's JSX `onClick` is the single handler — the render pass
re-attaches it on every fresh node, so no manual rebind step exists
(a second listener would double-fire the popup request).

### (module scope)

JSX template for the login card.
