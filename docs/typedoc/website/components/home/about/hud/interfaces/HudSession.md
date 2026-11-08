[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/hud](../README.md) / HudSession

Defined in: website/components/home/about/hud.ts:46

Live HUD session parked on the host — index + timers.

## Properties

### index

```ts
index: number
```

Defined in: website/components/home/about/hud.ts:48

Index into host.aboutLocations currently displayed.

---

### timer

```ts
timer: number | null
```

Defined in: website/components/home/about/hud.ts:50

The cycle interval — null when the HUD is static.

---

### pending

```ts
pending: number | null
```

Defined in: website/components/home/about/hud.ts:52

Pending mid-fade text swap — cleared on disarm.
