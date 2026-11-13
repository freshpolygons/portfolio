import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLUMNS = 85
const ROWS = 44
const COUNT = COLUMNS * ROWS

export default function HeroCloud() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return // The CSS glow remains if WebGL is unavailable.
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(49, 1, 0.1, 100)
    camera.position.set(0, 1.8, 13.8)
    camera.lookAt(0, 0, 0)

    const group = new THREE.Group()
    group.rotation.set(-0.53, -0.17, -0.12)
    scene.add(group)

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const vertexGeometry = new THREE.BufferGeometry()
    vertexGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    vertexGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(vertexGeometry, pointMaterial)
    points.frustumCulled = false
    group.add(points)

    const edges: [number, number][] = []
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const i = row * COLUMNS + col
        if (col < COLUMNS - 1) edges.push([i, i + 1])
        if (row < ROWS - 1) edges.push([i, i + COLUMNS])
        if (row < ROWS - 1 && col < COLUMNS - 1 && (row + col) % 3 === 0) edges.push([i, i + COLUMNS + 1])
      }
    }
    const linePositions = new Float32Array(edges.length * 6)
    const lineColors = new Float32Array(edges.length * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.17,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    lines.frustumCulled = false
    group.add(lines)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = mediaQuery.matches
    let visible = true
    let frame = 0
    let previous = 0
    const clock = new THREE.Clock()

    const update = (time: number) => {
      for (let row = 0; row < ROWS; row++) {
        const v = row / (ROWS - 1)
        for (let col = 0; col < COLUMNS; col++) {
          const u = col / (COLUMNS - 1)
          const i = row * COLUMNS + col
          const x = (u - 0.5) * 16.4
          const z = (v - 0.5) * 7.7
          const ridge = Math.sin(x * 0.66 + time * 0.32 + z * 0.44) * 0.88
          const swell = Math.sin(x * 1.04 - z * 0.81 - time * 0.25) * 0.46
          const fine = Math.sin(x * 1.7 + z * 0.85 + time * 0.21) * 0.17
          const y = ridge + swell + fine + z * 0.10
          const offset = i * 3
          positions[offset] = x
          positions[offset + 1] = y
          positions[offset + 2] = z

          const brightness = Math.max(0.17, 0.95 - Math.abs(u - 0.53) * 0.7 - Math.abs(v - 0.42) * 0.54)
          const crest = Math.max(0, Math.sin(x * 0.67 + time * 0.32 + z * 0.44)) * 0.26
          const sparkle = (i * 37) % 83 === 0 ? 0.5 : 0
          const intensity = Math.min(1, brightness * (0.56 + crest + sparkle))
          colors[offset] = 0.05 + intensity * 0.12
          colors[offset + 1] = 0.20 + intensity * 0.8
          colors[offset + 2] = 0.09 + intensity * 0.24
        }
      }
      for (let edge = 0; edge < edges.length; edge++) {
        const [a, b] = edges[edge]
        const at = edge * 6
        linePositions.set(positions.subarray(a * 3, a * 3 + 3), at)
        linePositions.set(positions.subarray(b * 3, b * 3 + 3), at + 3)
        lineColors.set(colors.subarray(a * 3, a * 3 + 3), at)
        lineColors.set(colors.subarray(b * 3, b * 3 + 3), at + 3)
      }
      vertexGeometry.attributes.position.needsUpdate = true
      vertexGeometry.attributes.color.needsUpdate = true
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true
      renderer.render(scene, camera)
    }

    const animate = (timestamp: number) => {
      if (!visible || reducedMotion) return
      if (timestamp - previous >= 33) {
        previous = timestamp
        update(clock.getElapsedTime())
      }
      frame = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (visible && !reducedMotion && frame === 0) frame = window.requestAnimationFrame(animate)
    }

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      if (width < 1 || height < 1) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      update(reducedMotion ? 0 : clock.getElapsedTime())
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
      if (visible) start()
      else {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    })
    intersection.observe(mount)
    const motionChanged = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      if (reducedMotion) {
        window.cancelAnimationFrame(frame)
        frame = 0
        update(0)
      } else start()
    }
    mediaQuery.addEventListener('change', motionChanged)
    resize()
    start()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      intersection.disconnect()
      mediaQuery.removeEventListener('change', motionChanged)
      vertexGeometry.dispose()
      lineGeometry.dispose()
      pointMaterial.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero-cloud" ref={mountRef} aria-hidden="true" />
}
