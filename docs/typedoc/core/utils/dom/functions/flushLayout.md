[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / flushLayout

```ts
function flushLayout(el): number
```

Defined in: core/utils/dom.ts:258

Deliberate synchronous layout flush — the ONE sanctioned forced reflow.
Used by the transition-restart pattern: write classes/styles, force
layout so the browser commits them, then apply the animating class in
the same frame. Callers get the element's offsetHeight as a side effect
of the flush; the return value is meant to be ignored (`void`).

## Parameters

### el

`HTMLElement`

Element whose layout is flushed.

## Returns

`number`

the element's offsetHeight (the flushing read).
