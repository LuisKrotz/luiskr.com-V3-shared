# `experiments\docs\tests\coverage\coverage-nav.test.js`

Coverage tails for docs/coverage-nav.ts — the istanbul

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\coverage-nav.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `makeBox`

Mounts an HTML fragment in a fresh <div> — assertions query the box's content.

### `key`

Synthetic keydown factory — modifiers are patched onto the instance
since happy-dom's KeyboardEvent ignores them in the init dict.
