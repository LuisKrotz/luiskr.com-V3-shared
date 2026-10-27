[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/a11y/animation-desc](../README.md) / applyAnimationDesc

```ts
function applyAnimationDesc(el, id): void
```

Defined in: core/utils/a11y/animation-desc.ts:203

Places an animated element's translated description into the DOM —
a crawler-only `<span class="sr-only" aria-hidden="true">` sibling
node carrying the longdesc. No ARIA wiring and no canvas fallback
text: the element's own accessibility is left untouched (inner text
on a labelled canvas would mismatch its accessible name — the
Label-in-Name failure).

Safe to call on every mount/locale-change: the desc node is created
once per (root, id) and only re-texted afterwards. Elements without
a resolvable description are left untouched.

## Parameters

### el

`Element`

The animated element (any Element — canvas, img, div, button…).

### id

`string`

ANIMATION_IDS entry naming its animation.

## Returns

`void`
