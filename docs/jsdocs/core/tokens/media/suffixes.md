# `core\tokens\media\suffixes.ts`

Media asset filename-suffix tokens. All suffixes match the

| | |
|---|---|
| **Source** | `src/core\tokens\media\suffixes.ts` |
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

### `WEBP_EXT`

Compressed image extension — webp sibling of every .jpg asset

### `WEBM_EXT`

Compressed video extension — webm sibling of every .mp4 asset
