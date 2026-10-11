[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/firebase](../README.md) / signInWithGoogle

```ts
function signInWithGoogle(): Promise<void | UserCredential>;
```

Defined in: core/firebase.ts:125

CMS login — Google OAuth popup. `prompt: 'select_account'` forces the
account chooser so a CMS editor isn't silently signed into a wrong Google account.
When the environment can't complete the popup handshake (popup blockers,
COOP window.closed blocking, partitioned web storage, unsupported
contexts — the AUTH_REDIRECT_FALLBACK_CODES set), retries transparently
via signInWithRedirect, which navigates away and never resolves.

## Returns

`Promise`\<`void` \| `UserCredential`\>

The SDK UserCredential, or nothing when the redirect fallback fires.
