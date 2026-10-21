[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/animation-ids](../README.md) / ANIMATION\_DESC\_ID\_PREFIX

```ts
const ANIMATION_DESC_ID_PREFIX: 'lk-anim-desc-' = 'lk-anim-desc-'
```

Defined in: core/tokens/data/animation-ids.ts:83

Long-description node id prefix — the helper injects one
`<span id="lk-anim-desc-<id>">` per animation id into each shadow
root / document that hosts a described element, and points the
element's `aria-describedby`/`longdesc` at it.
