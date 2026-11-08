# `core\tokens\indexnow.ts`

IndexNow protocol tokens — the Bing/IndexNow API key,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\indexnow.ts`                             |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_INDEXNOW_HOST`

Host every submission is scoped to — the protocol rejects URLs that do
not belong to the declared host.

### `INDEXNOW`

Frozen IndexNow protocol map — sole declaration site for these tokens;
consumers read members and never re-declare the strings (zero-hardcoding
rules 4–5). Object.freeze makes the token contract immutable at
runtime.

### `KEY`

Ownership key — also the body of the root-hosted key file.

### `HOST`

Protocol host scope — submitted URLs must sit under this host.

### `KEY_FILE`

Key-file basename served at the site root (`/<key>.txt`).

### `KEY_LOCATION`

Absolute keyLocation sent with every submission payload and param.

### `API`

IndexNow endpoint — accepts both JSON `POST` bodies (host/key/
keyLocation/urlList) and single-URL `GET` submissions via the
`url`, `key` and `keyLocation` query params.
