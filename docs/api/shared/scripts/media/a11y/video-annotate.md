# `shared\scripts\media\a11y\video-annotate.mjs`

Video Intelligence client — submits `videos:annotate`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\video-annotate.mjs`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `POLL_MS`

Poll interval — annotate ops run ~30–90s on minute-scale videos.

### `POLL_TIMEOUT_MS`

Operations older than this are abandoned rather than polled forever.

### (module scope)

Submits an annotate operation for one video.

- `@param` {string} gsUri `gs://bucket/key` input URI.
- `@returns` {Promise<string>} Operation name for polling.

### (module scope)

Polls one operation until `done`, returning `response` (or throwing on
`error`/timeout).

- `@param` {string} opName Operation name from submitVideoAnnotate.
- `@param` {(msg: string) => void} [log] Optional progress sink.
- `@returns` {Promise<object>} The operation's `response` payload.

### (module scope)

Full annotate round-trip for one video → `annotationResults[0]`.

- `@param` {string} gsUri `gs://bucket/key` input URI.
- `@param` {(msg: string) => void} [log] Progress sink.
- `@returns` {Promise<object>} Annotation result for the video.
