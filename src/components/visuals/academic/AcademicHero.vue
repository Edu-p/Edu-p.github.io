<template>
  <div
    class="grid grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] items-center gap-7 max-[1180px]:grid-cols-1"
  >
    <div class="max-w-[760px]">
      <UiText as="p" variant="eyebrow">{{ t.academic.eyebrow }}</UiText>
      <UiText
        id="academic-title"
        as="h2"
        variant="section-title"
        class="mt-[18px] leading-[1.04] [&>span]:text-[var(--color-electric)]"
      >
        {{ t.academic.title }} <span>{{ t.academic.titleAccent }}</span>
      </UiText>
      <UiText as="p" variant="body" class="mt-4 max-w-[700px]">
        {{ t.academic.description }}
      </UiText>
    </div>

    <div class="relative min-h-[188px] max-[1180px]:hidden" aria-hidden="true">
      <div class="wave-field"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
