<template>
  <div
    class="grid grid-cols-[350px_minmax(320px,1fr)_minmax(420px,0.95fr)] items-center gap-[30px] max-[1200px]:grid-cols-1"
  >
    <div
      class="relative aspect-square w-[min(76vw,320px)] self-start p-7 max-[1200px]:justify-self-center max-[680px]:w-[min(72vw,280px)] max-[680px]:p-5"
      aria-hidden="true"
    >
      <BrainAnimation />
    </div>

    <div class="max-w-[560px]">
      <UiText as="p" variant="eyebrow">{{ t.about.eyebrow }}</UiText>
      <UiText
        id="about-title"
        as="h2"
        variant="section-title"
        class="mt-3 text-[clamp(1.8rem,2.45vw,2.85rem)] leading-[1.12] [&>span]:block [&>span]:text-[var(--color-electric)]"
      >
        {{ t.about.title }}
        <span>{{ t.about.titleAccent }}</span>
      </UiText>

      <UiText as="p" variant="body" class="mt-[18px] text-[0.94rem] leading-[1.78]">
        {{ t.about.copy }}
      </UiText>
    </div>

    <div class="grid grid-cols-2 gap-3 max-[1200px]:grid-cols-2 max-[680px]:grid-cols-1">
      <UiCard
        v-for="metric in metrics"
        :key="metric.label"
        variant="metric"
        class="grid min-h-[148px] place-items-center px-3 py-[18px]"
      >
        <span
          class="relative z-[1] text-[0.72rem] font-black tracking-[0.08em] text-[var(--color-electric)]"
          aria-hidden="true"
        >
          {{ metric.icon }}
        </span>
        <strong class="relative z-[1] text-[1.7rem] font-medium text-[var(--color-ice)]">
          {{ metric.value }}
        </strong>
        <span class="relative z-[1] text-[0.78rem] leading-[1.42] text-[var(--color-muted)]">
          {{ metric.label }}
        </span>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiText from '@/components/ui/UiText.vue'
import BrainAnimation from '@/components/visuals/BrainAnimation.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const metrics = computed(() => t.value.about.metrics)
</script>
