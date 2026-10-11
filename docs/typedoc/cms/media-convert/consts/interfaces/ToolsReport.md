[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / ToolsReport

Defined in: cms/media-convert/consts.ts:56

Server payload from GET /api/media-convert/tools (shared/scripts/media-convert/install.js).

## Properties

### platform?

```ts
optional platform?: string;
```

Defined in: cms/media-convert/consts.ts:58

OS the dev server runs on ('linux'|'darwin'|'win32').

***

### tools?

```ts
optional tools?: Record<string, boolean>;
```

Defined in: cms/media-convert/consts.ts:60

Per-binary presence flags keyed by executable name.

***

### missing?

```ts
optional missing?: Record<string, boolean>;
```

Defined in: cms/media-convert/consts.ts:62

Missing-tool groups (ffmpeg, imagemagick, cjpeg).

***

### manager?

```ts
optional manager?: string | null;
```

Defined in: cms/media-convert/consts.ts:64

Detected package manager (or null when none found).

***

### plan?

```ts
optional plan?: object;
```

Defined in: cms/media-convert/consts.ts:66

Install plan — runnable commands vs. manual guidance.

#### manager?

```ts
optional manager?: string | null;
```

#### needsRoot?

```ts
optional needsRoot?: boolean;
```

#### commands?

```ts
optional commands?: [string, string[]][];
```

#### manual?

```ts
optional manual?: string[];
```
