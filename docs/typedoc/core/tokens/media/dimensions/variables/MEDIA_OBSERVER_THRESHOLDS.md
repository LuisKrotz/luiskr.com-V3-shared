[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/dimensions](../README.md) / MEDIA\_OBSERVER\_THRESHOLDS

```ts
const MEDIA_OBSERVER_THRESHOLDS: Readonly<{
  VIDEO_OBSERVER_THRESHOLD: 0.15
  IMAGE_OBSERVER_THRESHOLD: 0.01
}>
```

Defined in: core/tokens/media/dimensions.ts:78

Frozen IntersectionObserver visibility fractions for media figures —
`VIDEO_OBSERVER_THRESHOLD` (0.15) is the share of the video box that
must be on-screen before its poster/stream attach is even scheduled;
`IMAGE_OBSERVER_THRESHOLD` (0.01) is the hair-trigger for the lazy
high-res climb and the wider CDN warm band, whose generous rootMargins
do the real prefetch shaping.
