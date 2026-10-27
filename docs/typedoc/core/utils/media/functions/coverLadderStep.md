[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/media](../README.md) / coverLadderStep

```ts
function coverLadderStep(registry, coverKey, img, rungs, loadedClass, mobileRungs?): void
```

Defined in: core/utils/media.ts:178

`load` step on a progressive cover's high layer — the ladder walker.
Records the painted URL in the host registry (re-renders rebuild the
shadow DOM wholesale via replaceChildren, so the registry is what
re-emits the reached tier instead of replaying from the LQIP) and
publishes the loaded class driving the CSS crossfade. When rungs
remain above the painted one it preloads the next tier through a
detached Image — the probe request doubles as the webp decode check —
and only once bytes confirm does the tier go live. The upgrade never
reassigns the painted img's `src` (that blanks the box while the new
resource re-decodes); instead the confirmed tier mounts as a NEW
stacked sibling whose own `load` retires the layer underneath, so no
frame ever paints empty.

## Parameters

### registry

`Map`\<`string`, `string`\> \| `undefined`

Host map of cover key → highest confirmed painted URL
(undefined-tolerant: a bare host still gets the class + the climb, it
just can't persist the reached tier across re-renders).

### coverKey

`string`

Stable identity of the cover (the original URL).

### img

`HTMLImageElement` \| `null`

The high-layer img that fired `load` (event currentTarget).

### rungs

[`CoverRung`](../manifest/interfaces/CoverRung.md)[]

Ascending proven tiers from coverVariants — last is top.

### loadedClass

`string`

Class token that turns the layer's opacity on.

### mobileRungs?

[`CoverRung`](../manifest/interfaces/CoverRung.md)[] = `[]`

Ascending rungs on the `{stem}-mobile` ladder —
when the rendered box is ≤768 CSS px and the manifest proves mobile
tiers exist, this ladder replaces `rungs` wholesale: every mobile
rung is a fraction of its full-width twin's bytes and the box cannot
resolve the difference anyway.

## Returns

`void`
