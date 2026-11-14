# `core\tests\coverage\utils\responsive-css-tails.test.js`

Coverage tails for core/utils/responsive-css.ts — the

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\utils\responsive-css-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.    |

## Members

### `stubMatchMedia`

Installs a per-query matchMedia stub whose recorded `matches` flags are
flippable; `fire(query, bool)` flips one and dispatches live listeners.
Returns a restore function — always pair with try/finally.
