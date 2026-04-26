<template>
  <div class="flex min-h-[720px] max-w-[760px] flex-col justify-center gap-6 max-[1180px]:min-h-0">
    <UiTag
      class="reveal reveal-1 !w-fit min-h-10 min-w-[248px] justify-start border border-[color-mix(in_srgb,var(--color-electric)_70%,transparent)] !text-[var(--color-electric)] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-electric)_22%,transparent),color-mix(in_srgb,var(--color-ink)_94%,transparent))] uppercase tracking-[0.06em] shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-electric)_22%,transparent)_inset,0_0_22px_color-mix(in_srgb,var(--color-electric)_20%,transparent)] before:mr-2 before:inline-block before:size-[7px] before:rounded-full before:bg-[var(--color-electric)] before:shadow-[0_0_14px_color-mix(in_srgb,var(--color-electric)_78%,transparent)] before:content-['']"
      variant="view"
    >
      {{ t.hero.eyebrow }}
    </UiTag>

    <UiText
      id="hero-title"
      as="h1"
      variant="hero"
      class="reveal reveal-2 mt-6 max-w-[820px] leading-[1.06] [&>span]:text-[var(--color-electric)]"
    >
      {{ t.hero.titleLead }}
      <span>{{ t.hero.titleAccent }}</span>
    </UiText>

    <UiText as="p" variant="body" class="reveal reveal-3 mt-[22px] max-w-[650px]">
      {{ t.hero.description }}
    </UiText>

    <div class="reveal reveal-4 mt-[34px] flex flex-wrap gap-3.5 max-[720px]:[&_.ui-button]:w-full">
      <UiButton :href="resumeUrl" target="_blank" rel="noreferrer" arrow>
        {{ t.hero.primaryCta }}
      </UiButton>
      <UiButton href="#projetos" variant="secondary" arrow>{{ t.hero.secondaryCta }}</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import resumeUrl from '@/assets/resume.pdf'
import UiButton from '@/components/ui/UiButton.vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
