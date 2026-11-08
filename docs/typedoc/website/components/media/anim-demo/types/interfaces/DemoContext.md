[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/types](../README.md) / DemoContext

Defined in: website/components/media/anim-demo/types.ts:13

One driver's mount context — everything it needs from the host.

## Properties

### host

```ts
host: AnimDemo
```

Defined in: website/components/media/anim-demo/types.ts:16

The <anim-demo> host — exposes the shadow-scoped `$`/`$$` helpers
the genie + burn contracts require and owns the demo's lifecycle.

---

### stage

```ts
stage: HTMLElement
```

Defined in: website/components/media/anim-demo/types.ts:18

The stage root (`anim-demo` class element) rendered for this id.

---

### id

```ts
id: string
```

Defined in: website/components/media/anim-demo/types.ts:21

The ANIMATION_IDS entry being demoed — drivers read record copy
(alt/longdesc) through it when staged text is needed.
