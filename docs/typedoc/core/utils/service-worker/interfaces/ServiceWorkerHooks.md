[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/service-worker](../README.md) / ServiceWorkerHooks

Defined in: core/utils/service-worker.ts:22

Lifecycle hooks for `registerSiteServiceWorker` — local replacement
for the retired `register-service-worker` package (same callback
names, same ordering). Every hook is optional.

## Properties

### ready?

```ts
optional ready?: (registration) => void;
```

Defined in: core/utils/service-worker.ts:24

First registration resolved and the SW is controlling the page.

#### Parameters

##### registration

`ServiceWorkerRegistration`

#### Returns

`void`

---

### registered?

```ts
optional registered?: (registration) => void;
```

Defined in: core/utils/service-worker.ts:26

`navigator.serviceWorker.register` resolved.

#### Parameters

##### registration

`ServiceWorkerRegistration`

#### Returns

`void`

---

### cached?

```ts
optional cached?: (registration) => void;
```

Defined in: core/utils/service-worker.ts:28

First install finished — precache is warm (no prior controller).

#### Parameters

##### registration

`ServiceWorkerRegistration`

#### Returns

`void`

---

### updatefound?

```ts
optional updatefound?: (registration) => void;
```

Defined in: core/utils/service-worker.ts:30

A new SW version started downloading.

#### Parameters

##### registration

`ServiceWorkerRegistration`

#### Returns

`void`

---

### updated?

```ts
optional updated?: (registration) => void;
```

Defined in: core/utils/service-worker.ts:32

A new SW version installed — fresh content is ready.

#### Parameters

##### registration

`ServiceWorkerRegistration`

#### Returns

`void`

---

### offline?

```ts
optional offline?: () => void;
```

Defined in: core/utils/service-worker.ts:34

Window went offline.

#### Returns

`void`

---

### online?

```ts
optional online?: () => void;
```

Defined in: core/utils/service-worker.ts:36

Window came back online.

#### Returns

`void`

---

### error?

```ts
optional error?: (error) => void;
```

Defined in: core/utils/service-worker.ts:38

Registration or the localhost validity probe failed.

#### Parameters

##### error

`unknown`

#### Returns

`void`
