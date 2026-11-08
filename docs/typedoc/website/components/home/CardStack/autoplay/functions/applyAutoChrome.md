[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/autoplay](../README.md) / applyAutoChrome

```ts
function applyAutoChrome(host): void
```

Defined in: website/components/home/cardstack/autoplay.ts:34

Publishes the countdown state to the DOM: the section's --auto /
--auto-paused modifiers drive the border light's visibility and
freeze, and the transport button's --armed class + aria-label swap
the pause-bars/play-triangle glyph so it always shows the action it
performs. Imperative (no re-render) — same contract as
applyIndexState.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
