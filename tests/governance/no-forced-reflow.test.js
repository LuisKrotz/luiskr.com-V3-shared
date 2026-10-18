/**
 * @file no-forced-reflow.test.js
 * @description Governance: no write→read→write layout interleaving in any
 * component or page. The harness patches the DOM write surface
 * (setAttribute, classList, node insertion/removal, CSSStyleDeclaration
 * setProperty — happy-dom routes every `style.foo = x` and
 * `Object.assign(style, …)` through it) plus the layout-read surface
 * (getBoundingClientRect, offset/client/scroll boxes, getComputedStyle,
 * innerWidth/Height) with a two-rule model:
 *
 *   write … read          → allowed once per task (post-render measure —
 *                           layout is computed once either way)
 *   write … read … write … read
 *                         → violation: the second read re-forces layout
 *                           in the same task (the classic thrash pattern)
 *
 * Deliberate transition-restart flushes go through flushLayout() in
 * core/utils/dom — reads inside it are exempt via isIntentionalFlush().
 */
import { isIntentionalFlush } from '@core/utils/dom.js'

/** One recorded interleaving violation: which read API fired while dirty. */
const violations = []

/** Write count since the last layout read — resets each task. */
let dirty = false

/** Dirty-read count inside the current task — 2+ means interleaving. */
let reflows = 0

/** Whether the end-of-task reset is already queued. */
let resetArmed = false

/** Arms the microtask that closes the current measurement task. */
const armReset = () => {
  if (resetArmed) return

  resetArmed = true

  queueMicrotask(() => {
    dirty = false
    reflows = 0
    resetArmed = false
  })
}

/** Marks a DOM write — the next layout read is a reflow. */
const markWrite = () => {
  armReset()

  dirty = true
}

/**
 * Marks a layout read. A read while dirty consumes the dirt — that IS
 * the reflow; a second dirty read inside the same task is interleaving.
 * @param api Read API name for the violation report.
 */
const markRead = (api) => {
  if (isIntentionalFlush()) return

  armReset()

  if (!dirty) return

  reflows++

  dirty = false

  if (reflows > 1) {
    violations.push({ api, stack: new Error(api).stack })
  }
}

/** Saved originals — restored in afterAll. */
const restore = []

/**
 * Replaces a prototype method with a wrapper that runs `side` first.
 * @param proto Prototype object.
 * @param name Method name.
 * @param side Side-effect to run before the original.
 */
const wrapMethod = (proto, name, side) => {
  const orig = proto?.[name]

  if (typeof orig !== 'function') return

  const test = { [name]: orig }[name]

  proto[name] = function (...args) {
    side()

    return test.apply(this, args)
  }

  restore.push(() => {
    proto[name] = orig
  })
}

/**
 * Replaces a prototype property getter with a wrapper that marks a read.
 * @param proto Prototype object.
 * @param prop Property name.
 * @param api Read API name for the violation report.
 */
const wrapGetter = (proto, prop, api) => {
  const desc = Object.getOwnPropertyDescriptor(proto, prop)

  if (!desc || typeof desc.get !== 'function' || !desc.configurable) return

  const origGet = desc.get

  Object.defineProperty(proto, prop, {
    ...desc,
    get() {
      markRead(api)

      return origGet.call(this)
    },
  })

  restore.push(() => Object.defineProperty(proto, prop, desc))
}

/** Patches every write/read API the harness tracks. */
const install = () => {
  const E = globalThis.Element
  const N = globalThis.Node
  const H = globalThis.HTMLElement
  const D = globalThis.DOMTokenList
  const C = globalThis.CSSStyleDeclaration

  for (const m of [
    'setAttribute',
    'removeAttribute',
    'toggleAttribute',
    'replaceChildren',
    'insertAdjacentHTML',
    'insertAdjacentElement',
  ]) {
    wrapMethod(E?.prototype, m, markWrite)
  }

  for (const m of ['appendChild', 'insertBefore', 'removeChild', 'replaceChild']) {
    wrapMethod(N?.prototype, m, markWrite)
  }

  for (const m of ['add', 'remove', 'toggle', 'replace']) {
    wrapMethod(D?.prototype, m, markWrite)
  }

  for (const m of ['setProperty', 'removeProperty']) {
    wrapMethod(C?.prototype, m, markWrite)
  }

  for (const prop of ['innerHTML', 'textContent']) {
    const desc = Object.getOwnPropertyDescriptor(E?.prototype, prop)

    if (desc?.set && desc.configurable) {
      Object.defineProperty(E.prototype, prop, {
        ...desc,
        set(v) {
          markWrite()

          desc.set.call(this, v)
        },
      })

      restore.push(() => Object.defineProperty(E.prototype, prop, desc))
    }
  }

  wrapMethod(E?.prototype, 'getBoundingClientRect', () => markRead('getBoundingClientRect'))
  wrapMethod(E?.prototype, 'getClientRects', () => markRead('getClientRects'))

  for (const [proto, props] of [
    [H?.prototype, ['offsetWidth', 'offsetHeight', 'offsetTop', 'offsetLeft', 'offsetParent']],
    [
      E?.prototype,
      [
        'clientWidth',
        'clientHeight',
        'clientTop',
        'clientLeft',
        'scrollWidth',
        'scrollHeight',
        'scrollTop',
        'scrollLeft',
      ],
    ],
  ]) {
    if (proto) {
      for (const p of props) wrapGetter(proto, p, p)
    }
  }

  const w = globalThis.window || globalThis

  for (const p of ['innerWidth', 'innerHeight']) {
    const desc = Object.getOwnPropertyDescriptor(w, p)

    if (desc?.get && desc.configurable) {
      const origGet = desc.get

      Object.defineProperty(w, p, {
        ...desc,
        get() {
          markRead(p)

          return origGet.call(this)
        },
      })

      restore.push(() => Object.defineProperty(w, p, desc))
    }
  }

  const gcs = w.getComputedStyle?.bind(w) || globalThis.getComputedStyle?.bind(globalThis)

  if (gcs) {
    const wrapped = (...args) => {
      markRead('getComputedStyle')

      return gcs(...args)
    }

    if (globalThis.window) globalThis.window.getComputedStyle = wrapped

    globalThis.getComputedStyle = wrapped

    restore.push(() => {
      if (globalThis.window) globalThis.window.getComputedStyle = gcs
      globalThis.getComputedStyle = gcs
    })
  }
}

// Every public-site custom element — components AND route views. The
// module imports register them against the real store/router so mounts
// run the production code paths (render → measure → paint).
const SURFACES = [
  () => import('@website/components/home/HomeMosaic.js'),
  () => import('@website/components/home/AboutSection.js'),
  () => import('@website/components/home/ContactSection.js'),
  () => import('@website/components/nav/AppNav.js'),
  () => import('@website/components/media/MediaFigure.js'),
  () => import('@website/components/media/MediaExpanded.js'),
  () => import('@website/components/media/DrawText.js'),
  () => import('@website/components/feedback/CookieBanner.js'),
  () => import('@website/components/feedback/SiteToast.js'),
  () => import('@website/components/carousel/CustomCarousel.js'),
  () => import('@website/components/carousel/AwardsCarousel.js'),
  () => import('@website/components/dialogs/PreferencesModal.js'),
  () => import('@website/components/dialogs/LangDialog.js'),
  () => import('@website/components/home/AwardsMentions.js'),
  () => import('@website/components/portfolio/Related.js'),
  () => import('@website/components/legal/Footer.js'),
  () => import('@website/views/home/Home.js'),
  () => import('@website/views/project/Project.js'),
  () => import('@website/views/legal/Legal.js'),
  () => import('@website/views/not-found/NotFound.js'),
]

/** Formats the recorded violations into a failure message. */
const report = () =>
  violations
    .map((v) => `  ${v.api}\n${String(v.stack).split('\n').slice(1, 5).join('\n')}`)
    .join('\n')

/**
 * Mounts one element through the full lifecycle — connectedCallback,
 * settled microtasks, a re-render pass — inside the instrumented window.
 * @param tag Custom element tag name.
 * @returns The mounted element (removed from the DOM afterward).
 */
const mountAndExercise = async (tag) => {
  const el = document.createElement(tag)

  document.body.appendChild(el)

  await Promise.resolve()
  await Promise.resolve()

  if (typeof el._updateDom === 'function') el._updateDom()

  await Promise.resolve()

  return el
}

describe('forced-reflow governance', () => {
  beforeAll(() => install())

  afterAll(() => {
    for (const undo of restore.splice(0)) undo()
  })

  beforeEach(() => {
    violations.length = 0
    dirty = false
    reflows = 0
  })

  test('every component and view mounts + re-renders without interleaved layout reads', async () => {
    for (const load of SURFACES) await load()

    const { COMPONENT_TAGS } = await import('@core/tokens/elements/components.js')
    const { VIEW_TAGS } = await import('@core/tokens/elements/views.js')

    const tags = [...Object.values(COMPONENT_TAGS), ...Object.values(VIEW_TAGS)]
    const mounted = []

    for (const tag of tags) {
      if (!customElements.get(tag)) continue

      const el = await mountAndExercise(tag)

      mounted.push(tag)
      el.remove()
    }

    expect(mounted.length).toBeGreaterThan(10)
    expect(`\ninterleaved layout reads:\n${report()}`).toBe(`\ninterleaved layout reads:\n`)
  })

  test('draw-text fit flush batches reads ahead of writes', async () => {
    const { COMPONENT_TAGS } = await import('@core/tokens/elements/components.js')
    const { COMMON_ATTRS } = await import('@core/tokens/attrs/common.js')
    const { FORM_ATTRS } = await import('@core/tokens/attrs/form.js')

    const hosts = []

    for (const text of ['alpha', 'beta gamma', 'delta']) {
      const el = document.createElement(COMPONENT_TAGS.DRAW_TEXT)

      el.setAttribute(FORM_ATTRS.TEXT, text)
      el.setAttribute(COMMON_ATTRS.FIT, COMMON_ATTRS.FIT)
      document.body.appendChild(el)
      hosts.push(el)
    }

    // Two frames for the queued flushFits batch to run.
    await new Promise((r) => setTimeout(r, 40))

    hosts.forEach((h) => h.remove())

    expect(`\ninterleaved layout reads:\n${report()}`).toBe(`\ninterleaved layout reads:\n`)
  })
})
