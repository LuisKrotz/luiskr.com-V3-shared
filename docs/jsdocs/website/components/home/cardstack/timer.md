# `website\components\home\cardstack\timer.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\timer.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `autoElapsed`

Milliseconds into the current countdown — the banked elapsed from
before the last (re)start plus the in-flight span while the clock
runs. The progress writer reads it per frame; a frozen clock (paused
or off-screen held) reports the banked figure so the border light
hangs mid-fill exactly where the pause left it.

- `@param` host The CardStack element.
- `@returns` Elapsed ms in [0, AUTOPLAY_MS]; 0 when autoplay is off.
