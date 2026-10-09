# `experiments/star-field/star/boot.ts`

Engine bootstrap for StarField — constructs StarFieldEngine

| | |
|---|---|
| **Source** | `src/experiments/star-field/star/boot.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `updateStarLoader`

Mirrors an engine progress event into the loader overlay — message,
rounded percent text, and the bar fill width. Nodes are optional-chained
so a partial render can't throw mid-boot.
- `@param` c The StarField element.
- `@param` msg Stage message.
- `@param` pct Progress 0–100.

### `initStarFieldEngine`

Constructs the StarFieldEngine and wires its lifecycle: progress →
loader overlay; select → dossier load + live announce; approach →
dossier prefetch; hover → live announce; ready → reduced-motion flag +
loader dismiss. A failed init still resolves the loader so the page
isn't stuck behind a broken overlay.
- `@param` c The StarField element.

### `dismissStarLoader`

Fades the loader overlay to transparent then removes it after the CSS
transition completes — removing earlier would clip the fade, removing
never would leave an invisible overlay intercepting pointer events.
- `@param` c The StarField element.
