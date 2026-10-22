#!/usr/bin/env node
/**
 * @file compress-queue.mjs
 * @description Bounded-concurrency precompressed-sibling writer.
 *
 * The locale/docs fan-out emits ~19k HTML documents; each previously paid
 * a synchronous brotliCompressSync (quality 11, ~30-60ms per page) +
 * gzipSync on the orchestrator's single thread — the longest serial tail
 * of the whole build. This helper writes the uncompressed file
 * immediately (callers depend on it existing), then queues the .br/.gz
 * siblings onto Node's async zlib, which executes on the libuv
 * threadpool. Callers set UV_THREADPOOL_SIZE at process entry (before
 * the first async I/O) so the pool is wide enough to keep every core
 * busy; drainCompressedWrites() then awaits the tail.
 *
 * Failure policy mirrors the rest of the build: a compression error
 * surfaces on drain and fails the run — silent .br/.gz gaps would
 * degrade production to gzip-free serving unnoticed.
 */
import fs from 'node:fs'
import zlib from 'node:zlib'
import { promisify } from 'node:util'

import { withFsRetry, withFsRetryAsync } from './fs-retry.mjs'

const brotliCompress = promisify(zlib.brotliCompress)
const gzip = promisify(zlib.gzip)

/** Highest static quality — matches every historical sibling writer. */
const BROTLI_OPTS = Object.freeze({
  params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
})

/** Maximum gzip effort — matches vite-plugin-compression2's level. */
const GZIP_OPTS = Object.freeze({ level: 9 })

/**
 * Drain worker count — ~2× the libuv pool keeps zlib busy without the
 * EMFILE handle exhaustion an unbounded ~19k-task fan-out trips on
 * Windows (each task opens two sibling-write handles at once).
 */
const DRAIN_CONCURRENCY = 64

/**
 * Queued compression tasks — { file, buf } pairs. Buffers are retained
 * until their turn arrives: holding ~19k page buffers (~600MB worst
 * case) is deliberate — re-reading each file would double I/O and
 * invalidate AV-scan residency between write and compress.
 * @type {Array<{file: string, buf: Buffer}>}
 */
const pending = []

/**
 * Writes `buf` to `file`, falling back to temp-write + rename when the
 * direct write is refused. On Windows an existing file carrying the
 * NTFS Compressed attribute rejects open-for-truncate (O_TRUNC surfaces
 * as UNKNOWN and never clears); replacing the file through a sibling
 * temp name sidesteps the truncate entirely — and atomic-replaces, so a
 * reader never sees a half-written document.
 * @param {string} file target path
 * @param {Buffer} buf payload
 */
const writeFileReplace = (file, buf) => {
  try {
    fs.writeFileSync(file, buf)
  } catch {
    const tmp = `${file}.wtmp`

    fs.writeFileSync(tmp, buf)
    fs.renameSync(tmp, file)
  }
}

/** Async sibling of writeFileReplace for the drain workers. */
const writeFileReplaceAsync = async (file, buf) => {
  try {
    await fs.promises.writeFile(file, buf)
  } catch {
    const tmp = `${file}.wtmp`

    await fs.promises.writeFile(tmp, buf)
    await fs.promises.rename(tmp, file)
  }
}

/**
 * Writes `contents` to `file` synchronously, then queues async
 * brotli-11 + gzip-9 siblings. The sync write keeps every caller's
 * existing "file exists right after the call" assumption; only the
 * compressed siblings defer to the pool.
 * @param {string} file absolute output path
 * @param {string | Buffer} contents document body
 */
export const queueCompressedWrite = (file, contents) => {
  const buf = Buffer.isBuffer(contents) ? contents : Buffer.from(contents, 'utf8')

  withFsRetry(() => writeFileReplace(file, buf))
  pending.push({ file, buf })
}

/**
 * Compresses one queued task — brotli + gzip run concurrently per file
 * (two threadpool slots) and each sibling write retries through
 * withFsRetryAsync so a transient Windows share lock can't fail a
 * multi-thousand-file drain.
 * @param {{file: string, buf: Buffer}} task queued work item
 * @returns {Promise<void>} resolves once both siblings are on disk
 */
const runTask = async ({ file, buf }) => {
  const [br, gz] = await Promise.all([brotliCompress(buf, BROTLI_OPTS), gzip(buf, GZIP_OPTS)])

  await Promise.all([
    withFsRetryAsync(() => writeFileReplaceAsync(`${file}.br`, br)),
    withFsRetryAsync(() => writeFileReplaceAsync(`${file}.gz`, gz)),
  ])
}

/**
 * Drains the queue with bounded worker concurrency. The libuv threadpool
 * (sized via UV_THREADPOOL_SIZE at process start) limits zlib work, but
 * each task also opens file handles for the two sibling writes — with
 * ~19k queued tasks, unbounded fan-out opens handles faster than they
 * close and trips EMFILE on Windows. A fixed worker pool keeps at most
 * DRAIN_CONCURRENCY×2 handles in flight. Tasks queued after this call
 * would be missed, so callers must drain exactly once, after the emit
 * loop.
 * @returns {Promise<number>} count of documents compressed
 */
export const drainCompressedWrites = async () => {
  let done = 0

  // Bounded drain: each worker pulls tasks until the queue empties —
  // runTask's own Promise.all gives every worker ~4 libuv ops in flight.
  const workers = Array.from({ length: DRAIN_CONCURRENCY }, async () => {
    while (pending.length) {
      await runTask(pending.shift())

      done++
    }
  })

  await Promise.all(workers)

  return done
}

/** Pending-task count — exposed for progress logs and tests. */
export const compressedWritesPending = () => pending.length
