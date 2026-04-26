<template>
  <canvas ref="canvasRef" class="neural-canvas" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  depth: number
  phase: number
  drift: number
  pulse: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let frame = 0
let width = 0
let height = 0
let reduceMotion = false
let isVisible = true
let lastFrameTime = 0
let observer: IntersectionObserver | null = null
let isRunning = false

function setup() {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d', { alpha: true })
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()

  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', updateVisibility)
  observer = new IntersectionObserver(([entry]) => {
    isVisible = Boolean(entry?.isIntersecting)
  })
  observer.observe(canvas)
  startLoop()
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return

  const ratio = Math.min(window.devicePixelRatio || 1, 1.8)
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = Math.floor(width * ratio)
  canvas.height = Math.floor(height * ratio)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0)

  const count = width < 720 ? 28 : 46
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    depth: 0.45 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    drift: 6 + Math.random() * 18,
    pulse: 0.0012 + Math.random() * 0.0018,
  }))
}

function moveParticle(particle: Particle, now: number) {
  if (reduceMotion) return

  const wave = now * 0.00022 + particle.phase
  particle.x += (particle.vx + Math.cos(wave) * 0.018) * particle.depth
  particle.y += (particle.vy + Math.sin(wave * 1.4) * 0.016) * particle.depth

  if (particle.x < -20) particle.x = width + 20
  if (particle.x > width + 20) particle.x = -20
  if (particle.y < -20) particle.y = height + 20
  if (particle.y > height + 20) particle.y = -20
}

function draw() {
  if (!ctx) return
  if (!isVisible || document.hidden) {
    isRunning = false
    return
  }

  const now = performance.now()

  if (now - lastFrameTime < 66) {
    frame = window.requestAnimationFrame(draw)
    return
  }
  lastFrameTime = now

  ctx.clearRect(0, 0, width, height)

  const gradient = ctx.createRadialGradient(width * 0.7, height * 0.22, 0, width * 0.7, height * 0.22, width * 0.55)
  gradient.addColorStop(0, 'rgba(13, 110, 253, 0.18)')
  gradient.addColorStop(1, 'rgba(13, 110, 253, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  for (const particle of particles) {
    moveParticle(particle, now)
  }

  for (let i = 0; i < particles.length; i += 1) {
    const a = particles[i]
    if (!a) continue

    for (let j = i + 1; j < Math.min(i + 8, particles.length); j += 1) {
      const b = particles[j]
      if (!b) continue

      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      if (distance > 118) continue

      const opacity = (1 - distance / 118) * 0.14
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(118, 138, 157, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  for (const particle of particles) {
    const pulse = reduceMotion ? 0.38 : 0.28 + Math.sin(now * particle.pulse + particle.phase) * 0.12
    const radius = 1.1 + particle.depth * 1.15 + (reduceMotion ? 0 : Math.sin(now * 0.001 + particle.phase) * 0.28)
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(13, 110, 253, ${pulse})`
    ctx.shadowColor = '#0d6efd'
    ctx.shadowBlur = 8
    ctx.fill()
    ctx.shadowBlur = 0
  }

  if (!reduceMotion) {
    frame = window.requestAnimationFrame(draw)
    return
  }

  isRunning = false
}

function startLoop() {
  if (isRunning) return
  isRunning = true
  frame = window.requestAnimationFrame(draw)
}

function updateVisibility() {
  isVisible = !document.hidden
  if (isVisible) {
    startLoop()
  }
}

onMounted(setup)

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame)
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', updateVisibility)
  observer?.disconnect()
})
</script>

<style scoped>
.neural-canvas {
  width: 100%;
  height: 100%;
  opacity: 0.92;
}
</style>
