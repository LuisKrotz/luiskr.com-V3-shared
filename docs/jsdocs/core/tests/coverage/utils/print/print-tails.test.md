# `core\tests\coverage\utils\print\print-tails.test.js`

Coverage for core/utils/print/print.ts — the beforeprint/

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PROVEN_KEY`

Bucket-relative seed key for the `proj/proven` stem — the manifest
proves only its q75 tier, so the upgrade lands there (a mid rung, not
the uncompressed top). `mediaKeyExists` strips CDN_BASE before lookup.

### `MANIFEST_KEYS`

Bucket keys the stubbed manifest claims exist — every pipeline stem the
fixtures use resolves its proven top rung so upgrades land on real URLs.
Stems absent here correctly resolve to no upgrade at all: the print pass
must never fabricate a `-mozjpg-uncompressed` URL it cannot prove.

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `mkArticle`

Builds a reader mirror article in <body> — the hoisted post-mount state
every swap path checks against.

- `@returns` {HTMLElement} the article element
