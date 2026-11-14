# `core\tests\unit\platform\debug-params-debug-params-webglmode.test.js`

Split from debug-params.test.js — covers the "debug params — webGLMode" describe.

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\platform\debug-params-debug-params-webglmode.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                  |

## Members

### `setSearch`

Rewrites the URL search string — the debug-param readers run fresh per call.

### `restore`

Puts the original URL back — afterEach guard against param leakage.
