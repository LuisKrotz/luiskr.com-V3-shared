# `core\tokens\starfield\music.ts`

Ambient playlist for the Star Field experiment — the MP3

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\music.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_CDN`

CDN root the star-field soundtrack set uploads under.

### (module scope)

One playlist entry — a CDN MP3 asset plus its display title.

### `src`

Absolute CDN URL of the MP3 asset.

### `title`

Display title shown in the playlist (`Title — Artist`).

### `SF_MUSIC_TRACKS`

Frozen ambient-playlist track list — declaration order is the play
order; the player's `ended` handler auto-advances and wraps back to
the first track so the soundtrack runs continuously once started.

### `SF_MUSIC_GLYPHS`

Frozen transport-button glyphs — the compact play/pause/prev/next/
repeat icons rendered inside the playlist controls row (JSX decodes
the literal directly; aria-labels carry the localized name).
