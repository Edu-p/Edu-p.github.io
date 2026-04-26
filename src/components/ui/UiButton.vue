<template>
  <component
    :is="tag"
    class="ui-button focus-ring"
    :class="[`ui-button--${variant}`, { 'ui-button--full': full }]"
    :href="href"
    :type="tag === 'button' ? 'button' : undefined"
    v-bind="attrs"
  >
    <slot />
    <span v-if="arrow" class="ui-button__arrow" aria-hidden="true"></span>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    full?: boolean
    arrow?: boolean
  }>(),
  {
    variant: 'primary',
    full: false,
    arrow: false,
  },
)

const attrs = useAttrs()
const tag = computed(() => (props.href ? 'a' : 'button'))
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  padding: 0 22px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease;
}

.ui-button:hover {
  transform: translateY(-3px);
}

.ui-button--primary {
  border: 1px solid var(--color-electric);
  background: var(--color-electric);
  color: white;
  box-shadow: 0 18px 54px color-mix(in srgb, var(--color-electric) 28%, transparent);
}

.ui-button--secondary {
  border: 1px solid var(--border-subtle);
  background: color-mix(in srgb, var(--color-panel) 62%, transparent);
  color: var(--color-ice);
}

.ui-button--secondary:hover {
  border-color: color-mix(in srgb, var(--color-electric) 72%, transparent);
}

.ui-button--ghost {
  min-height: 42px;
  border: 1px solid color-mix(in srgb, var(--color-electric) 60%, transparent);
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-electric) 20%, transparent), transparent);
  color: var(--color-ice);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-electric) 14%, transparent) inset;
}

.ui-button--ghost:hover {
  background: var(--color-electric);
  box-shadow: var(--shadow-electric);
}

.ui-button--full {
  width: 100%;
}
</style>
