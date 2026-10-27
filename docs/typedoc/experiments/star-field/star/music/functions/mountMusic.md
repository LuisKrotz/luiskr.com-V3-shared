[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/music](../README.md) / mountMusic

```ts
function mountMusic(host): void
```

Defined in: experiments/star-field/star/music.ts:81

(Re)mounts the player inside the freshly rendered .sf-music card and
re-syncs the translated aria-label — called from onMounted and every
onUpdated so a locale swap re-labels the live element.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

## Returns

`void`
