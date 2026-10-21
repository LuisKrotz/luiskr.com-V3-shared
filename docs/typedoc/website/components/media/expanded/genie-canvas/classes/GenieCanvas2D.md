[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie-canvas](../README.md) / GenieCanvas2D

Defined in: website/components/media/expanded/genie-canvas.ts:45

The 2D genie renderer. Owns the ctx, the baked sheet and the strip
scratch buffers; `frame(dt, p)` draws one animation frame and
reports false only when the context is dead.

## Implements

- [`GenieRenderer`](../../genie/interfaces/GenieRenderer.md)

## Constructors

### Constructor

```ts
new GenieCanvas2D(
   canvas,
   ctx,
   sheet,
   from,
   to,
   opening,
   host
): GenieCanvas2D;
```

Defined in: website/components/media/expanded/genie-canvas.ts:155

Builds the renderer around the composited sheet. The sheet's media
slot re-stamps live sources each frame — the <video> keeps playing
inside the warp and a late decode upgrades the texture mid-flight —
so the funnel never shows a flat ghost rectangle. A null sheet (or
one without a texture) paints the soft accent silhouette.

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas (device-px sized already).

##### ctx

`CanvasRenderingContext2D`

Its 2D context — caller validated non-null.

##### sheet

[`GenieSheet`](../../genie-texture/interfaces/GenieSheet.md) \| `null`

The composited modal sheet from `buildGenieSheet`.

##### from

[`GenieRect`](../../genie/interfaces/GenieRect.md)

Origin rect in viewport CSS px.

##### to

[`GenieRect`](../../genie/interfaces/GenieRect.md)

Destination rect in viewport CSS px.

##### opening

`boolean`

True on open (from→to), false on close.

##### host

`HTMLElement`

Element used to resolve theme CSS vars.

#### Returns

`GenieCanvas2D`

## Methods

### frame()

```ts
frame(_dt, p): boolean;
```

Defined in: website/components/media/expanded/genie-canvas.ts:319

`frame` — one animation tick: clear, strip-warp the sheet texture,
stamp the dock flash in the run's last quarter, restore composite
state.

#### Parameters

##### \_dt

`number`

Frame delta seconds — unused by the field (progress is
positional, not integrated) but part of the renderer contract.

##### p

`number`

Eased funnel progress 0..1 (0 = modal sheet, 1 = figure funnel).

#### Returns

`boolean`

False when the context is gone (caller force-settles).

#### Implementation of

[`GenieRenderer`](../../genie/interfaces/GenieRenderer.md).[`frame`](../../genie/interfaces/GenieRenderer.md#frame)

---

### dispose()

```ts
dispose(): void;
```

Defined in: website/components/media/expanded/genie-canvas.ts:515

Removes the overlay canvas — the sheet ctx dies with the session.

#### Returns

`void`

#### Implementation of

[`GenieRenderer`](../../genie/interfaces/GenieRenderer.md).[`dispose`](../../genie/interfaces/GenieRenderer.md#dispose)
