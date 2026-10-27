[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/suffixes](../README.md) / MEDIA

```ts
const MEDIA: Readonly<{
  MOZ: '-mozjpg'
  THUMB_SUFFIX: '3-MSSIM-tuned-kodak'
  Q50: '-50'
  Q75: '-75'
  Q100: '-uncompressed'
  MOBILE_SUFFIX: '-mobile'
  EXT: '.jpg'
  VIDEO_EXT: '.mp4'
  VIDEO_THUMB_EXT: '.mp4.jpg-thumb.jpg'
  VIDEO_SCALE: '.mp4-scaledown-2x'
  VIDEO_SCALE_4X: '.mp4-scaledown-4x'
  VIDEO_SCALE_BARE: '-scaledown-2x'
  VIDEO_SCALE_BARE_4X: '-scaledown-4x'
  THUMB_EXT: '.jpg-thumb.jpg'
  VIDEO_THUMB_WEBP_EXT: '.mp4.jpg-thumb.webp'
  THUMB_WEBP_EXT: '.jpg-thumb.webp'
  WEBP_EXT: '.webp'
  WEBM_EXT: '.webm'
}>
```

Defined in: core/tokens/media/suffixes.ts:13

Media asset filename-suffix tokens. All suffixes match the exact Firebase Storage naming convention used by the Kodak MSSIM blur-up pipeline and mozjpeg encoding passes. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
