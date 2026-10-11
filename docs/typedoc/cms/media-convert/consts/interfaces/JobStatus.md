[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / JobStatus

Defined in: cms/media-convert/consts.ts:87

Job-status payload polled from GET /jobs/:id.

## Properties

### status?

```ts
optional status?: string;
```

Defined in: cms/media-convert/consts.ts:89

Server phase string ('running'|'uploading'|terminal).

***

### error?

```ts
optional error?: string;
```

Defined in: cms/media-convert/consts.ts:91

Server-side error message when failed.

***

### current?

```ts
optional current?: string;
```

Defined in: cms/media-convert/consts.ts:93

Currently-processing file path (progress display).

***

### done?

```ts
optional done?: number;
```

Defined in: cms/media-convert/consts.ts:95

Files completed so far.

***

### total?

```ts
optional total?: number;
```

Defined in: cms/media-convert/consts.ts:97

Total files in the job.

***

### results?

```ts
optional results?: JobResult[];
```

Defined in: cms/media-convert/consts.ts:99

Per-file results once the job settles.
