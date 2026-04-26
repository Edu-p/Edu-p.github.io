<template>
  <component
    :is="componentTag"
    class="ui-card"
    :class="[`ui-card--${variant}`, { 'ui-card--interactive': interactive }]"
    :href="href"
    :target="target"
    :rel="rel"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tag?: 'a' | 'article' | 'div' | 'section'
    interactive?: boolean
    variant?: 'default' | 'panel' | 'flat' | 'metric' | 'project'
    href?: string
    target?: string
    rel?: string
  }>(),
  {
    tag: 'div',
    interactive: false,
    variant: 'default',
    href: undefined,
    target: undefined,
    rel: undefined,
  },
)

const componentTag = computed(() => (props.href ? 'a' : props.tag))
</script>

<style scoped>
.ui-card {
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
}

.ui-card--default {
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-panel) 78%, transparent),
      color-mix(in srgb, var(--color-void) 86%, transparent)
    ),
    radial-gradient(
      circle at 80% 0%,
      color-mix(in srgb, var(--color-electric) 20%, transparent),
      transparent 12rem
    );
}

.ui-card--panel {
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-panel) 40%, transparent),
      color-mix(in srgb, var(--color-void) 88%, transparent)
    ),
    color-mix(in srgb, var(--color-void) 84%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 4%, transparent);
}

.ui-card--flat {
  background: color-mix(in srgb, var(--color-void) 62%, transparent);
}

.ui-card--interactive {
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.ui-card--interactive:hover {
  border-color: color-mix(in srgb, var(--color-electric) 48%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-electric) 10%, transparent),
    0 18px 42px rgba(0, 0, 0, 0.18);
}

.ui-card--metric {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  text-align: center;
  background: color-mix(in srgb, var(--color-ink) 58%, transparent);
  backdrop-filter: blur(8px);
  transition:
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.ui-card--project {
  overflow: hidden;
  color: inherit;
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-panel) 42%, transparent),
      color-mix(in srgb, var(--color-void) 86%, transparent)
    ),
    color-mix(in srgb, var(--color-void) 70%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 5%, transparent);
  transition:
    border-color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.ui-card--project.ui-card--interactive:hover {
  border-color: color-mix(in srgb, var(--color-electric) 45%, transparent);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-electric) 10%, var(--color-panel)),
      color-mix(in srgb, var(--color-void) 86%, transparent)
    ),
    color-mix(in srgb, var(--color-void) 70%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, white 8%, transparent),
    0 18px 34px color-mix(in srgb, black 24%, transparent);
  transform: translateY(-2px);
}

.ui-card--metric::before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  width: 200%;
  height: 10rem;
  content: '';
  opacity: 0;
  background: linear-gradient(
    0deg,
    transparent,
    color-mix(in srgb, var(--color-electric) 68%, transparent),
    color-mix(in srgb, white 82%, var(--color-electric)),
    transparent
  );
  transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: center;
  transition: opacity 180ms ease;
}

.ui-card--metric::after {
  position: absolute;
  inset: 1px;
  z-index: 0;
  content: '';
  border-radius: inherit;
  background: var(--color-void);
}

.ui-card--metric:hover {
  border-color: color-mix(in srgb, var(--color-electric) 72%, transparent);
  background: color-mix(in srgb, var(--color-ink) 42%, transparent);
  box-shadow: 0 0 22px color-mix(in srgb, var(--color-electric) 18%, transparent);
  transform: translateY(-2px);
}

.ui-card--metric:hover::before {
  opacity: 1;
  animation: metric-border-run 8000ms linear infinite;
}

.ui-card--metric > :slotted(*) {
  position: relative;
  z-index: 1;
}

.ui-card--metric :slotted(strong) {
  transition: transform 180ms ease;
}

.ui-card--metric:hover :slotted(strong) {
  transform: scale(1.14);
}

@keyframes metric-border-run {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
