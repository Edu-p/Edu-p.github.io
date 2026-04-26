<template>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const identityItems = computed(() => [
  { icon: 'link' as const, label: 'ORCID', href: 'https://orcid.org/0009-0003-3862-3246' },
])
</script>

<style scoped>
.academic-identity {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.academic-identity li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.identity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  color: var(--color-text-secondary);
}

.identity-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-text-primary);
  transition: color 0.2s ease;
}

.identity-link:hover {
  color: var(--color-accent);
}

.focus-ring:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
