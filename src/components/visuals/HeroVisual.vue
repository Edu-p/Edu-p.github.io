<template>
  <aside class="hero-visual reveal reveal-3" aria-label="Visual de inteligencia artificial">
    <div class="orbital-shell">
      <div class="brain-wrap">
        <BrainAnimation />
      </div>
      <div class="orbit orbit-a"></div>
      <div class="orbit orbit-b"></div>
    </div>

    <UiCard class="code-card">
      <div class="code-card__header">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <pre><code>pipeline.fit(data)
signals = model.detect(context)
agent.plan(signals)
impact.ship()</code></pre>
    </UiCard>
  </aside>
</template>

<script setup lang="ts">
import BrainAnimation from '@/components/visuals/BrainAnimation.vue'
import UiCard from '@/components/ui/UiCard.vue'
</script>

<style scoped>
.hero-visual {
  position: relative;
  min-height: 620px;
  contain: layout paint;
}

.orbital-shell {
  position: absolute;
  top: 10px;
  right: 58px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
}

.orbital-shell::before {
  position: absolute;
  width: min(78%, 430px);
  aspect-ratio: 1;
  content: "";
  border-radius: 50%;
  background:
    radial-gradient(circle, color-mix(in srgb, var(--color-electric) 26%, transparent), transparent 58%),
    radial-gradient(circle, color-mix(in srgb, var(--color-ice) 7%, transparent), transparent 66%);
  filter: blur(6px);
  animation: core-pulse 2600ms ease-in-out 2 alternate both;
}

.brain-wrap {
  position: relative;
  z-index: 3;
  width: min(72vw, 420px);
  aspect-ratio: 1;
  transform: translate(40px, -34px) rotate(359deg);
}

.orbit {
  position: absolute;
  width: min(86%, 500px);
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--color-electric) 28%, transparent);
  border-radius: 50%;
  will-change: transform;
}

.orbit::after {
  position: absolute;
  top: 9%;
  left: 50%;
  width: 7px;
  height: 7px;
  content: "";
  border-radius: 50%;
  background: var(--color-electric);
  box-shadow: 0 0 18px var(--color-electric);
}

.orbit-a {
  animation: spin-a 14000ms linear infinite;
}

.orbit-b {
  width: min(72%, 430px);
  animation: spin-b 18000ms linear infinite reverse;
}

.code-card {
  position: absolute;
  left: clamp(0px, 4vw, 48px);
  bottom: 72px;
  z-index: 4;
  width: min(100%, 354px);
  background: color-mix(in srgb, var(--color-void) 86%, transparent);
  box-shadow:
    0 18px 42px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
  overflow: hidden;
}

.code-card__header {
  display: flex;
  gap: 6px;
  padding: 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.code-card__header span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-steel);
}

.code-card__header span:first-child {
  background: var(--color-electric);
}

.code-card pre {
  margin: 0;
  padding: 18px;
  color: color-mix(in srgb, var(--color-ice) 78%, transparent);
  font-size: 0.88rem;
  line-height: 1.75;
}

@keyframes core-pulse {
  from {
    opacity: 0.52;
    transform: scale(0.96);
  }

  to {
    opacity: 0.9;
    transform: scale(1.04);
  }
}

@keyframes spin-a {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-b {
  from {
    transform: rotateX(68deg) rotateZ(18deg);
  }

  to {
    transform: rotateX(68deg) rotateZ(378deg);
  }
}

@media (max-width: 980px) {
  .hero-visual {
    min-height: 540px;
  }

  .orbital-shell {
    top: 35px;
    width: 100%;
    right: 69%;
    transform: translateX(58%);
  }

  .code-card {
    left: 0;
    bottom: 12px;
  }
}

@media (max-width: 620px) {
  .hero-visual {
    min-height: 440px;
  }

  .brain-wrap {
    width: min(92vw, 360px);
  }

  .code-card {
    width: 100%;
  }
}
</style>
