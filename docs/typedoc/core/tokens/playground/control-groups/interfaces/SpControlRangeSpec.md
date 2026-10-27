[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/playground/control-groups](../README.md) / SpControlRangeSpec

Defined in: core/tokens/playground/control-groups.ts:19

Range-slider row — `key` names the SP_*_PARAMS member that owns the wire param string.

## Properties

### key

```ts
key: string
```

Defined in: core/tokens/playground/control-groups.ts:21

SP_*_PARAMS member name (e.g. 'FOV' → SP_CAMERA_PARAMS.FOV).

---

### label

```ts
label: string
```

Defined in: core/tokens/playground/control-groups.ts:23

Translation key looked up in the earth-playground node (and the CMS `defaults` map key).

---

### min

```ts
min: number
```

Defined in: core/tokens/playground/control-groups.ts:25

Slider minimum.

---

### max

```ts
max: number
```

Defined in: core/tokens/playground/control-groups.ts:27

Slider maximum.

---

### step

```ts
step: number
```

Defined in: core/tokens/playground/control-groups.ts:29

Slider step granularity.

---

### def

```ts
def: number
```

Defined in: core/tokens/playground/control-groups.ts:31

Shipped numeric default — CMS defaults and saved values override it.
