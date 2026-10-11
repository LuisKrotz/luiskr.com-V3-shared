[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/firebase](../README.md) / onAuthChange

```ts
function onAuthChange(callback): Promise<Unsubscribe>;
```

Defined in: core/firebase.ts:222

Subscribes to auth state after lazily loading firebase/auth.
First resolves a pending redirect sign-in (the signInWithGoogle popup
fallback) so the callback fires with the fresh session on return — a
failed redirect logs the error and falls through to the normal listener.

Both the SDK init and the redirect-event wait are bounded: when
third-party storage is blocked (the firebaseapp.com auth iframe can't
persist/relay the OAuth event) the SDK promises never settle, which
previously left the page hanging with the stale redirect marker. On a
timeout or failure the real diagnosis is recorded for the login view,
while a best-effort background subscribe still wires the listener so a
late-arriving event can still sign in.

## Parameters

### callback

(`_user`) => `void`

Invoked with the User (or null on sign-out) on every auth transition.

## Returns

`Promise`\<`Unsubscribe`\>

the SDK's unsubscribe function
