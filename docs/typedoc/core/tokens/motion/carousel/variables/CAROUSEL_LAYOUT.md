[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/carousel](../README.md) / CAROUSEL\_LAYOUT

```ts
const CAROUSEL_LAYOUT: Readonly<{
  CIRCUMFERENCE: number
  MOBILE_BREAKPOINT: 768
  SIDE_BY_SIDE_BREAKPOINT: 960
  SWIPE_THRESHOLD: 40
  MAX_HEIGHT_VH: 70
  SKELETON_ITEM_HEIGHT: '70vh'
  CENTER_EPS_PX: 10
  VISIBILITY_RATIO: 0.15
  FIT_EPS_PX: 4
  DESKTOP_SCALE_STEPS: number[]
  DESKTOP_SCALE_MIN_W: 320
  ITEM_GAP_PX: 32
  MEDIA_MIN_WIDTH: 280
  ITEM_MARGIN_PX: 8
  ITEM_MARGIN_VW: 1024
  ITEM_PAD_768: 42
  MAX_HEIGHT_FALLBACK: 600
  RATIO_16_9: number
  RATIO_21_9: number
  RATIO_32_9: number
  HALF_NATURAL_MAX_VW: 1024
  HALF_NATURAL_SCALE: 0.5
  MULTI_FIT_MIN_VW: 3840
  ASPECT_RATIO_16_9: '16:9'
  ASPECT_RATIO_21_9: '21:9'
  ASPECT_RATIO_32_9: '32:9'
}>
```

Defined in: core/tokens/motion/carousel.ts:75

Frozen carousel map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
