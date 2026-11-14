[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_VS\_FULLSCREEN

```ts
const GLSL_VS_FULLSCREEN: 'attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.,1.);}' =
  'attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.,1.);}'
```

Defined in: core/utils/canvas/glsl.ts:18

Fullscreen-triangle vertex stage — `a_pos` clip-space passthrough,
no UV varying (fullscreen widgets sample gl_FragCoord). Minified: the
same bytes every widget already emitted.
