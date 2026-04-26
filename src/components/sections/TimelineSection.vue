<template>
  <section id="timeline" class="relative overflow-visible" aria-labelledby="timeline-title">
    <UiText as="p" variant="eyebrow">{{ t.timeline.eyebrow }}</UiText>
    <UiText id="timeline-title" as="h2" variant="section-title" class="mt-[18px]">
      {{ t.timeline.title }}
    </UiText>

    <div class="hidden min-[1201px]:block" :aria-label="t.timeline.controls">
      <button
        class="focus-ring absolute top-[72%] left-[-16px] z-[3] grid size-[42px] translate-y-[-8%] cursor-pointer place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-electric)_36%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_78%,transparent)] p-0 text-base font-extrabold text-[var(--color-ice)] backdrop-blur-[14px] transition-[border-color,box-shadow,background,color] duration-180 disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-[color-mix(in_srgb,var(--color-electric)_72%,transparent)] hover:not-disabled:bg-[color-mix(in_srgb,var(--color-electric)_14%,var(--color-ink))] hover:not-disabled:shadow-[0_0_28px_color-mix(in_srgb,var(--color-electric)_18%,transparent)] [&_.ui-icon]:rotate-180"
        type="button"
        :disabled="currentPage === 0"
        :aria-label="t.timeline.previous"
        @click="previousPage"
      >
        <UiIcon name="arrow_forward" size="sm" aria-hidden="true" />
      </button>
      <button
        class="focus-ring absolute top-[72%] right-[-16px] z-[3] grid size-[42px] translate-y-[-8%] cursor-pointer place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-electric)_36%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_78%,transparent)] p-0 text-base font-extrabold text-[var(--color-ice)] backdrop-blur-[14px] transition-[border-color,box-shadow,background,color] duration-180 disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-[color-mix(in_srgb,var(--color-electric)_72%,transparent)] hover:not-disabled:bg-[color-mix(in_srgb,var(--color-electric)_14%,var(--color-ink))] hover:not-disabled:shadow-[0_0_28px_color-mix(in_srgb,var(--color-electric)_18%,transparent)]"
        type="button"
        :disabled="currentPage === totalPages - 1"
        :aria-label="t.timeline.next"
        @click="nextPage"
      >
        <UiIcon name="arrow_forward" size="sm" aria-hidden="true" />
      </button>
    </div>

    <ol
      class="timeline-list relative m-0 grid list-none gap-6 pt-[18px] min-[1201px]:grid-cols-3 min-[1201px]:gap-[18px] min-[1201px]:pt-[42px]"
    >
      <li
        v-for="(item, index) in visibleTimeline"
        :key="`${item.company}-${item.role}-${item.period}`"
        class="timeline-item visible relative grid grid-cols-[92px_76px_minmax(0,1fr)] items-start gap-6 opacity-0 max-[720px]:grid-cols-[72px_minmax(0,1fr)] max-[720px]:gap-x-[18px] max-[720px]:gap-y-2.5 min-[1201px]:grid-cols-1 min-[1201px]:gap-3.5"
        :style="{ '--delay': `${index * 80}ms` }"
      >
        <div
          class="pt-11 text-right text-[0.86rem] leading-[1.35] text-[var(--color-electric)] max-[1200px]:mr-2 max-[1200px]:text-left max-[720px]:pt-0 max-[720px]:text-right max-[720px]:text-[0.78rem] min-[1201px]:order-1 min-[1201px]:min-h-5 min-[1201px]:pt-0 min-[1201px]:text-center"
        >
          {{ item.period }}
        </div>

        <div
          class="company-mark relative grid place-items-center max-[1200px]:ml-2 max-[720px]:m-0 max-[720px]:block max-[720px]:size-0 max-[720px]:[&_.ui-mark]:hidden min-[1201px]:order-2 min-[1201px]:mt-[26px] min-[1201px]:justify-self-center"
          aria-hidden="true"
        >
          <UiMark :label="item.company" size="lg" />
        </div>

        <UiCard
          tag="article"
          class="p-[22px] bg-[color-mix(in_srgb,var(--color-void)_82%,transparent)] max-[720px]:col-start-2 max-[720px]:mt-[-60px] max-[720px]:border-0 max-[720px]:bg-transparent max-[720px]:p-3 max-[720px]:hover:transform-none min-[1201px]:order-3 min-[1201px]:min-h-[300px] min-[1201px]:p-[18px]"
          interactive
        >
          <div class="flex justify-between gap-[18px] max-[720px]:block min-[1201px]:block">
            <div>
              <h3 class="m-0 text-[1.24rem] font-semibold text-[var(--color-ice)]">
                {{ item.role }}
              </h3>
              <p class="mt-2 mb-0 text-[0.9rem] leading-[1.65] text-[var(--color-muted)]">
                <strong class="font-bold text-[var(--color-electric)]">{{ item.company }}</strong>
                <span class="before:content-['_|_']">{{ item.location }}</span>
              </p>
            </div>
          </div>

          <p class="mt-2 mb-0 text-[0.9rem] leading-[1.65] text-[var(--color-muted)]">
            {{ item.summary }}
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <UiTag v-for="tag in item.tags" :key="tag" variant="view">{{ tag }}</UiTag>
          </div>
        </UiCard>
      </li>
    </ol>

    <button
      v-if="!isDesktop && visibleCount < timeline.length"
      class="focus-ring mt-5 inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-[color-mix(in_srgb,var(--color-electric)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_62%,transparent)] text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-electric)]"
      type="button"
      @click="showMore"
    >
      {{ t.timeline.showMore }}
    </button>
  </section>
</template>

<script setup lang="ts">
import '@/styles/timeline.css'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiMark from '@/components/ui/UiMark.vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const timeline = computed(() => t.value.timeline.items)

const pageSize = 3
const currentPage = ref(0)
const visibleCount = ref(pageSize)
const isDesktop = ref(false)
let mediaQuery: MediaQueryList | null = null

const totalPages = computed(() => Math.ceil(timeline.value.length / pageSize))

const visibleTimeline = computed(() => {
  if (isDesktop.value) {
    const start = currentPage.value * pageSize
    return timeline.value.slice(start, start + pageSize)
  }

  return timeline.value.slice(0, visibleCount.value)
})

function updateMediaMode(event?: MediaQueryListEvent) {
  isDesktop.value = event?.matches ?? Boolean(mediaQuery?.matches)
  currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
}

function nextPage() {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value - 1)
}

function previousPage() {
  currentPage.value = Math.max(currentPage.value - 1, 0)
}

function showMore() {
  visibleCount.value = Math.min(visibleCount.value + pageSize, timeline.value.length)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1201px)')
  updateMediaMode()
  mediaQuery.addEventListener('change', updateMediaMode)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateMediaMode)
})
</script>
