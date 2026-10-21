[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/types](../README.md) / Glitch2dSession

```ts
type Glitch2dSession = GlitchSession & object
```

Defined in: website/components/home/about/glitch/types.ts:138

Narrowed view of the session for the 2D painters — `frame()` guards on
`s.ctx` once and passes this type down, so every painter keeps a
non-nullable context without per-call checks (the wasm arm never
reaches them).

## Type Declaration

### ctx

```ts
ctx: CanvasRenderingContext2D
```
