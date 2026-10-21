[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-diagram](../README.md) / renderDiagram

```ts
function renderDiagram(source, themeJson, loadModule?): Promise<string>
```

Defined in: core/utils/wasm/wasm-diagram.ts:58

Loads (once) and runs the diagram engine.

## Parameters

### source

`string`

Raw mermaid source — `flowchart`/`graph`/`sequenceDiagram`.

### themeJson

`string`

`Theme::from_json` payload — `{font,fontSize,fg,bg,line,accent,surface}`.

### loadModule?

() => `Promise`\<`DiagramModule`\>

Injectable glue loader — tests substitute a stub so
the success path runs without a real .wasm artifact.

## Returns

`Promise`\<`string`\>

SVG markup string, ready for `innerHTML`.

## Throws

Whatever the engine throws (parse/layout errors, missing artifact,
instantiation failure) — callers restore the source block on rejection.
