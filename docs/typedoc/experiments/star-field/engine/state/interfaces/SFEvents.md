[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/state](../README.md) / SFEvents

Defined in: experiments/star-field/engine/state.ts:12

Lifecycle callbacks the host component wires in at construction.

## Properties

### onReady?

```ts
optional onReady?: () => void;
```

Defined in: experiments/star-field/engine/state.ts:13

#### Returns

`void`

***

### onProgress?

```ts
optional onProgress?: SFProgressFn;
```

Defined in: experiments/star-field/engine/state.ts:14

***

### onSelect?

```ts
optional onSelect?: SFBodyFn;
```

Defined in: experiments/star-field/engine/state.ts:15

***

### onApproach?

```ts
optional onApproach?: SFBodyFn;
```

Defined in: experiments/star-field/engine/state.ts:16

***

### onHover?

```ts
optional onHover?: (bodyId) => void;
```

Defined in: experiments/star-field/engine/state.ts:17

#### Parameters

##### bodyId

`string` \| `null`

#### Returns

`void`

***

### onHoverMove?

```ts
optional onHoverMove?: (bodyId, x, y) => void;
```

Defined in: experiments/star-field/engine/state.ts:18

#### Parameters

##### bodyId

`string`

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### onLost?

```ts
optional onLost?: () => void;
```

Defined in: experiments/star-field/engine/state.ts:23

Fired once when a frame throws — the render loop stops and the host
swaps in the 2D fallback instead of leaving a dead canvas.

#### Returns

`void`
