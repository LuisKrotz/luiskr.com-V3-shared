[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/types](../README.md) / DrawTimer

```ts
type DrawTimer = ReturnType<typeof setTimeout> & object;
```

Defined in: website/components/media/draw-text/types.ts:33

A setTimeout handle that may be Node's Timeout — `unref` exists only in
Node, so the intersection type keeps `.unref?.()` callable in workers/tests.

## Type Declaration

### unref?

```ts
optional unref?: () => void;
```

#### Returns

`void`
