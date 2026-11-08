[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/layout](../README.md) / syncTitleMarquee

```ts
function syncTitleMarquee(c): void
```

Defined in: website/views/project/layout.ts:266

Title-marquee fit + duration sync. Measures one "TITLE |" unit and
repeats it ceil(viewportW ÷ unitW) + SAFETY_REPEAT times per half, so
each half always spans the viewport and the -50% loop never shows a
gap — short titles on wide screens just get more repetitions. Then
derives animation-duration = halfW ÷ SPEED_PX_S (halfW = count × unitW)
so the ticker drifts at a constant px/s regardless of title length or
viewport. The CSS fallback (60s) covers the pre-measure window; a
zero-width unit (skeleton state, hidden root) leaves everything in place.

## Parameters

### c

[`ViewProject`](../../Project/classes/ViewProject.md)

The ViewProject instance.

## Returns

`void`
