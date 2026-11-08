[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/expand-spring](../README.md) / springExpandTo

```ts
function springExpandTo(el, target, onSettle?, instant?, write?, from?): void
```

Defined in: core/utils/motion/expand-spring.ts:114

Spring-drives `el`'s height toward `target` px. Mid-flight retargets
preserve velocity — a result list that grows again before settling
curves onto the new course instead of restarting. When a spring is
already live only the target/onSettle update — the loop keeps its
frame cadence.

## Parameters

### el

`HTMLElement`

The element whose height chases the target.

### target

`number`

Target height in px (`scrollHeight` for natural growth).

### onSettle?

(() => `void`) \| `null`

Called once on settle — the caller's completion path
(release the inline height, commit `hidden`, …).

### instant?

`boolean` = `false`

Reduced-motion escape: writes the target directly,
kills any live spring, fires onSettle now.

### write?

(`el`, `v`) => `void`

Optional per-frame render hook receiving the px chase
position — defaults to writing `style.height`. Composited reveals
(clip-path, transform) supply their own to stay off the layout path.

### from?

`number`

Optional explicit start position — composited reveals
don't shrink the box, so callers supply the chase origin (e.g. 0)
instead of letting the rect report the natural height.

## Returns

`void`
