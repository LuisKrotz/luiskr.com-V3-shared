[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/types](../README.md) / CmsMediaItem

Defined in: cms/projects/types.ts:11

One media row in the CMS project editor.

## Properties

### src

```ts
src: string
```

Defined in: cms/projects/types.ts:13

Extensionless CDN stem (resolved by the gcs() helper for previews).

---

### label

```ts
label: string
```

Defined in: cms/projects/types.ts:15

Alt/label text shown in the editor + emitted as media labels.

---

### isVideo

```ts
isVideo: boolean
```

Defined in: cms/projects/types.ts:17

Whether the media is a video (drives poster-URL resolution).

---

### size

```ts
size: number[];
```

Defined in: cms/projects/types.ts:19

Intrinsic [w,h] for aspect-ratio layouts.
