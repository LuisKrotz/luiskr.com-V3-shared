[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/render](../README.md) / DrawRenderCtx

Defined in: website/components/media/draw-text/render.ts:140

Per-mount render context — the delay/offset pair bound into every
char's stagger vars, threaded through the token→HTML walkers so tag
wrappers can emit vars that must agree with them (a <q>'s generated
quote marks animate on the adjacent chars' delays — see tagToHtml).

## Properties

### delay

```ts
delay: number
```

Defined in: website/components/media/draw-text/render.ts:142

Per-char stagger ms — the value each char writes to `--char-delay`.

---

### offset

```ts
offset: number
```

Defined in: website/components/media/draw-text/render.ts:144

Base ms before any char starts — the value each char writes to `--offset`.
