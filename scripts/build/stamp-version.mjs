#!/usr/bin/env node
/**
 * @file stamp-version.mjs
 * @description Build-time version/build-id stamper wired into build.mjs.
 *
 * Two phases:
 *   --sync  runs BEFORE build-targets.mjs — mirrors package.json#version into
 *           .env's VITE_APP_VERSION so the freshly built bundle reports the
 *           bumped package version (the footer stamp reads import.meta.env).
 *   --bump  runs AFTER a successful build — increments VITE_BUILD_ID's patch
 *           (rc-X.Y.Z → rc-X.Y.(Z+1)) so every build carries a fresh build
 *           number; the next build inherits the bumped value.
 *
 * .env is committed, so the stamped values persist across machines and CI.
 * Both phases are idempotent line rewrites — keys are never duplicated.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Repo root — this file sits at shared/scripts/build/. */
const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))

const ENV_FILE = path.join(ROOT, '.env')
const PKG_FILE = path.join(ROOT, 'package.json')

const VERSION_KEY = 'VITE_APP_VERSION'
const BUILD_KEY = 'VITE_BUILD_ID'
const BUILD_SEED = 'rc-1.0.0'

/**
 * Reads .env as a line list (empty file → empty list). CRLF is normalized
 * to LF up front — Windows editors/git checkouts can leave \r on the
 * values, which would defeat the key match and the rc-* regex.
 * @returns {string[]} raw .env lines
 */
const readEnvLines = () =>
  fs.existsSync(ENV_FILE)
    ? fs.readFileSync(ENV_FILE, 'utf8').replace(/\r\n/g, '\n').split('\n')
    : []

/**
 * Writes the line list back to .env with a single trailing newline —
 * trailing blank lines are stripped first so rewrites don't accumulate
 * empty rows at the tail.
 * @param {string[]} lines env lines to persist
 * @returns {void}
 */
const writeEnvLines = (lines) => {
  while (lines.length && lines[lines.length - 1] === '') lines.pop()

  fs.writeFileSync(ENV_FILE, `${lines.join('\n')}\n`)
}

/**
 * Rewrites `KEY=value` in place or appends it when the key is absent.
 * @param {string[]} lines env line list (mutated)
 * @param {string} key env key
 * @param {string} value new value
 * @returns {boolean} true when the file content actually changed
 */
const setEntry = (lines, key, value) => {
  const prefix = `${key}=`
  const idx = lines.findIndex((line) => line.startsWith(prefix))

  if (idx >= 0) {
    if (lines[idx] === `${prefix}${value}`) return false

    lines[idx] = `${prefix}${value}`

    return true
  }

  // Drop a trailing blank line so the appended key lands on the last line.
  if (lines.length && lines[lines.length - 1] === '') lines.pop()

  lines.push(`${prefix}${value}`)

  return true
}

/** Mirrors package.json#version into VITE_APP_VERSION (pre-build). */
const sync = () => {
  const { version } = JSON.parse(fs.readFileSync(PKG_FILE, 'utf8'))
  const lines = readEnvLines()

  if (setEntry(lines, VERSION_KEY, version)) writeEnvLines(lines)
}

/** Increments VITE_BUILD_ID's patch; seeds rc-1.0.0 when absent (post-build). */
const bump = () => {
  const lines = readEnvLines()
  const prefix = `${BUILD_KEY}=`
  const idx = lines.findIndex((line) => line.startsWith(prefix))
  const match = idx >= 0 ? lines[idx].slice(prefix.length).match(/^rc-(\d+)\.(\d+)\.(\d+)$/) : null
  const next = match ? `rc-${match[1]}.${match[2]}.${Number(match[3]) + 1}` : BUILD_SEED

  if (idx >= 0) lines[idx] = `${prefix}${next}`
  else {
    if (lines.length && lines[lines.length - 1] === '') lines.pop()

    lines.push(`${prefix}${next}`)
  }

  writeEnvLines(lines)
}

const mode = process.argv[2]

if (mode === '--sync') sync()
else if (mode === '--bump') bump()
else throw new Error('usage: stamp-version.mjs --sync|--bump')
