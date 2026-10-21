[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie-texture](../README.md) / GenieSheet

Defined in: website/components/media/expanded/genie-texture.ts:36

The composited modal surface the strip-warp backends sample.
Coordinates of `mediaBox`/`clipBox` are content-local CSS px — the
texture ctx carries the dpr/scale transform, so every stamp (bake
and per-frame restamp alike) draws in CSS px.

## Properties

### tex

```ts
tex: HTMLCanvasElement | null
```

Defined in: website/components/media/expanded/genie-texture.ts:38

The baked texture canvas — null means "no surface", the warp ghosts.

---

### ctx

```ts
ctx: CanvasRenderingContext2D | null
```

Defined in: website/components/media/expanded/genie-texture.ts:40

The texture's 2D context — the live restamp writes into it.

---

### media

```ts
media: CanvasImageSource | null
```

Defined in: website/components/media/expanded/genie-texture.ts:46

Primary restamp source — the modal's media item. A <video> restamps
every frame (live frames); an undecoded <img> restamps once on
decode then drops. Null when the item is already baked and static.

---

### back

```ts
back: CanvasImageSource | null
```

Defined in: website/components/media/expanded/genie-texture.ts:52

Standby restamp source — the video's poster primed as an off-DOM
Image; fills the media box until the video reports real pixels.
Drops after its first stamp.

---

### mediaBox

```ts
mediaBox: GenieRect
```

Defined in: website/components/media/expanded/genie-texture.ts:54

Content-local CSS-px box the media item occupies (contain-fit inside).

---

### clipBox

```ts
clipBox: GenieRect
```

Defined in: website/components/media/expanded/genie-texture.ts:56

Content-local CSS-px clip — the figure's rounded rect.

---

### clipRadius

```ts
clipRadius: number
```

Defined in: website/components/media/expanded/genie-texture.ts:58

The figure's corner radius (CSS px) applied to the restamp clip.
