[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / StoreState

Defined in: core/store/state.ts:98

The whole reactive state bag. Field naming follows the shape the legacy
CMS data already uses (clickortap, marqueeamount, portfoliolist are
snake/flat because they mirror DB keys verbatim — renaming would break
the translation payload contract).

## Properties

### clickortap

```ts
clickortap: string;
```

Defined in: core/store/state.ts:99

***

### inputMethod

```ts
inputMethod: string;
```

Defined in: core/store/state.ts:100

***

### actionTextMap

```ts
actionTextMap: ActionTextMap;
```

Defined in: core/store/state.ts:101

***

### has\_touch

```ts
has_touch: boolean;
```

Defined in: core/store/state.ts:102

***

### lang

```ts
lang: LangState;
```

Defined in: core/store/state.ts:103

***

### mentions

```ts
mentions: MentionsState;
```

Defined in: core/store/state.ts:104

***

### marqueeamount

```ts
marqueeamount: number;
```

Defined in: core/store/state.ts:105

***

### modalObject

```ts
modalObject: ModalObject;
```

Defined in: core/store/state.ts:106

***

### origin

```ts
origin: string;
```

Defined in: core/store/state.ts:107

***

### page

```ts
page: PagePos;
```

Defined in: core/store/state.ts:108

***

### showhover

```ts
showhover: boolean;
```

Defined in: core/store/state.ts:109

***

### storage

```ts
storage: string;
```

Defined in: core/store/state.ts:110

***

### reducedMotion

```ts
reducedMotion: boolean;
```

Defined in: core/store/state.ts:111

***

### theme

```ts
theme: string;
```

Defined in: core/store/state.ts:112

***

### showStatsForNerds

```ts
showStatsForNerds: boolean;
```

Defined in: core/store/state.ts:113

***

### showGrid

```ts
showGrid: boolean;
```

Defined in: core/store/state.ts:114

***

### videoAutoplay

```ts
videoAutoplay: boolean;
```

Defined in: core/store/state.ts:115

***

### effectiveTheme

```ts
effectiveTheme: string;
```

Defined in: core/store/state.ts:116

***

### preferencesOpen

```ts
preferencesOpen: boolean;
```

Defined in: core/store/state.ts:117

***

### langDialogOpen

```ts
langDialogOpen: boolean;
```

Defined in: core/store/state.ts:118

***

### modalOrigin

```ts
modalOrigin: 
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: core/store/state.ts:119

***

### portfoliolist

```ts
portfoliolist: unknown[];
```

Defined in: core/store/state.ts:120
