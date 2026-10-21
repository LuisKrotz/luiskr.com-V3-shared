[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / StoreState

Defined in: core/store/state.ts:113

The whole reactive state bag. Field naming follows the shape the legacy
CMS data already uses (clickortap, marqueeamount, portfoliolist are
snake/flat because they mirror DB keys verbatim — renaming would break
the translation payload contract).

## Properties

### clickortap

```ts
clickortap: string
```

Defined in: core/store/state.ts:114

---

### inputMethod

```ts
inputMethod: string
```

Defined in: core/store/state.ts:115

---

### actionTextMap

```ts
actionTextMap: ActionTextMap
```

Defined in: core/store/state.ts:116

---

### has\_touch

```ts
has_touch: boolean
```

Defined in: core/store/state.ts:117

---

### lang

```ts
lang: LangState
```

Defined in: core/store/state.ts:118

---

### mentions

```ts
mentions: MentionsState
```

Defined in: core/store/state.ts:119

---

### marqueeamount

```ts
marqueeamount: number
```

Defined in: core/store/state.ts:120

---

### modalObject

```ts
modalObject: ModalObject
```

Defined in: core/store/state.ts:121

---

### origin

```ts
origin: string
```

Defined in: core/store/state.ts:122

---

### page

```ts
page: PagePos
```

Defined in: core/store/state.ts:123

---

### showhover

```ts
showhover: boolean
```

Defined in: core/store/state.ts:124

---

### storage

```ts
storage: string
```

Defined in: core/store/state.ts:125

---

### reducedMotion

```ts
reducedMotion: boolean
```

Defined in: core/store/state.ts:126

---

### theme

```ts
theme: string
```

Defined in: core/store/state.ts:127

---

### showStatsForNerds

```ts
showStatsForNerds: boolean
```

Defined in: core/store/state.ts:128

---

### showGrid

```ts
showGrid: boolean
```

Defined in: core/store/state.ts:129

---

### videoAutoplay

```ts
videoAutoplay: boolean
```

Defined in: core/store/state.ts:130

---

### effectiveTheme

```ts
effectiveTheme: string
```

Defined in: core/store/state.ts:131

---

### preferencesOpen

```ts
preferencesOpen: boolean
```

Defined in: core/store/state.ts:132

---

### langDialogOpen

```ts
langDialogOpen: boolean
```

Defined in: core/store/state.ts:133

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

Defined in: core/store/state.ts:134

---

### portfoliolist

```ts
portfoliolist: unknown[];
```

Defined in: core/store/state.ts:135
