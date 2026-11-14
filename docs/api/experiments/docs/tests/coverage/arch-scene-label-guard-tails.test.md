# `experiments\docs\tests\coverage\arch-scene-label-guard-tails.test.js`

Coverage tail for arch-scene.ts `makeLabel`'s texture guard —

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\arch-scene-label-guard-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                    |

## Members

### `mockThreeState`

Mutable flags the three.js mock reads per-call — tests flip rendererThrow to hit the constructor-failure branch.

### `ROOTS`

Docs-tree fixture the scene walks — two roots with nested dir/file children to exercise label-resolution branches.

### `flush`

Timer flush — mounted render/label queues need real timers past microtasks.
