[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/store/state](../README.md) / LangState

Defined in: core/store/state.ts:35

The locale slice of StoreState: fetched dictionary nodes (components,
app, slugs) plus the DB path grammar and resolved locale code.
`components`/`app`/`slugs` are false/null until the Firebase fetch lands —
readers must treat falsy as "load pending", never as "empty".

## Properties

### components

```ts
components: unknown;
```

Defined in: core/store/state.ts:36

***

### app

```ts
app: Record<string, unknown> | null;
```

Defined in: core/store/state.ts:37

***

### slugs

```ts
slugs: Record<string, unknown> | null;
```

Defined in: core/store/state.ts:38

***

### carousel

```ts
carousel: Record<string, unknown>;
```

Defined in: core/store/state.ts:39

***

### statsHud

```ts
statsHud: Record<string, unknown>;
```

Defined in: core/store/state.ts:40

***

### database

```ts
database: string;
```

Defined in: core/store/state.ts:41

***

### locale

```ts
locale: string;
```

Defined in: core/store/state.ts:42

***

### pagesPath

```ts
pagesPath: string;
```

Defined in: core/store/state.ts:43

***

### projectPath

```ts
projectPath: string;
```

Defined in: core/store/state.ts:44
