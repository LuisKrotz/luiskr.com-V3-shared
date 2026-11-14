[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / QueueItem

Defined in: cms/media-convert/consts.ts:36

One queued upload — the File blob plus its job-relative path.

## Properties

### file

```ts
file: File
```

Defined in: cms/media-convert/consts.ts:38

The picked File payload (PUT body).

---

### rel

```ts
rel: string
```

Defined in: cms/media-convert/consts.ts:40

Path relative to the job root — sent as the x-file-path header.
