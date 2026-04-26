<template>
  <component
    :is="href ? 'a' : 'span'"
    class="ui-meta-tag"
    :class="{ 'ui-meta-tag--full': full }"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noreferrer' : undefined"
  >
    <span class="ui-meta-tag__icon" aria-hidden="true">
      <UiIcon :name="icon" size="sm" />
    </span>
    <span class="ui-meta-tag__text">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'

type UiIconName =
  | 'description'
  | 'school'
  | 'workspace_premium'
  | 'multi_agents'
  | 'cloud'
  | 'location_on'
  | 'calendar_month'
  | 'grade'
  | 'alternate_email'
  | 'code'
  | 'github'
  | 'link'
  | 'article'
  | 'arrow_forward'
  | 'light_mode'
  | 'dark_mode'
  | 'star'

const props = withDefaults(
  defineProps<{
    label: string
    icon: UiIconName
    href?: string
    full?: boolean
  }>(),
  {
    href: undefined,
    full: false,
  },
)

const isExternal = computed(() => Boolean(props.href?.startsWith('http')))
</script>

<style scoped>

:root[data-theme='light'] .ui-meta-tag {
  background: color-mix(in srgb, white 72%, transparent);
  box-shadow: none !important;
}
.ui-meta-tag {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 48px;
  border: 1px solid color-mix(in srgb, var(--color-ice) 8%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
  color: color-mix(in srgb, var(--color-ice) 80%, transparent);
  font-size: 0.82rem;
  line-height: 1.25;
  background: color-mix(in srgb, black 20%, transparent);
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background 180ms ease;
}

.ui-meta-tag--full {
  grid-column: 1 / -1;
}

.ui-meta-tag:is(a):hover {
  color: var(--color-ice);
  border-color: color-mix(in srgb, var(--color-electric) 30%, transparent);
  background: color-mix(in srgb, var(--color-electric) 10%, transparent);
}

.ui-meta-tag__icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-electric) 22%, transparent);
  border-radius: 50%;
  color: var(--color-electric);
  background: color-mix(in srgb, var(--color-electric) 8%, transparent);
}

.ui-meta-tag__text {
  min-width: 0;
}
</style>
