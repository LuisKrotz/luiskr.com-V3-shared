[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / StoreGetters

Defined in: core/store/state.ts:148

The getter facade — components read state exclusively through these
accessors so the StoreState layout can evolve without touching every
consumer. getLang (lowercase-l variant `getlang` returns the full LangState
slice) returns just the locale code — both spellings exist for legacy
call-site compatibility.

## Properties

### getTheme

```ts
getTheme: () => string;
```

Defined in: core/store/state.ts:149

#### Returns

`string`

***

### getEffectiveTheme

```ts
getEffectiveTheme: () => string;
```

Defined in: core/store/state.ts:150

#### Returns

`string`

***

### getPreferencesOpen

```ts
getPreferencesOpen: () => boolean;
```

Defined in: core/store/state.ts:151

#### Returns

`boolean`

***

### getLangDialogOpen

```ts
getLangDialogOpen: () => boolean;
```

Defined in: core/store/state.ts:152

#### Returns

`boolean`

***

### getModalOrigin

```ts
getModalOrigin: () => 
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: core/store/state.ts:153

#### Returns

  \| \{
  `x`: `number`;
  `y`: `number`;
\}
  \| `null`

***

### getReducedMotion

```ts
getReducedMotion: () => boolean;
```

Defined in: core/store/state.ts:154

#### Returns

`boolean`

***

### getVideoAutoplay

```ts
getVideoAutoplay: () => boolean;
```

Defined in: core/store/state.ts:155

#### Returns

`boolean`

***

### getStatsForNerds

```ts
getStatsForNerds: () => boolean;
```

Defined in: core/store/state.ts:156

#### Returns

`boolean`

***

### getShowGrid

```ts
getShowGrid: () => boolean;
```

Defined in: core/store/state.ts:157

#### Returns

`boolean`

***

### getMentions

```ts
getMentions: () => MentionsState;
```

Defined in: core/store/state.ts:158

#### Returns

[`MentionsState`](MentionsState.md)

***

### getClickOrTap

```ts
getClickOrTap: () => string;
```

Defined in: core/store/state.ts:159

#### Returns

`string`

***

### getInputMethod

```ts
getInputMethod: () => string;
```

Defined in: core/store/state.ts:160

#### Returns

`string`

***

### getHover

```ts
getHover: () => boolean;
```

Defined in: core/store/state.ts:161

#### Returns

`boolean`

***

### getlang

```ts
getlang: () => LangState;
```

Defined in: core/store/state.ts:162

#### Returns

[`LangState`](LangState.md)

***

### getLang

```ts
getLang: () => string;
```

Defined in: core/store/state.ts:163

#### Returns

`string`

***

### getCarouselLang

```ts
getCarouselLang: () => Record<string, unknown>;
```

Defined in: core/store/state.ts:164

#### Returns

`Record`\<`string`, `unknown`\>

***

### getStatsHudLang

```ts
getStatsHudLang: () => Record<string, unknown>;
```

Defined in: core/store/state.ts:165

#### Returns

`Record`\<`string`, `unknown`\>

***

### getMarqueeAmount

```ts
getMarqueeAmount: () => number;
```

Defined in: core/store/state.ts:166

#### Returns

`number`

***

### getModal

```ts
getModal: () => ModalObject;
```

Defined in: core/store/state.ts:167

#### Returns

[`ModalObject`](ModalObject.md)

***

### getOnMouseMove

```ts
getOnMouseMove: () => PagePos;
```

Defined in: core/store/state.ts:168

#### Returns

[`PagePos`](PagePos.md)

***

### getStorage

```ts
getStorage: () => string;
```

Defined in: core/store/state.ts:169

#### Returns

`string`

***

### getTouch

```ts
getTouch: () => boolean;
```

Defined in: core/store/state.ts:170

#### Returns

`boolean`

***

### getPortfolioList

```ts
getPortfolioList: () => unknown[];
```

Defined in: core/store/state.ts:171

#### Returns

`unknown`[]

***

### getPortfoliolist

```ts
getPortfoliolist: () => unknown[];
```

Defined in: core/store/state.ts:172

#### Returns

`unknown`[]
