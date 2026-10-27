# `shared\scripts\verify\scroll-fps.mjs`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\scroll-fps.mjs`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `resolveChrome`

Locates a Chrome/Chromium binary for puppeteer-core (which ships no
browser). Prefers explicit env vars, then the puppeteer cache, then
well-known system installs.

- `@returns` {string} absolute path to an executable Chrome binary

### (module scope)

Starts `vite preview` for the built dist and waits until it answers.

- `@returns` {import('node:child_process').ChildProcess} the server process

### `collectScrollFrames`

Scrolls `document.scrollingElement` to the bottom over `SCROLL_MS` inside
the page while a rAF ticker records every inter-frame delta. Returns
the collected deltas (ms) for the harness to reduce.

- `@param` {number} scrollMs — scroll duration, passed in because evaluate
- `@returns` {Promise<number[]>} per-frame deltas in milliseconds

### `summarize`

Reduces raw frame deltas into the gate metrics.

- `@param` {number[]} deltas — per-frame milliseconds
- `@returns` {{ fps: number, avg: number, p95: number, count: number }}
