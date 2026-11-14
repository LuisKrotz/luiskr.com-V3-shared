# `shared\scripts\media\a11y\gcp.mjs`

GCP REST plumbing for the a11y pipeline — ADC access-token

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\gcp.mjs`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `GCLOUD_BIN`

gcloud ships as a `.cmd` shim on Windows — execFile can't run shims
without the shell, so the binary name is platform-resolved once.

### `OAUTH_TOKEN_URL`

OAuth token endpoint for the authorized_user ADC refresh flow.

### `ADC_PATHS`

Well-known ADC file locations (gcloud's own credential store).

### `GCP_PROJECT`

Project the quota/billing charges land on.

### `MAX_RETRIES`

Retry ceiling for transient failures (429, 5xx, network errors).

### `RETRY_BASE_MS`

Base backoff — doubles per retry (1s, 2s, 4s, 8s, 16s).

### `TOKEN_TTL_MS`

ADC tokens last 60 min; refresh 10 min early so a mint never expires mid-call.

### `refreshAdcToken`

Refreshes an access token straight from the ADC JSON file — the
`authorized_user` credential is a standard OAuth refresh_token flow,
so no subprocess or shell shim is involved (gcloud's `.cmd` wrapper
can't be execFile'd on Windows).

- `@returns` {Promise<string>} Fresh OAuth access token.

### (module scope)

Mints (or reuses) an Application Default Credentials access token —
direct refresh_token exchange first, `gcloud` CLI as the fallback for
credential types the file flow can't cover (e.g. external_account).

- `@returns` {Promise<string>} OAuth access token.

### `sleep`

Sleep helper — retry backoff.

### (module scope)

Authenticated fetch against a Google API — adds the Bearer token and
the `x-goog-user-project` quota header ADC flows require, then retries
transient statuses (429, 5xx) and network throws with exponential
backoff. Non-retryable statuses return their response as-is for the
caller to inspect.

- `@param` {string} url Absolute API URL.
- `@param` {object} [opts] fetch options (`body` may be an object — JSON-ified).
- `@returns` {Promise<Response>}

### (module scope)

JSON-body convenience wrapper — throws a descriptive error carrying
Google's `error.message` on non-2xx so logs name the real failure.

- `@param` {string} url Absolute API URL.
- `@param` {object} [opts] gcpFetch options.
- `@returns` {Promise<object>} Parsed response JSON.
