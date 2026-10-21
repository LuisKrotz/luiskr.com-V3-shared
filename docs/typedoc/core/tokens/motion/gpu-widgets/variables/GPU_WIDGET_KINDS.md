[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/gpu-widgets](../README.md) / GPU\_WIDGET\_KINDS

```ts
const GPU_WIDGET_KINDS: Readonly<{
  BURGER: 1
  FLAG: 2
  SWITCH_SLIDER: 3
  THEME_SLIDER: 4
  CLOSE_BUTTON: 5
  MENU_BACKGROUND: 6
  SKELETON: 7
  BURN: 8
  MEDIA: 9
  GLITCH: 10
  DIVIDER_SHEEN: 11
  TEXT_DRAW: 12
  RING_SHEEN: 13
  CORNER_BRACKETS: 14
  SCENE3D: 15
  GENIE: 16
}>
```

Defined in: core/tokens/motion/gpu-widgets.ts:21

Widget kinds — one per animation domain migrated from a standalone
WebGL canvas to a dedicated WebGPU wasm artifact on the widget's own
canvas. Frozen; consumers import members, never redeclare literals.
