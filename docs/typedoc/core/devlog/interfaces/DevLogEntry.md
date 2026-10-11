[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/devlog](../README.md) / DevLogEntry

Defined in: core/devlog.ts:13

One buffered diagnostic entry.

## Properties

### t

```ts
t: number;
```

Defined in: core/devlog.ts:15

Unix-ms timestamp of the call.

***

### level

```ts
level: string;
```

Defined in: core/devlog.ts:17

'warn' | 'error' | 'info' — from LOG_LEVELS.

***

### parts

```ts
parts: unknown[];
```

Defined in: core/devlog.ts:19

The original call arguments, unserialized.
