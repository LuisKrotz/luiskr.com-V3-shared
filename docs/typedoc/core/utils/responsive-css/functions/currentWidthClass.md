[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / currentWidthClass

```ts
function currentWidthClass(): 'mobile' | 'tablet' | 'desktop' | 'wide'
```

Defined in: core/utils/responsive-css.ts:52

The viewport's width class — evaluated widest → narrowest so the first
satisfied gate names the smallest cumulative tier that still covers the
viewport. Engines without matchMedia (jsdom, bots) report `wide` — the
full-content tier — since nothing can be ruled out.

## Returns

`"mobile"` \| `"tablet"` \| `"desktop"` \| `"wide"`
