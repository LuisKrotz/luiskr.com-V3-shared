/**
 * @file fs-retry.mjs
 * @description Bounded retry for fs operations that race Windows file locks.
 * Antivirus/indexer scans hold a share lock on freshly written files for
 * tens of milliseconds; Node surfaces the failed open as UNKNOWN (uv maps
 * unrecognized Win32 codes — lock/sharing/virus violations land there) or
 * EBUSY/EPERM/EACCES. A short backoff absorbs the scan window instead of
 * failing a multi-thousand-file build on a transient race.
 */

/** fs error codes a transient Windows share/scan lock can surface as. */
const RETRYABLE_CODES = new Set(['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES'])

/**
 * Attempts before rethrowing — ~60s of capped backoff. Signature updates and
 * indexer sweeps hold share locks for tens of seconds, and a deleted file
 * stays open-blocked until the stale handle closes.
 */
const MAX_ATTEMPTS = 120

/** Backoff step in ms — multiplied by the attempt index, capped below. */
const BACKOFF_STEP_MS = 50

/** Per-attempt backoff ceiling — linear growth stops here. */
const BACKOFF_CAP_MS = 500

/**
 * Notification slot for Atomics.wait — Node permits waiting on the main
 * thread (browsers forbid it), giving a true synchronous sleep.
 */
const SLEEP_SLOT = new Int32Array(new SharedArrayBuffer(4))

/**
 * Blocks the thread for `ms` via Atomics.wait; nothing ever notifies the
 * slot so the call returns 'timed-out' after the full delay.
 * @param {number} ms milliseconds to block
 * @returns {string} Atomics.wait result — always 'timed-out'
 */
const sleepSync = (ms) => Atomics.wait(SLEEP_SLOT, 0, 0, ms)

/**
 * Tells whether an fs error is a transient lock worth retrying.
 * @param {unknown} err caught error
 * @returns {boolean} true when the error code is retryable
 */
const retryable = (err) => RETRYABLE_CODES.has(err?.code)

/**
 * Capped linear backoff for an attempt index — 50ms, 100ms, … up to the cap.
 * @param {number} attempt 1-based attempt number
 * @returns {number} milliseconds to wait before the next attempt
 */
const backoffMs = (attempt) => Math.min(BACKOFF_STEP_MS * attempt, BACKOFF_CAP_MS)

/**
 * Runs a synchronous fs operation, retrying transient lock errors with
 * capped linear backoff. Non-lock errors and exhausted retries rethrow.
 * @template T
 * @param {() => T} op synchronous fs call to attempt
 * @returns {T} the operation's result once it succeeds
 */
export const withFsRetry = (op) => {
  for (let attempt = 1; ; attempt++) {
    try {
      return op()
    } catch (err) {
      if (!retryable(err) || attempt === MAX_ATTEMPTS) throw err

      sleepSync(backoffMs(attempt))
    }
  }
}

/**
 * Async variant for fs-adjacent promises (rolldown bundle writes) — same
 * retry policy, setTimeout backoff so the event loop stays free.
 * @template T
 * @param {() => Promise<T>} op async fs call to attempt
 * @returns {Promise<T>} the operation's result once it succeeds
 */
export const withFsRetryAsync = async (op) => {
  for (let attempt = 1; ; attempt++) {
    try {
      return await op()
    } catch (err) {
      if (!retryable(err) || attempt === MAX_ATTEMPTS) throw err

      await new Promise((resolve) => setTimeout(resolve, backoffMs(attempt)))
    }
  }
}
