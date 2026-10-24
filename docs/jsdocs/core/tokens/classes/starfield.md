# `core\tokens\classes\starfield.ts`

Star-field experiment class tokens (`sf-*` block) —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\starfield.ts`                    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SF_CLASSES`

Frozen sf class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.

### `SF_DISCLAIMER`

Bottom-edge scale disclaimer strip (localized per locale node).

### `SF_TIP_EDGE`

Edge-hint mode — marker clamped to the canvas edge; line rotates to point.

### `SF_TIP_FLIPX`

Label flips left of the marker — right-edge clamps keep it readable.

### `SF_TIP_FLIPY`

Label drops below the marker — top-edge clamps keep it on-canvas.

### `SF_NAV_PIN`

Sticky pinned strip inside the scrolling panel (head + search).

### `SF_NAV_DISCLAIMER`

In-drawer scale disclaimer — mobile home for the honesty note.

### `SF_INSTRUCTIONS_KEYS`

Keyboard-shortcut definition list inside the instructions modal.

### `SF_INSTRUCTIONS_KEY`

One shortcut row — <kbd> keycap + action description.

### `SF_INSTRUCTIONS_KEYCAP`

The <kbd> keycap itself.

### `SF_BADGE`

The glass chip anchor pinned under the site logo.

### `SF_BADGE_LOGO`

Provider mark inside the chip (inverted under the dark theme).

### `SF_BADGE_COPY`

Two-line text stack — eyebrow over the provider name.

### `SF_BADGE_EYEBROW`

"Featured on" eyebrow line.

### `SF_BADGE_NAME`

Provider-name line.

### `SF_MUSIC`

The playlist card — track list plus the persistent native audio.

### `SF_MUSIC_HEAD`

Header row — the transport cluster + collapse toggle.

### `SF_MUSIC_TOGGLE`

Playlist title/collapse toggle — expands or folds the track list.

### `SF_MUSIC_OPEN`

Expanded state — the track list is out; collapsed keeps the bar.

### `SF_MUSIC_LIST`

The <ul> track list — one button per track.

### `SF_MUSIC_TRACK`

One track button — loads + plays that track on click.

### `SF_MUSIC_TRACK_ACTIVE`

Active-track marker — the row currently loaded in the player.

### `SF_MUSIC_CONTROLS`

Transport row — play/pause, prev/next and the repeat toggle.

### `SF_MUSIC_BTN`

One transport button in the controls row.

### `SF_MUSIC_BTN_ON`

Repeat-loop engaged state on the repeat transport button.

### `SF_MUSIC_AUDIO`

The persistent native <audio> element (survives render rebuilds).

### `SF_POINTER_ONLY`

Pointer-copy sections — rendered only under any-pointer:fine.

### `SF_TOUCH_ONLY`

Gesture-copy sections — rendered only under any-pointer:coarse.
