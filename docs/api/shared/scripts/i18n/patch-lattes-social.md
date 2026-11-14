# `shared\scripts\i18n\patch-lattes-social.js`

One-shot migration: appends the Lattes CV channel to the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-lattes-social.js`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LATTES_URL`

The Lattes CV channel. "Lattes" is the platform's proper name so the
label stays identical across all 16 locales (same convention as
Linkedin/Github). Property order mirrors each list's row shape:
line1 rows are {description, link}, socials rows are {link, network}.

### `appendChannel`

Appends a channel row to a list unless a row with the same link is
already present — keeps the script idempotent. Firebase may deliver
list nodes as keyed objects, so non-array values are ignored (the
caller treats them as unpatched rather than destroying them).

### `patched`

Locales whose channel lists actually gained the row this run.

### `restGet`

Reads one RTDB path over REST; null on any non-OK response.

### `restPut`

Replaces one RTDB path over REST; logs and returns false on failure.

### `asList`

Firebase returns populated arrays as real arrays, but a list node
can also arrive as a keyed object — normalize to a plain array
before appending (same contract as the website renderers).
