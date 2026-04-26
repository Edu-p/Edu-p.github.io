<template>
  <div ref="brainContainerRef" class="brain-container" v-html="brainSvg"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import brainSvg from '@/assets/brain.svg?raw'

const brainContainerRef = ref<HTMLElement | null>(null)
const themeColor = '#0d6efd'

function randomDelay() {
  return `${(Math.random() * 0.7).toFixed(2)}s`
}

function paintSvg() {
  const container = brainContainerRef.value
  if (!container) return

  const elements = container.querySelectorAll<SVGElement>(
    '.brainPath, .brainRect, .brainCircle, .brainEllipse',
  )

  elements.forEach((element) => {
    element.style.stroke = themeColor
    if (!element.classList.contains('brainPath')) {
      element.style.fill = themeColor
    }
  })
}

function animateSvg() {
  const container = brainContainerRef.value
  if (!container) return

  container.querySelectorAll<SVGPathElement>('path').forEach((path) => {
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    path.style.animationDelay = randomDelay()
    path.classList.add('animate-path')
  })

  container.querySelectorAll<SVGElement>('rect, circle, ellipse').forEach((element) => {
    element.style.animationDelay = randomDelay()
    element.classList.add('animate-node')
  })
}

onMounted(() => {
  paintSvg()
  animateSvg()
})
</script>

<style scoped>
.brain-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  transform-origin: 50% 52%;
  animation: brain-zoom 5200ms ease-in-out infinite;
}

:deep(svg) {
  width: 100%;
  height: 100%;
}

:deep(path) {
  fill: transparent;
  transition: stroke 400ms ease;
}

:deep(.animate-path) {
  animation: trace-path 3400ms ease-in-out infinite alternate;
}

:deep(.animate-node) {
  transform-box: fill-box;
  transform-origin: center;
  animation: node-pulse 3000ms ease-in-out infinite;
}

@keyframes brain-zoom {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.025);
  }
}

@keyframes trace-path {
  0% {
    opacity: 0.12;
    stroke-dashoffset: 100%;
  }

  55% {
    opacity: 1;
  }

  100% {
    opacity: 0.92;
    stroke-dashoffset: 0;
  }
}

@keyframes node-pulse {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  48% {
    opacity: 0.95;
    transform: scale(1.08);
  }

  100% {
    opacity: 0.12;
    transform: scale(0.94);
  }
}
</style>
