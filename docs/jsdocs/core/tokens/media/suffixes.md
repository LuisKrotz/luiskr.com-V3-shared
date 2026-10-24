# `core\tokens\media\suffixes.ts`

Media asset filename-suffix tokens. All suffixes match the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\media\suffixes.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MOZ`

Base mozjpeg prefix used in all derived filenames

### `THUMB_SUFFIX`

Thumb quality suffix → kodak MSSIM-tuned q=3

### `Q50`

Q50 medium-res suffix

### `Q75`

Q75 high-res suffix

### `Q100`

Q100 / uncompressed lossless suffix

### `MOBILE_SUFFIX`

Small-viewport derivative suffix (appended after the quality tag)

### `EXT`

Static image extension

### `VIDEO_EXT`

Video extension

### `VIDEO_THUMB_EXT`

Video poster/thumb extension (appended after .mp4)

### `VIDEO_SCALE`

2× scale-down video variant suffix

### `VIDEO_SCALE_4X`

4× scale-down video variant suffix — smallest poster frames on the bucket

### `VIDEO_SCALE_BARE`

2× scale-down suffix for older poster variants that omit the .mp4 prefix

### `VIDEO_SCALE_BARE_4X`

4× scale-down suffix for older poster variants that omit the .mp4 prefix

### `THUMB_EXT`

Poster/thumb extension without the leading .mp4 marker

### `VIDEO_THUMB_WEBP_EXT`

Webp poster sibling — the bucket's thumb webp form is .jpg-thumb.webp
(replaces the trailing .jpg, never .jpg-thumb.jpg.webp).

### `THUMB_WEBP_EXT`

Webp thumb extension without the leading .mp4 marker

### `WEBP_EXT`

Compressed image extension — webp sibling of every .jpg asset

### `WEBM_EXT`

Compressed video extension — webm sibling of every .mp4 asset
