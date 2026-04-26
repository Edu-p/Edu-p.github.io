<template>
  <div class="academic-hero">
    <div class="academic-copy">
      <UiText as="p" variant="eyebrow">{{ t.academic.eyebrow }}</UiText>
      <UiText id="academic-title" as="h2" variant="section-title" class="academic-title">
        {{ t.academic.title }} <span>{{ t.academic.titleAccent }}</span>
      </UiText>
      <UiText as="p" variant="body" class="academic-description">
        {{ t.academic.description }}
      </UiText>
    </div>

    <div class="academic-visual" aria-hidden="true">
      <div class="wave-field"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
