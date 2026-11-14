[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/sheet](../README.md) / onPrintStyleNode

```ts
function onPrintStyleNode(el): () => void
```

Defined in: website/components/media/draw-text/sheet.ts:209

Registers a legacy `<style>` ELEMENT for print-tier updates — the
node's textContent recomposes to base+print when the chunk lands.

## Parameters

### el

`HTMLStyleElement`

the per-host `<style>` node.

## Returns

unregister — call on disconnect so dead hosts drop.

() => `void`
