[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / JobResult

Defined in: cms/media-convert/consts.ts:75

Per-file outcome reported by the conversion server.

## Properties

### ok

```ts
ok: boolean;
```

Defined in: cms/media-convert/consts.ts:77

Whether this file converted successfully.

***

### in

```ts
in: string;
```

Defined in: cms/media-convert/consts.ts:79

The input path the result corresponds to.

***

### outs?

```ts
optional outs?: string[];
```

Defined in: cms/media-convert/consts.ts:81

Output artifact paths when ok.

***

### error?

```ts
optional error?: string;
```

Defined in: cms/media-convert/consts.ts:83

Error message when !ok.
