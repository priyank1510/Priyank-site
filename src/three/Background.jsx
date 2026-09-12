import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  AdaptiveDpr,
  Environment,
  Float,
  Lightformer,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'
import { theme } from '../content.js'
import usePointer from '../hooks/usePointer.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useScrollProgress from './useScrollProgress.js'

/**
 * Fixed 3D layer behind the whole page.
 * The CSS aurora underneath is always painted, so if WebGL is unavailable,
 * disabled in content.js, or the user prefers reduced motion, the page still
 * looks finished — it just stops moving.
 */
export default function Background() {
  const reduced = useReducedMotion()
  const [degraded, setDegraded] = useState(false)
  const show3d = theme.scene !== 'none' && !reduced

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__aurora" />
      {show3d && (
        <Canvas
          className="backdrop__canvas"
          dpr={[1, degraded ? 1 : 1.75]}
          gl={{ antialias: !degraded, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 9], fov: 42 }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <PerformanceMonitor
            onDecline={() => theme.adaptivePerformance && setDegraded(true)}
          />
          <Suspense fallback={null}>
            <Scene degraded={degraded} />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      )}
    </div>
  )
}

function Scene({ degraded }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 6]} intensity={1.5} color={theme.accentB} />
      <directionalLight position={[-7, -4, 3]} intensity={1.1} color={theme.accentC} />

      {/* Local HDRI built from lightformers — no network fetch, no CDN. */}
      <Environment resolution={degraded ? 64 : 160}>
        <Lightformer
          form="rect"
          intensity={3.2}
          color={theme.accentA}
          position={[-6, 3, -6]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          color={theme.accentB}
          position={[6, -2, -5]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="ring"
          intensity={2}
          color="#ffffff"
          position={[0, 6, -8]}
          scale={[6, 6, 1]}
        />
      </Environment>

      {theme.scene === 'crystals' && <Crystals degraded={degraded} />}
      <Dust count={degraded ? 260 : 800} />
      <Rig />
    </>
  )
}

/** Deterministic placement so the composition never lands badly on reload. */
const SHARDS = [
  { position: [-5.4, 2.2, -7], scale: 1.5, detail: 0 },
  { position: [5.6, 2.8, -8.5], scale: 2.1, detail: 1 },
  { position: [4.4, -2.6, -6], scale: 1.2, detail: 0 },
  { position: [-4.2, -3.1, -7.5], scale: 1.4, detail: 1 },
  { position: [0.6, 4.4, -11], scale: 2.4, detail: 0 },
  { position: [-7.6, -0.4, -10], scale: 1.1, detail: 1 },
]

function Crystals({ degraded }) {
  return (
    <group>
      {SHARDS.map((shard, i) => (
        <Float
          key={i}
          speed={1.1 + i * 0.18}
          rotationIntensity={0.6}
          floatIntensity={1.1}
        >
          <Shard {...shard} index={i} degraded={degraded} />
        </Float>
      ))}
    </group>
  )
}

function Shard({ position, scale, detail, index, degraded }) {
  const ref = useRef()

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.08
    ref.current.rotation.y += delta * (index % 2 ? -0.11 : 0.13)
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, detail]} />
      {/* Kept faint on purpose: this sits behind body copy, so it has to read
          as atmosphere rather than as an object competing with the text. */}
      <meshPhysicalMaterial
        transmission={degraded ? 0 : 1}
        thickness={2.2}
        roughness={0.22}
        ior={1.45}
        iridescence={degraded ? 0 : 0.7}
        iridescenceIOR={1.3}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.25}
        color={index % 2 ? theme.accentB : theme.accentA}
        transparent
        opacity={degraded ? 0.18 : 0.32}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Slow drifting point field — cheap depth cue behind the glass panels. */
function Dust({ count }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.015
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3
  })

  return (
    <points ref={ref} key={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color={theme.accentB}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Camera drift: follows the pointer for parallax and pulls back / pans down as
 * the page scrolls, so the backdrop reads as one continuous space.
 */
function Rig() {
  const pointer = usePointer()
  const progress = useScrollProgress()
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const p = progress.current
    target.set(
      pointer.current.x * 1.15,
      pointer.current.y * 0.7 - p * 2.6,
      9 + p * 2.2
    )
    // Frame-rate independent smoothing.
    camera.position.lerp(target, 1 - Math.pow(0.0015, delta))
    camera.lookAt(0, -p * 1.2, 0)
  })

  return null
}
