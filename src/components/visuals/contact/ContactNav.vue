<template>
  <nav class="relative z-[1]" :aria-label="t.contact.footerNavAria">
    <h2
      id="contact-title"
      class="mb-3 mt-0 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[var(--color-electric)]"
    >
      {{ t.contact.navigation }}
    </h2>
    <a
      v-for="item in navigationLinks"
      :key="item.label"
      :href="item.href"
      class="focus-ring mt-2.5 block w-fit text-[0.86rem] text-[color-mix(in_srgb,var(--color-ice)_80%,transparent)]"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const navigationLinks = computed(() => t.value.contact.navigationLinks)
</script>
