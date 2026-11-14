# `core\tests\coverage\utils\media\accessibility-tails.test.js`

Coverage for core/utils/media/accessibility.ts — the naming

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\media\accessibility-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.         |

## Members

### `mockReady`

Mutable manifest-mock state — the mock below reads these per call, so
tests steer "manifest still in flight" vs "proven key set" branches.
