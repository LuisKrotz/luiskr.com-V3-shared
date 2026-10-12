[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / armResidualInputGuard

```ts
function armResidualInputGuard(host, isOpen, openedAt): void
```

Defined in: core/utils/dom.ts:131

Attaches the residual-input guard to an overlay host — a capture-phase
click/pointerdown pair on the host element itself, so a swallowed event
never descends into the shadow tree toward option, backdrop, or widget
handlers. The guard is inert while the overlay reports closed.

Event discrimination:

- Only `MouseEvent`-typed input can be gesture residue — plain
  `Event('click')` dispatches are scripted/deliberate and always pass.
- `click` carries a meaningful `detail`: 0 marks keyboard/programmatic
  activation (deliberate — always passes, keeping tests' `.click()`
  working); ≥2 marks a multi-click residual — stale by definition.
- pointer presses carry no click count and are armed by the time
  window alone; this also covers drags started by a stale pointerdown
  (e.g. the theme slider's window-tracked drag).

## Parameters

### host

`ArmGuardHost`

Overlay host element (also the listener owner).

### isOpen

() => `boolean`

Predicate — the guard is inert while the overlay is closed.

### openedAt

() => `number`

Clock accessor — `performance.now()` sampled at open.

## Returns

`void`
