<template>
  <ul class="contact-list" :aria-label="t.about.contactAria">
    <li v-for="item in contactItems" :key="item.label">
      <span class="contact-icon" aria-hidden="true">
        <UiIcon :name="item.icon" size="sm" />
      </span>
      <a
        v-if="item.href"
        class="contact-link focus-ring"
        :href="item.href"
        :target="item.href.startsWith('http') ? '_blank' : undefined"
        :rel="item.href.startsWith('http') ? 'noreferrer' : undefined"
      >
        {{ item.label }}
      </a>
      <span v-else>{{ item.label }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const contactItems = computed(() => [
  { icon: 'location_on' as const, label: t.value.about.location },
  { icon: 'alternate_email' as const, label: 'eduardoaamorim0@gmail.com', href: 'mailto:eduardoaamorim0@gmail.com' },
  { icon: 'link' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduardo-ale-amorim' },
  { icon: 'github' as const, label: 'GitHub', href: 'https://github.com/Edu-p' },
])
</script>
