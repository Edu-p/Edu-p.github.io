<template>
  <div class="about-hero">
    <UiAvatar :src="avatarUrl" :alt="t.about.imageAlt" />

    <div class="about-copy-block">
      <UiText as="p" variant="eyebrow">{{ t.about.eyebrow }}</UiText>
      <UiText id="about-title" as="h2" variant="section-title" class="about-title">
        {{ t.about.title }}
        <span>{{ t.about.titleAccent }}</span>
      </UiText>

      <UiText as="p" variant="body" class="about-copy">
        {{ t.about.copy }}
      </UiText>
    </div>

    <div class="hero-metrics">
      <div v-for="metric in metrics" :key="metric.label" class="metric-card">
        <span class="metric-icon" aria-hidden="true">{{ metric.icon }}</span>
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import avatarUrl from '@/assets/avatar.png'
import UiAvatar from '@/components/ui/UiAvatar.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const metrics = computed(() => t.value.about.metrics)
</script>
