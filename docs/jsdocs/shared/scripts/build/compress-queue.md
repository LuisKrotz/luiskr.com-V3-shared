# `shared\scripts\build\compress-queue.mjs`

Bounded-concurrency precompressed-sibling writer.

| | |
|---|---|
| **Source** | `src/shared\scripts\build\compress-queue.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `BROTLI_OPTS`

Highest static quality — matches every historical sibling writer.

### `GZIP_OPTS`

Maximum gzip effort — matches vite-plugin-compression2's level.

### `DRAIN_CONCURRENCY`

Drain worker count — ~2× the libuv pool keeps zlib busy without the
EMFILE handle exhaustion an unbounded ~19k-task fan-out trips on
Windows (each task opens two sibling-write handles at once).

### `pending`

Queued compression tasks — { file, buf } pairs. Buffers are retained
until their turn arrives: holding ~19k page buffers (~600MB worst
case) is deliberate — re-reading each file would double I/O and
invalidate AV-scan residency between write and compress.

### `writeFileReplace`

Writes `buf` to `file`, falling back to temp-write + rename when the
direct write is refused. On Windows an existing file carrying the
NTFS Compressed attribute rejects open-for-truncate (O_TRUNC surfaces
as UNKNOWN and never clears); replacing the file through a sibling
temp name sidesteps the truncate entirely — and atomic-replaces, so a
reader never sees a half-written document.
- `@param` {string} file target path
- `@param` {Buffer} buf payload

### `writeFileReplaceAsync`

Async sibling of writeFileReplace for the drain workers.

### `queueCompressedWrite`

Writes `contents` to `file` synchronously, then queues async
brotli-11 + gzip-9 siblings. The sync write keeps every caller's
existing "file exists right after the call" assumption; only the
compressed siblings defer to the pool.
- `@param` {string} file absolute output path
- `@param` {string | Buffer} contents document body

### `runTask`

Compresses one queued task — brotli + gzip run concurrently per file
(two threadpool slots) and each sibling write retries through
withFsRetryAsync so a transient Windows share lock can't fail a
multi-thousand-file drain.
- `@param` {{file: string, buf: Buffer}} task queued work item
- `@returns` {Promise<void>} resolves once both siblings are on disk

### `drainCompressedWrites`

Drains the queue with bounded worker concurrency. The libuv threadpool
(sized via UV_THREADPOOL_SIZE at process start) limits zlib work, but
each task also opens file handles for the two sibling writes — with
~19k queued tasks, unbounded fan-out opens handles faster than they
close and trips EMFILE on Windows. A fixed worker pool keeps at most
DRAIN_CONCURRENCY×2 handles in flight. Tasks queued after this call
would be missed, so callers must drain exactly once, after the emit
loop.
- `@returns` {Promise<number>} count of documents compressed

### `compressedWritesPending`

Pending-task count — exposed for progress logs and tests.
