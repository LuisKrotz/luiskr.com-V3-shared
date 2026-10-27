[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/components/nav/flag](../README.md) / NavFlagHost

Defined in: website/components/nav/flag.tsx:25

Host surface the flag helpers need (satisfied by AppNav).

## Extended by

- [`NavMenuHost`](../../menu/interfaces/NavMenuHost.md)

## Properties

### \_navFlags

```ts
_navFlags:
  | FlagWebGL[]
| Set<FlagWebGL>;
```

Defined in: website/components/nav/flag.tsx:27

Live flag widgets (max one — the menu flag); a Set works too.

---

### \_menuFlagCanvasEl

```ts
_menuFlagCanvasEl: HTMLCanvasElement | null
```

Defined in: website/components/nav/flag.tsx:29

Persistent per-locale flag canvas; rebuilt on locale change.

---

### \_menuFlagLang

```ts
_menuFlagLang: string | null
```

Defined in: website/components/nav/flag.tsx:31

Locale the current flag canvas was built for.

---

### locale

```ts
readonly locale: string;
```

Defined in: website/components/nav/flag.tsx:33

Active locale code.

---

### currentLang

```ts
readonly currentLang:
  | {
  code: "en";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "br";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "es";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "de";
  label: string;
  cc: string;
  cc2: string;
  flag: string;
  short: string;
}
  | {
  code: "hrk";
  label: string;
  cc: string;
  cc2: string;
  flag: string;
  short: string;
}
  | {
  code: "cas";
  label: string;
  cc: string;
  cc2: string;
  flag: string;
  short: string;
}
  | {
  code: "riv";
  label: string;
  cc: string;
  cc2: string;
  flag: string;
  short: string;
}
  | {
  code: "gn";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "it";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "ru";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "fr";
  label: string;
  cc: string;
  flag: string;
  cc2?: undefined;
  short: string;
}
  | {
  code: "tln";
  label: string;
  cc: string;
  cc2: string;
  flag: string;
  short: string;
}
  | {
  cc2?: undefined;
  code: "gl";
  label: string;
  cc: string;
  flag: string;
  short: string;
}
  | {
  cc2?: undefined;
  code: "ca";
  label: string;
  cc: string;
  flag: string;
  short: string;
}
  | {
  cc2?: undefined;
  code: "nl";
  label: string;
  cc: string;
  flag: string;
  short: string;
}
  | {
  cc2?: undefined;
  code: "ga";
  label: string;
  cc: string;
  flag: string;
  short: string;
}
  | null;
```

Defined in: website/components/nav/flag.tsx:35

The active LANG_OPTIONS entry (code + label + flag cc).
