# `shared\scripts\serve\security-headers.mjs`

Cross-origin isolation headers shared by every site-facing

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\serve\security-headers.mjs`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

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
