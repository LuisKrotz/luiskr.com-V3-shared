[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/auth](../README.md) / AUTH\_REDIRECT\_FALLBACK\_CODES

```ts
const AUTH_REDIRECT_FALLBACK_CODES: readonly string[];
```

Defined in: core/tokens/strings/auth.ts:48

Codes where the popup handshake cannot run in the current browser
environment (popup blockers, COOP window.closed blocking, partitioned
storage, unsupported contexts) — these retry via signInWithRedirect.
User-cancellation codes are deliberately excluded.
