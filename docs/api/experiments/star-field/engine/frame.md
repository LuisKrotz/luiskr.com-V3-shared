# `experiments\star-field\engine\frame.ts`

Per-frame orchestrator for the star-field engine: the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\frame.ts`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `tickStar`

Per-frame update, self-rescheduling via RAF:
orbits — pivot.rotation.y = phase + t·ORBIT_SPEED·speed
spins — spinner.rotation.y advances by SPIN_SPEED·spin·dt
satellites — same orbit formula on child pivots
fly — eased camera tween overrides manual control until done
render — RenderPipeline post chain when it built (bloom → vignette
→ film grain), plain renderer.render otherwise

- `@param` s Engine state.
- `@param` now RAF timestamp in ms — falls back to performance.now.

### `tickFrame`

The frame body — separated from tickStar so a throw in any update/render
step is catchable at the self-rescheduling boundary.

- `@param` s Engine state.
- `@param` now RAF timestamp in ms — falls back to performance.now.
