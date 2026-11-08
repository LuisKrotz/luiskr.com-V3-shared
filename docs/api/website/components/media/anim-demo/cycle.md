# `website\components\media\anim-demo\cycle.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\cycle.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DEMO_BEAT_MS`

One choreography beat (ms) — the dwell between demo state flips.

### `DEMO_BEAT_LONG_MS`

Long beat (ms) — multi-phase demos that need settle time between steps.

### `reducedMotion`

Whether the visitor prefers reduced motion — demo loops honor it the
same way the widgets do (they render one settled frame instead of a
moving cycle).

- `@returns` true when motion is reduced.

### `cycle`

Repeating step sequencer — runs `steps[i % steps.length]` every `ms`,
advancing i so a demo walks an open→hold→close→hold choreography.
Skips scheduling entirely under reduced motion (the staged widget's
own reduced path paints its settled frame; the steps would only snap
states nobody should watch move).

- `@param` ms Interval between steps.
- `@param` steps Ordered step callbacks — each performs one state change.
- `@param` immediate Run step 0 at mount instead of waiting a beat —
- `@returns` Teardown clearing the interval.

### `after`

Fires `fn` once after `ms` — used to start a demo's first beat on the
next breath instead of synchronously inside mount (the stage must
paint once before the first state flip lands).

- `@param` ms Delay.
- `@param` fn The deferred callback.
- `@returns` Teardown clearing the timeout.
