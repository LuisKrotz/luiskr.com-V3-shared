[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/sheet](../README.md) / DrawTextSheet

Defined in: website/components/media/draw-text/sheet.ts:51

Sheet surface a draw-text host consumes: base text for legacy `<style>`
nodes, a shared constructable sheet for modern engines, and the legacy
print-tier registration.

## Methods

### baseStyleText()

```ts
baseStyleText(): string;
```

Defined in: website/components/media/draw-text/sheet.ts:53

#### Returns

`string`

the sheet's non-print css for the legacy <style> path.

---

### onPrintText()

```ts
onPrintText(apply): () => void;
```

Defined in: website/components/media/draw-text/sheet.ts:61

Registers a legacy `<style>` node's print-tier update and arms the
lazy fetch — the callback receives the composed base+print text when
the chunk resolves.

#### Parameters

##### apply

(`text`) => `void`

receives the composed sheet text.

#### Returns

unregister — call on disconnect so dead hosts drop.

() => `void`

---

### onPrintStyleNode()

```ts
onPrintStyleNode(el): () => void;
```

Defined in: website/components/media/draw-text/sheet.ts:68

Registers a legacy `<style>` ELEMENT for print-tier updates — the
node's textContent recomposes to base+print when the chunk lands.

#### Parameters

##### el

`HTMLStyleElement`

the per-host `<style>` node.

#### Returns

unregister — call on disconnect so dead hosts drop.

() => `void`

---

### getSharedSheet()

```ts
getSharedSheet(): CSSStyleSheet | null;
```

Defined in: website/components/media/draw-text/sheet.ts:75

Lazily-built shared constructable sheet — all instances adopt the one
compiled sheet instead of re-parsing the SCSS per mount.

#### Returns

`CSSStyleSheet` \| `null`

the shared sheet, or null on engines without constructable
stylesheets.
