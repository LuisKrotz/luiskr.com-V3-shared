[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/strings/auth](../README.md) / AUTH\_URLS

```ts
const AUTH_URLS: Readonly<{
  CREATE_AUTH_URI: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/createAuthUri'
  HANDLER_PATH: '/__/auth/handler'
}>
```

Defined in: core/tokens/strings/auth.ts:95

Auth endpoint URLs — the Identity Toolkit REST surface. createAuthUri
is the read-only call the `__/auth/handler` page makes to build the
provider URL; the diagnostic probe re-issues it after an opaque
auth/internal-error to recover the real server-side rejection reason
(the SDK rebuilds relayed event errors by code only and drops the
nested message).
