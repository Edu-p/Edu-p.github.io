<template>
  <UiCard
    tag="section"
    variant="panel"
    class="h-[-webkit-fill-available] p-[22px] max-[640px]:p-[18px]"
    aria-labelledby="publications-title"
  >
    <header class="mb-5 flex items-center gap-3.5">
      <span
        class="grid h-[30px] min-w-[30px] place-items-center rounded-md border border-[color-mix(in_srgb,var(--color-electric)_32%,transparent)] text-[0.68rem] font-black tracking-[0.08em] text-[var(--color-electric)]"
        aria-hidden="true"
        ><UiIcon name="description" size="sm"
      /></span>
      <h3 id="publications-title" class="m-0 text-base font-bold uppercase text-[var(--color-ice)]">
        {{ t.academic.publications }}
      </h3>
    </header>

    <UiCard
      v-for="paper in papers"
      :key="paper.title"
      tag="article"
      variant="flat"
      class="mt-3.5 grid grid-cols-[minmax(180px,0.34fr)_minmax(194px,1fr)_minmax(210px,0.36fr)] items-stretch gap-6 p-3 first:mt-0 max-[920px]:grid-cols-[minmax(160px,0.34fr)_minmax(0,1fr)] max-[640px]:grid-cols-1"
    >
      <UiCard
        variant="flat"
        class="grid min-h-[158px] place-items-center gap-2.5 bg-[color-mix(in_srgb,black_36%,transparent)] p-[18px] text-center max-[640px]:min-h-32"
      >
        <strong class="text-[1.7rem] leading-[1.05] font-bold text-[var(--color-ice)]">
          {{ paper.venue }}
        </strong>
        <small class="text-[0.78rem] font-normal tracking-[0.08em] text-[var(--color-electric)]">
          {{ paper.year }}
        </small>
        <UiTag variant="view" class="color-blue">{{ paper.topic }}</UiTag>
      </UiCard>

      <div class="self-center">
        <h4 class="m-0 text-[1.4rem] leading-[1.38] font-medium text-[var(--color-ice)]">
          {{ paper.title }}
        </h4>
        <p
          class="mt-3.5 mb-0 text-[0.8rem] leading-[1.8] text-[color-mix(in_srgb,var(--color-ice)_60%,transparent)]"
        >
          {{ paper.summary }}
        </p>
      </div>

      <div
        class="grid content-center border-l border-[var(--border-subtle)] pl-5 max-[920px]:col-span-full max-[920px]:border-t max-[920px]:border-l-0 max-[920px]:pt-4 max-[920px]:pl-0"
      >
        <p
          class="mt-3.5 mb-0 text-[0.9rem] leading-[1.6] text-[color-mix(in_srgb,var(--color-ice)_78%,transparent)]"
        >
          {{ paper.authors }}
        </p>
        <a
          v-if="paper.paperHref"
          class="focus-ring relative mt-3 grid grid-cols-[44px_1fr_auto] items-center gap-2 text-[0.84rem] text-[var(--color-electric)] [&>span:first-child]:grid [&>span:first-child]:size-7 [&>span:first-child]:place-items-center"
          :href="paper.paperHref"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true"><UiIcon name="article" size="sm" /></span>
          <span>{{ t.academic.readPaper }}</span>
          <span aria-hidden="true"></span>
        </a>
        <span
          v-else
          class="group relative mt-3 grid cursor-not-allowed grid-cols-[44px_1fr_auto] items-center gap-2 text-[0.84rem] text-[color-mix(in_srgb,var(--color-muted)_72%,transparent)] [&>span:first-child]:grid [&>span:first-child]:size-7 [&>span:first-child]:place-items-center"
          role="link"
          aria-disabled="true"
          tabindex="0"
          :title="t.academic.paperUnavailable"
          :aria-label="`${t.academic.readPaper}: ${t.academic.paperUnavailable}`"
        >
          <span aria-hidden="true"><UiIcon name="article" size="sm" /></span>
          <span>{{ t.academic.readPaper }}</span>
          <span
            class="pointer-events-none absolute right-0 bottom-[calc(100%+8px)] z-[4] w-max max-w-[220px] translate-y-1 rounded-md border border-[color-mix(in_srgb,var(--color-electric)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_96%,black)] px-2.5 py-2 text-[0.72rem] leading-[1.35] text-[var(--color-ice)] opacity-0 shadow-[0_12px_24px_color-mix(in_srgb,black_28%,transparent)] transition-[opacity,transform] duration-160 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
            role="tooltip"
            >{{ t.academic.paperUnavailable }}</span
          >
        </span>
        <a
          v-if="paper.codeHref"
          class="focus-ring relative mt-3 grid grid-cols-[44px_1fr_auto] items-center gap-2 text-[0.84rem] text-[var(--color-electric)] [&>span:first-child]:grid [&>span:first-child]:size-7 [&>span:first-child]:place-items-center"
          :href="paper.codeHref"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true"><UiIcon name="code" size="sm" /></span>
          <span>{{ t.academic.viewCode }}</span>
          <span aria-hidden="true"></span>
        </a>
        <span
          v-else
          class="group relative mt-3 grid cursor-not-allowed grid-cols-[44px_1fr_auto] items-center gap-2 text-[0.84rem] text-[color-mix(in_srgb,var(--color-muted)_72%,transparent)] [&>span:first-child]:grid [&>span:first-child]:size-7 [&>span:first-child]:place-items-center"
          role="link"
          aria-disabled="true"
          tabindex="0"
          :title="t.academic.codeUnavailable"
          :aria-label="`${t.academic.viewCode}: ${t.academic.codeUnavailable}`"
        >
          <span aria-hidden="true"><UiIcon name="code" size="sm" /></span>
          <span>{{ t.academic.viewCode }}</span>
          <span
            class="pointer-events-none absolute right-0 bottom-[calc(100%+8px)] z-[4] w-max max-w-[220px] translate-y-1 rounded-md border border-[color-mix(in_srgb,var(--color-electric)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_96%,black)] px-2.5 py-2 text-[0.72rem] leading-[1.35] text-[var(--color-ice)] opacity-0 shadow-[0_12px_24px_color-mix(in_srgb,black_28%,transparent)] transition-[opacity,transform] duration-160 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
            role="tooltip"
            >{{ t.academic.codeUnavailable }}</span
          >
        </span>
      </div>
    </UiCard>

    <a
      class="focus-ring mt-3.5 hidden min-h-12 items-center justify-center gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-electric)_50%,transparent)] text-[0.84rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-electric)]"
      href="#contato"
    >
      <span>{{ t.academic.allPublications }}</span>
      <span aria-hidden="true"></span>
    </a>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiTag from '@/components/ui/UiTag.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const papers = computed(() =>
  t.value.academic.papers.map((paper) => ({
    ...paper,
    codeHref: 'codeHref' in paper ? paper.codeHref : undefined,
    paperHref: 'paperHref' in paper ? paper.paperHref : undefined,
  })),
)
</script>
