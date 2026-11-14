# `core\tests\coverage\utils\print\print-video-cover-tails.test.js`

Coverage for core/utils/print/print.ts video arms that the

|                |                                                                       |
| -------------- | --------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-video-cover-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.             |

## Members

### `MANIFEST_KEYS`

Bucket keys the stubbed manifest claims exist — `proj/clip` carries only
its emitted video still, exactly the "no image ladder" case the cover
pick's video arm exists for. `proj/novid*` stems stay unproven so their
`.mp4.jpg` guesses resolve ''.

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `mkArticle`

Builds a reader mirror article in <body>.

### `mkVideoFigure`

Figure + open shadow, ready for media children.

### `mkImg`

Img stamped as decoded-but-dead — `complete` with zero natural width is
`currentDead` under the swap gate, so a proven `best` always writes.

### `mkPlayedVideo`

Video element stamped as decoded — readyState/videoWidth prove a frame stands.

### `mkInternalHero`

`.internal-main` block with a single figure — the hero context whose
plate-internal hoist the cover pick's second pass reads.
