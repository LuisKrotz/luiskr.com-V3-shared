# `experiments\star-field\star\music.ts`

Ambient playlist player for the star-field view — one

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\star\music.ts`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_DEFAULTS`

English snapshot for the pages/star-field node — pre-fetch labels.

### `syncPlaying`

Mirrors the live transport state into host fields and repaints the
controls row — bound once to the persistent element's play/pause
events so both the custom buttons and the native controls stay in
sync however playback changes.

- `@param` host The StarField component.
- `@param` playing Whether playback just started (play) or stopped (pause).

### `getMusicEl`

The persistent playlist element — created once with the native
controls (play/seek/volume stay the browser's accessible interface),
the `nodownload` controls list, the `ended` auto-advance binding and
the play/pause state mirrors that keep the transport row's icons
truthful. Re-inserted by mountMusic() after every render rebuild
because the .sf-music card is JSX and gets replaced wholesale.

- `@param` host The StarField component.
- `@returns` The shared <audio> element bound to the playlist.

### `mountMusic`

(Re)mounts the player inside the freshly rendered .sf-music card and
re-syncs the translated aria-label — called from onMounted and every
onUpdated so a locale swap re-labels the live element.

- `@param` host The StarField component.

### `playMusic`

Selects and plays a playlist track — retargets src only when it
actually changed (a re-tap on the loaded track just resumes), then
re-renders so the list repaints its active row. Playback rejection
(autoplay policy before a user gesture) is swallowed — the native
controls stay available to press play.

- `@param` host The StarField component.
- `@param` index Track index into SF_MUSIC_TRACKS.

### `nextMusic`

Advances to the next playlist track, wrapping to the first after the
last — bound once to the element's `ended` event so the playlist
chains without extra wiring, and reused by the next transport button.

- `@param` host The StarField component.

### `prevMusic`

Steps back one playlist track, wrapping to the last from the first —
the previous transport button's handler.

- `@param` host The StarField component.

### `toggleMusicPlay`

Play/pause toggle for the transport row — starts the current track
when paused (same swallowed autoplay rejection as playMusic) and
pauses when playing. The play/pause event listeners own the state
repaint, so this only drives the element.

- `@param` host The StarField component.

### `toggleMusicRepeat`

Repeat toggle — flips the host flag and the element's `loop`
attribute: engaged, the current track replays in place and `ended`
never fires; disengaged, the playlist auto-advance returns.

- `@param` host The StarField component.

### `autoplayMusic`

Mount-time autoplay — skipped under prefers-reduced-motion (the
screen-reader proxy) so AT sessions start silent; anyone can still
press play. The rejection is swallowed for the same autoplay-policy
reason as playMusic.

- `@param` host The StarField component.
