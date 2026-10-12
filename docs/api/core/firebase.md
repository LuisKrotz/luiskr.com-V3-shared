# `core/firebase.ts`

Firebase client bootstrap — split between the site (read-only)

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/firebase.ts`                                    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `getApiKey`

Resolves the API key from the build env (VITE_FIREBASE_API_KEY) or the
base64-encoded fallback baked at build time. Firebase API keys identify
the project, not a secret — but the fallback still avoids a plaintext
literal for casual scraping.

### `getAuthDomain`

Resolves the authDomain — the host that serves `/__/auth/handler` and
`/__/auth/iframe`. Priority: VITE_FIREBASE_AUTH_DOMAIN env override →
the app's own host when it can serve the helper over https (every
Firebase-Hosting-connected domain does, and the dev server proxies the
path when CMS_AUTH_HTTPS is on) → the firebaseapp.com default.

Same-origin authDomain is the structural fix for the modern-browser
breakage: the OAuth event relay lives in the helper iframe's web
storage, which becomes first-party when the iframe shares the app's
origin — third-party storage partitioning/blocking can no longer drop
the event between the handler write and the iframe read. On plain http
dev the https-only helper can't be same-origin, so the firebaseapp.com
fallback keeps the previous behavior.

### `firebaseConfig`

Firebase project configuration. apiKey resolves at runtime; the rest are
public project identifiers (auth domain, RTDB URL, project id, storage
bucket, sender id, app id, analytics measurement id).

### `app`

The shared Firebase App — initialized eagerly from firebaseConfig; auth
and database SDKs attach to it lazily.

### `_appCheckPromise`

In-flight app-check init — concurrent callers share one import.

### `ensureAppCheck`

Lazily initializes Firebase App Check once, gated by env config:
VITE_FIREBASE_APPCHECK_SITE_KEY carries the reCAPTCHA site key
(v3 by default, Enterprise when VITE_FIREBASE_APPCHECK_PROVIDER is
'enterprise'), and VITE_FIREBASE_APPCHECK_DEBUG supplies the
console-issued debug token so localhost dev can mint valid tokens.
With no site key configured the init is a no-op — the 401 cause then
surfaces through the recorded popup detail instead of hanging.

- `@returns` The AppCheck instance, or null when unconfigured/failed.

### `_authInstance`

Memoized Auth instance — populated on first getAuthInstance() call.

### `_authPromise`

In-flight auth-chunk promise — concurrent callers share one import.

### (module scope)

Lazily imports firebase/auth once and returns the shared Auth instance.
Concurrent callers share _authPromise so the chunk is fetched exactly once.

- `@returns` The Auth instance bound to `app`.

### `_dbInstance`

Memoized RTDB instance — populated on first getDbInstance() call.

### `_dbPromise`

In-flight database-chunk promise — concurrent callers share one import.

### (module scope)

Lazily imports firebase/database once and returns the shared RTDB
instance. Only needed by the CMS write path — public reads use REST.

- `@returns` The Database instance bound to `app`.

### (module scope)

CMS login — Google OAuth popup. `prompt: 'select_account'` forces the
account chooser so a CMS editor isn't silently signed into a wrong Google account.
When the environment can't complete the popup handshake (popup blockers,
COOP window.closed blocking, partitioned web storage, unsupported
contexts — the AUTH_REDIRECT_FALLBACK_CODES set), retries transparently
via signInWithRedirect, which navigates away and never resolves.

- `@returns` The SDK UserCredential, or nothing when the redirect fallback fires.

### `probeAuthBackend`

Re-probes Identity Toolkit's read-only createAuthUri endpoint after an
opaque auth/internal-error. The `__/auth/handler` page made this exact
call to build the provider URL and got rejected — but the SDK rebuilds
the relayed event error by code alone (`_createError(auth, code)`),
dropping the nested server message ("Firebase App Check token is
invalid.", …). Re-issuing the call directly returns the real reason.
POST only creates no server state: it resolves which providers apply.

- `@returns` The server's error message, or empty when the probe can't run

### (module scope)

Signs the CMS user out via the lazily-loaded auth SDK.

### `_AUTH_INIT_TIMEOUT_MS`

Upper bound on Firebase auth bootstrap — the SDK's own init can hang.

### `_AUTH_EVENT_TIMEOUT_MS`

Upper bound on the redirect-event wait — the iframe relay can stall.

### `recordAuthFailure`

Persists the OAuth-return failure code for the login view and consumes
the redirect marker — storage itself may be the blocker, so every write
is guarded.

- `@param` code Firebase-style error code (or a synthetic `auth/*` code).

### `flagAuthError`

Persists an "auth failed but not via the OAuth return" signal used to
distinguish a null getRedirectResult with an outstanding marker (event
lost to blocked third-party storage) from a plain first visit.

- `@param` code Firebase-style error code.

### `raceTimeout`

Races a promise against a timeout that rejects with a synthetic auth code.

### (module scope)

Subscribes to auth state after lazily loading firebase/auth.
First resolves a pending redirect sign-in (the signInWithGoogle popup
fallback) so the callback fires with the fresh session on return — a
failed redirect logs the error and falls through to the normal listener.

Both the SDK init and the redirect-event wait are bounded: when
third-party storage is blocked (the firebaseapp.com auth iframe can't
persist/relay the OAuth event) the SDK promises never settle, which
previously left the page hanging with the stale redirect marker. On a
timeout or failure the real diagnosis is recorded for the login view,
while a best-effort background subscribe still wires the listener so a
late-arriving event can still sign in.

- `@param` callback Invoked with the User (or null on sign-out) on every auth transition.
- `@returns` {Promise<Function>} the SDK's unsubscribe function

### (module scope)

Snapshot-shaped result matching the SDK's DataSnapshot read API.

### (module scope)

Lightweight HTTP REST reader for the Realtime Database: GETs
`<db>/<path>.json` and wraps the payload in a snapshot-shaped
{ exists(), val() } object so callers match the SDK API.

Cache order: in-flight promise map → sessionStorage (survives route
changes within the tab) → network → SDK get() fallback on REST failure.

- `@param` path RTDB path — leading slash stripped for URL safety.
- `@returns` Snapshot-shaped {exists, val} wrapping the JSON payload.

### `clearDbCache`

Drops the in-memory REST cache (sessionStorage entries persist).
