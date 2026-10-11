[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/safari/types](../README.md) / PatchableProto

Defined in: core/safari/types.ts:46

The slice of a component prototype the patches may re-bind — every
member is optional because a patch only touches the methods Safari
actually breaks (e.g. media-figure's high-res load path).

## Properties

### \_renderInitial?

```ts
optional _renderInitial?: () => void;
```

Defined in: core/safari/types.ts:47

#### Returns

`void`

***

### \_measureFit?

```ts
optional _measureFit?: () => void;
```

Defined in: core/safari/types.ts:48

#### Returns

`void`

***

### onMounted?

```ts
optional onMounted?: () => void;
```

Defined in: core/safari/types.ts:49

#### Returns

`void`

***

### onDestroy?

```ts
optional onDestroy?: () => void;
```

Defined in: core/safari/types.ts:50

#### Returns

`void`

***

### loadHighRes?

```ts
optional loadHighRes?: () => void;
```

Defined in: core/safari/types.ts:51

#### Returns

`void`

***

### \_updateModalDOM?

```ts
optional _updateModalDOM?: () => void;
```

Defined in: core/safari/types.ts:52

#### Returns

`void`
