[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / QueueItem

Defined in: cms/media-convert/consts.ts:35

One queued upload — the File blob plus its job-relative path.

## Properties

### file

```ts
file: File;
```

Defined in: cms/media-convert/consts.ts:37

The picked File payload (PUT body).

***

### rel

```ts
rel: string;
```

Defined in: cms/media-convert/consts.ts:39

Path relative to the job root — sent as the x-file-path header.
