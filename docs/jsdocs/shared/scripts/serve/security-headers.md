# `shared\scripts\serve\security-headers.mjs`

Cross-origin isolation headers shared by every site-facing

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\serve\security-headers.mjs`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `COEP`

Header name for the embedder policy — mirrors COOP above.

### `SITE_COOP_VALUE`

COOP for all site routes — isolates the browsing context group.

### `SITE_COEP_VALUE`

COEP for site routes — enables crossOriginIsolated (SAB/threaded WASM).

### `CMS_COOP_VALUE`

COOP for /cms — allow-popups keeps the Firebase auth popup flow working.

### `CMS_COEP_VALUE`

COEP for /cms — CMS iframes third-party auth UIs it cannot declare.

### `CMS_PATH_RE`

Routes that must stay non-isolated (CMS auth iframes + popups).

### `SITE_SECURITY_HEADERS`

Security headers applied to site routes — the isolation pair.

### `CMS_SECURITY_HEADERS`

Headers applied to CMS routes — keeps popup auth + iframes working.

### `siteSecurityHeadersMiddleware`

Connect-style middleware: stamps the isolation pair on site routes and
the popup-preserving opt-out pair on /cms so the two contexts never
share a policy.

- `@param` req — the incoming request (url is inspected for the /cms prefix)
- `@param` res — the outgoing response (headers are set before body write)
- `@param` next — calls the next middleware in the stack
