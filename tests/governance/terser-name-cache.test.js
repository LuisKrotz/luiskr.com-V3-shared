/**
 * @file terser-name-cache.test.js
 * @description Governance gate for the terser mangle cache — asserts the
 * shared vars nameCache stays disabled so a dependency declaring a
 * module-scope variable named after a browser global (e.g. cytoscape's
 * `var requestAnimationFrame`) can never poison bare global references in
 * unrelated chunks into dangling identifiers. Property mangling keeps its
 * shared nameCache.props; vars mangling must not, because module chunks
 * have isolated scopes.
 */

import { describe, test, expect } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT_DIR } from '@tests/fixtures/test-constants.js'

describe('Terser vars nameCache isolation', () => {
  const configPath = path.join(ROOT_DIR, 'vite.config.js')

  test('vite.config.js exists', () => {
    expect(fs.existsSync(configPath)).toBe(true)
  })

  test('mangle disables the shared vars nameCache', () => {
    const src = fs.readFileSync(configPath, 'utf-8')

    const mangleBlock = src.match(/const terserMangle = \{([\s\S]*?)\n {2}\}/)

    expect(mangleBlock).not.toBeNull()
    expect(mangleBlock[1]).toMatch(/cache:\s*null/)
  })
})
