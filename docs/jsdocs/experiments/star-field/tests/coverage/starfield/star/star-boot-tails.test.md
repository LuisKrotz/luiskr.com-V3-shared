# `experiments\star-field\tests\coverage\starfield\star\star-boot-tails.test.js`

Coverage tails for star/boot.ts — the engine-event wiring

|                |                                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\star\star-boot-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                            |

## Members

### `mockCtl`

Mutable engine-mock flags — tests flip these to steer init-fail, event, and destroy branches.

### `makeHost`

Component-host stub — the fields star-boot touches, overridable per test.

### `flush`

Timer flush — drains the engine's queued promises between actions.
