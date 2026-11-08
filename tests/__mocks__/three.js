/**
 * @file three.js (mock)
 * @description Auto-mock for the `three` package used by earth-background.js.
 * Every class is a constructable/chainable proxy so scene-graph code
 * (`new THREE.Mesh().position.set(...)`) resolves without a GPU.
 * TextureLoader is real-ish so loadAsync() resolves textures.
 */

/**
 * Instance-shape proxy: property reads return real stored values when a
 * test set them, otherwise another chainable — so `mesh.position.x` and
 * `mesh.material.opacity` resolve at any depth without a GPU. `then`/`catch`
 * are shadowed to undefined so awaiting a geometry/material never treats
 * the proxy as a thenable.
 */
const autoInst = () =>
  new Proxy(
    {},
    {
      get(t, p) {
        if (p === Symbol.toPrimitive) return () => 0
        if (p === 'then' || p === 'catch' || p === 'finally') return undefined
        if (p in t) return t[p]

        return chain()
      },
      // Writes stick — a test can read back what the engine assigned.
      set(t, p, v) {
        t[p] = v

        return true
      },
    }
  )

/**
 * Call/construct-shape proxy: `new X()`, `x.y.z()`, and `x.y.z.w` all
 * resolve — chain() for calls/props, autoInst() for construction and
 * prototype so `new THREE.Mesh()` yields an instance-like object.
 */
const chain = () =>
  new Proxy(function () {}, {
    get(_t, p) {
      if (p === Symbol.toPrimitive) return () => 0
      if (p === Symbol.iterator) return function* () {}
      if (p === 'then' || p === 'catch' || p === 'finally') return undefined
      if (p === 'prototype') return autoInst()

      return chain()
    },
    set() {
      return true
    },
    apply() {
      return chain()
    },
    construct() {
      return autoInst()
    },
  })

/** Minimal Texture-shaped object the loaders hand to engine code. */
const makeTex = () => ({ mapping: 0, colorSpace: '', anisotropy: 0 })

/**
 * Real-ish texture loader — both callback and promise forms resolve a
 * stub texture synchronously so engine load paths complete in tests.
 */
export class TextureLoader {
  load(_url, onLoad) {
    const tex = makeTex()

    onLoad?.(tex)

    return tex
  }

  async loadAsync() {
    return makeTex()
  }
}

export const Vector3 = chain()
export const Color = chain()
export const Scene = chain()
export const Group = chain()
export const Mesh = chain()
export const LOD = chain()
export const DirectionalLight = chain()
export const PointLight = chain()
export const Sprite = chain()
export const SpriteMaterial = chain()
export const PlaneGeometry = chain()
export const RingGeometry = chain()
export const TorusGeometry = chain()
export const CylinderGeometry = chain()
export const CanvasTexture = chain()
export const CircleGeometry = chain()
export const DoubleSide = 2
export const MathUtils = chain()
export const PerspectiveCamera = chain()
export const SphereGeometry = chain()
export const MeshBasicMaterial = chain()
export const MeshStandardMaterial = chain()
export const Raycaster = chain()
export const WebGLRenderer = chain()
export const LineSegments = chain()
export const LineBasicMaterial = chain()
export const Points = chain()
export const PointsMaterial = chain()
export const InstancedMesh = chain()
export const InstancedBufferAttribute = chain()
export const DynamicDrawUsage = 35048
export const BufferGeometry = chain()
export const InstancedBufferGeometry = chain()
export const BoxGeometry = chain()
export const IcosahedronGeometry = chain()
export const TetrahedronGeometry = chain()
export const BufferAttribute = chain()
export const Float32BufferAttribute = chain()
export const Clock = chain()
export const Vector2 = chain()
export const Vector4 = chain()
export const Quaternion = chain()
export const Euler = chain()
export const Matrix4 = chain()
export const Object3D = chain()
export const AmbientLight = chain()
export const Fog = chain()
export const FogExp2 = chain()

export const ACESFilmicToneMapping = 1
export const AdditiveBlending = 1
export const NormalBlending = 1
export const BackSide = 1
export const FrontSide = 1
export const EquirectangularReflectionMapping = 1
export const SRGBColorSpace = 'srgb'
export const MOUSE = { PAN: 0, LEFT: 0, MIDDLE: 0, RIGHT: 0 }

export const __chain = chain
