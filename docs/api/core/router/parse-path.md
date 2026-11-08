# `core\router\parse-path.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\router\parse-path.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `normalizeProjectKey`

Maps legacy/alternate project URL slugs to canonical data keys via
PROJECT_ALIASES; unknown slugs pass through unchanged.

### `titled`

Titled descriptor with the pipe-separated page suffix.

### `contactDescription`

Contact-route meta description — "Contact | Mail, Phone, …" composed
from the live components dictionary (loaded per locale before routes
resolve, so this is correctly localized at parse time unlike the
pages/* nodes, which views push post-fetch).

### `legalRoute`

Legal-page descriptor — page label comes from the localized legal-links component text.

### `notFoundDesc`

404 descriptor — terminal fallback for unresolvable paths.

### `slugOwner`

Locale a bare slug belongs to: scans every non-English slug table for
the segment and returns the locale only when exactly one owns it —
shared slugs (`busca` in br/cas/riv/gl, `kontakt` in de/hrk, …) have
no fair canonical owner and stay unresolvable.

- `@param` first the first path segment (unprefixed URL)
- `@returns` the owning locale code, or null on zero/ambiguous matches

### `parsePath`

Pure resolution: pathname → route descriptor { name, view, lang,
path, meta, params }. meta.scrollTo triggers a post-nav smooth-scroll
to that element id.

### `resolveLocalized`

Resolves a path under one locale's slug table — every route check the
parser knows, in priority order. Returns null instead of a 404 so the
caller can retry under another locale (bare-slug fallback).

- `@param` pathSegments path segments after the locale prefix
- `@param` lang locale code driving `routeSlugs` + the canonical prefix
- `@param` cleanPath original pathname for the descriptor
- `@returns` the matched route descriptor, or null when nothing matches
