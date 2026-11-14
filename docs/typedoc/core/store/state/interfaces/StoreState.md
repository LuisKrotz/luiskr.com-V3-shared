[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / StoreState

Defined in: core/store/state.ts:116

The whole reactive state bag. Field naming follows the shape the legacy
CMS data already uses (clickortap, marqueeamount, portfoliolist are
snake/flat because they mirror DB keys verbatim — renaming would break
the translation payload contract).

## Properties

### clickortap

```ts
clickortap: string
```

Defined in: core/store/state.ts:117

---

### inputMethod

```ts
inputMethod: string
```

Defined in: core/store/state.ts:118

---

### actionTextMap

```ts
actionTextMap: ActionTextMap
```

Defined in: core/store/state.ts:119

---

### has\_touch

```ts
has_touch: boolean
```

Defined in: core/store/state.ts:120

---

### lang

```ts
lang: LangState
```

Defined in: core/store/state.ts:121

---

### mentions

```ts
mentions: MentionsState
```

Defined in: core/store/state.ts:122

---

### marqueeamount

```ts
marqueeamount: number
```

Defined in: core/store/state.ts:123

---

### modalObject

```ts
modalObject: ModalObject
```

Defined in: core/store/state.ts:124

---

### origin

```ts
origin: string
```

Defined in: core/store/state.ts:125

---

### page

```ts
page: PagePos
```

Defined in: core/store/state.ts:126

---

### showhover

```ts
showhover: boolean
```

Defined in: core/store/state.ts:127

---

### storage

```ts
storage: string
```

Defined in: core/store/state.ts:128

---

### reducedMotion

```ts
reducedMotion: boolean
```

Defined in: core/store/state.ts:129

---

### highContrast

```ts
highContrast: boolean
```

Defined in: core/store/state.ts:130

---

### theme

```ts
theme: string
```

Defined in: core/store/state.ts:131

---

### showStatsForNerds

```ts
showStatsForNerds: boolean
```

Defined in: core/store/state.ts:132

---

### showGrid

```ts
showGrid: boolean
```

Defined in: core/store/state.ts:133

---

### videoAutoplay

```ts
videoAutoplay: boolean
```

Defined in: core/store/state.ts:134

---

### effectiveTheme

```ts
effectiveTheme: string
```

Defined in: core/store/state.ts:135

---

### preferencesOpen

```ts
preferencesOpen: boolean
```

Defined in: core/store/state.ts:136

---

### langDialogOpen

```ts
langDialogOpen: boolean
```

Defined in: core/store/state.ts:137

---

### navMenuOpen

```ts
navMenuOpen: boolean
```

Defined in: core/store/state.ts:138

---

### searchModalOpen

```ts
searchModalOpen: boolean
```

Defined in: core/store/state.ts:139

---

### modalOrigin

```ts
modalOrigin:
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: core/store/state.ts:140

---

### portfoliolist

```ts
portfoliolist: unknown[];
```

Defined in: core/store/state.ts:141
