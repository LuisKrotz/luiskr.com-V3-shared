[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/router/types](../README.md) / RouteDescriptor

Defined in: core/router/types.ts:23

A resolved route — everything the nav pipeline and views need.

## Properties

### name

```ts
name: string;
```

Defined in: core/router/types.ts:25

Route table name ('home', 'project', 'legal', 'not-found', …).

***

### view

```ts
view: string;
```

Defined in: core/router/types.ts:27

Custom-element tag of the view to mount.

***

### lang

```ts
lang: string;
```

Defined in: core/router/types.ts:29

Resolved locale id ('en', 'pt', …).

***

### path

```ts
path: string;
```

Defined in: core/router/types.ts:31

The matched URL path (kept for locale detection and analytics).

***

### meta

```ts
meta: RouteMeta;
```

Defined in: core/router/types.ts:33

Head/scroll classification metadata.

***

### params

```ts
params: Record<string, string | undefined>;
```

Defined in: core/router/types.ts:35

Extracted params — `slug` on project routes, etc.
