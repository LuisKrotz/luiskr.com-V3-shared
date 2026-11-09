# `cms\media-convert\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\media-convert\render.tsx`              |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `renderIdle`

Idle-phase template — the drop-zone (folder/file drag target + hidden
Browse input) plus, once files are queued, the queue list (relative
path + size per row) and the "Convert all" trigger.

- `@param` host — the host component holding `queue`

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

Done-phase template — download/reset actions, the per-input output
tree (source filename → each emitted derivative), and a separate
error block for rows whose conversion failed.

- `@param` host — the host component holding `status.results`

### `renderError`

Error-phase template — the failure message plus either a partial-ZIP
download (when some rows still succeeded) or a plain restart button.

- `@param` host — the host component holding `error` + `status`

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

Top-level template — gates non-localhost renders to a notice card
(the conversion API only exists on the dev server), then the title
card, the toolchain setup panel, and the phase switch
(idle/uploading/converting/done/error) with a busy spinner row for
the two in-flight phases.

- `@param` host — the host component exposing `phase` + per-phase renders
