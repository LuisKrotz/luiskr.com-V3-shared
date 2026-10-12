[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/strings/auth](../README.md) / AUTH\_SELF\_HOSTS

```ts
const AUTH_SELF_HOSTS: readonly string[]
```

Defined in: core/tokens/strings/auth.ts:79

Hosts that serve `/__/auth/*` themselves — Firebase Hosting exposes the
auth helper on every connected domain, so when the app runs on one of
these over https the authDomain can point at the app's own host. That
makes the helper iframe same-ORIGIN: its web-storage event relay stops
being third-party data and survives the partitioning/blocking that
silently kills the firebaseapp.com relay.
NOTE: www.luiskr.com is deliberately absent — the host doesn't resolve.
