# `cms/media-convert/render.tsx`

| | |
|---|---|
| **Source** | `src/cms/media-convert/render.tsx` |
| **UX surface** | Batch image→WebP conversion pipeline UI. |

## Members

### `renderIdle`

Renders idle.
- `@param` host — the host component

### `renderProgress`

Renders the live progress bar for the media conversion batch —
label + a percent fill computed from done/total (0 when total is 0).
- `@param` {string} label — the phase label shown next to the bar
- `@param` {number} done — items completed so far
- `@param` {number} total — items in the batch

### `renderConverting`

Renders converting.
- `@param` host — the host component

### `renderDone`

Renders done.
- `@param` host — the host component

### `renderError`

Renders error.
- `@param` host — the host component

### `renderTools`

Renders the guided toolchain-setup panel — hidden while the report is
unfetched or every tool is present. Required tools (ffmpeg/ffprobe)
block conversion; optional ones (ImageMagick, cjpeg) fall back to
ffmpeg encoders, so their state badge reads optional rather than ✗.
The install plan shows the detected manager's copyable commands; the
Install button only appears when the plan can run without a root shell
(brew/winget/choco) — sudo managers get manual commands instead.
- `@param` host — the host component

### `renderMediaConverter`

Renders media converter.
- `@param` host — the host component
