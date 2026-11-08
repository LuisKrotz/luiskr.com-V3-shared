[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/dom/shared-observer](../README.md) / SharedObserverHandle

Defined in: core/utils/dom/shared-observer.ts:22

Handle returned by observeShared — mirrors the disconnect() surface the
figure fields used when they held raw IntersectionObserver instances.
`callback` exposes the pool's entry dispatch so tests can inject entries
the same way happy-dom observers expose `.callback`.

## Methods

### disconnect()

```ts
disconnect(): void;
```

Defined in: core/utils/dom/shared-observer.ts:24

Stops observing the element and drops its handler from the pool.

#### Returns

`void`

---

### callback()

```ts
callback(entries): void;
```

Defined in: core/utils/dom/shared-observer.ts:27

Routes raw entries through the pool's per-target dispatch (test surface).

#### Parameters

##### entries

`IntersectionObserverEntry`[]

#### Returns

`void`
