# `shared\scripts\verify\console-scan.mjs`

Scans every .ts/.tsx/.js file under src/ for console usage. Policy:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\console-scan.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `scanLines`

Per-line scanner: tracks block-comment state across lines (multi-line
comments preserve line numbers), blanks out line comments, then blanks
single-line string literals so `console.log` inside a string or comment
is never flagged. Single/double-quoted JS strings can't contain raw
newlines, so per-line stripping is safe; template literals are stripped
per-line too — a false-negative inside a multiline template is harmless
(console calls inside template text aren't real callsites anyway).
