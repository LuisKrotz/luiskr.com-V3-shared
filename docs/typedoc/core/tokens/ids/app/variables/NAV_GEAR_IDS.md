[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/ids/app](../README.md) / NAV\_GEAR\_IDS

```ts
const NAV_GEAR_IDS: Readonly<{
  FACE: 'nav-gear-face'
  RIM: 'nav-gear-rim'
  HUB: 'nav-gear-hub'
  HOLE: 'nav-gear-hole'
}>
```

Defined in: core/tokens/ids/app.ts:59

Frozen nav-gear SVG gradient-id map — the defs↔url(#…) link ids inside
the machined-gear glyph (nav gear.tsx). Sole declaration site; the
markup reads members via the `url()` ref helper instead of re-declaring
the literals (zero-hardcoding rules 4–5).
