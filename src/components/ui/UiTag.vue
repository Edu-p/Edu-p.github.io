<template>
  <component :is="componentTag" class="ui-tag" :class="`ui-tag--${variant}`" :href="href">
    <span class="ui-tag__content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tag?: 'span' | 'li'
    href?: string
    variant?: 'default' | 'clickable' | 'view' | 'tech'
  }>(),
  {
    tag: 'span',
    variant: 'default',
  },
)

const componentTag = computed(() => (props.href ? 'a' : props.tag))
</script>

<style scoped>
.ui-tag {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--color-ice) 10%, transparent);
  border-radius: 999px;
  padding: 0 12px;
  overflow: hidden;
  color: color-mix(in srgb, var(--color-ice) 82%, transparent);
  font-size: 0.78rem;
  background: color-mix(in srgb, var(--color-ink) 72%, transparent);
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.ui-tag__content {
  position: relative;
  z-index: 2;
}

.ui-tag--clickable {
  cursor: pointer;
}

.ui-tag--clickable:hover {
  border-color: color-mix(in srgb, var(--color-electric) 48%, transparent);
  color: var(--color-ice);
  background: color-mix(in srgb, var(--color-electric) 16%, var(--color-ink));
}

.ui-tag--view {
  border-color: color-mix(in srgb, var(--color-electric) 22%, transparent);
  color: color-mix(in srgb, var(--color-ice) 76%, transparent);
  background: color-mix(in srgb, var(--color-void) 64%, transparent);
}

.ui-tag--tech::before {
  position: absolute;
  inset: -1px;
  z-index: 0;
  content: "";
  border-radius: inherit;
  opacity: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in srgb, var(--color-electric) 88%, white) 70deg,
    transparent 140deg,
    transparent 360deg
  );
  transition: opacity 180ms ease;
}

.ui-tag--tech::after {
  position: absolute;
  inset: 1px;
  z-index: 1;
  content: "";
  border-radius: inherit;
  background: color-mix(in srgb, var(--color-ink) 82%, transparent);
}

.ui-tag--tech:hover {
  color: var(--color-ice);
  box-shadow: 0 0 20px color-mix(in srgb, var(--color-electric) 18%, transparent);
}

.ui-tag--tech:hover::before {
  opacity: 1;
  animation: tag-scan 2000ms linear infinite;
}

.ui-tag--tech {
  color: color-mix(in srgb, var(--color-ice) 82%, transparent);
}

@keyframes tag-scan {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
