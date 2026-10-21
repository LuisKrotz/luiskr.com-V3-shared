[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / ModalRect

Defined in: core/store/state.ts:77

Viewport-space rectangle the expand-modal genie transition warps
from/to — the clicked figure's `getBoundingClientRect()` snapshot.
Kept on the descriptor (not the media item) because it's transition
state, not media data; null on deep-link auto-opens (the genie
resolves the figure at mount time instead).

## Properties

### x

```ts
x: number
```

Defined in: core/store/state.ts:78

---

### y

```ts
y: number
```

Defined in: core/store/state.ts:79

---

### w

```ts
w: number
```

Defined in: core/store/state.ts:80

---

### h

```ts
h: number
```

Defined in: core/store/state.ts:81
