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
 * Queued compression tasks — { file, buf } pairs. Buffers are retained
 * until their turn arrives: holding ~19k page buffers (~600MB worst
 * case) is deliberate — re-reading each file would double I/O and
 * invalidate AV-scan residency between write and compress.
 * @type {Array<{file: string, buf: Buffer}>}
 */
const pending = []

/**
 * In-flight compression promises — drain() collects these plus any
 * tasks queued before the drain begins.
 * @type {Promise<void>[]}
 */
const inflight = []

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

  withFsRetry(() => fs.writeFileSync(file, buf))
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
    withFsRetryAsync(() => fs.promises.writeFile(`${file}.br`, br)),
    withFsRetryAsync(() => fs.promises.writeFile(`${file}.gz`, gz)),
  ])
}

/**
 * Drains the queue with unbounded-by-us concurrency — the libuv
 * threadpool (sized via UV_THREADPOOL_SIZE at process start) is the
 * real limiter; queueing every task as a promise lets the pool
 * schedule them back-to-back. Tasks queued after this call would be
 * missed, so callers must drain exactly once, after the emit loop.
 * @returns {Promise<number>} count of documents compressed
 */
export const drainCompressedWrites = async () => {
  while (pending.length) {
    inflight.push(runTask(pending.shift()))
  }

  await Promise.all(inflight)

  const done = inflight.length

  inflight.length = 0

  return done
}

/** Pending-task count — exposed for progress logs and tests. */
export const compressedWritesPending = () => pending.length + inflight.length
