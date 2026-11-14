# `website\components\media\draw-text\sheet.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\draw-text\sheet.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `resolveTierText`

Resolves a `?tiers` loader module to its css text — the chunk exports
the sheet string as default, a direct string is tolerated too.

- `@param` mod resolved dynamic-import module.
- `@returns` css text, or '' for unexpected shapes.

### `scheduleIdle`

Runs `cb` at the next idle slice — requestIdleCallback bounded by the
shared prefetch timeout when available, a short setTimeout fallback
otherwise. Mirrors the Component/route-warmer schedule contract so
print-tier fetches never compete with mount-time frame work.

- `@param` cb work to run in the next idle gap.

### (module scope)

Sheet surface a draw-text host consumes: base text for legacy `<style>`
nodes, a shared constructable sheet for modern engines, and the legacy
print-tier registration.

### `baseStyleText`

- `@returns` the sheet's non-print css for the legacy <style> path.

### `onPrintText`

Registers a legacy `<style>` node's print-tier update and arms the
lazy fetch — the callback receives the composed base+print text when
the chunk resolves.

- `@param` apply receives the composed sheet text.
- `@returns` unregister — call on disconnect so dead hosts drop.

### `onPrintStyleNode`

Registers a legacy `<style>` ELEMENT for print-tier updates — the
node's textContent recomposes to base+print when the chunk lands.

- `@param` el the per-host `<style>` node.
- `@returns` unregister — call on disconnect so dead hosts drop.

### `getSharedSheet`

Lazily-built shared constructable sheet — all instances adopt the one
compiled sheet instead of re-parsing the SCSS per mount.

- `@returns` the shared sheet, or null on engines without constructable

### `createDrawTextSheet`

Builds the sheet surface over one `?tiers`-shaped styles module. The
jest scss mocks answer plain strings for every query form, so the same
isTieredStyles probe Component uses keeps both shapes working: objects
deliver base+tiers+print lazily, strings behave as base-only sheets.

- `@param` styles the `?tiers` module (or a plain css string).
- `@returns` the sheet surface.

### `baseText`

Sheet text adopted synchronously — the module's base css.

### `sharedSheet`

Lazily-built shared stylesheet.

### `legacyPrintApply`

Legacy `<style>` updaters awaiting the print tier — constructable-
sheet hosts never register; the in-place rewrite reaches them.

### `printArmed`

First mount arms the single lazy fetch.

### `armPrintTier`

Fetches the sheet's print blocks on the next idle slice and composes
them after the base text — matching the source order where the
`@media print` block sat at file end.

### `printPromise`

Memoized tier fetch — one in-flight/resolving promise shared by
the idle arm and the print-prepare kick.

### `sheet`

Production singleton — bound to the real `?tiers` module.

### `baseStyleText`

Base sheet text for the legacy `<style>` path — the print tier joins
it later through the onPrintText registration.

- `@returns` the sheet's non-print css.

### `onPrintStyleNode`

Registers a legacy `<style>` ELEMENT for print-tier updates — the
node's textContent recomposes to base+print when the chunk lands.

- `@param` el the per-host `<style>` node.
- `@returns` unregister — call on disconnect so dead hosts drop.

### `getSharedSheet`

Gets shared sheet.

- `@returns` CSSStyleSheet | null
