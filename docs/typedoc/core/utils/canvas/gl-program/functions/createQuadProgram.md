[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/gl-program](../README.md) / createQuadProgram

```ts
function createQuadProgram(
   gl, 
   vsSource, 
   fsSource, 
   label, 
   opts?
): 
  | {
  program: WebGLProgram;
  quadBuffer: WebGLBuffer;
}
  | null;
```

Defined in: core/utils/canvas/gl-program.ts:69

Creates quad program.

## Parameters

### gl

`WebGLRenderingContext` \| `WebGL2RenderingContext`

### vsSource

`string`

### fsSource

`string`

### label

`string`

### opts?

[`QuadProgramOptions`](../interfaces/QuadProgramOptions.md) = `{}`

## Returns

  \| \{
  `program`: `WebGLProgram`;
  `quadBuffer`: `WebGLBuffer`;
\}
  \| `null`
