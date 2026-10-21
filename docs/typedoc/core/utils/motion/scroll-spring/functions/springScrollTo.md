[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/scroll-spring](../README.md) / springScrollTo

```ts
function springScrollTo(track, target, animClass, onSettle?, instant?): void
```

Defined in: core/utils/motion/scroll-spring.ts:107

Spring-scrolls `track` to `target` scrollLeft. Mid-flight retargets
preserve velocity (the organic part — a rapid double-tap nav curves
onto the new course instead of restarting). When a spring is already
live only the target/onSettle update — the loop keeps its frame cadence.

## Parameters

### track

`Element`

The scrolling element (the carousel track).

### target

`number`

Target scrollLeft (px).

### animClass

`string`

Track modifier class that disables CSS snap+smooth
while the spring drives.

### onSettle?

(() => `void`) \| `null`

Called once on settle — normal completion path for
clone teleports and the isNavigating release.

### instant?

`boolean` = `false`

Reduced-motion / no-animation escape: writes the
target directly, kills any live spring, fires onSettle now.

## Returns

`void`
