# `website\components\media\MediaExpanded.tsx`

&lt;media-expanded&gt; — full-screen media viewer inside the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\MediaExpanded.tsx`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MediaExpanded`

The MediaExpanded — expanded class.

### `_genieSheet`

Baked warp sheet reused across this modal's open→close pair — keyed
on (content, dpr, viewport, theme): any of those changing rebakes.
Invalidated when the media item's pixels or box change after the
bake (full-res swap, figure-loaded flip). The sheet's restamp
sources are live element refs, so a <video> sheet stays current
frame-by-frame without a rebake.

### `source`

Full-res media URL (from the source attribute).

### `sourceWebm`

Webm sibling of an .mp4 source — first <source> when the manifest
proves it ('' otherwise — an unproven sibling is a doomed request,
same gate as the figure's resolveMediaSources).

### `thumb`

Low-res thumbnail URL shown while the full asset loads.
The stamped variant is offered only when the manifest proves it —
an unproven layer would 404 into a transparent img (flat letterbox
bands — the "missing blur" bug). Images fall back to the full
source — always present, invisible under cover+blur; videos
withhold the layer entirely since an mp4 can't be an <img> src.

### `alt`

Alt text for the media.

### `stem`

Extensionless CDN stem the a11y siblings (.vtt / _longdesc.txt)
derive from — stamped by the modal openers alongside `source`.

### `a11yTracks`

Manifest-gated description tracks for the expanded video — same
16-locale set the owning <media-figure> emits.

### `longdesc`

Localized longdesc URL for the expanded image ('' when ungenerated).

### `mediaWidth`

Natural media width attribute.

### `mediaHeight`

Natural media height attribute.

### `isVideo`

Whether the source is a video.

### `placeholder`

Placeholder box style while the full asset loads.

### `startClose`

Dismissal sequence — CSS zoom-out, then URL/dialog/scroll teardown (see expanded-close.ts).

### (module scope)

JSX template (see expanded-render.tsx).
