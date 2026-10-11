[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/project](../README.md) / PROJECT\_CLASSES

```ts
const PROJECT_CLASSES: Readonly<{
  PROJECT: "project";
}>;
```

Defined in: core/tokens/classes/project.ts:58

Frozen project class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
