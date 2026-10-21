# `core\tokens\strings\auth.ts`

Firebase Auth error-code string tokens — token group.

| | |
|---|---|
| **Source** | `src/core\tokens\strings\auth.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `AUTH_BLOCKED_STORAGE_CODES`

Codes whose root cause is blocked third-party site data — the
firebaseapp.com auth iframe can't store/read the OAuth event. The login
view uses this set to show the "allow site data" guidance instead of the
authorized-domains copy.

### `AUTH_REDIRECT_FALLBACK_CODES`

Codes where the popup handshake cannot run in the current browser
environment (popup blockers, COOP window.closed blocking, partitioned
storage, unsupported contexts) — these retry via signInWithRedirect.
User-cancellation codes are deliberately excluded.

### `AUTH_DOMAIN_DEFAULT`

The project's default Firebase authDomain — hosts the `/__/auth/*`
helper (popup handler + storage-relay iframe). Used whenever the app
itself can't serve the helper same-origin (http dev, non-https hosts).

### `AUTH_SELF_HOSTS`

Hosts that serve `/__/auth/*` themselves — Firebase Hosting exposes the
auth helper on every connected domain, so when the app runs on one of
these over https the authDomain can point at the app's own host. That
makes the helper iframe same-ORIGIN: its web-storage event relay stops
being third-party data and survives the partitioning/blocking that
silently kills the firebaseapp.com relay.
NOTE: www.luiskr.com is deliberately absent — the host doesn't resolve.

### `AUTH_URLS`

Auth endpoint URLs — the Identity Toolkit REST surface. createAuthUri
is the read-only call the `__/auth/handler` page makes to build the
provider URL; the diagnostic probe re-issues it after an opaque
auth/internal-error to recover the real server-side rejection reason
(the SDK rebuilds relayed event errors by code only and drops the
nested message).
