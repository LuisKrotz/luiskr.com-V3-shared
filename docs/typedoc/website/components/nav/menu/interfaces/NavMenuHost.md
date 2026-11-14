[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/menu](../README.md) / NavMenuHost

Defined in: website/components/nav/menu.tsx:27

Host surface the menu helpers need (satisfied by AppNav).

## Properties

### \_menuOpen

```ts
_menuOpen: boolean
```

Defined in: website/components/nav/menu.tsx:29

Menu overlay open flag.

---

### \_menuOpenedAt

```ts
_menuOpenedAt: number
```

Defined in: website/components/nav/menu.tsx:31

performance.now() of the open transition — feeds the residual-input guard.

---

### \_menuClosing

```ts
_menuClosing: boolean
```

Defined in: website/components/nav/menu.tsx:33

Close animation in flight — guards double-close.

---

### \_menuSettled

```ts
_menuSettled: boolean
```

Defined in: website/components/nav/menu.tsx:35

Open animation completed — entrance animations stop re-running.

---

### \_menuSettleTimer

```ts
_menuSettleTimer: number | null
```

Defined in: website/components/nav/menu.tsx:37

Settle-delay timer handle; cleared on destroy/close.

---

### \_menuBg

```ts
_menuBg:
  | MenuBackgroundWebGL
  | null;
```

Defined in: website/components/nav/menu.tsx:39

Live menu-background widget over the fullscreen canvas.

---

### \_burgerBtn

```ts
_burgerBtn:
  | BurgerButtonWebGL
  | null;
```

Defined in: website/components/nav/menu.tsx:41

Live burger widget — doubles as the menu's close control when open.

---

### \_burgerCanvasEl

```ts
_burgerCanvasEl: HTMLCanvasElement | null
```

Defined in: website/components/nav/menu.tsx:43

Persistent burger canvas (survives re-renders).

---

### \_menuCanvasEl

```ts
_menuCanvasEl: HTMLCanvasElement | null
```

Defined in: website/components/nav/menu.tsx:45

Persistent menu background canvas.

---

### \_onDark

```ts
_onDark: boolean
```

Defined in: website/components/nav/menu.tsx:47

True while the nav floats over a dark band (contrast variant).

---

### shadowRoot?

```ts
optional shadowRoot?: ShadowRoot | null;
```

Defined in: website/components/nav/menu.tsx:49

The shadow root — read for the focused element during close-restore.

## Methods

### $()

```ts
$(selector): Element | null;
```

Defined in: website/components/nav/menu.tsx:51

Shadow-scoped querySelector.

#### Parameters

##### selector

`string`

#### Returns

`Element` \| `null`

---

### $$()?

```ts
optional $$<T>(selector): T[];
```

Defined in: website/components/nav/menu.tsx:53

Shadow-scoped querySelectorAll (live menu item list) — absent on minimal stub hosts, treated as no items.

#### Type Parameters

##### T

`T` _extends_ `Element` = `HTMLElement`

#### Parameters

##### selector

`string`

#### Returns

`T`[]

---

### \_updateDom()

```ts
_updateDom(): void;
```

Defined in: website/components/nav/menu.tsx:55

Triggers a template re-render.

#### Returns

`void`
