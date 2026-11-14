[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/accessibility](../README.md) / DescriptionTrack

Defined in: core/utils/media/accessibility.ts:31

One `<track kind="descriptions">` source descriptor — everything the JSX
layer needs to emit the element: fetch URL, BCP-47 `srclang`, the
human-readable `label`, and whether this track is the `default` one the
browser activates when the user enables text descriptions.

## Properties

### src

```ts
src: string
```

Defined in: core/utils/media/accessibility.ts:33

Fetch URL of the localized .vtt sibling.

---

### srclang

```ts
srclang: string
```

Defined in: core/utils/media/accessibility.ts:35

BCP-47 language tag stamped on `srclang` (hrk→hrx, tln→vec…).

---

### label

```ts
label: string
```

Defined in: core/utils/media/accessibility.ts:37

Human language name shown in caption pickers ('Português', 'Deutsch').

---

### locale

```ts
locale: string
```

Defined in: core/utils/media/accessibility.ts:39

Site locale code this track serves — key for the file naming.

---

### isDefault

```ts
isDefault: boolean
```

Defined in: core/utils/media/accessibility.ts:41

Whether the browser selects this track without user choice.
