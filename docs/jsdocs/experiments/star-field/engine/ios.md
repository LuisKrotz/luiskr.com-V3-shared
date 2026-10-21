# `experiments\star-field\engine\ios.ts`

iOS/iPadOS capability bail-out for the star-field engine.

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\ios.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `isIOSDevice`

Whether the runtime is an iOS-family device — direct iPhone/iPad/iPod
UA match, or iPadOS 13+ "desktop mode" which reports a Macintosh UA
while still exposing multi-touch (`maxTouchPoints > 0`).
- `@returns` true on iPhone, iPad and iPod touch; false everywhere else.
