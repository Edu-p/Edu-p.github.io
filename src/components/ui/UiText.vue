<template>
  <component :is="as" :class="['ui-text', `ui-text--${variant}`]">
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
    variant?: 'eyebrow' | 'hero' | 'section-title' | 'body' | 'card-title' | 'kicker'
  }>(),
  {
    as: 'p',
    variant: 'body',
  },
)
</script>

<style scoped>
.ui-text {
  margin: 0;
}

.ui-text--eyebrow,
.ui-text--kicker {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--color-electric);
  text-transform: uppercase;
}

.ui-text--hero {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 6.8rem);
  font-weight: 800;
  line-height: clamp(3rem, 4.7vw, 7rem);
  letter-spacing: 0;
  text-wrap: balance;
}

.ui-text--section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 2vw, 4rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
}

.ui-text--body {
  color: var(--color-muted);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.75;
}

.ui-text--card-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.2;
}
</style>
