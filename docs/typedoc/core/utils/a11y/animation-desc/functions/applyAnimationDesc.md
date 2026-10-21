[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/a11y/animation-desc](../README.md) / applyAnimationDesc

```ts
function applyAnimationDesc(el, id): void
```

Defined in: core/utils/a11y/animation-desc.ts:199

Binds an animated element to its translated description — sets the
accessible name (alt/aria-label), `aria-describedby` (+ `longdesc`
on imgs, fallback content on canvases) pointing at a hidden desc
node injected into the element's own root.

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
