<template>
  <ul
    class="mt-7 grid list-none grid-cols-4 gap-x-[18px] gap-y-3 p-0 max-[1200px]:grid-cols-2 max-[1200px]:[&_.ui-meta-tag--full]:col-span-full max-[680px]:grid-cols-1"
    :aria-label="t.about.contactAria"
  >
    <li v-for="item in contactItems" :key="item.label" class="min-w-0">
      <UiMetaTag
        class="focus-ring"
        :icon="item.icon"
        :label="item.label"
        :href="item.href"
        :full="item.full"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiMetaTag from '@/components/ui/UiMetaTag.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const contactItems = computed(() => [
  {
    icon: 'link' as const,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eduardo-ale-amorim',
  },
  { icon: 'github' as const, label: 'GitHub', href: 'https://github.com/Edu-p' },
  { icon: 'link' as const, label: 'ORCID', href: 'https://orcid.org/0009-0003-3862-3246' },
  {
    icon: 'alternate_email' as const,
    label: 'eduardoaamorim0@gmail.com',
    href: 'mailto:eduardoaamorim0@gmail.com',
    full: true,
  },
])
</script>
