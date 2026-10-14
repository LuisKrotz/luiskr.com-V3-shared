# `experiments/star-field/engine/mobile.ts`

Mobile/low-power capability bail-out for the star-field

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/mobile.ts`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LOW_POWER_LIMITS`

Low-end hardware ceilings — below these the GPU boot is a guaranteed
freeze even on desktop UAs (software rasterizers, thin clients).
`CORES` is a navigator.hardwareConcurrency floor, `MEMORY_GB` the
deviceMemory floor; either signal alone marks the device weak.

### `isLowPowerMobile`

Whether the runtime is a mobile-class or clearly low-power device —
mobile UA token (Android/Mobile — iPhone/iPad already bail through
isIOSDevice before this runs), or hardware hints below the
LOW_POWER_LIMITS floor. Returns false on capable desktops and when
navigator is unavailable.

- `@returns` true when the engine should skip the GPU boot for the 2D fallback.
