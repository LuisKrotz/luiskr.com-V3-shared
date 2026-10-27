[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / webgpuWidgetsEnabled

```ts
function webgpuWidgetsEnabled(): boolean
```

Defined in: core/utils/gpu/webgpu-widget.ts:110

`webgpuWidgetsEnabled` — the layer kill-switch. The WebGPU widget
mounts (worker `OffscreenCanvas` route OR in-page) only run under
`?debug=webgpuWidgets:active`; every other state keeps the proven
WebGL/CSS renderers authoritative. Re-parsed per call so tests and
debug toggles flip without a reload.

## Returns

`boolean`

True when the WebGPU widget layer may mount.
