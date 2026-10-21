/**
 * @file windows-path-safety.test.js
 * @description Governance gate for Windows-clone safety — every path tracked
 * by git (submodules included) must survive an NTFS checkout:
 *
 *  - no segment may contain characters Windows forbids in filenames
 *    (`* ? " < > | :` and `\`) — `git checkout` fails on them outright;
 *  - no segment may be a reserved DOS device name (CON, PRN, AUX, NUL,
 *    COM1–9, LPT1–9), with or without an extension — Windows refuses to
 *    create them;
 *  - no segment may end with `.` or a space — NTFS silently strips them,
 *    which breaks the tracked-path ↔ on-disk-path mapping;
 *  - no two paths may be equal case-insensitively — NTFS is
 *    case-preserving but case-insensitive, so `App/index.html` and
 *    `app/index.html` overwrite each other.
 */

import { describe, test, expect } from '@jest/globals'
import { execFileSync } from 'node:child_process'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'

/** Characters Windows forbids inside a single path segment. */
const ILLEGAL_SEGMENT = /[*?"<>|:\\]/

/**
 * Reserved DOS device basenames — matched on the segment with its
 * extension stripped (`NUL.md` is just as illegal as `NUL`).
 */
const RESERVED_DEVICE = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i

/**
 * Lists every tracked path in the repo — NUL-separated so filenames with
 * spaces stay intact — recursing into submodules (paths are reported
 * relative to the superproject).
 * @returns {Array<string>} All tracked paths.
 */
const trackedPaths = () =>
  execFileSync('git', ['ls-files', '-z', '--recurse-submodules'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
    .split('\0')
    .filter(Boolean)

/** Formats an offender list (first 20) for failure output; '' when clean. */
const report = (label, offenders) =>
  offenders.length
    ? `${label}:\n${offenders
        .slice(0, 20)
        .map((p) => `  ${p}`)
        .join('\n')}${offenders.length > 20 ? `\n  …and ${offenders.length - 20} more` : ''}`
    : ''

describe('windows path safety', () => {
  const paths = trackedPaths()

  test('no path segment contains Windows-illegal characters', () => {
    const offenders = paths.filter((p) => p.split('/').some((seg) => ILLEGAL_SEGMENT.test(seg)))

    expect(report('illegal characters', offenders)).toBe('')
  })

  test('no path segment is a reserved DOS device name', () => {
    const offenders = paths.filter((p) =>
      p.split('/').some((seg) => RESERVED_DEVICE.test(seg.split('.')[0]))
    )

    expect(report('reserved device names', offenders)).toBe('')
  })

  test('no path segment ends with a dot or a space', () => {
    const offenders = paths.filter((p) => p.split('/').some((seg) => /[. ]$/.test(seg)))

    expect(report('trailing dot/space', offenders)).toBe('')
  })

  test('no two tracked paths collide case-insensitively (NTFS)', () => {
    const seen = new Map()
    const offenders = []

    for (const p of paths) {
      const key = p.toLowerCase()

      if (seen.has(key)) {
        offenders.push(`${seen.get(key)}  <->  ${p}`)
      } else {
        seen.set(key, p)
      }
    }

    expect(report('case-insensitive collisions', offenders)).toBe('')
  })
})
