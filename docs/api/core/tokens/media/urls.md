# `core\tokens\media\urls.ts`

External base URLs split by function — grouped subsets of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\media\urls.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CDN_URLS`

Frozen cdn URL map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `MEDIA_MANIFEST`

Build-time bucket key list — same-origin JSON, gates webp/webm <source> emission.

### `SOCIAL_URLS`

Frozen social URL map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `URL_MARKERS`

Frozen link-marker map — substring/protocol probes used to classify CMS
link rows (e.g. components/contact line1) without hardcoding the checks
at each consumer. Sole declaration site (zero-hardcoding rules 4–5).

### `MAILTO`

`mailto:` URI scheme — identifies the direct-email link row.

### `LINKEDIN`

`linkedin` hostname fragment — identifies the LinkedIn profile row.
