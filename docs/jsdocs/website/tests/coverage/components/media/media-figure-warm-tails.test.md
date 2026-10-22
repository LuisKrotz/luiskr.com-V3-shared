# `website\tests\coverage\components\media\media-figure-warm-tails.test.js`

Coverage tail for the CDN warm-up path — warmFirstRung's

| | |
|---|---|
| **Source** | `src/website\tests\coverage\components\media\media-figure-warm-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `detachedFigure`

Detached figure carrying only attrs — never appended, so the mount
observers can't race the explicit warmFirstRung probe.
