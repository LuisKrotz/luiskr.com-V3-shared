# `experiments\star-field\tests\coverage\starfield\engine\starfield-fill-worker-tails.test.js`

Coverage tails for `fillField` — the chunked multi-worker

|                |                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-fill-worker-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                          |

## Members

### `dispatch`

wasm-pool dispatch spy — aliased once so tests can reset/re-impl it.

### `reply`

Builds a flat fill reply (`results.pos`/`results.col` triplets).

- `@param` n Point count.
- `@param` asArray When true returns plain arrays (the ArrayLike arm).
