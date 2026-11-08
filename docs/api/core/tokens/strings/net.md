# `core\tokens\strings\net.ts`

Network/URL string tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\net.ts`                          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `NET_STRINGS`

Frozen net string map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `SCHEME_MAILTO`

URI scheme prefixes on contact-channel hrefs — the mail block is the
row whose link carries the mailto scheme.

### `MIME_RSS`

RSS 2.0 media type — `type` hint on links to the locale feed.

### `EFFECTIVE_SLOW_2G`

Network Information API effectiveType values (connection quality tiers).
