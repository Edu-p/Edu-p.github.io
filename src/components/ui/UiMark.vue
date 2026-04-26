<template>
  <span class="ui-mark" :class="[`ui-mark--${size}`, `ui-mark--${shape}`]">
    {{ initials }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    value?: string
    size?: 'sm' | 'md' | 'lg'
    shape?: 'circle' | 'square'
  }>(),
  {
    size: 'md',
    shape: 'circle',
  },
)

const initials = computed(() => {
  if (props.value) return props.value.slice(0, 2).toUpperCase()

  const words = props.label
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length >= 2) {
    return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase()
  }

  return (words[0] ?? props.label).slice(0, 2).toUpperCase()
})
</script>

<style scoped>
:root[data-theme='dark'] .ui-mark {
  box-shadow:
    0 0 18px color-mix(in srgb, var(--color-electric) 12%, transparent),
    inset 0 1px 0 color-mix(in srgb, white 6%, transparent);
  background:
    radial-gradient(
      circle at 50% 30%,
      color-mix(in srgb, var(--color-electric) 16%, transparent),
      transparent 64%
    ),
    color-mix(in srgb, var(--color-void) 78%, transparent);
}
.ui-mark {
  display: grid;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-electric) 28%, transparent);
  color: var(--color-electric);
  font-family: var(--font-display);
  font-weight: 900;
  letter-spacing: 0.03em;
}

.ui-mark--circle {
  border-radius: 50%;
}

.ui-mark--square {
  border-radius: 8px;
}

.ui-mark--sm {
  width: 40px;
  height: 40px;
  font-size: 0.74rem;
}

.ui-mark--md {
  width: 58px;
  height: 58px;
  font-size: 0.9rem;
}

.ui-mark--lg {
  width: 76px;
  height: 76px;
  font-size: 1rem;
}
</style>
