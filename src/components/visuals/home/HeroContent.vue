<template>
  <div class="hero-copy">
    <UiText as="p" variant="eyebrow" class="reveal reveal-1">{{ t.hero.eyebrow }}</UiText>

    <UiText id="hero-title" as="h1" variant="hero" class="hero-title reveal reveal-2">
      {{ t.hero.title }}
    </UiText>

    <UiText as="p" variant="body" class="hero-description reveal reveal-3">
      {{ t.hero.description }}
    </UiText>

    <div class="cta-actions reveal reveal-4">
      <UiButton :href="resumeUrl" target="_blank" rel="noreferrer" arrow>{{ t.hero.primaryCta }}</UiButton>
      
    </div>

    <ul class="signal-list reveal reveal-5" :aria-label="t.hero.specialties">
      <UiTag v-for="signal in signals" :key="signal" tag="li" variant="clickable">{{ signal }}</UiTag>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import resumeUrl from '@/assets/resume.pdf'
import UiButton from '@/components/ui/UiButton.vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const signals = computed(() => t.value.hero.signals)
</script>
