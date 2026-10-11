# `experiments/docs/loader.ts`

Boot-loader lifecycle for &lt;view-docs&gt; — mirrors the space

| | |
|---|---|
| **Source** | `src/experiments/docs/loader.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `updateDocsLoader`

Mirrors a docs boot stage into the loader overlay — stage message,
rounded percent text, and the bar's width style. The values also land
on the view's `_loaderMsg`/`_loaderPct` fields so a mid-boot re-render
(which rebuilds the shadow content) re-emits the current stage instead
of snapping back to the initial markup. All three nodes are
optional-chained so a partial loader render can't throw mid-boot.
- `@param` view The ViewDocs element.
- `@param` msg Stage message ('Indexing modules and reports', …).
- `@param` pct Progress 0–100.

### `dismissDocsLoader`

Fades the loader overlay to transparent, then removes it after the CSS
transition completes — removing earlier would clip the fade, removing
never would leave an invisible overlay intercepting pointer events.
- `@param` view The ViewDocs element.
