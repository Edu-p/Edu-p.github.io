<template>
  <UiCard
    tag="section"
    variant="panel"
    class="h-[-webkit-fill-available] p-[22px] max-[640px]:p-[18px]"
    aria-labelledby="highlights-title"
  >
    <header class="mb-5 flex items-center gap-3.5">
      <span
        class="grid h-[30px] min-w-[30px] place-items-center rounded-md border border-[color-mix(in_srgb,var(--color-electric)_32%,transparent)] text-[0.68rem] font-black tracking-[0.08em] text-[var(--color-electric)]"
        aria-hidden="true"
        ><UiIcon name="workspace_premium" size="sm"
      /></span>
      <h3 id="highlights-title" class="m-0 text-base font-bold uppercase text-[var(--color-ice)]">
        {{ t.academic.highlightsTitle }}
      </h3>
    </header>

    <div class="grid grid-cols-2 gap-3 h-[141px]">
      <UiCard
        v-for="highlight in highlights"
        :key="highlight.label"
        tag="article"
        variant="flat"
        class="flex min-h-[124px] items-center justify-center p-4 text-center"
      >
        <div class="flex items-start justify-start gap-2">
          <span
            class="grid size-[38px] place-items-center text-[var(--color-electric)] mt-[4px]"
            aria-hidden="true"
          >
            <UiIcon :name="highlight.icon" size="lg"
          /></span>
          <div class="grid justify-items-start">
            <strong class="text-[2rem] font-medium text-[var(--color-ice)]">
              {{ highlight.value }}
            </strong>
            <small
              class="max-w-[140px] text-[0.88rem] leading-[1.35] text-[color-mix(in_srgb,var(--color-ice)_82%,transparent)] text-left"
            >
              {{ highlight.label }}
            </small>
          </div>
        </div>
      </UiCard>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const highlightIcons = {
  DOC: 'description',
  GPA: 'grade',
} as const

const highlights = computed(() =>
  t.value.academic.highlights.map((highlight) => ({
    ...highlight,
    icon: highlightIcons[highlight.icon as keyof typeof highlightIcons] ?? 'description',
  })),
)
</script>
