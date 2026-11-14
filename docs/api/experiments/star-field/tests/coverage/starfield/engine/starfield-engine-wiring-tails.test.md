# `experiments\star-field\tests\coverage\starfield\engine\starfield-engine-wiring-tails.test.js`

Coverage tails for starfield-engine.ts — the facade arms

|                |                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-engine-wiring-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                            |

## Members

### `mockCtl`

Mutable bootstrap-mock flags — tests flip these to steer populate/boot-throw branches.

### `makeCanvas`

Canvas stub with a working getRootNode — the engine reads it for root-context lookups.

### `events`

Lifecycle-callback bundle the engine wiring expects — every hook a jest.fn.
