# `core/tokens/strings/auth.ts`

Firebase Auth error-code string tokens — token group.

| | |
|---|---|
| **Source** | `src/core/tokens/strings/auth.ts` |
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
