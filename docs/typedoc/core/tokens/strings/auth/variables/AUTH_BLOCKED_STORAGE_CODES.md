[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/auth](../README.md) / AUTH\_BLOCKED\_STORAGE\_CODES

```ts
const AUTH_BLOCKED_STORAGE_CODES: readonly string[];
```

Defined in: core/tokens/strings/auth.ts:35

Codes whose root cause is blocked third-party site data — the
firebaseapp.com auth iframe can't store/read the OAuth event. The login
view uses this set to show the "allow site data" guidance instead of the
authorized-domains copy.
