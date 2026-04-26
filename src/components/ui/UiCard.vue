<template>
  <component :is="tag" class="ui-card" :class="{ 'ui-card--interactive': interactive }">
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'article' | 'div' | 'section'
    interactive?: boolean
  }>(),
  {
    tag: 'div',
    interactive: false,
  },
)
</script>

<style scoped>
.ui-card {
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-panel) 78%, transparent), color-mix(in srgb, var(--color-void) 86%, transparent)),
    radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--color-electric) 20%, transparent), transparent 12rem);
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
</style>
