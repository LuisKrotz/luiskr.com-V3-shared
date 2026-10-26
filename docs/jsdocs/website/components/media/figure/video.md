# `website\components\media\figure\video.ts`

Video playback plumbing for &lt;media-figure&gt;: lazy &lt;source&gt;

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\figure\video.ts`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ensureVideoSource`

Sets the <source> src on a video element when it becomes playable.

### `playVideo`

Starts muted playback honoring reduced-motion/autoplay prefs.

### `pauseVideo`

Pauses playback (offscreen or pref change).

### `syncVideoPlayback`

Store change → start/stop playback to match autoplay + visibility.
An open expand modal, nav menu, or preferences/language dialog puts
the page behind a covering layer — background videos must pause
(decoding + compositing them under the overlay is pure waste and
their frames shimmer through the glass). The modal's own <video> is
not a media-figure, so only page figures gate here; on close this
sync re-runs and autoplay+visible videos resume.
